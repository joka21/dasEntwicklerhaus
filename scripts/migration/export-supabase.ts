// Export aus Supabase – NUR LESEND.
//
//   npm run migration:export                    zeigt nur, was passieren würde (keine Verbindung)
//   npm run migration:export -- --ausfuehren    exportiert nach .supabase-export/<zeitpunkt>/
//   npm run migration:export -- --ausfuehren --ziel D:\sicher\export
//
// Liest aus Supabase:
//   - die Tabellen portal_* und die zugehörigen Benutzer aus auth.users
//     (nur id, email, Name, Bestätigungs- und Anlagedatum)
//   - die Dateien aus dem Bucket design-proposals
//   - die Alt-Tabellen projects, blog_posts, contact_submissions (nur Sicherung)
//
// Nur lesend, dreifach abgesichert:
//   1. Die Sitzung wird schreibgeschützt gesetzt (Startparameter und SET SESSION
//      CHARACTERISTICS – der Supabase-Pooler ignoriert Startparameter).
//   2. Alle Abfragen laufen in EINER Transaktion "read only" (gleicher Stand für
//      alle Tabellen); vor der ersten Datenabfrage wird geprüft, dass sie schreibgeschützt ist.
//   3. Dateien werden ausschließlich per HTTP GET geholt.
//
// Benötigt (in .env.local, nie einchecken):
//   SUPABASE_DB_URL            Verbindungs-URL der Datenbank (Dashboard → Connect →
//                              "Session pooler" oder "Direct connection"; nicht der
//                              Transaction-Pooler auf Port 6543)
//   NEXT_PUBLIC_SUPABASE_URL   Projekt-URL (für den Datei-Download)
//   SUPABASE_SERVICE_ROLE_KEY  nur für GET auf die privaten Dateien
//
// Der Exportordner enthält echte Kundendaten. Er steht in .gitignore und liegt
// außerhalb von public/. Nach dem erfolgreichen Umzug löschen (siehe DEPLOY.md).
import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import postgres from 'postgres'
import { ALT_TABELLEN, BENUTZER_TABELLE, BUCKET, PORTAL_TABELLEN, type Manifest, type ManifestDatei } from './format'

const STANDARD_ZIEL = '.supabase-export'

function argument(name: string): string | undefined {
  const i = process.argv.indexOf(name)
  return i >= 0 ? process.argv[i + 1] : undefined
}

function pflicht(name: string): string {
  const wert = process.env[name]
  if (!wert) throw new Error(`${name} ist nicht gesetzt (in .env.local eintragen)`)
  return wert
}

function zeitstempel(): string {
  return new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15)
}

/** Dateipfad im Exportordner; nichts darf aus dem Ordner herausführen */
function sichererPfad(basis: string, name: string): string {
  const ziel = path.resolve(basis, name)
  if (!ziel.startsWith(path.resolve(basis) + path.sep) || name.includes('..')) {
    throw new Error(`Unzulässiger Dateiname im Bucket: ${name}`)
  }
  return ziel
}

async function json(datei: string, daten: unknown) {
  await mkdir(path.dirname(datei), { recursive: true })
  await writeFile(datei, JSON.stringify(daten, null, 2) + '\n', { flag: 'wx' })
}

