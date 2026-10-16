// Typen für die Angebotsseiten. Die Inhalte liegen getrennt in
// src/data/angebote.ts, damit sie später aus einem Headless-CMS kommen können.

export type ZielgruppenSlug =
  | 'website-fuer-vereine'
  | 'website-fuer-handwerker'
  | 'onlineshop-erstellen'

/** Wert für den Parameter ?thema= auf der Kontaktseite */
export type KontaktThema = 'verein' | 'handwerk' | 'onlineshop'

export interface SeoTexte {
  title: string
  description: string
}

export interface Faq {
  frage: string
  antwort: string
}

export interface Abschnitt {
  titel: string
  text: string
}

export interface Paket {
  /** z. B. „Paket“ oder „Stufe 1“ */
  bezeichnung: string
  name: string
  fuerWen: string
  /** Name des Pakets, dessen Leistungen vollständig enthalten sind */
  basiertAuf?: string
  leistungen: string[]
  empfohlen?: boolean
}

export interface Schritt {
  titel: string
  text: string
}

export interface Zielgruppe {
  slug: ZielgruppenSlug
  thema: KontaktThema
  /** Kurzname für Navigation und Breadcrumbs */
  navLabel: string
  seo: SeoTexte
  h1: string
  intro: string
  /** Karte auf der Übersichtsseite */
  karte: { titel: string; text: string }
  paketeTitel: string
  pakete: Paket[]
  /** Weitere Abschnitte zwischen Paketen und Betreuung (z. B. Premium-Option) */
  zusatzAbschnitte: Abschnitt[]
  betreuung: Abschnitt
  module: { titel: string; eintraege: string[] }
  faqs: Faq[]
  /** Angaben für JSON-LD `Service` */
  serviceTyp: string
  /** Muster für die Städteseiten; {stadt} wird ersetzt */
  stadtMuster: {
    h1: string
    lokaleBeispieleTitel: string
  }
}

export interface Uebersicht {
  slug: 'angebote'
  navLabel: string
  seo: SeoTexte
  h1: string
  intro: string
  kartenTitel: string
  gemeinsam: { titel: string; punkte: string[] }
  ablauf: { titel: string; schritte: Schritt[] }
  preisHinweis: string
}

export interface Stadt {
  name: string
  slug: string
}

export interface Referenz {
  titel: string
  text: string
  url?: string
}

export interface Stadtseite {
  zielgruppe: ZielgruppenSlug
  stadt: string
  slug: string
  titel: string
  description: string
  /** Eigener Absatz mit lokalem Bezug */
  einleitungLokal: string
  /** Vereinsarten, Branchen oder Einkaufslagen in der Stadt */
  lokaleBeispiele: string[]
  /** Mindestens zwei eigene Fragen */
  faqLokal: Faq[]
  /** Nur echte Projekte mit Freigabe */
  referenz: Referenz | null
  /** Nur veröffentlichte Seiten werden gebaut, verlinkt und in die Sitemap aufgenommen */
  veroeffentlicht: boolean
}

export interface CtaTexte {
  titel: string
  text: string
  buttonAnfrage: string
  buttonAnrufen: string
  /** Telefonnummer im Format für tel:-Links; null blendet den Button aus */
  telefon: string | null
  telefonAnzeige: string | null
  kontaktPfad: string
}
