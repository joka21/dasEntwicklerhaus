// Aufbau eines Exports aus Supabase (geschrieben von export-supabase.ts,
// gelesen von import-lib.ts):
//
//   <export>/manifest.json            Zeitpunkt, Zählungen, Dateiliste mit SHA-256
//   <export>/tabellen/<name>.json     Zeilen als JSON (to_jsonb aus Postgres)
//   <export>/alt/<name>.json          Alt-Tabellen, nur Sicherung (projects, blog_posts, contact_submissions)
//   <export>/alt/<name>.spalten.json  Spaltenbeschreibung der Alt-Tabellen
//   <export>/dateien/<pfad>           Dateien aus dem Bucket design-proposals, Pfad wie in Supabase

export const PORTAL_TABELLEN = [
  'portal_admins',
  'portal_clients',
  'portal_client_members',
  'portal_projects',
  'portal_design_variants',
  'portal_variant_comments',
  'portal_project_approvals',
] as const
export type PortalTabelle = (typeof PORTAL_TABELLEN)[number]

/** Nur die Benutzer, die im Portal vorkommen (Mitglieder, Admins, Autoren, Freigebende) */
export const BENUTZER_TABELLE = 'auth_users'

export const ALT_TABELLEN = ['projects', 'blog_posts', 'contact_submissions'] as const

export const BUCKET = 'design-proposals'

export interface ManifestDatei {
  /** Pfad im Bucket, z. B. <project_id>/entwurf-a.html */
  name: string
  bytes: number
  sha256: string
}

export interface Manifest {
  version: 1
  exportiertAm: string
  /** Nur der Host des Supabase-Projekts, keine Zugangsdaten */
  quelle: string
  zaehlung: Record<string, number>
  /** Alt-Tabellen, die es in Supabase nicht gibt */
  fehlendeAltTabellen: string[]
  dateien: ManifestDatei[]
}

// Zeilen, wie sie aus Supabase kommen (Spaltennamen wie in der Datenbank)

export interface SupabaseBenutzer {
  id: string
  email: string
  name: string | null
  email_confirmed_at: string | null
  created_at: string
  updated_at: string | null
}

export interface ZeileAdmin {
  user_id: string
  created_at: string
}
export interface ZeileKunde {
  id: string
  name: string
  created_at: string
}
export interface ZeileMitglied {
  client_id: string
  user_id: string
  created_at: string
}
export interface ZeileProjekt {
  id: string
  client_id: string
  slug: string
  title: string
  description: string | null
  created_at: string
}
export interface ZeileVariante {
  id: string
  project_id: string
  title: string
  description: string | null
  storage_path: string
  sort_order: number
  created_at: string
}
export interface ZeileKommentar {
  id: string
  variant_id: string
  author_id: string | null
  body: string
  created_at: string
}
export interface ZeileFreigabe {
  project_id: string
  variant_id: string
  approved_by: string | null
  approved_at: string
}
