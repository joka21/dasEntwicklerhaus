import { projekteSeite } from '@/data/projects'
import { angebotMetadata } from '@/lib/angebote-seo'

export const metadata = angebotMetadata({ ...projekteSeite.seo, path: '/projects' })

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
