import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - Das Entwicklerhaus',
  description: 'Datenschutzerklärung und Informationen zum Datenschutz bei Das Entwicklerhaus',
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}