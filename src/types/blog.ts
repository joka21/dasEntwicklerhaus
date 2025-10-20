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
  readTime: number // in Minuten
  image: string
  tags: string[]
  featured?: boolean
}

export type BlogCategory = 'alle' | 'startups' | 'nachhaltigkeit' | 'ki'
