import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Die Idee – Warum Josef Kalenberg Das Entwicklerhaus in Krefeld gegründet hat',
  description: 'Josef Kalenberg aus Krefeld erklärt die Vision hinter Das Entwicklerhaus: Eine ehrliche Plattform für echte Projekte – vom Niederrhein und NRW in die Welt.',
  openGraph: {
    title: 'Die Idee – Warum Josef Kalenberg Das Entwicklerhaus in Krefeld gegründet hat',
    description: 'Josef Kalenberg aus Krefeld erklärt die Vision hinter Das Entwicklerhaus: Eine ehrliche Plattform für echte Projekte – vom Niederrhein und NRW in die Welt.',
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