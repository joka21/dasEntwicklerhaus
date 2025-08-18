export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  category: string
  country: string
  authorId: string
  author: User
  createdAt: Date
  updatedAt: Date
  featured: boolean
  tags: string[]
  websiteUrl?: string
  githubUrl?: string
}

export interface Category {
  id: string
  name: string
  description: string
  color: string
}

export interface Country {
  code: string
  name: string
  flag: string
}