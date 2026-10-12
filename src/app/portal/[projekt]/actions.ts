'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { escapeHtml, sendAdminMail } from '@/lib/mail'
import { UUID_RE } from '@/lib/portal'

export type AktionsStatus = { ok: boolean; meldung: string } | null

// Link für die Benachrichtigung – auf der Domain, auf der der Kunde gerade
// ist (Live-Seite oder Preview).
async function portalLink(slug: string): Promise<string> {
  const origin = (await headers()).get('origin') ?? 'https://dasentwicklerhaus.de'
  return `${origin}/portal/${slug}`
}

interface VarianteMitProjekt {
  id: string
  title: string
  project_id: string
  portal_projects: { slug: string; title: string }
}

// Lädt die Variante unter RLS und prüft, dass sie zum Projekt aus der URL gehört.
async function ladeKontext(formData: FormData) {
  const variantId = String(formData.get('variant_id') ?? '')
  const slug = String(formData.get('projekt') ?? '')
  if (!UUID_RE.test(variantId) || !slug) return null

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('portal_design_variants')
    .select('id, title, project_id, portal_projects!inner(slug, title)')
    .eq('id', variantId)
    .eq('portal_projects.slug', slug)
    .maybeSingle()
  if (!data) return null

  return { supabase, user, variante: data as unknown as VarianteMitProjekt }
}

const KEIN_ZUGRIFF: AktionsStatus = {
  ok: false,
  meldung: 'Ihre Sitzung ist abgelaufen oder die Variante wurde nicht gefunden. Bitte laden Sie die Seite neu.',
}

export async function kommentieren(_vorher: AktionsStatus, formData: FormData): Promise<AktionsStatus> {
  const text = String(formData.get('body') ?? '').trim()
  if (!text) return { ok: false, meldung: 'Bitte geben Sie einen Kommentar ein.' }
  if (text.length > 5000) return { ok: false, meldung: 'Der Kommentar ist zu lang (höchstens 5000 Zeichen).' }

  const kontext = await ladeKontext(formData)
  if (!kontext) return KEIN_ZUGRIFF
  const { supabase, user, variante } = kontext

  const { error } = await supabase.from('portal_variant_comments').insert({ variant_id: variante.id, body: text })
  if (error) {
    console.error('Kommentar nicht gespeichert:', error.code, error.message)
    return { ok: false, meldung: 'Der Kommentar konnte nicht gespeichert werden.' }
  }

  const link = await portalLink(variante.portal_projects.slug)
  await sendAdminMail({
    subject: `Kommentar: ${variante.portal_projects.title} – ${variante.title}`,
    html: `
      <p><strong>${escapeHtml(user.email ?? '')}</strong> hat die Variante
      <strong>${escapeHtml(variante.title)}</strong> im Projekt
      <strong>${escapeHtml(variante.portal_projects.title)}</strong> kommentiert:</p>
      <p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>
      <p><a href="${link}">Im Kundenportal ansehen</a></p>
    `,
    text: `${user.email} hat die Variante "${variante.title}" im Projekt "${variante.portal_projects.title}" kommentiert:\n\n${text}\n\n${link}`,
  })

  revalidatePath(`/portal/${variante.portal_projects.slug}`)
  return { ok: true, meldung: 'Danke! Ihr Kommentar wurde gespeichert.' }
}

export async function freigeben(_vorher: AktionsStatus, formData: FormData): Promise<AktionsStatus> {
  const kontext = await ladeKontext(formData)
  if (!kontext) return KEIN_ZUGRIFF
  const { supabase, user, variante } = kontext

  const { error } = await supabase
    .from('portal_project_approvals')
    .insert({ project_id: variante.project_id, variant_id: variante.id })
  if (error) {
    // 23505: Primärschlüssel project_id – es gibt schon eine Freigabe.
    if (error.code === '23505') {
      return { ok: false, meldung: 'Für dieses Projekt wurde bereits eine Variante freigegeben.' }
    }
    console.error('Freigabe nicht gespeichert:', error.code, error.message)
    return { ok: false, meldung: 'Die Freigabe konnte nicht gespeichert werden.' }
  }

  const link = await portalLink(variante.portal_projects.slug)
  await sendAdminMail({
    subject: `Freigabe: ${variante.portal_projects.title} – ${variante.title}`,
    html: `
      <p><strong>${escapeHtml(user.email ?? '')}</strong> hat im Projekt
      <strong>${escapeHtml(variante.portal_projects.title)}</strong> die Variante
      <strong>${escapeHtml(variante.title)}</strong> freigegeben.</p>
      <p><a href="${link}">Im Kundenportal ansehen</a></p>
    `,
    text: `${user.email} hat im Projekt "${variante.portal_projects.title}" die Variante "${variante.title}" freigegeben.\n\n${link}`,
  })

  revalidatePath(`/portal/${variante.portal_projects.slug}`)
  return { ok: true, meldung: 'Vielen Dank! Die Variante ist freigegeben.' }
}
