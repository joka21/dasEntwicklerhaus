'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sendeEinladung } from '@/lib/auth'
import { UUID_RE } from '@/lib/portal'
import {
  entwurfHochladen,
  freigabeZuruecksetzen,
  kundeAnlegen,
  personEntfernen,
  personZuordnen,
  projektAnlegen,
  varianteLoeschen,
  type AdminErgebnis,
} from '@/lib/portal/admin'
import { aktuellerViewer } from '@/lib/portal/viewer'

// Formulare des Admin-Bereichs. Jede Daten-Funktion prüft Regel 11 selbst;
// das Ergebnis wird per Weiterleitung als Code angezeigt (siehe page.tsx),
// Freitext-Meldungen nur aus den Prüfungen in src/lib/portal/admin.ts.

const ZIEL = '/portal/admin'

function text(formData: FormData, feld: string): string {
  return String(formData.get(feld) ?? '')
}

function zurueck(ergebnis: AdminErgebnis, okCode: string, anker: string): never {
  revalidatePath(ZIEL)
  const params = new URLSearchParams()
  if (ergebnis.status === 'ok') params.set('ok', okCode)
  else if (ergebnis.status === 'ungueltig') params.set('fehler', ergebnis.meldung)
  else params.set('fehler', ergebnis.status === 'kein-zugriff' ? 'Kein Zugriff.' : 'Das hat nicht geklappt.')
  redirect(`${ZIEL}?${params}#${anker}`)
}

export async function kundeAnlegenAction(formData: FormData) {
  const ergebnis = await kundeAnlegen(await aktuellerViewer(), { name: text(formData, 'name') })
  zurueck(ergebnis, 'kunde', 'kunde-anlegen')
}

export async function personEinladenAction(formData: FormData) {
  const clientId = text(formData, 'client_id')
  if (!UUID_RE.test(clientId)) zurueck({ status: 'ungueltig', meldung: 'Bitte einen Kunden wählen.' }, '', 'person-einladen')

  const ergebnis = await personZuordnen(await aktuellerViewer(), {
    clientId,
    email: text(formData, 'email'),
    name: text(formData, 'name'),
  })
  if (ergebnis.status !== 'ok') zurueck(ergebnis, '', 'person-einladen')

  // Einladung erst nach erfolgreicher Zuordnung; scheitert die Mail, bleibt die
  // Zuordnung bestehen und der Kunde kann sich unter /login selbst einen Link holen.
  const versendet = await sendeEinladung(ergebnis.email)
  zurueck(
    versendet ? ergebnis : { status: 'ungueltig', meldung: `${ergebnis.email} ist zugeordnet, aber die Einladung ging nicht raus.` },
    'einladung',
    'person-einladen'
  )
}

export async function projektAnlegenAction(formData: FormData) {
  const clientId = text(formData, 'client_id')
  if (!UUID_RE.test(clientId)) zurueck({ status: 'ungueltig', meldung: 'Bitte einen Kunden wählen.' }, '', 'projekt-anlegen')

  const ergebnis = await projektAnlegen(await aktuellerViewer(), {
    clientId,
    slug: text(formData, 'slug'),
    title: text(formData, 'title'),
    description: text(formData, 'description'),
  })
  zurueck(ergebnis, 'projekt', 'projekt-anlegen')
}

export async function entwurfHochladenAction(formData: FormData) {
  const projectId = text(formData, 'project_id')
  const datei = formData.get('datei')
  if (!UUID_RE.test(projectId)) zurueck({ status: 'ungueltig', meldung: 'Bitte ein Projekt wählen.' }, '', 'entwurf-hochladen')
  if (!(datei instanceof File)) zurueck({ status: 'ungueltig', meldung: 'Bitte eine Datei wählen.' }, '', 'entwurf-hochladen')

  const reihenfolge = parseInt(text(formData, 'sort_order') || '0', 10)
  const ergebnis = await entwurfHochladen(await aktuellerViewer(), {
    projectId,
    title: text(formData, 'title'),
    description: text(formData, 'description'),
    sortOrder: Number.isFinite(reihenfolge) ? reihenfolge : 0,
    datei,
  })
  zurueck(ergebnis, 'entwurf', 'entwurf-hochladen')
}

export async function personEntfernenAction(formData: FormData) {
  const clientId = text(formData, 'client_id')
  const userId = text(formData, 'user_id')
  if (!UUID_RE.test(clientId) || !UUID_RE.test(userId)) {
    zurueck({ status: 'ungueltig', meldung: 'Ungültige Auswahl.' }, '', 'kunden')
  }
  const ergebnis = await personEntfernen(await aktuellerViewer(), { clientId, userId })
  zurueck(ergebnis, ergebnis.status === 'ok' && ergebnis.sitzungenBeendet ? 'entfernt-abgemeldet' : 'entfernt', 'kunden')
}

export async function freigabeZuruecksetzenAction(formData: FormData) {
  const projectId = text(formData, 'project_id')
  if (!UUID_RE.test(projectId)) zurueck({ status: 'ungueltig', meldung: 'Ungültiges Projekt.' }, '', 'kunden')
  const ergebnis = await freigabeZuruecksetzen(await aktuellerViewer(), {
    projectId,
    bestaetigt: text(formData, 'bestaetigt') === 'ja',
  })
  zurueck(ergebnis, 'freigabe-zurueck', 'kunden')
}

export async function varianteLoeschenAction(formData: FormData) {
  const variantId = text(formData, 'variant_id')
  if (!UUID_RE.test(variantId)) zurueck({ status: 'ungueltig', meldung: 'Ungültiger Entwurf.' }, '', 'kunden')
  const ergebnis = await varianteLoeschen(await aktuellerViewer(), {
    variantId,
    bestaetigt: text(formData, 'bestaetigt') === 'ja',
  })
  zurueck(ergebnis, 'entwurf-geloescht', 'kunden')
}
