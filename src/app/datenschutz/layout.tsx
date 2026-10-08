import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/StructuredData'

export const metadata: Metadata = pageMetadata({
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung und Informationen zum Datenschutz bei Das Entwicklerhaus in Krefeld.',
  path: '/datenschutz',
})

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Datenschutzerklärung', path: '/datenschutz' }]} />
      {children}
    </>
  )
}
