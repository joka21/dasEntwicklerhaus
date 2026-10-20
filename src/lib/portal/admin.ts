import { and, asc, count, desc, eq, max } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { db } from '@/lib/db'
import {
  authSession,
  authUser,
  portalAdmins,
  portalClientMembers,
  portalClients,
  portalDesignVariants,
  portalProjectApprovals,
  portalProjects,
  portalVariantComments,
} from '@/lib/db/schema'
import { mussAdminSein, type Viewer } from './authz'
import { pgFehlercode } from './pg-fehler'
import { entwurfLoeschen, entwurfSpeichern, pruefeEntwurfDatei } from './speicher'

// Datenzugriffe des Admin-Bereichs (ersetzt das Supabase-Dashboard).
// Jede Funktion prüft zuerst Regel 11 (mussAdminSein).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/

export type AdminErgebnis<T = object> =
  | ({ status: 'ok' } & T)
  | { status: 'kein-zugriff' }
  | { status: 'ungueltig'; meldung: string }
  | { status: 'fehler' }

const KEIN_ZUGRIFF = { status: 'kein-zugriff' } as const

// ---------------------------------------------------------------------------
// Übersicht
// ---------------------------------------------------------------------------

export interface AdminProjekt {
  id: string
  clientId: string
  slug: string
  title: string
  varianten: { id: string; title: string; freigegeben: boolean }[]
  kommentare: number
  letzterKommentar: Date | null
  freigabe: { variantTitle: string; approvedAt: Date; approvedBy: string | null } | null
}

export interface AdminKunde {
  id: string
  name: string
  mitglieder: { userId: string; email: string; name: string; angemeldet: boolean }[]
  projekte: AdminProjekt[]
}

export interface AdminKommentar {
  id: string
  projektSlug: string
  projektTitle: string
  variantTitle: string
  body: string
  createdAt: Date
  autor: string | null
  vonAdmin: boolean
}

export interface AdminUebersicht {
  kunden: AdminKunde[]
  neuesteKommentare: AdminKommentar[]
}

export async function ladeAdminUebersicht(viewer: Viewer | null): Promise<AdminUebersicht | null> {
  if (!mussAdminSein(viewer)) return null

  const freigeber = alias(authUser, 'freigeber')

  const [kunden, mitglieder, projekte, variantenJeProjekt, kommentareJeProjekt, freigaben, neuesteKommentare] =
    await Promise.all([
      db.select({ id: portalClients.id, name: portalClients.name }).from(portalClients).orderBy(asc(portalClients.name)),
      db
        .select({
          clientId: portalClientMembers.clientId,
          userId: authUser.id,
          email: authUser.email,
          name: authUser.name,
          angemeldet: authUser.emailVerified,
        })
        .from(portalClientMembers)
        .innerJoin(authUser, eq(authUser.id, portalClientMembers.userId))
        .orderBy(asc(authUser.email)),
      db
        .select({ id: portalProjects.id, clientId: portalProjects.clientId, slug: portalProjects.slug, title: portalProjects.title })
        .from(portalProjects)
        .orderBy(desc(portalProjects.createdAt)),
      db
        .select({ id: portalDesignVariants.id, projectId: portalDesignVariants.projectId, title: portalDesignVariants.title })
        .from(portalDesignVariants)
        .orderBy(asc(portalDesignVariants.sortOrder), asc(portalDesignVariants.createdAt)),
      db
        .select({ projectId: portalDesignVariants.projectId, anzahl: count(), letzter: max(portalVariantComments.createdAt) })
        .from(portalVariantComments)
        .innerJoin(portalDesignVariants, eq(portalDesignVariants.id, portalVariantComments.variantId))
        .groupBy(portalDesignVariants.projectId),
      db
        .select({
          projectId: portalProjectApprovals.projectId,
          variantId: portalProjectApprovals.variantId,
          variantTitle: portalDesignVariants.title,
          approvedAt: portalProjectApprovals.approvedAt,
          approvedBy: freigeber.email,
        })
        .from(portalProjectApprovals)
        .innerJoin(portalDesignVariants, eq(portalDesignVariants.id, portalProjectApprovals.variantId))
        .leftJoin(freigeber, eq(freigeber.id, portalProjectApprovals.approvedBy)),
      db
        .select({
          id: portalVariantComments.id,
          projektSlug: portalProjects.slug,
          projektTitle: portalProjects.title,
          variantTitle: portalDesignVariants.title,
          body: portalVariantComments.body,
          createdAt: portalVariantComments.createdAt,
          autor: authUser.email,
          vonAdmin: portalVariantComments.isAdmin,
        })
        .from(portalVariantComments)
        .innerJoin(portalDesignVariants, eq(portalDesignVariants.id, portalVariantComments.variantId))
        .innerJoin(portalProjects, eq(portalProjects.id, portalDesignVariants.projectId))
        .leftJoin(authUser, eq(authUser.id, portalVariantComments.authorId))
        .orderBy(desc(portalVariantComments.createdAt))
        .limit(20),
    ])

  const kommentarZahl = new Map(kommentareJeProjekt.map((k) => [k.projectId, k]))
  const freigabe = new Map(freigaben.map((f) => [f.projectId, f]))

  return {
    kunden: kunden.map((k) => ({
      ...k,
      mitglieder: mitglieder.filter((m) => m.clientId === k.id).map(({ clientId: _, ...m }) => m),
      projekte: projekte
        .filter((p) => p.clientId === k.id)
        .map((p) => {
          const f = freigabe.get(p.id)
          return {
            ...p,
            varianten: variantenJeProjekt
              .filter((v) => v.projectId === p.id)
              .map((v) => ({ id: v.id, title: v.title, freigegeben: f?.variantId === v.id })),
            kommentare: kommentarZahl.get(p.id)?.anzahl ?? 0,
            letzterKommentar: kommentarZahl.get(p.id)?.letzter ?? null,
            freigabe: f ? { variantTitle: f.variantTitle, approvedAt: f.approvedAt, approvedBy: f.approvedBy } : null,
          }
        }),
    })),
    neuesteKommentare,
  }
}

