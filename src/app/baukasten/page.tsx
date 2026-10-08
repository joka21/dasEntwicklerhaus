import type { Metadata } from 'next'
import Seite from '@/components/angebot/Seite'
import Platzhalter from '@/components/angebot/Platzhalter'
import Konfigurator from '@/components/angebot/Konfigurator'
import { BreadcrumbSchema } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Baukasten: Angebot zusammenstellen',
  description:
    'Stufen und Zusatzbausteine auswählen – vom Eintrag im Portal über Website und Onlineshop bis zur Betreuung – und unverbindlich anfragen.',
  path: '/baukasten',
})

export default function BaukastenPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Baukasten', path: '/baukasten' }]} />
      <Seite title="Baukasten">
        <Platzhalter>[Platzhalter: Einleitung zum Baukasten]</Platzhalter>
        <Konfigurator />
      </Seite>
    </>
  )
}
