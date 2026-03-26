import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – Das Entwicklerhaus Krefeld | Josef Kalenberg',
  description: 'Kontaktiere Josef Kalenberg und Das Entwicklerhaus in Krefeld am Niederrhein. Ideen einreichen, Projekte vorstellen oder zusammenarbeiten – direkt aus NRW.',
  openGraph: {
    title: 'Kontakt – Das Entwicklerhaus Krefeld | Josef Kalenberg',
    description: 'Kontaktiere Josef Kalenberg und Das Entwicklerhaus in Krefeld am Niederrhein. Ideen einreichen, Projekte vorstellen oder zusammenarbeiten – direkt aus NRW.',
    url: 'https://dasentwicklerhaus.de/contact',
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}