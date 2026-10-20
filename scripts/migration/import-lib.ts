import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Sql } from 'postgres'
import { absoluterPfad } from '../../src/lib/portal/speicher'
import {
  BENUTZER_TABELLE,
  BUCKET,
  PORTAL_TABELLEN,
  type Manifest,
  type SupabaseBenutzer,
  type ZeileAdmin,
  type ZeileFreigabe,
  type ZeileKommentar,
  type ZeileKunde,
  type ZeileMitglied,
  type ZeileProjekt,
  type ZeileVariante,
} from './format'

// Import eines Supabase-Exports in die neue Datenbank und nach PORTAL_STORAGE_PATH.
// Bedingungen: Migrationen sind eingespielt, Portal- und Benutzertabellen sind leer.
// Alles oder nichts: Datenbank in einer Transaktion; scheitert sie, werden die
// schon kopierten Dateien wieder entfernt.

/** Neue Tabellen in Einfügereihenfolge (Fremdschlüssel) */
export const ZIEL_TABELLEN = ['auth_user', ...PORTAL_TABELLEN] as const

const ERLAUBTER_PFAD = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[A-Za-z0-9][A-Za-z0-9._-]{0,150}\.html$/i

export interface Export {
  manifest: Manifest
  benutzer: SupabaseBenutzer[]
  admins: ZeileAdmin[]
  kunden: ZeileKunde[]
  mitglieder: ZeileMitglied[]
  projekte: ZeileProjekt[]
  varianten: ZeileVariante[]
  kommentare: ZeileKommentar[]
  freigaben: ZeileFreigabe[]
}

export async function exportLesen(exportDir: string): Promise<Export> {
  const lies = async <T>(datei: string): Promise<T> => JSON.parse(await readFile(path.join(exportDir, datei), 'utf8')) as T
  const manifest = await lies<Manifest>('manifest.json')
  if (manifest.version !== 1) throw new Error(`Unbekannte Export-Version: ${manifest.version}`)
  const tabelle = <T>(name: string) => lies<T[]>(path.join('tabellen', `${name}.json`))
  return {
    manifest,
    benutzer: await tabelle<SupabaseBenutzer>(BENUTZER_TABELLE),
    admins: await tabelle<ZeileAdmin>('portal_admins'),
    kunden: await tabelle<ZeileKunde>('portal_clients'),
    mitglieder: await tabelle<ZeileMitglied>('portal_client_members'),
    projekte: await tabelle<ZeileProjekt>('portal_projects'),
    varianten: await tabelle<ZeileVariante>('portal_design_variants'),
    kommentare: await tabelle<ZeileKommentar>('portal_variant_comments'),
    freigaben: await tabelle<ZeileFreigabe>('portal_project_approvals'),
  }
}

export interface Umbenennung {
  variantId: string
  alt: string
  neu: string
}

export interface ImportBericht {
  /** Zeilen je neuer Tabelle nach dem Import */
  zaehlung: Record<string, number>
  dateienKopiert: number
  umbenannt: Umbenennung[]
  /** Varianten, deren Datei im Export fehlt (Eintrag trotzdem übernommen) */
  fehlendeDateien: string[]
  /** Dateien im Bucket ohne Variante (nur im Export, nicht übernommen) */
  verwaisteDateien: string[]
}

/** Abgleich Supabase (Manifest) gegen neue Datenbank, je Tabelle */
export interface AbgleichZeile {
  tabelle: string
  supabase: number
  neu: number
  ok: boolean
}

const QUELLE_ZU_ZIEL: Record<string, string> = {
  [BENUTZER_TABELLE]: 'auth_user',
  ...Object.fromEntries(PORTAL_TABELLEN.map((t) => [t, t])),
}

export function abgleich(manifest: Manifest, bericht: ImportBericht): AbgleichZeile[] {
  const zeilen = Object.entries(QUELLE_ZU_ZIEL).map(([quelle, ziel]) => {
    const supabase = manifest.zaehlung[quelle] ?? 0
    const neu = bericht.zaehlung[ziel] ?? 0
    return { tabelle: quelle === ziel ? ziel : `${quelle} → ${ziel}`, supabase, neu, ok: supabase === neu }
  })
  // Dateien: übernommen werden nur die, die zu einer Variante gehören.
  const erwartet = (manifest.zaehlung[`dateien.${BUCKET}`] ?? 0) - bericht.verwaisteDateien.length
  zeilen.push({ tabelle: `Dateien (${BUCKET}, mit Variante)`, supabase: erwartet, neu: bericht.dateienKopiert, ok: erwartet === bericht.dateienKopiert })
  return zeilen
}

/** Prüft, ob die Zieldatenbank leer ist; wirft sonst mit Angabe der Tabellen */
export async function pruefeZielLeer(sql: Sql): Promise<void> {
  const belegt: string[] = []
  for (const tabelle of ZIEL_TABELLEN) {
    const [{ anzahl }] = await sql`select count(*)::int as anzahl from ${sql(tabelle)}`
    if (anzahl > 0) belegt.push(`${tabelle} (${anzahl})`)
  }
  if (belegt.length) throw new Error(`Zieldatenbank ist nicht leer: ${belegt.join(', ')}`)
}

