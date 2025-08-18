import Script from 'next/script'

interface StructuredDataProps {
  data: object
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Das Entwicklerhaus",
    "description": "Plattform für innovative Projekte aus Europa",
    "url": "https://dasentwicklerhaus.de",
    "logo": "https://dasentwicklerhaus.de/logo.png",
    "sameAs": [
      "https://twitter.com/entwicklerhaus"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "email": "info@dasentwicklerhaus.de",
      "availableLanguage": ["German", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Niederrhein",
      "addressCountry": "DE"
    },
    "foundingDate": "2024",
    "knowsAbout": [
      "Innovation",
      "Projekte",
      "KI-Lösungen",
      "Soziale Initiativen",
      "Webportale",
      "DIY-Projekte"
    ]
  }

  return <StructuredData data={organizationData} />
}

export function WebSiteSchema() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Das Entwicklerhaus",
    "url": "https://dasentwicklerhaus.de",
    "description": "Entdecken Sie innovative Projekte aus Europa: KI-Lösungen, soziale Initiativen, Webportale und DIY-Vorhaben. Vom Niederrhein bis Europa.",
    "inLanguage": "de-DE",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dasentwicklerhaus.de/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Das Entwicklerhaus"
    }
  }

  return <StructuredData data={websiteData} />
}