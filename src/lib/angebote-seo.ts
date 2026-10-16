import type { Metadata } from 'next'
import type { Faq } from '@/types/angebote'
import { anbieter } from '@/data/angebote'

// Die Live-Domain ist www.dasentwicklerhaus.de (die Adresse ohne www leitet
// dorthin um), deshalb zeigen Canonicals und JSON-LD auf www.
export const SITE_URL = 'https://www.dasentwicklerhaus.de'

const OG_BILD = {
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
export function angebotMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = absoluteUrl(path)
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
      images: [OG_BILD],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_BILD.url],
    },
  }
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const DIENSTLEISTER_ID = `${SITE_URL}/#dienstleister`

function orte(namen: string[]) {
  return namen.map((name) =>
    name === 'Niederrhein' ? { '@type': 'Place', name } : { '@type': 'City', name }
  )
}

export function professionalServiceLd() {
  const a = anbieter.adresse
  return {
    '@type': 'ProfessionalService',
    '@id': DIENSTLEISTER_ID,
    name: anbieter.name,
    description: anbieter.beschreibung,
    url: SITE_URL,
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
    areaServed: orte(anbieter.einzugsgebiet),
  }
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
