import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Das Entwicklerhaus',
  description: 'Impressum und rechtliche Angaben von Das Entwicklerhaus',
  alternates: {
    canonical: 'https://www.dasentwicklerhaus.de/impressum',
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}