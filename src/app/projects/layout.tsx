import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projekte – Ideen und Innovationen aus Deutschland & Europa',
  description: '12 Projekte aus den Bereichen KI, Nachhaltigkeit, Zusammenarbeit und Zukunft. Entdecke, was gerade entsteht.',
  openGraph: {
    title: 'Projekte – Ideen und Innovationen aus Deutschland & Europa',
    description: '12 Projekte aus den Bereichen KI, Nachhaltigkeit, Zusammenarbeit und Zukunft. Entdecke, was gerade entsteht.',
    url: 'https://dasentwicklerhaus.de/projects',
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de/projects',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}