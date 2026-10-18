import { angebotMetadata } from '@/lib/angebote-seo'

export const metadata = angebotMetadata({
  title: 'Datenschutz',
  description: 'Datenschutzerklärung und Informationen zum Datenschutz bei Das Entwicklerhaus',
  path: '/datenschutz',
})

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
