// Import eines Supabase-Exports in die neue Datenbank.
//
//   npm run migration:import -- <exportordner>                prüft nur (Export lesbar, Ziel leer)
//   npm run migration:import -- <exportordner> --ausfuehren   importiert
//
// Ziel sind DATABASE_URL und PORTAL_STORAGE_PATH aus der Umgebung (.env.local).
// Zuerst immer lokal als Probelauf, siehe DEPLOY.md. Am Ende steht der Abgleich
// der Zeilen je Tabelle: Supabase (laut Export) gegen neue Datenbank.
import postgres from 'postgres'
import { abgleich, exportLesen, importieren, pruefeZielLeer } from './import-lib'

async function main() {
  const exportDir = process.argv.slice(2).find((a) => !a.startsWith('--'))
  const ausfuehren = process.argv.includes('--ausfuehren')
  if (!exportDir) throw new Error('Aufruf: npm run migration:import -- <exportordner> [--ausfuehren]')
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL ist nicht gesetzt')
  if (!process.env.PORTAL_STORAGE_PATH) throw new Error('PORTAL_STORAGE_PATH ist nicht gesetzt')

  const ziel = new URL(process.env.DATABASE_URL)
  console.log('Import in die neue Datenbank')
  console.log(`  Export:  ${exportDir}`)
  console.log(`  Ziel:    ${ziel.hostname}:${ziel.port || 5432}${ziel.pathname}`)
  console.log(`  Dateien: ${process.env.PORTAL_STORAGE_PATH}`)

  const daten = await exportLesen(exportDir)
  console.log(`  Export vom ${daten.manifest.exportiertAm} aus ${daten.manifest.quelle}`)

  const sql = postgres(process.env.DATABASE_URL, { max: 1, onnotice: () => {} })
  try {
    await pruefeZielLeer(sql)
    if (!ausfuehren) {
      console.log('\nExport lesbar, Ziel leer. Nichts importiert. Zum Import: --ausfuehren anhängen.')
      return
    }

    const bericht = await importieren(sql, exportDir)

    console.log('\nAbgleich Supabase → neu:')
    console.log(`  ${'Tabelle'.padEnd(44)} ${'Supabase'.padStart(8)} ${'neu'.padStart(8)}`)
    const zeilen = abgleich(daten.manifest, bericht)
    for (const z of zeilen) {
      console.log(`  ${z.tabelle.padEnd(44)} ${String(z.supabase).padStart(8)} ${String(z.neu).padStart(8)}  ${z.ok ? 'OK' : 'ABWEICHUNG'}`)
    }
    if (bericht.umbenannt.length) {
      console.log('\nUmbenannte Dateien (Name passte nicht zur neuen Pfadregel):')
      for (const u of bericht.umbenannt) console.log(`  ${u.alt} → ${u.neu}`)
    }
    if (bericht.fehlendeDateien.length) {
      console.log('\nVarianten ohne Datei im Export (Eintrag übernommen, Entwurf nicht abrufbar):')
      for (const f of bericht.fehlendeDateien) console.log(`  ${f}`)
    }
    if (bericht.verwaisteDateien.length) {
      console.log('\nDateien im Bucket ohne Variante (nicht übernommen, liegen nur im Export):')
      for (const f of bericht.verwaisteDateien) console.log(`  ${f}`)
    }
    if (zeilen.some((z) => !z.ok)) process.exitCode = 2
  } finally {
    await sql.end()
  }
}

main().catch((error) => {
  console.error('Import abgebrochen:', error instanceof Error ? error.message : error)
  process.exit(1)
})
