// Prüft, ob Datenbank und Entwurfsdateien zusammenpassen – nach einer
// Wiederherstellung oder einem Umzug.
//
//   node tools/pruefen.mjs        (im Container; DATABASE_URL, PORTAL_STORAGE_PATH)
//
// Meldet Varianten ohne Datei (Entwurf für Kunden nicht abrufbar) und Dateien
// ohne Variante (verwaist, z. B. aus einem neueren Datei-Backup). Ändert nichts.
// Exit-Code 0 = alles passt, 2 = Abweichungen.
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import postgres from 'postgres'

async function dateienUnter(basis: string): Promise<string[]> {
  const eintraege = await readdir(basis, { recursive: true, withFileTypes: true })
  return eintraege
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => path.relative(basis, path.join(e.parentPath, e.name)).split(path.sep).join('/'))
}

async function main() {
  const url = process.env.DATABASE_URL
  const ablage = process.env.PORTAL_STORAGE_PATH
  if (!url || !ablage) throw new Error('DATABASE_URL und PORTAL_STORAGE_PATH müssen gesetzt sein')

  const sql = postgres(url, { max: 1, onnotice: () => {} })
  try {
    const zeilen = await sql<{ storage_path: string }[]>`select storage_path from portal_design_variants order by storage_path`
    const inDb = new Set(zeilen.map((z) => z.storage_path))
    const aufPlatte = new Set(await dateienUnter(path.resolve(ablage)))

    const ohneDatei = [...inDb].filter((p) => !aufPlatte.has(p))
    const verwaist = [...aufPlatte].filter((p) => !inDb.has(p))

    console.log(`Varianten in der Datenbank: ${inDb.size}, Dateien in der Ablage: ${aufPlatte.size}`)
    if (ohneDatei.length) console.log(`\nVarianten ohne Datei:\n  ${ohneDatei.join('\n  ')}`)
    if (verwaist.length) console.log(`\nDateien ohne Variante:\n  ${verwaist.join('\n  ')}`)
    if (!ohneDatei.length && !verwaist.length) console.log('Datenbank und Dateien passen zusammen.')
    else process.exitCode = 2
  } finally {
    await sql.end()
  }
}

main().catch((error) => {
  console.error('Prüfung abgebrochen:', error instanceof Error ? error.message : error)
  process.exit(1)
})
