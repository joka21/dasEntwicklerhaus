export interface Project {
  id: string
  name: string
  city: string
  description: string
  category: 'menschen' | 'frieden' | 'umwelt' | 'zusammenarbeit' | 'zukunft'
  image: string
}