import { randomUUID } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { mkdir, realpath, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'

// Ablage der Design-Entwürfe (bisher Supabase-Bucket "design-proposals") im
// Dateisystem unter PORTAL_STORAGE_PATH. Das Verzeichnis liegt außerhalb von
// public/ und wird nie direkt ausgeliefert, sondern nur über die Route
// /portal/[projekt]/entwurf/[variante] nach der Prüfung in authz.ts.
// Pfadkonvention wie bisher: <project_id>/<dateiname>.html

/** Höchstgröße eines Entwurfs (Entscheidung Phase 0) */
export const MAX_ENTWURF_BYTES = 10 * 1024 * 1024

const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
/** Erlaubte Speicherpfade: genau eine Ebene, Projekt-ID als Ordner, .html am Ende */
const PFAD_RE = new RegExp(`^(${UUID})/[A-Za-z0-9][A-Za-z0-9._-]{0,150}\\.html$`, 'i')

function wurzel(): string {
  const wert = process.env.PORTAL_STORAGE_PATH
  if (!wert) throw new Error('PORTAL_STORAGE_PATH ist nicht gesetzt')
  return path.resolve(wert)
}

/**
 * Wandelt einen Speicherpfad aus der Datenbank in einen absoluten Dateipfad um.
 * Wirft bei allem, was aus dem Ablageverzeichnis herausführen könnte.
 */
export function absoluterPfad(speicherPfad: string): string {
  if (!PFAD_RE.test(speicherPfad) || speicherPfad.includes('..')) {
    throw new Error(`Ungültiger Speicherpfad: ${speicherPfad}`)
  }
  const basis = wurzel()
  const ziel = path.resolve(basis, speicherPfad)
  if (!ziel.startsWith(basis + path.sep)) throw new Error(`Speicherpfad außerhalb der Ablage: ${speicherPfad}`)
  return ziel
}

/**
 * Öffnet einen Entwurf zum Streamen. null, wenn die Datei fehlt, der Pfad
 * ungültig ist oder (z. B. per Symlink) aus der Ablage herausführt.
 */
export async function entwurfLesen(speicherPfad: string): Promise<ReadableStream<Uint8Array> | null> {
  try {
    const ziel = absoluterPfad(speicherPfad)
    const [echtesZiel, echteBasis] = await Promise.all([realpath(ziel), realpath(wurzel())])
    if (!echtesZiel.startsWith(echteBasis + path.sep)) return null
    if (!(await stat(echtesZiel)).isFile()) return null
    return Readable.toWeb(createReadStream(echtesZiel)) as ReadableStream<Uint8Array>
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') console.error('Entwurf nicht lesbar:', speicherPfad, error)
    return null
  }
}

export type DateiPruefung = { ok: true } | { ok: false; meldung: string }

/** Prüft eine hochgeladene Datei: HTML, nicht leer, höchstens 10 MB */
export function pruefeEntwurfDatei(datei: { name: string; type: string; size: number }): DateiPruefung {
  if (datei.size === 0) return { ok: false, meldung: 'Die Datei ist leer.' }
  if (datei.size > MAX_ENTWURF_BYTES) return { ok: false, meldung: 'Die Datei ist größer als 10 MB.' }
  const istHtml = /\.html?$/i.test(datei.name) && (datei.type === '' || datei.type === 'text/html')
  if (!istHtml) return { ok: false, meldung: 'Nur HTML-Dateien (.html) sind erlaubt.' }
  return { ok: true }
}

/**
 * Legt einen Entwurf ab und gibt den Speicherpfad für die Datenbank zurück.
 * Der Dateiname wird hier vergeben, nie vom Hochladenden übernommen.
 * Geschrieben wird erst in eine temporäre Datei, dann umbenannt – so gibt es
 * nie halb geschriebene Entwürfe.
 */
export async function entwurfSpeichern(projectId: string, inhalt: Uint8Array): Promise<string> {
  if (inhalt.byteLength === 0 || inhalt.byteLength > MAX_ENTWURF_BYTES) throw new Error('Ungültige Dateigröße')
  const speicherPfad = `${projectId}/${randomUUID()}.html`
  const ziel = absoluterPfad(speicherPfad)
  await mkdir(path.dirname(ziel), { recursive: true })
  const temp = `${ziel}.${randomUUID()}.tmp`
  try {
    await writeFile(temp, inhalt, { flag: 'wx' })
    await rename(temp, ziel)
  } catch (error) {
    await rm(temp, { force: true })
    throw error
  }
  return speicherPfad
}

/** Löscht einen Entwurf; fehlende Dateien sind kein Fehler. */
export async function entwurfLoeschen(speicherPfad: string): Promise<void> {
  await rm(absoluterPfad(speicherPfad), { force: true })
}
