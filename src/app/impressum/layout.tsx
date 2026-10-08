import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/StructuredData'

export const metadata: Metadata = pageMetadata({
  title: 'Impressum',
  description:
    'Impressum und rechtliche Angaben von Das Entwicklerhaus, Krefeld.',
  path: '/impressum',
})

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Impressum', path: '/impressum' }]} />
      {children}
    </>
  )
}
