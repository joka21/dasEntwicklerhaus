import { and, eq, exists, inArray, type SQL } from 'drizzle-orm'
import { db } from '@/lib/db'
import { portalAdmins, portalClientMembers, portalDesignVariants, portalProjects } from '@/lib/db/schema'

// Alle Zugriffsregeln des Kundenportals – Ersatz für die RLS-Policies aus
// supabase/migrations/20261012180000_portal.sql. Jede Funktion entspricht einer
// Policy (Nummern wie in MIGRATION-PLAN.md, Abschnitt 3). Ohne Login (viewer
// null) ist alles verboten. Datenzugriffe im Portal laufen ausschließlich über
// src/lib/portal/daten.ts, das diese Funktionen aufruft.

/** Angemeldeter Nutzer; istAdmin stammt aus portal_admins (siehe viewer.ts) */
export interface Viewer {
  userId: string
  email: string
  istAdmin: boolean
}

// ---------------------------------------------------------------------------
// Grundbausteine (bisher portal_private.*)
// ---------------------------------------------------------------------------

/** 1 – portal_admins: nur intern zur Ermittlung des Viewers, nie nach außen */
export async function istAdmin(userId: string): Promise<boolean> {
  const [zeile] = await db
    .select({ userId: portalAdmins.userId })
    .from(portalAdmins)
    .where(eq(portalAdmins.userId, userId))
    .limit(1)
  return Boolean(zeile)
}

async function istKundenmitglied(userId: string, clientId: string): Promise<boolean> {
  const [zeile] = await db
    .select({ userId: portalClientMembers.userId })
    .from(portalClientMembers)
    .where(and(eq(portalClientMembers.clientId, clientId), eq(portalClientMembers.userId, userId)))
    .limit(1)
  return Boolean(zeile)
}

async function istProjektmitglied(userId: string, projectId: string): Promise<boolean> {
  const [zeile] = await db
    .select({ id: portalProjects.id })
    .from(portalProjects)
    .innerJoin(portalClientMembers, eq(portalClientMembers.clientId, portalProjects.clientId))
    .where(and(eq(portalProjects.id, projectId), eq(portalClientMembers.userId, userId)))
    .limit(1)
  return Boolean(zeile)
}

async function projektIdDerVariante(variantId: string): Promise<string | null> {
  const [zeile] = await db
    .select({ projectId: portalDesignVariants.projectId })
    .from(portalDesignVariants)
    .where(eq(portalDesignVariants.id, variantId))
    .limit(1)
  return zeile?.projectId ?? null
}

// ---------------------------------------------------------------------------
// Regeln je bisheriger Policy
// ---------------------------------------------------------------------------

/** 2 – portal_clients_select: Admin oder Mitglied des Kunden */
export async function darfKundeLesen(viewer: Viewer | null, clientId: string): Promise<boolean> {
  if (!viewer) return false
  return viewer.istAdmin || istKundenmitglied(viewer.userId, clientId)
}

/** 3 – portal_client_members_select: eigene Mitgliedschaften oder Admin */
export function darfMitgliedschaftLesen(viewer: Viewer | null, mitgliedUserId: string): boolean {
  if (!viewer) return false
  return viewer.istAdmin || mitgliedUserId === viewer.userId
}

/**
 * 4, 5, 6, 8 – Projekt, seine Varianten, Kommentare und Freigabe lesen:
 * Admin oder Mitglied des Kunden des Projekts
 */
export async function darfProjektLesen(viewer: Viewer | null, projectId: string): Promise<boolean> {
  if (!viewer) return false
  return viewer.istAdmin || istProjektmitglied(viewer.userId, projectId)
}

/**
 * 4 – dieselbe Regel als Bedingung für Listenabfragen auf portal_projects.
 * Ohne Login eine Bedingung, die nie zutrifft.
 */
export function sichtbareProjekteBedingung(viewer: Viewer | null): SQL | undefined {
  if (!viewer) return inArray(portalProjects.id, [])
  if (viewer.istAdmin) return undefined
  return exists(
    db
      .select({ eins: portalClientMembers.userId })
      .from(portalClientMembers)
      .where(
        and(eq(portalClientMembers.clientId, portalProjects.clientId), eq(portalClientMembers.userId, viewer.userId))
      )
  )
}

/**
 * 7 – portal_variant_comments_insert: nur Kundenmitglieder des Projekts der
 * Variante. Admin-Status allein reicht nicht. Autor setzt daten.ts serverseitig.
 */
export async function darfKommentieren(viewer: Viewer | null, variantId: string): Promise<boolean> {
  if (!viewer) return false
  const projectId = await projektIdDerVariante(variantId)
  return projectId !== null && istProjektmitglied(viewer.userId, projectId)
}

/** Kommentar- und Freigabe-Formulare anzeigen: dieselbe Mitgliedschaft wie 7 und 9 */
export async function istKundeImProjekt(viewer: Viewer | null, projectId: string): Promise<boolean> {
  if (!viewer) return false
  return istProjektmitglied(viewer.userId, projectId)
}

/**
 * 9 – portal_project_approvals_insert: nur Kundenmitglieder; die Variante muss
 * zum Projekt gehören (zusätzlich durch den zusammengesetzten FK abgesichert).
 * Eine zweite Freigabe verhindert der Primärschlüssel in der Datenbank.
 */
export async function darfFreigeben(viewer: Viewer | null, projectId: string, variantId: string): Promise<boolean> {
  if (!viewer) return false
  if ((await projektIdDerVariante(variantId)) !== projectId) return false
  return istProjektmitglied(viewer.userId, projectId)
}

/**
 * 10 – Storage-Policy: Entwurf nur lesbar, wenn er als Variante eines
 * zugänglichen Projekts eingetragen ist. Der Dateipfad kommt immer aus der
 * Datenbank, nie aus der URL.
 */
export async function darfEntwurfLesen(viewer: Viewer | null, variantId: string): Promise<boolean> {
  if (!viewer) return false
  const projectId = await projektIdDerVariante(variantId)
  return projectId !== null && darfProjektLesen(viewer, projectId)
}

/** 11 – Admin-Bereich (ersetzt Dashboard/service_role) */
export function mussAdminSein(viewer: Viewer | null): viewer is Viewer {
  return Boolean(viewer?.istAdmin)
}
