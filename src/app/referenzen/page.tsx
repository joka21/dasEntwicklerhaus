import type { Metadata } from 'next'
import Seite from '@/components/angebot/Seite'
import Platzhalter from '@/components/angebot/Platzhalter'
import ReferenzListe from '@/components/angebot/ReferenzListe'
import { BreadcrumbSchema } from '@/components/StructuredData'
import { referenzen } from '@/data/referenzen'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Referenzen',
  description:
    'Referenzen von Das Entwicklerhaus: Onlineshops, Websites und Marketing für Betriebe in Krefeld und am Niederrhein – Ausgangslage, Lösung und Ergebnis.',
  path: '/referenzen',
})

export default function ReferenzenPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Referenzen', path: '/referenzen' }]} />
      <Seite title="Referenzen">
        <Platzhalter>[Platzhalter: Einleitung zu den Referenzen]</Platzhalter>
        <ReferenzListe referenzen={referenzen} headingLevel="h2" />
      </Seite>
    </>
  )
}
