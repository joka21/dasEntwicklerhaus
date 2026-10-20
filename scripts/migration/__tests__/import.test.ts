import { createHash } from 'node:crypto'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import postgres from 'postgres'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { testdatenAnlegen } from '../../../src/lib/portal/__tests__/testdaten'
import type { Manifest } from '../format'
import { abgleich, importieren } from '../import-lib'

// Import gegen die Testdatenbank mit einem erfundenen Export.

const sql = postgres(process.env.DATABASE_URL!, { max: 1, onnotice: () => {} })
let arbeit: string
let exportDir: string

const P = 'eeeeeeee-0000-4000-8000-000000000001'
const U = { admin: 'aaaaaaaa-0000-4000-8000-000000000001', kunde: 'aaaaaaaa-0000-4000-8000-000000000002' }
const C = 'cccccccc-0000-4000-8000-000000000001'
const V = { gruen: 'dddddddd-0000-4000-8000-000000000001', klar: 'dddddddd-0000-4000-8000-000000000002' }
const jetzt = '2026-10-01T10:00:00+00:00'

async function exportAnlegen(dateiInhalt: Record<string, string>, pruefsummeFalsch = false) {
  exportDir = path.join(arbeit, `export-${Math.random().toString(36).slice(2)}`)
  const tabellen: Record<string, unknown[]> = {
    auth_users: [
      { id: U.admin, email: 'admin@test.test', name: 'Admin', email_confirmed_at: jetzt, created_at: jetzt, updated_at: jetzt },
      { id: U.kunde, email: 'Kunde@Test.TEST', name: null, email_confirmed_at: null, created_at: jetzt, updated_at: null },
    ],
    portal_admins: [{ user_id: U.admin, created_at: jetzt }],
    portal_clients: [{ id: C, name: 'Bäckerei', created_at: jetzt }],
    portal_client_members: [{ client_id: C, user_id: U.kunde, created_at: jetzt }],
    portal_projects: [{ id: P, client_id: C, slug: 'baeckerei', title: 'Bäckerei', description: null, created_at: jetzt }],
    portal_design_variants: [
      { id: V.gruen, project_id: P, title: 'Grün', description: null, storage_path: `${P}/Entwurf Grün.html`, sort_order: 1, created_at: jetzt },
      { id: V.klar, project_id: P, title: 'Klar', description: 'x', storage_path: `${P}/klar.html`, sort_order: 2, created_at: jetzt },
    ],
    portal_variant_comments: [
      { id: 'ffffffff-0000-4000-8000-000000000001', variant_id: V.gruen, author_id: U.kunde, body: 'Größer!', created_at: jetzt },
      { id: 'ffffffff-0000-4000-8000-000000000002', variant_id: V.gruen, author_id: U.admin, body: 'Gerne', created_at: jetzt },
    ],
    portal_project_approvals: [{ project_id: P, variant_id: V.klar, approved_by: U.kunde, approved_at: jetzt }],
  }
  for (const [name, zeilen] of Object.entries(tabellen)) {
    await mkdir(path.join(exportDir, 'tabellen'), { recursive: true })
    await writeFile(path.join(exportDir, 'tabellen', `${name}.json`), JSON.stringify(zeilen))
  }
  const dateien = []
  for (const [name, inhalt] of Object.entries(dateiInhalt)) {
    const ziel = path.join(exportDir, 'dateien', ...name.split('/'))
    await mkdir(path.dirname(ziel), { recursive: true })
    await writeFile(ziel, inhalt)
    const sha256 = createHash('sha256').update(pruefsummeFalsch ? 'anders' : inhalt).digest('hex')
    dateien.push({ name, bytes: Buffer.byteLength(inhalt), sha256 })
  }
  const manifest: Manifest = {
    version: 1,
    exportiertAm: jetzt,
    quelle: 'test',
    zaehlung: { ...Object.fromEntries(Object.entries(tabellen).map(([n, z]) => [n, z.length])), 'dateien.design-proposals': dateien.length },
    fehlendeAltTabellen: [],
    dateien,
  }
  await writeFile(path.join(exportDir, 'manifest.json'), JSON.stringify(manifest))
  return manifest
}

