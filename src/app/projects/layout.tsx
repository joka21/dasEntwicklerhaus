import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alle Projekte - Das Entwicklerhaus | Innovative Projekte entdecken',
  description: 'Entdecken Sie alle innovativen Projekte bei Das Entwicklerhaus: KI-Lösungen, soziale Initiativen, Webportale, DIY-Vorhaben und mehr aus Europa.',
  openGraph: {
    title: 'Alle Projekte - Das Entwicklerhaus',
    description: 'Entdecken Sie alle innovativen Projekte bei Das Entwicklerhaus: KI-Lösungen, soziale Initiativen, Webportale, DIY-Vorhaben und mehr.',
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