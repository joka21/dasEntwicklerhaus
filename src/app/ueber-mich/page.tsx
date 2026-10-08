import type { Metadata } from 'next'
import Seite from '@/components/angebot/Seite'
import Platzhalter from '@/components/angebot/Platzhalter'
import KontaktAufruf from '@/components/angebot/KontaktAufruf'
import { BreadcrumbSchema } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Über mich',
  description:
    'Wer hinter Das Entwicklerhaus in Krefeld steht: Onlineshops, Websites, Marketing sowie App- und KI-Entwicklung für Betriebe am Niederrhein.',
  path: '/ueber-mich',
})

export default function UeberMichPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Über mich', path: '/ueber-mich' }]} />
      <Seite title="Über mich">
        <Platzhalter>[Platzhalter: Text „Über mich"]</Platzhalter>
        <KontaktAufruf />
      </Seite>
    </>
  )
}
