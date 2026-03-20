import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warum es Das Entwicklerhaus gibt – Die Idee hinter der Plattform',
  description: 'Josef Kalenberg erklärt, warum er Das Entwicklerhaus gegründet hat: Eine ehrliche Plattform für echte Projekte – vom Niederrhein in die Welt.',
  openGraph: {
    title: 'Warum es Das Entwicklerhaus gibt – Die Idee hinter der Plattform',
    description: 'Josef Kalenberg erklärt, warum er Das Entwicklerhaus gegründet hat: Eine ehrliche Plattform für echte Projekte – vom Niederrhein in die Welt.',
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