async function main() {
  const ausfuehren = process.argv.includes('--ausfuehren')
  const zielBasis = path.resolve(argument('--ziel') ?? STANDARD_ZIEL)
  const ziel = path.join(zielBasis, zeitstempel())

  console.log('Export aus Supabase (nur lesend)')
  console.log(`  Ziel:      ${ziel}`)
  console.log(`  Tabellen:  ${PORTAL_TABELLEN.join(', ')}, zugehörige Benutzer aus auth.users`)
  console.log(`  Sicherung: ${ALT_TABELLEN.join(', ')}`)
  console.log(`  Dateien:   Bucket ${BUCKET}`)
  if (!ausfuehren) {
    console.log('\nNichts ausgeführt. Zum Exportieren: npm run migration:export -- --ausfuehren')
    return
  }

  const supabaseUrl = pflicht('NEXT_PUBLIC_SUPABASE_URL').replace(/\/$/, '')
  const serviceKey = pflicht('SUPABASE_SERVICE_ROLE_KEY')
  const dbUrl = pflicht('SUPABASE_DB_URL')
  // SSL immer, außer bei der lokal nachgestellten Quelle (scripts/migration/probelauf)
  const lokal = ['localhost', '127.0.0.1'].includes(new URL(dbUrl).hostname)
  const sql = postgres(dbUrl, {
    max: 1,
    ssl: lokal ? false : 'require',
    prepare: false,
    connection: { default_transaction_read_only: true, application_name: 'entwicklerhaus-export' },
    onnotice: () => {},
  })

  try {
    // Der Session-Pooler von Supabase reicht Startparameter wie
    // default_transaction_read_only nicht durch – deshalb zusätzlich per SET.
    await sql`set session characteristics as transaction read only`

    const { manifest, objekte } = await sql.begin('isolation level repeatable read read only', async (tx) => {
      // Maßgeblich: Diese Transaktion ist schreibgeschützt – geprüft vor der ersten Datenabfrage.
      const [{ transaction_read_only: nurLesen }] = await tx`show transaction_read_only`
      if (nurLesen !== 'on') throw new Error('Transaktion ist nicht schreibgeschützt – Abbruch.')

      const zaehlung: Record<string, number> = {}

      for (const tabelle of PORTAL_TABELLEN) {
        const [{ zeilen }] = await tx`
          select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) as zeilen from ${tx('public')}.${tx(tabelle)} t`
        await json(path.join(ziel, 'tabellen', `${tabelle}.json`), zeilen)
        zaehlung[tabelle] = zeilen.length
      }

      // Nur Benutzer, die im Portal vorkommen; nur die nötigen Felder.
      const [{ zeilen: benutzer }] = await tx`
        select coalesce(jsonb_agg(jsonb_build_object(
          'id', u.id, 'email', u.email, 'name', u.raw_user_meta_data ->> 'name',
          'email_confirmed_at', u.email_confirmed_at, 'created_at', u.created_at, 'updated_at', u.updated_at
        )), '[]'::jsonb) as zeilen
        from auth.users u
        where u.id in (
          select user_id from public.portal_admins
          union select user_id from public.portal_client_members
          union select author_id from public.portal_variant_comments where author_id is not null
          union select approved_by from public.portal_project_approvals where approved_by is not null
        )`
      await json(path.join(ziel, 'tabellen', `${BENUTZER_TABELLE}.json`), benutzer)
      zaehlung[BENUTZER_TABELLE] = benutzer.length

      const fehlendeAltTabellen: string[] = []
      for (const tabelle of ALT_TABELLEN) {
        const [{ vorhanden }] = await tx`select to_regclass(${'public.' + tabelle}) is not null as vorhanden`
        if (!vorhanden) {
          fehlendeAltTabellen.push(tabelle)
          continue
        }
        const [{ zeilen }] = await tx`
          select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) as zeilen from ${tx('public')}.${tx(tabelle)} t`
        const spalten = await tx`
          select column_name, data_type, is_nullable, column_default
          from information_schema.columns
          where table_schema = 'public' and table_name = ${tabelle}
          order by ordinal_position`
        await json(path.join(ziel, 'alt', `${tabelle}.json`), zeilen)
        await json(path.join(ziel, 'alt', `${tabelle}.spalten.json`), spalten)
        zaehlung[`alt.${tabelle}`] = zeilen.length
      }

      const objekte = await tx<{ name: string }[]>`
        select name from storage.objects where bucket_id = ${BUCKET} order by name`

      const manifest: Manifest = {
        version: 1,
        exportiertAm: new Date().toISOString(),
        quelle: new URL(supabaseUrl).host,
        zaehlung,
        fehlendeAltTabellen,
        dateien: [],
      }
      return { manifest, objekte }
    })

    // Dateien: nur GET
    const dateiOrdner = path.join(ziel, 'dateien')
    for (const { name } of objekte) {
      const pfad = name.split('/').map(encodeURIComponent).join('/')
      const antwort = await fetch(`${supabaseUrl}/storage/v1/object/authenticated/${BUCKET}/${pfad}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey },
      })
      if (!antwort.ok) throw new Error(`Datei ${name} nicht geladen: HTTP ${antwort.status}`)
      const inhalt = Buffer.from(await antwort.arrayBuffer())
      const datei = sichererPfad(dateiOrdner, name)
      await mkdir(path.dirname(datei), { recursive: true })
      await writeFile(datei, inhalt, { flag: 'wx' })
      const eintrag: ManifestDatei = { name, bytes: inhalt.length, sha256: createHash('sha256').update(inhalt).digest('hex') }
      manifest.dateien.push(eintrag)
    }
    manifest.zaehlung[`dateien.${BUCKET}`] = manifest.dateien.length

    await json(path.join(ziel, 'manifest.json'), manifest)

    console.log('\nExport fertig:')
    for (const [name, anzahl] of Object.entries(manifest.zaehlung)) console.log(`  ${name.padEnd(36)} ${anzahl}`)
    if (manifest.fehlendeAltTabellen.length) console.log(`  Nicht vorhanden: ${manifest.fehlendeAltTabellen.join(', ')}`)
    console.log(`\nOrdner: ${ziel}`)
    console.log('Enthält echte Kundendaten – nach dem Umzug löschen (DEPLOY.md).')
  } finally {
    await sql.end()
  }
}

main().catch((error) => {
  console.error('Export abgebrochen:', error instanceof Error ? error.message : error)
  process.exit(1)
})