const DATEIEN = {
  [`${P}/Entwurf Grün.html`]: '<h1>Grün</h1>',
  [`${P}/klar.html`]: '<h1>Klar</h1>',
  [`${P}/verwaist.html`]: '<h1>alt</h1>',
}

async function leeren() {
  await testdatenAnlegen()
  await sql`truncate auth_user, portal_clients restart identity cascade`
}

beforeAll(async () => {
  arbeit = await mkdtemp(path.join(tmpdir(), 'portal-import-'))
})
afterAll(async () => {
  await rm(arbeit, { recursive: true, force: true })
  await sql.end()
})
beforeEach(async () => {
  await leeren()
  process.env.PORTAL_STORAGE_PATH = path.join(arbeit, `ablage-${Math.random().toString(36).slice(2)}`)
})

describe('Import', () => {
  it('übernimmt alles, benennt unpassende Dateien um und stimmt im Abgleich', async () => {
    const manifest = await exportAnlegen(DATEIEN)
    const bericht = await importieren(sql, exportDir)

    expect(abgleich(manifest, bericht).every((z) => z.ok)).toBe(true)
    expect(bericht.umbenannt).toHaveLength(1)
    expect(bericht.verwaisteDateien).toEqual([`${P}/verwaist.html`])

    const nutzer = await sql`select email, name, email_verified from auth_user order by email`
    expect(nutzer).toEqual([
      { email: 'admin@test.test', name: 'Admin', email_verified: true },
      { email: 'kunde@test.test', name: '', email_verified: false },
    ])
    const kommentare = await sql`select body, is_admin from portal_variant_comments order by body`
    expect(kommentare).toEqual([
      { body: 'Gerne', is_admin: true },
      { body: 'Größer!', is_admin: false },
    ])
    const [gruen] = await sql`select storage_path from portal_design_variants where id = ${V.gruen}`
    expect(gruen.storage_path).toBe(bericht.umbenannt[0].neu)
    expect(await readFile(path.join(process.env.PORTAL_STORAGE_PATH!, ...gruen.storage_path.split('/')), 'utf8')).toBe('<h1>Grün</h1>')
  })

  it('falsche Prüfsumme: nichts in der Datenbank, keine Dateien', async () => {
    await exportAnlegen(DATEIEN, true)
    await expect(importieren(sql, exportDir)).rejects.toThrow(/Prüfsumme/)
    const [{ anzahl }] = await sql`select count(*)::int as anzahl from portal_design_variants`
    expect(anzahl).toBe(0)
    const ablage = await readdir(process.env.PORTAL_STORAGE_PATH!, { recursive: true }).catch(() => [])
    expect(ablage.filter((n) => String(n).endsWith('.html'))).toEqual([])
  })

  it('Datenbankfehler: Transaktion zurück, kopierte Dateien wieder entfernt', async () => {
    await exportAnlegen(DATEIEN)
    // Freigabe verweist auf eine Variante, die es nicht gibt -> Fremdschlüsselfehler am Ende
    const datei = path.join(exportDir, 'tabellen', 'portal_project_approvals.json')
    await writeFile(datei, JSON.stringify([{ project_id: P, variant_id: 'dddddddd-0000-4000-8000-0000000000ff', approved_by: null, approved_at: jetzt }]))
    await expect(importieren(sql, exportDir)).rejects.toThrow()
    const [{ anzahl }] = await sql`select count(*)::int as anzahl from auth_user`
    expect(anzahl).toBe(0)
    const ablage = await readdir(process.env.PORTAL_STORAGE_PATH!, { recursive: true })
    expect(ablage.filter((n) => String(n).endsWith('.html'))).toEqual([])
  })

  it('lehnt ein nicht leeres Ziel ab', async () => {
    await testdatenAnlegen()
    await exportAnlegen(DATEIEN)
    await expect(importieren(sql, exportDir)).rejects.toThrow(/nicht leer/)
  })
})
