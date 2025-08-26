import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Das Entwicklerhaus',
  description: 'Impressum und rechtliche Angaben von Das Entwicklerhaus',
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}