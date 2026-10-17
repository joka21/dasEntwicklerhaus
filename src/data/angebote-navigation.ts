import type { KontaktThema, ZielgruppenSlug } from '@/types/angebote'

// Eigene kleine Datei, damit Header und Kontaktformular (Client-Komponenten)
// nicht alle Seitentexte aus angebote.ts ins Browser-Bundle ziehen.

/** Vorbelegung des Projektfelds auf der Kontaktseite je ?thema= */
export const KONTAKT_THEMEN: Record<KontaktThema, string> = {
  verein: 'Website für unseren Verein',
  handwerk: 'Website für unseren Handwerksbetrieb',
  onlineshop: 'Onlineshop',
}

export const ANGEBOTE_UEBERSICHT = { href: '/angebote', label: 'Angebote', alleLabel: 'Alle Angebote' } as const

export const UEBER_MICH_NAV = { slug: 'ueber-mich', href: '/ueber-mich', label: 'Über mich' } as const

export const ZIELGRUPPEN_NAV: { slug: ZielgruppenSlug; href: string; label: string }[] = [
  { slug: 'website-fuer-vereine', href: '/website-fuer-vereine', label: 'Website für Vereine' },
  { slug: 'website-fuer-handwerker', href: '/website-fuer-handwerker', label: 'Website für Handwerker' },
  { slug: 'onlineshop-erstellen', href: '/onlineshop-erstellen', label: 'Onlineshop erstellen' },
]

export function navLabel(slug: ZielgruppenSlug): string {
  return ZIELGRUPPEN_NAV.find((z) => z.slug === slug)!.label
}
