import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Die Idee - Das Entwicklerhaus | Ein Zuhause für gute Projekte',
  description: 'Erfahren Sie mehr über die Idee hinter Das Entwicklerhaus: Eine Plattform für innovative Projekte vom Niederrhein bis Europa. Transparenz, Vernetzung und regionale Tiefe.',
  openGraph: {
    title: 'Die Idee - Das Entwicklerhaus',
    description: 'Erfahren Sie mehr über die Idee hinter Das Entwicklerhaus: Eine Plattform für innovative Projekte vom Niederrhein bis Europa.',
    url: 'https://dasentwicklerhaus.de/dieidee',
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de/dieidee',
  },
}

export default function DieIdeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}