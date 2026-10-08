import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'

interface StructuredDataProps {
  data: object
}

export default function StructuredData({ data }: StructuredDataProps) {
  // Normales <script> statt next/script: Das JSON-LD steht so direkt im
  // ausgelieferten HTML, und mehrere Blöcke pro Seite werden nicht dedupliziert.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`

// Nur Angaben aus dem Impressum (src/app/impressum/page.tsx) – bei Änderungen
// dort hier mitpflegen.
export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: '0176 42463017',
    email: 'admin@dasentwicklerhaus.de',
    image: absoluteUrl('/images/logo/logo-dasentwicklerhaus-1024x783.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Königshof 47',
      postalCode: '47807',
      addressLocality: 'Krefeld',
      addressCountry: 'DE',
    },
  }

  return <StructuredData data={data} />
}

interface ServiceSchemaProps {
  name: string
  description: string
  path: string
  areaServed?: string[]
}

export function ServiceSchema({ name, description, path, areaServed }: ServiceSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': LOCAL_BUSINESS_ID, '@type': 'LocalBusiness', name: SITE_NAME },
    ...(areaServed?.length && {
      areaServed: areaServed.map((ort) => ({ '@type': 'Place', name: ort })),
    }),
  }

  return <StructuredData data={data} />
}

interface BreadcrumbItem {
  name: string
  path: string
}

/** BreadcrumbList; „Startseite" wird automatisch vorangestellt. */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ name: 'Startseite', path: '/' }, ...items]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }

  return <StructuredData data={data} />
}
