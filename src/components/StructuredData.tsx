import Script from 'next/script'
import { Project } from '@/types/project'
import { BlogPost as BlogPostType } from '@/types/blog'
import { herausgeberLd, PERSON_ID } from '@/lib/angebote-seo'

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

export function ProjectSchema({ project }: { project: Project }) {
  const projectData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.description,
    "url": `https://www.dasentwicklerhaus.de/projects/${project.slug}`,
    "image": project.image,
    "dateCreated": project.startDate,
    // Vorgestellte Unternehmen sind nicht vom Entwicklerhaus
    "creator": project.art === 'eigen'
      ? { "@id": PERSON_ID }
      : { "@type": "Organization", "name": project.name },
    "publisher": herausgeberLd(),
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
      "@id": PERSON_ID
    },
    "publisher": herausgeberLd(),
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