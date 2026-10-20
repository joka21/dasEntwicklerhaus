import { mkdir, mkdtemp, readdir, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { eq } from 'drizzle-orm'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/lib/db'
import { portalDesignVariants } from '@/lib/db/schema'
import { entwurfHochladen } from '../admin'
import { ladeEntwurfPfad } from '../daten'
import { absoluterPfad, entwurfLesen, entwurfSpeichern, MAX_ENTWURF_BYTES, pruefeEntwurfDatei } from '../speicher'
import { ID, testdatenAnlegen, viewer } from './testdaten'

let ablage: string

beforeAll(async () => {
  ablage = await mkdtemp(path.join(tmpdir(), 'portal-ablage-'))
  process.env.PORTAL_STORAGE_PATH = ablage
})
afterAll(async () => {
  await rm(ablage, { recursive: true, force: true })
})
beforeEach(testdatenAnlegen)

async function lesen(stream: ReadableStream<Uint8Array> | null): Promise<string | null> {
  return stream ? new Response(stream).text() : null
}

function htmlDatei(inhalt = '<!doctype html><title>Entwurf</title>', name = 'entwurf.html', type = 'text/html') {
  return new File([inhalt], name, { type })
}

describe('Speicherpfade', () => {
  it('gültiger Pfad liegt in der Ablage', () => {
    expect(absoluterPfad(`${ID.projekt1}/a.html`)).toBe(path.join(ablage, ID.projekt1, 'a.html'))
  })
  it.each([
    '../geheim.html',
    `${ID.projekt1}/../${ID.projekt2}/a.html`,
    `${ID.projekt1}/unter/a.html`,
    `/etc/passwd`,
    `${ID.projekt1}/a.js`,
    `${ID.projekt1}\\..\\a.html`,
    'kein-projekt/a.html',
  ])('lehnt %s ab', (pfad) => {
    expect(() => absoluterPfad(pfad)).toThrow()
  })
})

describe('Lesen', () => {
  it('liefert eine abgelegte Datei', async () => {
    const pfad = await entwurfSpeichern(ID.projekt1, new TextEncoder().encode('<p>Hallo Ö</p>'))
    expect(await lesen(await entwurfLesen(pfad))).toBe('<p>Hallo Ö</p>')
  })
  it('fehlende Datei ergibt null', async () => {
    expect(await entwurfLesen(`${ID.projekt1}/fehlt.html`)).toBeNull()
  })
  it('ungültiger Pfad ergibt null', async () => {
    expect(await entwurfLesen('../x.html')).toBeNull()
  })
  it('folgt keinem Symlink aus der Ablage heraus', async (ctx) => {
    const aussen = await mkdtemp(path.join(tmpdir(), 'portal-aussen-'))
    await writeFile(path.join(aussen, 'geheim.html'), 'geheim')
    await mkdir(path.join(ablage, ID.projekt2), { recursive: true })
    try {
      await symlink(path.join(aussen, 'geheim.html'), path.join(ablage, ID.projekt2, 'link.html'))
    } catch {
      // Windows ohne Symlink-Recht: Fall lässt sich hier nicht nachstellen.
      await rm(aussen, { recursive: true, force: true })
      ctx.skip()
    }
    expect(await entwurfLesen(`${ID.projekt2}/link.html`)).toBeNull()
    await rm(aussen, { recursive: true, force: true })
  })
})

describe('Dateiprüfung', () => {
  it('HTML bis 10 MB erlaubt', () => {
    expect(pruefeEntwurfDatei({ name: 'a.html', type: 'text/html', size: MAX_ENTWURF_BYTES }).ok).toBe(true)
  })
  it('größer als 10 MB abgelehnt', () => {
    expect(pruefeEntwurfDatei({ name: 'a.html', type: 'text/html', size: MAX_ENTWURF_BYTES + 1 }).ok).toBe(false)
  })
  it('leere Datei abgelehnt', () => {
    expect(pruefeEntwurfDatei({ name: 'a.html', type: 'text/html', size: 0 }).ok).toBe(false)
  })
  it.each([
    ['a.js', 'text/javascript'],
    ['a.html', 'image/svg+xml'],
    ['a.svg', 'text/html'],
  ])('%s (%s) abgelehnt', (name, type) => {
    expect(pruefeEntwurfDatei({ name, type, size: 10 }).ok).toBe(false)
  })
})

describe('Upload (Regel 11) und Auslieferung (Regel 10)', () => {
  it('Admin lädt hoch: Datei unter neuem Namen abgelegt, Variante eingetragen, Kunde kann sie lesen', async () => {
    const ergebnis = await entwurfHochladen(viewer.admin, {
      projectId: ID.projekt1,
      title: 'Variante neu',
      datei: htmlDatei('<h1>Neu</h1>', '../../böse name.html'),
    })
    expect(ergebnis.status).toBe('ok')
    if (ergebnis.status !== 'ok') return
    expect(ergebnis.storagePath).toMatch(new RegExp(`^${ID.projekt1}/[0-9a-f-]{36}\\.html$`))

    const pfad = await ladeEntwurfPfad(viewer.kundeA, 'projekt-1', ergebnis.variantId)
    expect(pfad).toBe(ergebnis.storagePath)
    expect(await lesen(await entwurfLesen(pfad!))).toBe('<h1>Neu</h1>')
  })
  it('fremder Kunde bekommt den hochgeladenen Entwurf nicht', async () => {
    const ergebnis = await entwurfHochladen(viewer.admin, { projectId: ID.projekt1, title: 'X', datei: htmlDatei() })
    if (ergebnis.status !== 'ok') throw new Error('Upload fehlgeschlagen')
    expect(await ladeEntwurfPfad(viewer.kundeB, 'projekt-1', ergebnis.variantId)).toBeNull()
  })
  it('Kunde darf nicht hochladen', async () => {
    expect((await entwurfHochladen(viewer.kundeA, { projectId: ID.projekt1, title: 'X', datei: htmlDatei() })).status).toBe(
      'kein-zugriff'
    )
  })
  it('ohne Login nicht', async () => {
    expect((await entwurfHochladen(null, { projectId: ID.projekt1, title: 'X', datei: htmlDatei() })).status).toBe(
      'kein-zugriff'
    )
  })
  it('keine Datei bleibt liegen, wenn der Eintrag scheitert (unbekanntes Projekt)', async () => {
    const unbekannt = '00000000-0000-4000-8000-0000000000ff'
    const ergebnis = await entwurfHochladen(viewer.admin, { projectId: unbekannt, title: 'X', datei: htmlDatei() })
    expect(ergebnis.status).toBe('fehler')
    expect(await readdir(path.join(ablage, unbekannt))).toEqual([])
  })
  it('Nicht-HTML wird abgelehnt und nichts gespeichert', async () => {
    const vorher = await db.select().from(portalDesignVariants).where(eq(portalDesignVariants.projectId, ID.projekt1))
    const ergebnis = await entwurfHochladen(viewer.admin, {
      projectId: ID.projekt1,
      title: 'X',
      datei: htmlDatei('alert(1)', 'a.js', 'text/javascript'),
    })
    expect(ergebnis.status).toBe('ungueltig')
    const nachher = await db.select().from(portalDesignVariants).where(eq(portalDesignVariants.projectId, ID.projekt1))
    expect(nachher).toHaveLength(vorher.length)
  })
})