export async function zaehlen(sql: Sql): Promise<Record<string, number>> {
  const zaehlung: Record<string, number> = {}
  for (const tabelle of ZIEL_TABELLEN) {
    const [{ anzahl }] = await sql`select count(*)::int as anzahl from ${sql(tabelle)}`
    zaehlung[tabelle] = anzahl
  }
  return zaehlung
}

const sha256 = (inhalt: Buffer) => createHash('sha256').update(inhalt).digest('hex')

/**
 * Führt den Import aus. PORTAL_STORAGE_PATH muss auf das Ziel der Dateien zeigen.
 */
export async function importieren(sql: Sql, exportDir: string): Promise<ImportBericht> {
  const daten = await exportLesen(exportDir)
  await pruefeZielLeer(sql)

  const adminIds = new Set(daten.admins.map((a) => a.user_id))
  const pruefsummen = new Map(daten.manifest.dateien.map((d) => [d.name, d.sha256]))
  const mitVariante = new Set(daten.varianten.map((v) => v.storage_path))

  // 1. Dateien kopieren (Pfade, die nicht zur neuen Regel passen, umbenennen)
  const kopiert: string[] = []
  const umbenannt: Umbenennung[] = []
  const fehlendeDateien: string[] = []
  const varianten: ZeileVariante[] = []
  try {
    for (const v of daten.varianten) {
      const quelle = path.join(exportDir, 'dateien', ...v.storage_path.split('/'))
      let inhalt: Buffer
      try {
        inhalt = await readFile(quelle)
      } catch {
        fehlendeDateien.push(v.storage_path)
        varianten.push(v)
        continue
      }
      const erwartet = pruefsummen.get(v.storage_path)
      if (erwartet && erwartet !== sha256(inhalt)) throw new Error(`Prüfsumme stimmt nicht: ${v.storage_path}`)

      const passt = ERLAUBTER_PFAD.test(v.storage_path) && v.storage_path.startsWith(`${v.project_id}/`)
      const neuerPfad = passt ? v.storage_path : `${v.project_id}/${randomUUID()}.html`
      if (!passt) umbenannt.push({ variantId: v.id, alt: v.storage_path, neu: neuerPfad })

      const ziel = absoluterPfad(neuerPfad)
      await mkdir(path.dirname(ziel), { recursive: true })
      await writeFile(ziel, inhalt, { flag: 'wx' })
      kopiert.push(ziel)
      if (sha256(await readFile(ziel)) !== sha256(inhalt)) throw new Error(`Kopie fehlerhaft: ${neuerPfad}`)
      varianten.push({ ...v, storage_path: neuerPfad })
    }

    // 2. Datenbank in einer Transaktion
    await sql.begin(async (tx) => {
      if (daten.benutzer.length) {
        await tx`insert into auth_user ${tx(
          daten.benutzer.map((b) => ({
            id: b.id,
            email: b.email.trim().toLowerCase(),
            name: b.name ?? '',
            email_verified: b.email_confirmed_at !== null,
            created_at: b.created_at,
            updated_at: b.updated_at ?? b.created_at,
          }))
        )}`
      }
      if (daten.admins.length) await tx`insert into portal_admins ${tx(daten.admins, 'user_id', 'created_at')}`
      if (daten.kunden.length) await tx`insert into portal_clients ${tx(daten.kunden, 'id', 'name', 'created_at')}`
      if (daten.mitglieder.length) {
        await tx`insert into portal_client_members ${tx(daten.mitglieder, 'client_id', 'user_id', 'created_at')}`
      }
      if (daten.projekte.length) {
        await tx`insert into portal_projects ${tx(daten.projekte, 'id', 'client_id', 'slug', 'title', 'description', 'created_at')}`
      }
      if (varianten.length) {
        await tx`insert into portal_design_variants ${tx(
          varianten,
          'id',
          'project_id',
          'title',
          'description',
          'storage_path',
          'sort_order',
          'created_at'
        )}`
      }
      if (daten.kommentare.length) {
        await tx`insert into portal_variant_comments ${tx(
          daten.kommentare.map((k) => ({
            ...k,
            // wie Migration 0001: Kommentare von Admins kennzeichnen
            is_admin: k.author_id !== null && adminIds.has(k.author_id),
          })),
          'id',
          'variant_id',
          'author_id',
          'body',
          'created_at',
          'is_admin'
        )}`
      }
      if (daten.freigaben.length) {
        await tx`insert into portal_project_approvals ${tx(daten.freigaben, 'project_id', 'variant_id', 'approved_by', 'approved_at')}`
      }
    })
  } catch (error) {
    await Promise.all(kopiert.map((datei) => rm(datei, { force: true })))
    throw error
  }

  return {
    zaehlung: await zaehlen(sql),
    dateienKopiert: kopiert.length,
    umbenannt,
    fehlendeDateien,
    verwaisteDateien: daten.manifest.dateien.map((d) => d.name).filter((name) => !mitVariante.has(name)),
  }
}
