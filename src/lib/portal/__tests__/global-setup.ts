import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

// Spielt vor den Tests alle Migrationen in die Testdatenbank ein.
export default async function setup() {
  const url = process.env.DATABASE_URL
  // Schutz: Die Tests leeren Tabellen – nur eine Datenbank mit "_test" im Namen.
  if (!url || !new URL(url).pathname.endsWith('_test')) {
    throw new Error(`Tests nur gegen eine Testdatenbank (Name endet auf _test), nicht: ${url ? new URL(url).pathname : 'nicht gesetzt'}`)
  }
  const client = postgres(url, { max: 1, onnotice: () => {} })
  try {
    await migrate(drizzle(client), { migrationsFolder: './drizzle' })
  } finally {
    await client.end()
  }
}
