import { and, asc, desc, eq, inArray } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  portalDesignVariants,
  portalProjectApprovals,
  portalProjects,
  portalVariantComments,
} from '@/lib/db/schema'
import {
  darfEntwurfLesen,
  darfFreigeben,
  darfKommentieren,
  darfProjektLesen,
  istKundeImProjekt,
  sichtbareProjekteBedingung,
  type Viewer,
} from './authz'

// Einziger Ort mit Datenbankzugriffen für die Kundenseiten des Portals.
// Jede Funktion prüft über authz.ts; fremde Daten liefern null bzw. eine leere
// Liste (wie bisher unter RLS), damit niemand erkennt, ob es sie gibt.

export interface ProjektZeile {
  slug: string
  title: string
  description: string | null
  freigegebenAm: Date | null
}

/** Regel 4: nur Projekte, die der Viewer sehen darf */
export async function ladeProjektliste(viewer: Viewer | null): Promise<ProjektZeile[]> {
  if (!viewer) return []
  return db
    .select({
      slug: portalProjects.slug,
      title: portalProjects.title,
      description: portalProjects.description,
      freigegebenAm: portalProjectApprovals.approvedAt,
    })
    .from(portalProjects)
    .leftJoin(portalProjectApprovals, eq(portalProjectApprovals.projectId, portalProjects.id))
    .where(sichtbareProjekteBedingung(viewer))
    .orderBy(desc(portalProjects.createdAt))
}

export interface Projekt {
  id: string
  clientId: string
  slug: string
  title: string
  description: string | null
}

/** Regel 4: Projekt per Slug, null wenn unbekannt oder fremd */
export async function ladeProjekt(viewer: Viewer | null, slug: string): Promise<Projekt | null> {
  if (!viewer) return null
  const [projekt] = await db
    .select({
      id: portalProjects.id,
      clientId: portalProjects.clientId,
      slug: portalProjects.slug,
      title: portalProjects.title,
      description: portalProjects.description,
    })
    .from(portalProjects)
    .where(eq(portalProjects.slug, slug))
    .limit(1)
  if (!projekt || !(await darfProjektLesen(viewer, projekt.id))) return null
  return projekt
}

export interface Variante {
  id: string
  title: string
  description: string | null
}

export interface Kommentar {
  id: string
  variantId: string
  authorId: string | null
  body: string
  createdAt: Date
}

export interface ProjektInhalt {
  varianten: Variante[]
  freigabe: { variantId: string; approvedAt: Date } | null
  kommentare: Kommentar[]
  /** Kommentieren und Freigeben dürfen nur Kunden, nicht Admins (Regeln 7 und 9) */
  istKunde: boolean
}

/** Regeln 5, 6, 8: Varianten, Kommentare und Freigabe eines Projekts */
export async function ladeProjektInhalt(viewer: Viewer | null, projectId: string): Promise<ProjektInhalt | null> {
  if (!(await darfProjektLesen(viewer, projectId))) return null

  const [varianten, [freigabe], istKunde] = await Promise.all([
    db
      .select({ id: portalDesignVariants.id, title: portalDesignVariants.title, description: portalDesignVariants.description })
      .from(portalDesignVariants)
      .where(eq(portalDesignVariants.projectId, projectId))
      .orderBy(asc(portalDesignVariants.sortOrder), asc(portalDesignVariants.createdAt)),
    db
      .select({ variantId: portalProjectApprovals.variantId, approvedAt: portalProjectApprovals.approvedAt })
      .from(portalProjectApprovals)
      .where(eq(portalProjectApprovals.projectId, projectId))
      .limit(1),
    istKundeImProjekt(viewer, projectId),
  ])

  const kommentare =
    varianten.length === 0
      ? []
      : await db
          .select({
            id: portalVariantComments.id,
            variantId: portalVariantComments.variantId,
            authorId: portalVariantComments.authorId,
            body: portalVariantComments.body,
            createdAt: portalVariantComments.createdAt,
          })
          .from(portalVariantComments)
          .where(
            inArray(
              portalVariantComments.variantId,
              varianten.map((v) => v.id)
            )
          )
          .orderBy(asc(portalVariantComments.createdAt))

  return { varianten, freigabe: freigabe ?? null, kommentare, istKunde }
}

