import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Eine Verbindung pro Prozess. Im Dev-Server lädt Next Module bei jeder
// Änderung neu; ohne Zwischenspeicher am globalThis entstünden dabei immer
// neue Verbindungspools.
const globalFuerDb = globalThis as unknown as { pgClient?: ReturnType<typeof postgres> }

function verbinden() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL ist nicht gesetzt')
  return postgres(url, { max: 10 })
}

const client = globalFuerDb.pgClient ?? verbinden()
if (process.env.NODE_ENV !== 'production') globalFuerDb.pgClient = client

export const db = drizzle(client, { schema })
export type Db = typeof db
