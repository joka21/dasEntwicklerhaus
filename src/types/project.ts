export interface Project {
  id: string
  name: string
  city: string
  description: string
  fullDescription: string
  category: 'menschen' | 'frieden' | 'umwelt' | 'zusammenarbeit' | 'zukunft'
  image: string
  slug: string
  /** Eigenes Projekt oder vorgestelltes Unternehmen (keine Kundenprojekte) */
  art: 'eigen' | 'inspiration'
  /** Titelteil für <title> (ohne Marke); sonst „Name (Ort)“ */
  seoTitel?: string
  status: 'aktiv' | 'geplant' | 'abgeschlossen'
  startDate: string
  teamSize: number
  contact?: {
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

/** Daten für eine Projektkarte; extern = Link auf eine fremde Website */
export interface ProjektKarte {
  name: string
  city: string
  description: string
  category: Project['category']
  image: string
  href: string
  extern?: boolean
}