// ---------------------------------------------------------------------------
// Anlegen
// ---------------------------------------------------------------------------

export async function kundeAnlegen(viewer: Viewer | null, eingabe: { name: string }): Promise<AdminErgebnis<{ id: string }>> {
  if (!mussAdminSein(viewer)) return KEIN_ZUGRIFF
  const name = eingabe.name.trim()
  if (name.length < 1 || name.length > 200) return { status: 'ungueltig', meldung: 'Bitte einen Namen (1–200 Zeichen) angeben.' }
  const [zeile] = await db.insert(portalClients).values({ name }).returning({ id: portalClients.id })
  return { status: 'ok', id: zeile.id }
}

/**
 * Ordnet eine Person einem Kunden zu und legt sie als Nutzer an, falls es die
 * Adresse noch nicht gibt. Die Einladungsmail verschickt die Action danach.
 */
export async function personZuordnen(
  viewer: Viewer | null,
  eingabe: { clientId: string; email: string; name?: string }
): Promise<AdminErgebnis<{ userId: string; email: string; neu: boolean }>> {
  if (!mussAdminSein(viewer)) return KEIN_ZUGRIFF
  const email = eingabe.email.trim().toLowerCase()
  const name = (eingabe.name ?? '').trim().slice(0, 200)
  if (email.length > 254 || !EMAIL_RE.test(email)) return { status: 'ungueltig', meldung: 'Bitte eine gültige E-Mail-Adresse angeben.' }

  try {
    return await db.transaction(async (tx) => {
      const [kunde] = await tx.select({ id: portalClients.id }).from(portalClients).where(eq(portalClients.id, eingabe.clientId))
      if (!kunde) return { status: 'ungueltig', meldung: 'Diesen Kunden gibt es nicht.' } as const

      const [vorhanden] = await tx.select({ id: authUser.id }).from(authUser).where(eq(authUser.email, email))
      const userId = vorhanden?.id ?? (await tx.insert(authUser).values({ email, name }).returning({ id: authUser.id }))[0].id
      await tx.insert(portalClientMembers).values({ clientId: kunde.id, userId }).onConflictDoNothing()
      return { status: 'ok', userId, email, neu: !vorhanden } as const
    })
  } catch (error) {
    console.error('Person nicht zugeordnet:', error)
    return { status: 'fehler' }
  }
}

