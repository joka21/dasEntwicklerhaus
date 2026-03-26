import Script from 'next/script'
import { Project } from '@/types/project'
import { BlogPost as BlogPostType } from '@/types/blog'

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
  const graphData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.dasentwicklerhaus.de/#organization",
        "name": "Das Entwicklerhaus",
        "url": "https://www.dasentwicklerhaus.de",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.dasentwicklerhaus.de/images/logo/logo-Klein.webp"
        },
        "description": "Das Entwicklerhaus in Krefeld am Niederrhein – Plattform für KI-Projekte, Startups und Innovation aus NRW, Deutschland und Europa.",
        "image": "https://www.dasentwicklerhaus.de/images/logo/logo-dasentwicklerhaus-1024x783.png",
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
          "@id": "https://www.dasentwicklerhaus.de/#person"
        },
        "foundingDate": "2025",
        "areaServed": [
          {
            "@type": "City",
            "name": "Krefeld",
            "containedInPlace": {
              "@type": "State",
              "name": "Nordrhein-Westfalen"
            }
          },
          {
            "@type": "AdministrativeArea",
            "name": "Niederrhein"
          },
          {
            "@type": "State",
            "name": "Nordrhein-Westfalen",
            "alternateName": "NRW"
          },
          "DE",
          "EU"
        ],
        "foundingLocation": {
          "@type": "Place",
          "name": "Krefeld, Niederrhein, NRW",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 51.3388,
            "longitude": 6.5853
          }
        },
        "knowsAbout": [
          "KI-Projekte Krefeld",
          "Innovation Niederrhein",
          "Startups NRW",
          "Webentwicklung Krefeld",
          "KI-Lösungen",
          "Soziale Initiativen",
          "Digitale Transformation NRW",
          "Community Building Niederrhein"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://www.dasentwicklerhaus.de/#person",
        "name": "Josef Kalenberg",
        "jobTitle": "Gründer & Webentwickler",
        "url": "https://www.dasentwicklerhaus.de/dieidee",
        "worksFor": {
          "@id": "https://www.dasentwicklerhaus.de/#organization"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Krefeld",
          "addressRegion": "Nordrhein-Westfalen",
          "addressCountry": "DE"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.dasentwicklerhaus.de/#localbusiness",
        "name": "Das Entwicklerhaus",
        "description": "Plattform für KI-Projekte, Startups und digitale Innovation in Krefeld am Niederrhein.",
        "url": "https://www.dasentwicklerhaus.de",
        "telephone": "0176 42463017",
        "email": "admin@dasentwicklerhaus.de",
        "image": "https://www.dasentwicklerhaus.de/images/logo/logo-dasentwicklerhaus-1024x783.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Am Königshof 47",
          "addressLocality": "Krefeld",
          "postalCode": "47807",
          "addressRegion": "Nordrhein-Westfalen",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.3388,
          "longitude": 6.5853
        },
        "areaServed": ["Krefeld", "Niederrhein", "NRW", "Deutschland"],
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ]
  }

  return <StructuredData data={graphData} />
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
      "name": "Das Entwicklerhaus",
      "email": "admin@dasentwicklerhaus.de"
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
    ]
  }

  return <StructuredData data={projectData} />
}

export function WebSiteSchema() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.dasentwicklerhaus.de/#website",
    "url": "https://www.dasentwicklerhaus.de",
    "name": "Das Entwicklerhaus",
    "publisher": {
      "@id": "https://www.dasentwicklerhaus.de/#organization"
    },
    "inLanguage": "de-DE"
  }

  return <StructuredData data={websiteData} />
}

export function BlogPostSchema({ post }: { post: BlogPostType }) {
  const blogPostData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.publishedDate,
    "dateModified": post.publishedDate,
    "author": {
      "@id": "https://www.dasentwicklerhaus.de/#person"
    },
    "publisher": {
      "@id": "https://www.dasentwicklerhaus.de/#organization"
    },
    "url": `https://www.dasentwicklerhaus.de/blog/${post.slug}`,
    "mainEntityOfPage": `https://www.dasentwicklerhaus.de/blog/${post.slug}`,
    "keywords": post.tags.join(', '),
    "articleSection": "Blog",
    "inLanguage": "de-DE",
    "timeRequired": `PT${post.readTime}M`
  }

  return <StructuredData data={blogPostData} />
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return <StructuredData data={breadcrumbData} />
}