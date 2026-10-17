import type { Metadata } from 'next'
import type { Faq } from '@/types/angebote'
import { anbieter } from '@/data/angebote'
import { person, ueberMichSeite } from '@/data/ueber-mich'
import { OG_GROESSE, ogBildPfad, type OgSeite } from '@/lib/og-bilder'

// Die Live-Domain ist www.dasentwicklerhaus.de (die Adresse ohne www leitet
// dorthin um), deshalb zeigen Canonicals und JSON-LD auf www.
export const SITE_URL = 'https://www.dasentwicklerhaus.de'

export const OG_BILD = {
  url: `${SITE_URL}/images/logo/logo-dasentwicklerhaus-1024x783.png`,
  width: 1024,
  height: 783,
  alt: 'Das Entwicklerhaus Logo',
}

export function absoluteUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

// title.absolute, damit das Template aus dem Root-Layout nicht noch einmal
// „| Das Entwicklerhaus Krefeld“ anhängt.
/** Eigenes Open-Graph-Bild (aus /og/…) statt Logo */
export function ogBild(seite: OgSeite, alt: string) {
  return { url: absoluteUrl(ogBildPfad(seite)), ...OG_GROESSE, alt }
}

export function angebotMetadata({
  title,
  description,
  path,
  og,
}: {
  title: string
  description: string
  path: string
  /** Seite mit eigenem Open-Graph-Bild; sonst das Logo */
  og?: OgSeite
}): Metadata {
  const url = absoluteUrl(path)
  const bild = og ? ogBild(og, title) : OG_BILD
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: anbieter.name,
      title,
      description,
      url,
      images: [bild],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [bild.url],
    },
  }
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

export const DIENSTLEISTER_ID = `${SITE_URL}/#dienstleister`
export const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

/** Verweis auf den Dienstleister für Knoten auf Seiten ohne eigenen ProfessionalService-Knoten */
const DIENSTLEISTER_VERWEIS = { '@type': 'ProfessionalService', '@id': DIENSTLEISTER_ID, name: anbieter.name }

const ORTSTYP: Record<string, string> = {
  Niederrhein: 'Place',
  'Nordrhein-Westfalen': 'State',
}

function orte(namen: string[]) {
  return namen.map((name) => ({ '@type': ORTSTYP[name] ?? 'City', name }))
}

/** Angebot für `makesOffer`; verweist auf den Service-Knoten der Angebotsseite */
export interface LdAngebot {
  name: string
  path: string
}

export function professionalServiceLd({
  areaServed = anbieter.einzugsgebiet,
  angebote,
}: { areaServed?: string[]; angebote?: LdAngebot[] } = {}) {
  const a = anbieter.adresse
  return {
    '@type': 'ProfessionalService',
    '@id': DIENSTLEISTER_ID,
    name: anbieter.name,
    description: anbieter.beschreibung,
    url: SITE_URL,
    telephone: anbieter.telefon,
    email: anbieter.email,
    image: OG_BILD.url,
    logo: `${SITE_URL}/images/logo/logo-Klein.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.strasse,
      postalCode: a.plz,
      addressLocality: a.ort,
      addressRegion: a.region,
      addressCountry: a.land,
    },
    areaServed: orte(areaServed),
    founder: { '@id': PERSON_ID },
    ...(angebote && {
      makesOffer: angebote.map((o) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${absoluteUrl(o.path)}#service`,
          name: o.name,
          url: absoluteUrl(o.path),
        },
      })),
    }),
  }
}

// Person und WebSite stehen im Root-Layout und damit auf jeder Seite.
export function personLd() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.beschreibung,
    url: absoluteUrl(`/${ueberMichSeite.slug}`),
    ...(person.foto && { image: absoluteUrl(person.foto) }),
    worksFor: DIENSTLEISTER_VERWEIS,
    address: {
      '@type': 'PostalAddress',
      addressLocality: anbieter.adresse.ort,
      addressRegion: anbieter.adresse.region,
      addressCountry: anbieter.adresse.land,
    },
  }
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: anbieter.name,
    inLanguage: 'de-DE',
    publisher: DIENSTLEISTER_VERWEIS,
  }
}

export function aboutPageLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    '@type': 'AboutPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'de-DE',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  }
}

/** Herausgeber für BlogPosting & Co. */
export function herausgeberLd() {
  return { ...DIENSTLEISTER_VERWEIS, logo: `${SITE_URL}/images/logo/logo-Klein.webp` }
}

export function serviceLd({
  name,
  description,
  serviceType,
  path,
  areaServed,
}: {
  name: string
  description: string
  serviceType: string
  path: string
  areaServed: string[]
}) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { '@id': DIENSTLEISTER_ID },
    areaServed: orte(areaServed),
  }
}

export function faqPageLd(faqs: Faq[], path: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.frage,
      acceptedAnswer: { '@type': 'Answer', text: f.antwort },
    })),
  }
}

export interface Krume {
  name: string
  path: string
}

export function breadcrumbLd(krumen: Krume[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: krumen.map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k.name,
      item: absoluteUrl(k.path),
    })),
  }
}

/** Fasst mehrere Knoten zu einem @graph zusammen und maskiert „<“ gegen XSS */
export function jsonLdString(knoten: object[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': knoten }).replace(
    /</g,
    '\\u003c'
  )
}
