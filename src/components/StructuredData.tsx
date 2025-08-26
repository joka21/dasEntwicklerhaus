import Script from 'next/script'
import { Project } from '@/types/project'

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
    "description": "Plattform für innovative Projekte aus Europa - Vom Niederrhein bis Europa",
    "url": "https://dasentwicklerhaus.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dasentwicklerhaus.de/images/logo/logo-dasentwicklerhaus-1024x783.png",
      "width": 1024,
      "height": 783
    },
    "image": "https://dasentwicklerhaus.de/images/logo/logo-dasentwicklerhaus-1024x783.png",
    "sameAs": [
      "https://twitter.com/entwicklerhaus"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "0176 42463017",
      "contactType": "customer service",
      "email": "admin@dasentwicklerhaus.de",
      "availableLanguage": ["German", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Am Königshof 47",
      "addressLocality": "Krefeld",
      "postalCode": "47807",
      "addressRegion": "Nordrhein-Westfalen",
      "addressCountry": "DE"
    },
    "founder": {
      "@type": "Person",
      "name": "Josef Kalenberg"
    },
    "foundingDate": "2025",
    "knowsAbout": [
      "Innovation",
      "Projekte",
      "KI-Lösungen",
      "Soziale Initiativen",
      "Webportale",
      "DIY-Projekte",
      "Startup-Förderung",
      "Community Building"
    ],
    "areaServed": [
      {
        "@type": "Place",
        "name": "Niederrhein"
      },
      {
        "@type": "Place", 
        "name": "Nordrhein-Westfalen"
      },
      {
        "@type": "Place",
        "name": "Deutschland"
      },
      {
        "@type": "Place",
        "name": "Europa"
      }
    ]
  }

  return <StructuredData data={organizationData} />
}

export function ProjectSchema({ project }: { project: Project }) {
  const projectData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.description,
    "url": `https://dasentwicklerhaus.de/projects/${project.slug}`,
    "image": project.image,
    "dateCreated": project.startDate,
    "creator": {
      "@type": "Organization",
      "name": "Das Entwicklerhaus"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Das Entwicklerhaus"
    },
    "locationCreated": {
      "@type": "Place",
      "name": project.city
    },
    "about": project.category,
    "keywords": [
      project.category,
      project.city,
      "Innovation",
      "Projekt",
      "Europa"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": project.contact.email,
      "telephone": project.contact.phone,
      "name": project.contact.name
    }
  }

  return <StructuredData data={projectData} />
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