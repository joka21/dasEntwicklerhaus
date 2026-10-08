import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/StructuredData'

export const metadata: Metadata = pageMetadata({
  title: 'Kontakt & unverbindliche Anfrage',
  description:
    'Kontakt zu Das Entwicklerhaus in Krefeld: unverbindlich anfragen für Onlineshop, Website, Marketing oder App und KI. Preis auf Anfrage.',
  path: '/kontakt',
})

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Kontakt', path: '/kontakt' }]} />
      {children}
    </>
  )
}
