'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LINK_TYPES: EmailOtpType[] = ['email', 'magiclink', 'invite']

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    redirect('/login?fehler=ungueltig')
  }

  const supabase = await createClient()
  // shouldCreateUser: false – nur Kunden, die ich angelegt habe, bekommen einen Link.
  // emailRedirectTo = aktuelle Domain (Preview, localhost). Steht sie nicht auf
  // der Redirect-Liste in Supabase, nimmt Supabase die Site URL.
  const origin = (await headers()).get('origin') ?? undefined
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false, emailRedirectTo: origin },
  })

  // Unbekannte Adressen liefern einen Fehler. Nach außen trotzdem dieselbe
  // Meldung, damit niemand ausprobieren kann, welche Adressen Kunden sind.
  if (error) {
    console.error('Magic Link nicht versendet:', error.code ?? error.status, error.message)
  }

  redirect('/login?gesendet=1')
}

// Bestätigung per Formular (POST) statt direkt beim Öffnen des Links:
// Link-Scanner in Mailprogrammen rufen Links vorab auf und würden den
// Einmal-Token sonst verbrauchen.
export async function confirmLogin(formData: FormData) {
  const tokenHash = String(formData.get('token_hash') ?? '')
  const type = String(formData.get('type') ?? '') as EmailOtpType
  if (!tokenHash || !LINK_TYPES.includes(type)) {
    redirect('/login?fehler=link')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
  if (error) {
    console.error('Login-Link ungültig:', error.code ?? error.status, error.message)
    redirect('/login?fehler=link')
  }

  redirect('/portal')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
