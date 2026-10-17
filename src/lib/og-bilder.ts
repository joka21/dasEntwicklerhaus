import { getZielgruppe, uebersicht } from '@/data/angebote'
import { startseite } from '@/data/startseite'
import { ueberMichSeite } from '@/data/ueber-mich'

// Seiten mit eigenem Open-Graph-Bild; erzeugt unter /og/<schlüssel>.
// Titel = H1 der Seite.
export const OG_SEITEN = {
  start: startseite.h1,
  angebote: uebersicht.h1,
  'website-fuer-vereine': getZielgruppe('website-fuer-vereine').h1,
  'website-fuer-handwerker': getZielgruppe('website-fuer-handwerker').h1,
  'onlineshop-erstellen': getZielgruppe('onlineshop-erstellen').h1,
  'ueber-mich': ueberMichSeite.h1,
  contact: 'Kostenloses Erstgespräch anfragen',
} as const

export type OgSeite = keyof typeof OG_SEITEN

export const OG_UNTERZEILE = 'Das Entwicklerhaus · Krefeld'
export const OG_GROESSE = { width: 1200, height: 630 }

export function ogBildPfad(seite: OgSeite): string {
  return `/og/${seite}`
}
