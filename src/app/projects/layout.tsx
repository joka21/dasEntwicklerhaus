import { projekteSeite } from '@/data/projects'
import type { Metadata } from 'next'
import { angebotMetadata, TITEL_VORLAGE } from '@/lib/angebote-seo'

// Ein Titel als einfacher Text würde die Vorlage für /projects/* zurücksetzen,
// deshalb Vorlage hier erneut setzen. default gilt für /projects selbst und
// bekommt die Marke über die Vorlage aus dem Root-Layout.
export const metadata: Metadata = {
  ...angebotMetadata({ ...projekteSeite.seo, path: '/projects' }),
  title: { default: projekteSeite.seo.title, template: TITEL_VORLAGE },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
