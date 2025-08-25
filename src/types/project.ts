export interface Project {
  id: string
  name: string
  city: string
  description: string
  fullDescription: string
  category: 'menschen' | 'frieden' | 'umwelt' | 'zusammenarbeit' | 'zukunft'
  image: string
  slug: string
  status: 'aktiv' | 'geplant' | 'abgeschlossen'
  startDate: string
  teamSize: number
  contact: {
    name: string
    email: string
    phone?: string
  }
  socialMedia: {
    website?: string
    facebook?: string
    instagram?: string
    twitter?: string
  }
}