export interface VarianteImProjekt {
  variantId: string
  variantTitle: string
  projectId: string
  projectSlug: string
  projectTitle: string
}

/** Variante samt Projekt, nur wenn sie zum Projekt aus der URL gehört und lesbar ist */
async function ladeVarianteImProjekt(
  viewer: Viewer | null,
  slug: string,
  variantId: string
): Promise<VarianteImProjekt | null> {
  if (!viewer) return null
  const [zeile] = await db
    .select({
      variantId: portalDesignVariants.id,
      variantTitle: portalDesignVariants.title,
      projectId: portalProjects.id,
      projectSlug: portalProjects.slug,
      projectTitle: portalProjects.title,
    })
    .from(portalDesignVariants)
    .innerJoin(portalProjects, eq(portalProjects.id, portalDesignVariants.projectId))
    .where(and(eq(portalDesignVariants.id, variantId), eq(portalProjects.slug, slug)))
    .limit(1)
  if (!zeile || !(await darfProjektLesen(viewer, zeile.projectId))) return null
  return zeile
}

export type SpeicherErgebnis =
  | { status: 'ok'; kontext: VarianteImProjekt }
  | { status: 'kein-zugriff' }
  | { status: 'schon-freigegeben' }
  | { status: 'fehler' }

/** Regel 7: Kommentar speichern; Autor ist immer der Viewer */
export async function kommentarSpeichern(
  viewer: Viewer | null,
  eingabe: { slug: string; variantId: string; body: string }
): Promise<SpeicherErgebnis> {
  const kontext = await ladeVarianteImProjekt(viewer, eingabe.slug, eingabe.variantId)
  if (!viewer || !kontext || !(await darfKommentieren(viewer, kontext.variantId))) return { status: 'kein-zugriff' }

  try {
    await db
      .insert(portalVariantComments)
      .values({ variantId: kontext.variantId, body: eingabe.body, authorId: viewer.userId })
    return { status: 'ok', kontext }
  } catch (error) {
    console.error('Kommentar nicht gespeichert:', pgFehlercode(error) ?? error)
    return { status: 'fehler' }
  }
}

/** Regel 9: Variante freigeben; freigegeben von ist immer der Viewer */
export async function freigabeSpeichern(
  viewer: Viewer | null,
  eingabe: { slug: string; variantId: string }
): Promise<SpeicherErgebnis> {
  const kontext = await ladeVarianteImProjekt(viewer, eingabe.slug, eingabe.variantId)
  if (!viewer || !kontext || !(await darfFreigeben(viewer, kontext.projectId, kontext.variantId))) {
    return { status: 'kein-zugriff' }
  }

  try {
    await db
      .insert(portalProjectApprovals)
      .values({ projectId: kontext.projectId, variantId: kontext.variantId, approvedBy: viewer.userId })
    return { status: 'ok', kontext }
  } catch (error) {
    // 23505: Primärschlüssel project_id – es gibt schon eine Freigabe.
    if (pgFehlercode(error) === '23505') return { status: 'schon-freigegeben' }
    console.error('Freigabe nicht gespeichert:', pgFehlercode(error) ?? error)
    return { status: 'fehler' }
  }
}

/** Regel 10: Speicherpfad eines Entwurfs, null wenn unbekannt oder fremd */
export async function ladeEntwurfPfad(viewer: Viewer | null, slug: string, variantId: string): Promise<string | null> {
  const kontext = await ladeVarianteImProjekt(viewer, slug, variantId)
  if (!kontext || !(await darfEntwurfLesen(viewer, kontext.variantId))) return null
  const [zeile] = await db
    .select({ storagePath: portalDesignVariants.storagePath })
    .from(portalDesignVariants)
    .where(eq(portalDesignVariants.id, kontext.variantId))
    .limit(1)
  return zeile?.storagePath ?? null
}

// Drizzle verpackt Fehler von postgres.js; der SQLSTATE steht dann in cause.
function pgFehlercode(error: unknown): string | undefined {
  const kandidat = (error as { cause?: { code?: unknown } })?.cause ?? error
  const code = (kandidat as { code?: unknown })?.code
  return typeof code === 'string' ? code : undefined
}
