// Legt einen Admin für das Kundenportal an (oder macht einen vorhandenen
// Nutzer zum Admin). Admins werden nur über dieses Skript vergeben.
//
//   npm run admin:anlegen -- name@example.com "Vorname Nachname"
//
// Danach meldet sich der Admin unter /login mit dieser Adresse per Magic Link an.
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { authUser, portalAdmins } from '../src/lib/db/schema'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function main() {
  const email = (process.argv[2] ?? '').trim().toLowerCase()
  const name = (process.argv[3] ?? '').trim()
  if (!EMAIL_RE.test(email)) {
    console.error('Aufruf: npm run admin:anlegen -- <email> ["Name"]')
    process.exit(1)
  }
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL ist nicht gesetzt')

  const client = postgres(process.env.DATABASE_URL, { max: 1 })
  const db = drizzle(client)
  try {
    await db.transaction(async (tx) => {
      const [vorhanden] = await tx.select({ id: authUser.id }).from(authUser).where(eq(authUser.email, email))
      const userId =
        vorhanden?.id ??
        (await tx.insert(authUser).values({ email, name }).returning({ id: authUser.id }))[0].id
      await tx.insert(portalAdmins).values({ userId }).onConflictDoNothing()
      console.log(`${email} ist Admin (${vorhanden ? 'vorhandener' : 'neuer'} Nutzer).`)
    })
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
