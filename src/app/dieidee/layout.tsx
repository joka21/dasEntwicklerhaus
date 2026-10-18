import type { Metadata } from 'next'

// Ohne Vorlage, die Marke steht schon im Titel
const TITEL = 'Die Idee – warum es Das Entwicklerhaus gibt'

export const metadata: Metadata = {
  title: { absolute: TITEL },
  description: 'Josef Kalenberg aus Krefeld erklärt die Vision hinter Das Entwicklerhaus: Eine ehrliche Plattform für echte Projekte – vom Niederrhein und NRW in die Welt.',
  openGraph: {
    title: TITEL,
    description: 'Josef Kalenberg aus Krefeld erklärt die Vision hinter Das Entwicklerhaus: Eine ehrliche Plattform für echte Projekte – vom Niederrhein und NRW in die Welt.',
    url: 'https://www.dasentwicklerhaus.de/dieidee',
  },
  alternates: {
    canonical: 'https://www.dasentwicklerhaus.de/dieidee',
  },
}

export default function DieIdeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}