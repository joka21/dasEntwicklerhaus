import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projekte aus Krefeld & NRW – KI, Innovation und Nachhaltigkeit vom Niederrhein',
  description: 'Innovative Projekte aus Krefeld, dem Niederrhein und NRW: KI-Lösungen, Nachhaltigkeit, Startups und Zusammenarbeit. Entdecke, was in der Region entsteht.',
  openGraph: {
    title: 'Projekte aus Krefeld & NRW – KI, Innovation und Nachhaltigkeit vom Niederrhein',
    description: 'Innovative Projekte aus Krefeld, dem Niederrhein und NRW: KI-Lösungen, Nachhaltigkeit, Startups und Zusammenarbeit. Entdecke, was in der Region entsteht.',
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