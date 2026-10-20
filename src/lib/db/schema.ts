import { sql } from 'drizzle-orm'
import {
  boolean,
  check,
  foreignKey,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core'

const zeitpunkt = (name: string) => timestamp(name, { withTimezone: true })
const angelegtAm = () => zeitpunkt('created_at').notNull().defaultNow()

// ---------------------------------------------------------------------------
// Better Auth (Kernschema). Die Tabellen heißen auth_*, damit sie sich von den
// Portal-Tabellen abheben und "user" (reserviertes Wort) vermieden wird; die
// Zuordnung zu den Modellnamen von Better Auth geschieht im Drizzle-Adapter.
// IDs sind UUIDs, damit die Benutzer-IDs aus Supabase übernommen werden können.
// ---------------------------------------------------------------------------

export const authUser = pgTable('auth_user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: angelegtAm(),
  updatedAt: zeitpunkt('updated_at').notNull().defaultNow(),
})

export const authSession = pgTable(
  'auth_session',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    expiresAt: zeitpunkt('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: angelegtAm(),
    updatedAt: zeitpunkt('updated_at').notNull().defaultNow(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: uuid('user_id')
      .notNull()
      .references(() => authUser.id, { onDelete: 'cascade' }),
  },
  (t) => [index('auth_session_user_id_idx').on(t.userId)]
)

export const authAccount = pgTable(
  'auth_account',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => authUser.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: zeitpunkt('access_token_expires_at'),
    refreshTokenExpiresAt: zeitpunkt('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: angelegtAm(),
    updatedAt: zeitpunkt('updated_at').notNull().defaultNow(),
  },
  (t) => [index('auth_account_user_id_idx').on(t.userId)]
)

export const authVerification = pgTable(
  'auth_verification',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: zeitpunkt('expires_at').notNull(),
    createdAt: angelegtAm(),
    updatedAt: zeitpunkt('updated_at').notNull().defaultNow(),
  },
  (t) => [index('auth_verification_identifier_idx').on(t.identifier)]
)

// ---------------------------------------------------------------------------
// Kundenportal – inhaltlich 1:1 zu supabase/migrations/20261012180000_portal.sql.
// Verweise auf auth.users zeigen jetzt auf auth_user. Die Defaults auth.uid()
// (author_id, approved_by) entfallen: Der Server setzt die Benutzer-ID.
// Neu gegenüber Supabase: portal_variant_comments.is_admin (Migration 0001).
// Zugriffsregeln (bisher RLS) stehen in src/lib/portal/authz.ts.
// ---------------------------------------------------------------------------

// Admin-Rolle: Login allein reicht nicht, der User muss hier eingetragen sein.
export const portalAdmins = pgTable(
  'portal_admins',
  {
    userId: uuid('user_id').notNull(),
    createdAt: angelegtAm(),
  },
  (t) => [
    primaryKey({ name: 'portal_admins_pkey', columns: [t.userId] }),
    foreignKey({ name: 'portal_admins_user_id_fkey', columns: [t.userId], foreignColumns: [authUser.id] }).onDelete(
      'cascade'
    ),
  ]
)

// Kunde = Firma/Auftraggeber
export const portalClients = pgTable(
  'portal_clients',
  {
    id: uuid('id').notNull().defaultRandom(),
    name: text('name').notNull(),
    createdAt: angelegtAm(),
  },
  (t) => [
    primaryKey({ name: 'portal_clients_pkey', columns: [t.id] }),
    check('portal_clients_name_check', sql`char_length(${t.name}) between 1 and 200`),
  ]
)

