'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth, darfAnmeldelinkErhalten } from '@/lib/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    redirect('/login?fehler=ungueltig')
  }

  // Nur Kunden, die ich angelegt habe, bekommen einen Link. Unbekannte Adressen
  // und zu viele Anfragen erhalten nach außen dieselbe Meldung, damit niemand
  // ausprobieren kann, welche Adressen Kunden sind.
  if (await darfAnmeldelinkErhalten(email)) {
    try {
      await auth.api.signInMagicLink({ body: { email }, headers: await headers() })
    } catch (error) {
      console.error('Magic Link nicht versendet:', error)
    }
  } else {
    console.warn('Magic Link nicht versendet: unbekannte Adresse oder zu viele Anfragen')
  }

  redirect('/login?gesendet=1')
}

// Bestätigung per Formular (POST) statt direkt beim Öffnen des Links:
// Link-Scanner in Mailprogrammen rufen Links vorab auf und würden den
// Einmal-Token sonst verbrauchen.
export async function confirmLogin(formData: FormData) {
  const token = String(formData.get('token') ?? '')
  if (!token || token.length > 200) {
    redirect('/login?fehler=link')
  }

  try {
    // Ohne callbackURL antwortet Better Auth mit JSON statt Weiterleitung;
    // das Sitzungs-Cookie setzt das Plugin nextCookies.
    await auth.api.magicLinkVerify({ query: { token }, headers: await headers() })
  } catch (error) {
    // Ungültige oder abgelaufene Tokens meldet Better Auth als Weiterleitung mit Fehlercode.
    console.error('Login-Link ungültig:', error instanceof Error ? error.message : error)
    redirect('/login?fehler=link')
  }

  redirect('/portal')
}

export async function logout() {
  try {
    await auth.api.signOut({ headers: await headers() })
  } catch (error) {
    console.error('Abmelden fehlgeschlagen:', error)
  }
  redirect('/login')
}
