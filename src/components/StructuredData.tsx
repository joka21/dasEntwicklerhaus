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
    "name": "Das Entwicklerhaus",
    "url": "https://dasentwicklerhaus.de",
    "description": "Dein Projekt verdient es, gesehen zu werden. Eine Plattform für innovative Ideen aus Europa – KI, Startups, soziale Initiativen. Ehrlich, transparent, echt.",
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
      "@type": "Person",
      "name": post.author.name,
      "image": post.author.avatar || ""
    },
    "publisher": {
      "@type": "Organization",
      "name": "Das Entwicklerhaus",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dasentwicklerhaus.de/images/logo/logo-dasentwicklerhaus-1024x783.png"
      }
    },
    "url": `https://dasentwicklerhaus.de/blog/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dasentwicklerhaus.de/blog/${post.slug}`
    },
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