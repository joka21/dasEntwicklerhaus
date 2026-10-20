import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { magicLink } from 'better-auth/plugins/magic-link'
import { and, eq, gt, like, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { authAccount, authSession, authUser, authVerification } from '@/lib/db/schema'
import { escapeHtml, sendPortalMail } from '@/lib/mail'

/** Gültigkeit des Anmeldelinks; der Mailtext nennt „eine Stunde“ */
const LINK_GUELTIG_SEKUNDEN = 60 * 60

/** Höchstens so viele Anmeldelinks pro Adresse im Zeitfenster */
const LINKS_PRO_FENSTER = 3
const LINK_FENSTER_MINUTEN = 15

// Es gibt keinen öffentlichen Better-Auth-Handler (/api/auth/*): Anmelden,
// Einlösen und Abmelden laufen ausschließlich über Server Actions, die
// auth.api direkt aufrufen. Dadurch gibt es auch keinen GET-Endpunkt, der den
// Einmal-Token beim bloßen Aufruf des Links verbrauchen würde.
export const auth = betterAuth({
  // BETTER_AUTH_SECRET und BETTER_AUTH_URL liest Better Auth aus der Umgebung.
  appName: 'Das Entwicklerhaus – Kundenportal',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: authUser,
      session: authSession,
      account: authAccount,
      verification: authVerification,
    },
  }),
  session: {
    // 30 Tage; bei Nutzung verlängert sich die Sitzung (höchstens einmal täglich)
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    // UUIDs aus der Datenbank, passend zu den übernommenen Supabase-IDs
    database: { generateId: 'uuid' },
  },
  plugins: [
    magicLink({
      expiresIn: LINK_GUELTIG_SEKUNDEN,
      // Nur eingeladene Kunden: Unbekannte Adressen erhalten keine Sitzung.
      disableSignUp: true,
      // In der Datenbank steht nur der Hash des Tokens.
      storeToken: 'hashed',
      sendMagicLink: async ({ email, url, token }) => {
        await sendeAnmeldelink(email, bestaetigungsUrl(url, token))
      },
    }),
    // Muss das letzte Plugin sein: setzt die Cookies in Server Actions.
    nextCookies(),
  ],
})

// Der Link führt auf die eigene Bestätigungsseite statt auf den GET-Endpunkt
// von Better Auth. Eingelöst wird erst per Button (Schutz vor Link-Scannern).
function bestaetigungsUrl(betterAuthUrl: string, token: string): string {
  const ziel = new URL('/login/bestaetigen', new URL(betterAuthUrl).origin)
  ziel.searchParams.set('token', token)
  return ziel.toString()
}

async function sendeAnmeldelink(email: string, link: string): Promise<void> {
  const gesendet = await sendPortalMail({
    to: email,
    subject: 'Ihr Anmeldelink für das Kundenportal',
    html: `
      <h2>Ihr Anmeldelink für das Kundenportal</h2>
      <p>Guten Tag,</p>
      <p>mit diesem Link melden Sie sich im Kundenportal von Das Entwicklerhaus an:</p>
      <p><a href="${escapeHtml(link)}">Jetzt anmelden</a></p>
      <p>Der Link ist eine Stunde gültig und kann nur einmal verwendet werden.</p>
      <p>Falls Sie keinen Link angefordert haben, können Sie diese E-Mail ignorieren.</p>
      <p>Viele Grüße<br>Das Entwicklerhaus</p>
    `,
    text: `Guten Tag,

mit diesem Link melden Sie sich im Kundenportal von Das Entwicklerhaus an:
${link}

Der Link ist eine Stunde gültig und kann nur einmal verwendet werden.
Falls Sie keinen Link angefordert haben, können Sie diese E-Mail ignorieren.

Viele Grüße
Das Entwicklerhaus`,
  })
  if (!gesendet) console.error('Anmeldelink nicht versendet')
}

/**
 * Darf an diese Adresse ein Anmeldelink gehen? Nur an angelegte Nutzer und
 * höchstens LINKS_PRO_FENSTER Links pro Zeitfenster. Server Actions rufen
 * auth.api direkt auf und laufen damit am Rate-Limit von Better Auth vorbei –
 * deshalb diese eigene Grenze.
 */
export async function darfAnmeldelinkErhalten(email: string): Promise<boolean> {
  const [nutzer] = await db.select({ id: authUser.id }).from(authUser).where(eq(authUser.email, email)).limit(1)
  if (!nutzer) return false

  const seit = new Date(Date.now() - LINK_FENSTER_MINUTEN * 60 * 1000)
  const [{ anzahl }] = await db
    .select({ anzahl: sql<number>`count(*)::int` })
    .from(authVerification)
    .where(
      and(
        like(authVerification.identifier, 'magic-link:%'),
        sql`(${authVerification.value})::jsonb ->> 'email' = ${email}`,
        gt(authVerification.createdAt, seit)
      )
    )
  return anzahl < LINKS_PRO_FENSTER
}

export type Sitzung = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>

/** Sitzung des aktuellen Requests (Server Components, Actions, Route Handler) */
export async function aktuelleSitzung(): Promise<Sitzung | null> {
  return auth.api.getSession({ headers: await headers() })
}
