'use client'

import { useSearchParams } from 'next/navigation'
import ContactForm from '@/components/ContactForm'
import { KONTAKT_THEMEN } from '@/data/angebote-navigation'
import type { KontaktThema } from '@/types/angebote'

// Belegt das Projektfeld vor, wenn die Kontaktseite mit ?thema=verein,
// ?thema=handwerk oder ?thema=onlineshop aufgerufen wird.
export default function ContactFormMitThema() {
  const thema = useSearchParams().get('thema')
  const projekt = thema && thema in KONTAKT_THEMEN ? KONTAKT_THEMEN[thema as KontaktThema] : ''
  return <ContactForm key={projekt} initialProject={projekt} />
}
