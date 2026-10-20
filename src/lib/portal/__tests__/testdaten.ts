import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  authUser,
  portalAdmins,
  portalClientMembers,
  portalClients,
  portalDesignVariants,
  portalProjects,
  portalVariantComments,
} from '@/lib/db/schema'
import type { Viewer } from '../authz'

// Feste IDs, damit die Tests lesbar bleiben.
export const ID = {
  kundeA: '00000000-0000-4000-8000-0000000000a1',
  kundeB: '00000000-0000-4000-8000-0000000000b1',
  admin: '00000000-0000-4000-8000-0000000000ad',
  kunde1: '00000000-0000-4000-8000-0000000000c1',
  kunde2: '00000000-0000-4000-8000-0000000000c2',
  projekt1: '00000000-0000-4000-8000-0000000000e1',
  projekt2: '00000000-0000-4000-8000-0000000000e2',
  variante1a: '00000000-0000-4000-8000-00000000001a',
  variante1b: '00000000-0000-4000-8000-00000000001b',
  variante2: '00000000-0000-4000-8000-00000000002a',
} as const

/** Kunde A gehört zu Kunde 1 (Projekt 1), Kunde B zu Kunde 2 (Projekt 2), Admin zu keinem */
export const viewer = {
  kundeA: { userId: ID.kundeA, email: 'a@kunde1.test', istAdmin: false },
  kundeB: { userId: ID.kundeB, email: 'b@kunde2.test', istAdmin: false },
  admin: { userId: ID.admin, email: 'admin@test.test', istAdmin: true },
} satisfies Record<string, Viewer>

export async function testdatenAnlegen() {
  await db.execute(sql`
    truncate auth_user, auth_session, auth_account, auth_verification,
      portal_admins, portal_clients, portal_client_members, portal_projects,
      portal_design_variants, portal_variant_comments, portal_project_approvals
    restart identity cascade
  `)

  await db.insert(authUser).values([
    { id: ID.kundeA, email: viewer.kundeA.email, name: 'Kunde A' },
    { id: ID.kundeB, email: viewer.kundeB.email, name: 'Kunde B' },
    { id: ID.admin, email: viewer.admin.email, name: 'Admin' },
  ])
  await db.insert(portalAdmins).values({ userId: ID.admin })
  await db.insert(portalClients).values([
    { id: ID.kunde1, name: 'Kunde 1' },
    { id: ID.kunde2, name: 'Kunde 2' },
  ])
  await db.insert(portalClientMembers).values([
    { clientId: ID.kunde1, userId: ID.kundeA },
    { clientId: ID.kunde2, userId: ID.kundeB },
  ])
  await db.insert(portalProjects).values([
    { id: ID.projekt1, clientId: ID.kunde1, slug: 'projekt-1', title: 'Projekt 1' },
    { id: ID.projekt2, clientId: ID.kunde2, slug: 'projekt-2', title: 'Projekt 2' },
  ])
  await db.insert(portalDesignVariants).values([
    { id: ID.variante1a, projectId: ID.projekt1, title: 'Variante 1a', storagePath: `${ID.projekt1}/a.html`, sortOrder: 1 },
    { id: ID.variante1b, projectId: ID.projekt1, title: 'Variante 1b', storagePath: `${ID.projekt1}/b.html`, sortOrder: 2 },
    { id: ID.variante2, projectId: ID.projekt2, title: 'Variante 2', storagePath: `${ID.projekt2}/a.html` },
  ])
  await db.insert(portalVariantComments).values({ variantId: ID.variante1a, authorId: ID.kundeA, body: 'Schön!' })
}
