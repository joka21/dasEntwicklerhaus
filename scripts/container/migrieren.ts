// Spielt alle Migrationen aus ./drizzle in die Datenbank (DATABASE_URL) ein.
// Bereits eingespielte überspringt Drizzle (Tabelle drizzle.__drizzle_migrations).
// Im Container: läuft beim Start automatisch (scripts/container/start.sh) oder per
//   node tools/migrieren.mjs
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL ist nicht gesetzt')
  const ordner = process.env.MIGRATIONEN_ORDNER ?? './drizzle'
  const client = postgres(url, { max: 1, onnotice: () => {} })
  try {
    await migrate(drizzle(client), { migrationsFolder: ordner })
    const [{ anzahl }] = await client`select count(*)::int as anzahl from drizzle.__drizzle_migrations`
    console.log(`Migrationen aktuell (${anzahl} eingespielt).`)
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error('Migration fehlgeschlagen:', error instanceof Error ? error.message : error)
  process.exit(1)
})
