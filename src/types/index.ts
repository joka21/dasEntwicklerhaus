export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
}

export type CategoryKey = 'menschen' | 'frieden' | 'umwelt' | 'zusammenarbeit' | 'zukunft'

export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  category: CategoryKey
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
  id: CategoryKey
  name: string
  description: string
  color: string
  icon?: string
}

export interface CategoryColors {
  primary: string
  soft: string
  hover: string
  focus: string
  text: string
}

export type CategoryColorsMap = {
  [K in CategoryKey]: CategoryColors
}

export interface Country {
  code: string
  name: string
  flag: string
}

// Category color mappings for Tailwind classes
export const CATEGORY_COLORS: CategoryColorsMap = {
  menschen: {
    primary: 'menschen',
    soft: 'menschen-soft',
    hover: 'menschen-hover',
    focus: 'menschen-focus',
    text: 'menschen-800'
  },
  frieden: {
    primary: 'frieden',
    soft: 'frieden-soft',
    hover: 'frieden-hover',
    focus: 'frieden-focus',
    text: 'frieden-800'
  },
  umwelt: {
    primary: 'umwelt',
    soft: 'umwelt-soft',
    hover: 'umwelt-hover',
    focus: 'umwelt-focus',
    text: 'umwelt-800'
  },
  zusammenarbeit: {
    primary: 'zusammenarbeit',
    soft: 'zusammenarbeit-soft',
    hover: 'zusammenarbeit-hover',
    focus: 'zusammenarbeit-focus',
    text: 'zusammenarbeit-100'
  },
  zukunft: {
    primary: 'zukunft',
    soft: 'zukunft-soft',
    hover: 'zukunft-hover',
    focus: 'zukunft-focus',
    text: 'zukunft-800'
  }
}

// Category metadata
export const CATEGORIES: Category[] = [
  {
    id: 'menschen',
    name: 'Menschen',
    description: 'Projekte für und mit Menschen - Bildung, Gesundheit, soziale Innovation',
    color: '#FFCD00'
  },
  {
    id: 'frieden',
    name: 'Frieden',
    description: 'Friedensarbeit, Konfliktlösung und gesellschaftlicher Zusammenhalt',
    color: '#BA5FA1'
  },
  {
    id: 'umwelt',
    name: 'Umwelt',
    description: 'Nachhaltigkeit, Klimaschutz und Umweltschutzprojekte',
    color: '#73B958'
  },
  {
    id: 'zusammenarbeit',
    name: 'Zusammenarbeit',
    description: 'Kooperative Projekte, Netzwerke und Gemeinschaftsinitiativen',
    color: '#203A8F'
  },
  {
    id: 'zukunft',
    name: 'Zukunft',
    description: 'Innovation, Technologie und zukunftsweisende Lösungen',
    color: '#65BBE1'
  }
]