export async function projektAnlegen(
  viewer: Viewer | null,
  eingabe: { clientId: string; slug: string; title: string; description?: string | null }
): Promise<AdminErgebnis<{ id: string; slug: string }>> {
  if (!mussAdminSein(viewer)) return KEIN_ZUGRIFF
  const slug = eingabe.slug.trim().toLowerCase()
  const title = eingabe.title.trim()
  if (!SLUG_RE.test(slug) || slug.length > 100) {
    return { status: 'ungueltig', meldung: 'Kurzname nur aus a–z, 0–9 und Bindestrichen, z. B. „baeckerei-meier“.' }
  }
  if (title.length < 1 || title.length > 200) return { status: 'ungueltig', meldung: 'Bitte einen Titel (1–200 Zeichen) angeben.' }

  try {
    const [zeile] = await db
      .insert(portalProjects)
      .values({ clientId: eingabe.clientId, slug, title, description: eingabe.description?.trim() || null })
      .returning({ id: portalProjects.id })
    return { status: 'ok', id: zeile.id, slug }
  } catch (error) {
    const code = pgFehlercode(error)
    if (code === '23505') return { status: 'ungueltig', meldung: 'Diesen Kurznamen gibt es schon.' }
    if (code === '23503') return { status: 'ungueltig', meldung: 'Diesen Kunden gibt es nicht.' }
    console.error('Projekt nicht angelegt:', code ?? error)
    return { status: 'fehler' }
  }
}

/**
 * Entwurf hochladen und als Variante eines Projekts eintragen.
 * Schlägt der Eintrag fehl (z. B. unbekanntes Projekt), wird die Datei wieder entfernt.
 */
export async function entwurfHochladen(
  viewer: Viewer | null,
  eingabe: { projectId: string; title: string; description?: string | null; sortOrder?: number; datei: File }
): Promise<AdminErgebnis<{ variantId: string; storagePath: string }>> {
  if (!mussAdminSein(viewer)) return KEIN_ZUGRIFF

  const title = eingabe.title.trim()
  if (title.length < 1 || title.length > 200) return { status: 'ungueltig', meldung: 'Bitte einen Titel (1–200 Zeichen) angeben.' }
  const pruefung = pruefeEntwurfDatei(eingabe.datei)
  if (!pruefung.ok) return { status: 'ungueltig', meldung: pruefung.meldung }

  let storagePath: string
  try {
    storagePath = await entwurfSpeichern(eingabe.projectId, new Uint8Array(await eingabe.datei.arrayBuffer()))
  } catch (error) {
    console.error('Entwurf nicht gespeichert:', error)
    return { status: 'fehler' }
  }

  try {
    const [zeile] = await db
      .insert(portalDesignVariants)
      .values({
        projectId: eingabe.projectId,
        title,
        description: eingabe.description?.trim() || null,
        storagePath,
        sortOrder: eingabe.sortOrder ?? 0,
      })
      .returning({ id: portalDesignVariants.id })
    return { status: 'ok', variantId: zeile.id, storagePath }
  } catch (error) {
    await entwurfLoeschen(storagePath)
    console.error('Variante nicht eingetragen:', pgFehlercode(error) ?? error)
    return { status: 'fehler' }
  }
}

// ---------------------------------------------------------------------------
// Benachrichtigen, Entfernen, Zurücksetzen, Löschen
// ---------------------------------------------------------------------------

/**
 * Adressen aller Personen des Kunden, dem das Projekt gehört – Empfänger der
 * Hinweis-Mail, wenn ein Admin antwortet.
 */
export async function empfaengerFuerAntwort(viewer: Viewer | null, projectId: string): Promise<string[]> {
  if (!mussAdminSein(viewer)) return []
  const zeilen = await db
    .select({ email: authUser.email })
    .from(portalProjects)
    .innerJoin(portalClientMembers, eq(portalClientMembers.clientId, portalProjects.clientId))
    .innerJoin(authUser, eq(authUser.id, portalClientMembers.userId))
    .where(eq(portalProjects.id, projectId))
    .orderBy(asc(authUser.email))
  return zeilen.map((z) => z.email)
}

/**
 * Entfernt eine Person von einem Kunden. Der Zugriff auf dessen Projekte endet
 * sofort (authz fragt die Zuordnung bei jedem Request ab). Ist die Person danach
 * keinem Kunden mehr zugeordnet und kein Admin, werden ihre Sitzungen beendet.
 */
