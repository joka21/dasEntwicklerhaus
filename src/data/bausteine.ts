export type Abrechnung = 'einmalig' | 'monatlich' | 'kostenlos'

export interface Baustein {
  slug: string
  stufe: number
  titel: string
  kurztext: string
  abrechnung: Abrechnung
  /** Pfad der passenden Leistungsseite, falls es eine gibt */
  leistungsseite: string | null
}

export interface Zusatzbaustein {
  slug: string
  titel: string
  kurztext: string
  abrechnung: Abrechnung
  leistungsseite: string | null
}

// Es gibt bewusst kein Preisfeld – überall wird „Preis auf Anfrage" angezeigt.
export const PREIS_HINWEIS = 'Preis auf Anfrage'

export const ABRECHNUNG_LABEL: Record<Abrechnung, string> = {
  einmalig: 'einmalig',
  monatlich: 'monatlich',
  kostenlos: 'kostenlos',
}

// TODO: Abrechnungsart je Stufe prüfen – vorläufig gesetzt, nicht vorgegeben.
export const bausteine: Baustein[] = [
  {
    slug: 'eintrag-im-portal',
    stufe: 1,
    titel: 'Eintrag im Portal',
    kurztext: '[Platzhalter: Kurztext „Eintrag im Portal"]',
    abrechnung: 'kostenlos',
    leistungsseite: null,
  },
  {
    slug: 'portraet-im-portal',
    stufe: 2,
    titel: 'Porträt im Portal',
    kurztext: '[Platzhalter: Kurztext „Porträt im Portal"]',
    abrechnung: 'einmalig',
    leistungsseite: null,
  },
  {
    slug: 'eigene-website',
    stufe: 3,
    titel: 'Eigene Website',
    kurztext: '[Platzhalter: Kurztext „Eigene Website"]',
    abrechnung: 'einmalig',
    leistungsseite: null,
  },
  {
    slug: 'onlineshop',
    stufe: 4,
    titel: 'Onlineshop',
    kurztext: '[Platzhalter: Kurztext „Onlineshop"]',
    abrechnung: 'einmalig',
    leistungsseite: '/onlineshop-erstellen',
  },
  {
    slug: 'marketing',
    stufe: 5,
    titel: 'Marketing',
    kurztext: '[Platzhalter: Kurztext „Marketing"]',
    abrechnung: 'monatlich',
    leistungsseite: '/online-marketing',
  },
  {
    slug: 'betreuung',
    stufe: 6,
    titel: 'Betreuung',
    kurztext: '[Platzhalter: Kurztext „Betreuung"]',
    abrechnung: 'monatlich',
    leistungsseite: null,
  },
]

// TODO: Abrechnungsart je Zusatzbaustein prüfen – vorläufig gesetzt.
export const zusatzbausteine: Zusatzbaustein[] = [
  {
    slug: 'produkttexte',
    titel: 'Produkttexte',
    kurztext: '[Platzhalter: Kurztext „Produkttexte"]',
    abrechnung: 'einmalig',
    leistungsseite: '/onlineshop-erstellen',
  },
  {
    slug: 'produktfotos',
    titel: 'Produktfotos',
    kurztext: '[Platzhalter: Kurztext „Produktfotos"]',
    abrechnung: 'einmalig',
    leistungsseite: '/onlineshop-erstellen',
  },
  {
    slug: 'ki-assistent',
    titel: 'KI-Assistent',
    kurztext: '[Platzhalter: Kurztext „KI-Assistent"]',
    abrechnung: 'monatlich',
    leistungsseite: '/app-und-ki-entwicklung',
  },
]

/** Preis-/Abrechnungszeile für die Anzeige, z. B. „einmalig · Preis auf Anfrage". */
export function preisZeile(abrechnung: Abrechnung): string {
  return abrechnung === 'kostenlos'
    ? ABRECHNUNG_LABEL.kostenlos
    : `${ABRECHNUNG_LABEL[abrechnung]} · ${PREIS_HINWEIS}`
}

/** Titel zu einem Slug (Stufe oder Zusatzbaustein), z. B. für das Kontaktformular. */
export function bausteinTitel(slug: string): string | undefined {
  return (
    bausteine.find((b) => b.slug === slug)?.titel ??
    zusatzbausteine.find((z) => z.slug === slug)?.titel
  )
}
