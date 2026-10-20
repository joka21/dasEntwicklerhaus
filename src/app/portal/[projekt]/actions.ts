'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { escapeHtml, sendAdminMail } from '@/lib/mail'
import { UUID_RE } from '@/lib/portal'
import { freigabeSpeichern, kommentarSpeichern } from '@/lib/portal/daten'
import { aktuellerViewer } from '@/lib/portal/viewer'

export type AktionsStatus = { ok: boolean; meldung: string } | null

// Link für die Benachrichtigung – auf der Domain, auf der der Kunde gerade
// ist (Live-Seite oder Preview).
async function portalLink(slug: string): Promise<string> {
  const origin = (await headers()).get('origin') ?? 'https://dasentwicklerhaus.de'
  return `${origin}/portal/${slug}`
}

function eingabe(formData: FormData) {
  const variantId = String(formData.get('variant_id') ?? '')
  const slug = String(formData.get('projekt') ?? '')
  return UUID_RE.test(variantId) && slug ? { variantId, slug } : null
}

const KEIN_ZUGRIFF: AktionsStatus = {
  ok: false,
  meldung: 'Ihre Sitzung ist abgelaufen oder die Variante wurde nicht gefunden. Bitte laden Sie die Seite neu.',
}

export async function kommentieren(_vorher: AktionsStatus, formData: FormData): Promise<AktionsStatus> {
  const text = String(formData.get('body') ?? '').trim()
  if (!text) return { ok: false, meldung: 'Bitte geben Sie einen Kommentar ein.' }
  if (text.length > 5000) return { ok: false, meldung: 'Der Kommentar ist zu lang (höchstens 5000 Zeichen).' }

  const ziel = eingabe(formData)
  if (!ziel) return KEIN_ZUGRIFF
  const viewer = await aktuellerViewer()
  const ergebnis = await kommentarSpeichern(viewer, { ...ziel, body: text })
  if (ergebnis.status === 'kein-zugriff' || !viewer) return KEIN_ZUGRIFF
  if (ergebnis.status !== 'ok') return { ok: false, meldung: 'Der Kommentar konnte nicht gespeichert werden.' }
  const k = ergebnis.kontext

  const link = await portalLink(k.projectSlug)
  await sendAdminMail({
    subject: `Kommentar: ${k.projectTitle} – ${k.variantTitle}`,
    html: `
      <p><strong>${escapeHtml(viewer.email)}</strong> hat die Variante
      <strong>${escapeHtml(k.variantTitle)}</strong> im Projekt
      <strong>${escapeHtml(k.projectTitle)}</strong> kommentiert:</p>
      <p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>
      <p><a href="${link}">Im Kundenportal ansehen</a></p>
    `,
    text: `${viewer.email} hat die Variante "${k.variantTitle}" im Projekt "${k.projectTitle}" kommentiert:\n\n${text}\n\n${link}`,
  })

  revalidatePath(`/portal/${k.projectSlug}`)
  return { ok: true, meldung: 'Danke! Ihr Kommentar wurde gespeichert.' }
}

export async function freigeben(_vorher: AktionsStatus, formData: FormData): Promise<AktionsStatus> {
  const ziel = eingabe(formData)
  if (!ziel) return KEIN_ZUGRIFF
  const viewer = await aktuellerViewer()
  const ergebnis = await freigabeSpeichern(viewer, ziel)
  if (ergebnis.status === 'kein-zugriff' || !viewer) return KEIN_ZUGRIFF
  if (ergebnis.status === 'schon-freigegeben') {
    return { ok: false, meldung: 'Für dieses Projekt wurde bereits eine Variante freigegeben.' }
  }
  if (ergebnis.status !== 'ok') return { ok: false, meldung: 'Die Freigabe konnte nicht gespeichert werden.' }
  const k = ergebnis.kontext

  const link = await portalLink(k.projectSlug)
  await sendAdminMail({
    subject: `Freigabe: ${k.projectTitle} – ${k.variantTitle}`,
    html: `
      <p><strong>${escapeHtml(viewer.email)}</strong> hat im Projekt
      <strong>${escapeHtml(k.projectTitle)}</strong> die Variante
      <strong>${escapeHtml(k.variantTitle)}</strong> freigegeben.</p>
      <p><a href="${link}">Im Kundenportal ansehen</a></p>
    `,
    text: `${viewer.email} hat im Projekt "${k.projectTitle}" die Variante "${k.variantTitle}" freigegeben.\n\n${link}`,
  })

  revalidatePath(`/portal/${k.projectSlug}`)
  return { ok: true, meldung: 'Vielen Dank! Die Variante ist freigegeben.' }
}
