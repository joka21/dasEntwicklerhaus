export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'startups' | 'nachhaltigkeit' | 'ki'
  author: {
    name: string
    role: string
    avatar?: string
  }
  publishedDate: string
  /** false = noindex und nicht in der Sitemap */
  indexieren: boolean
  readTime: number // in Minuten
  image: string
  tags: string[]
  featured?: boolean
}

export type BlogCategory = 'alle' | 'startups' | 'nachhaltigkeit' | 'ki'