export async function personEntfernen(
  viewer: Viewer | null,
  eingabe: { clientId: string; userId: string }
): Promise<AdminErgebnis<{ sitzungenBeendet: boolean }>> {
  if (!mussAdminSein(viewer)) return KEIN_ZUGRIFF
  try {
    return await db.transaction(async (tx) => {
      const geloescht = await tx
        .delete(portalClientMembers)
        .where(and(eq(portalClientMembers.clientId, eingabe.clientId), eq(portalClientMembers.userId, eingabe.userId)))
        .returning({ userId: portalClientMembers.userId })
      if (geloescht.length === 0) return { status: 'ungueltig', meldung: 'Diese Zuordnung gibt es nicht.' } as const

      const [weitere] = await tx
        .select({ clientId: portalClientMembers.clientId })
        .from(portalClientMembers)
        .where(eq(portalClientMembers.userId, eingabe.userId))
        .limit(1)
      const [admin] = await tx
        .select({ userId: portalAdmins.userId })
        .from(portalAdmins)
        .where(eq(portalAdmins.userId, eingabe.userId))
        .limit(1)
      const sitzungenBeendet = !weitere && !admin
      if (sitzungenBeendet) await tx.delete(authSession).where(eq(authSession.userId, eingabe.userId))
      return { status: 'ok', sitzungenBeendet } as const
    })
  } catch (error) {
    console.error('Person nicht entfernt:', pgFehlercode(error) ?? error)
    return { status: 'fehler' }
  }
}

/** Setzt die Freigabe eines Projekts zurück; nur mit ausdrücklicher Bestätigung. */
export async function freigabeZuruecksetzen(
  viewer: Viewer | null,
  eingabe: { projectId: string; bestaetigt: boolean }
): Promise<AdminErgebnis> {
  if (!mussAdminSein(viewer)) return KEIN_ZUGRIFF
  if (!eingabe.bestaetigt) return { status: 'ungueltig', meldung: 'Bitte das Zurücksetzen der Freigabe bestätigen.' }
  const geloescht = await db
    .delete(portalProjectApprovals)
    .where(eq(portalProjectApprovals.projectId, eingabe.projectId))
    .returning({ projectId: portalProjectApprovals.projectId })
  if (geloescht.length === 0) return { status: 'ungueltig', meldung: 'Für dieses Projekt gibt es keine Freigabe.' }
  return { status: 'ok' }
}

/**
 * Löscht einen Entwurf (Eintrag samt Kommentaren und Datei), aber nur, wenn er
 * nicht freigegeben ist. Die Datenbank verhindert das zusätzlich über den
 * Fremdschlüssel der Freigabe.
 */
export async function varianteLoeschen(
  viewer: Viewer | null,
  eingabe: { variantId: string; bestaetigt: boolean }
): Promise<AdminErgebnis> {
  if (!mussAdminSein(viewer)) return KEIN_ZUGRIFF
  if (!eingabe.bestaetigt) return { status: 'ungueltig', meldung: 'Bitte das Löschen des Entwurfs bestätigen.' }

  const [freigegeben] = await db
    .select({ projectId: portalProjectApprovals.projectId })
    .from(portalProjectApprovals)
    .where(eq(portalProjectApprovals.variantId, eingabe.variantId))
    .limit(1)
  if (freigegeben) {
    return { status: 'ungueltig', meldung: 'Dieser Entwurf ist freigegeben. Erst die Freigabe zurücksetzen.' }
  }

  let storagePath: string
  try {
    const [zeile] = await db
      .delete(portalDesignVariants)
      .where(eq(portalDesignVariants.id, eingabe.variantId))
      .returning({ storagePath: portalDesignVariants.storagePath })
    if (!zeile) return { status: 'ungueltig', meldung: 'Diesen Entwurf gibt es nicht.' }
    storagePath = zeile.storagePath
  } catch (error) {
    // 23503: inzwischen freigegeben (Fremdschlüssel der Freigabe)
    if (pgFehlercode(error) === '23503') {
      return { status: 'ungueltig', meldung: 'Dieser Entwurf ist freigegeben. Erst die Freigabe zurücksetzen.' }
    }
    console.error('Entwurf nicht gelöscht:', pgFehlercode(error) ?? error)
    return { status: 'fehler' }
  }

  // Erst nach dem Eintrag die Datei: Ohne Eintrag ist sie ohnehin nicht mehr abrufbar.
  try {
    await entwurfLoeschen(storagePath)
  } catch (error) {
    console.error('Datei des gelöschten Entwurfs nicht entfernt:', storagePath, error)
  }
  return { status: 'ok' }
}