// Welche Logins gehören zu welchem Kunden (mehrere Ansprechpartner möglich)
export const portalClientMembers = pgTable(
  'portal_client_members',
  {
    clientId: uuid('client_id').notNull(),
    userId: uuid('user_id').notNull(),
    createdAt: angelegtAm(),
  },
  (t) => [
    primaryKey({ name: 'portal_client_members_pkey', columns: [t.clientId, t.userId] }),
    foreignKey({
      name: 'portal_client_members_client_id_fkey',
      columns: [t.clientId],
      foreignColumns: [portalClients.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'portal_client_members_user_id_fkey',
      columns: [t.userId],
      foreignColumns: [authUser.id],
    }).onDelete('cascade'),
    index('portal_client_members_user_id_idx').on(t.userId),
  ]
)

// Projekt; slug ist das URL-Segment in /portal/[projekt]
export const portalProjects = pgTable(
  'portal_projects',
  {
    id: uuid('id').notNull().defaultRandom(),
    clientId: uuid('client_id').notNull(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    createdAt: angelegtAm(),
  },
  (t) => [
    primaryKey({ name: 'portal_projects_pkey', columns: [t.id] }),
    unique('portal_projects_slug_key').on(t.slug),
    foreignKey({
      name: 'portal_projects_client_id_fkey',
      columns: [t.clientId],
      foreignColumns: [portalClients.id],
    }).onDelete('cascade'),
    check('portal_projects_slug_check', sql`${t.slug} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`),
    check('portal_projects_title_check', sql`char_length(${t.title}) between 1 and 200`),
    index('portal_projects_client_id_idx').on(t.clientId),
  ]
)

// Design-Variante = eine HTML-Datei unter PORTAL_STORAGE_PATH
// Pfadkonvention: <project_id>/<dateiname>.html
export const portalDesignVariants = pgTable(
  'portal_design_variants',
  {
    id: uuid('id').notNull().defaultRandom(),
    projectId: uuid('project_id').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    storagePath: text('storage_path').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: angelegtAm(),
  },
  (t) => [
    primaryKey({ name: 'portal_design_variants_pkey', columns: [t.id] }),
    unique('portal_design_variants_storage_path_key').on(t.storagePath),
    unique('portal_design_variants_id_project_id_key').on(t.id, t.projectId),
    foreignKey({
      name: 'portal_design_variants_project_id_fkey',
      columns: [t.projectId],
      foreignColumns: [portalProjects.id],
    }).onDelete('cascade'),
    check('portal_design_variants_title_check', sql`char_length(${t.title}) between 1 and 200`),
    check('portal_design_variants_path_prefix_check', sql`${t.storagePath} like ${t.projectId}::text || '/%'`),
    check('portal_design_variants_path_html_check', sql`${t.storagePath} ~ '\\.html$'`),
    index('portal_design_variants_project_id_idx').on(t.projectId, t.sortOrder),
  ]
)

// Kommentare pro Variante (beliebig viele)
export const portalVariantComments = pgTable(
  'portal_variant_comments',
  {
    id: uuid('id').notNull().defaultRandom(),
    variantId: uuid('variant_id').notNull(),
    authorId: uuid('author_id'),
    body: text('body').notNull(),
    // Beim Speichern festgehalten: Kommentar stammt von einem Admin (Antwort
    // vom Entwicklerhaus). Bleibt erhalten, auch wenn der Admin später ausgetragen wird.
    isAdmin: boolean('is_admin').notNull().default(false),
    createdAt: angelegtAm(),
  },
  (t) => [
    primaryKey({ name: 'portal_variant_comments_pkey', columns: [t.id] }),
    foreignKey({
      name: 'portal_variant_comments_variant_id_fkey',
      columns: [t.variantId],
      foreignColumns: [portalDesignVariants.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'portal_variant_comments_author_id_fkey',
      columns: [t.authorId],
      foreignColumns: [authUser.id],
    }).onDelete('set null'),
    check('portal_variant_comments_body_check', sql`char_length(btrim(${t.body})) between 1 and 5000`),
    index('portal_variant_comments_variant_id_idx').on(t.variantId, t.createdAt),
  ]
)

// Freigabe: genau eine pro Projekt (PK auf project_id).
// Der zusammengesetzte FK stellt sicher, dass die Variante zum Projekt gehört.
// Eine freigegebene Variante kann nicht gelöscht werden, solange die Freigabe besteht.
export const portalProjectApprovals = pgTable(
  'portal_project_approvals',
  {
    projectId: uuid('project_id').notNull(),
    variantId: uuid('variant_id').notNull(),
    approvedBy: uuid('approved_by'),
    approvedAt: zeitpunkt('approved_at').notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ name: 'portal_project_approvals_pkey', columns: [t.projectId] }),
    foreignKey({
      name: 'portal_project_approvals_project_id_fkey',
      columns: [t.projectId],
      foreignColumns: [portalProjects.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'portal_project_approvals_variant_fkey',
      columns: [t.variantId, t.projectId],
      foreignColumns: [portalDesignVariants.id, portalDesignVariants.projectId],
    }),
    foreignKey({
      name: 'portal_project_approvals_approved_by_fkey',
      columns: [t.approvedBy],
      foreignColumns: [authUser.id],
    }).onDelete('set null'),
  ]
)
