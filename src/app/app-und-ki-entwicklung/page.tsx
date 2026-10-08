import type { Metadata } from 'next'
import Leistungsseite from '@/components/angebot/Leistungsseite'
import { pageMetadata } from '@/lib/site'

const DESCRIPTION =
  'App- und KI-Entwicklung in Krefeld: Apps und KI-Assistenten für Betriebe in Krefeld und am Niederrhein. Preis auf Anfrage.'

export const metadata: Metadata = pageMetadata({
  title: 'App- und KI-Entwicklung in Krefeld',
  description: DESCRIPTION,
  path: '/app-und-ki-entwicklung',
})

export default function AppUndKiEntwicklungPage() {
  return (
    <Leistungsseite
      path="/app-und-ki-entwicklung"
      h1="App- und KI-Entwicklung in Krefeld"
      breadcrumb="App- und KI-Entwicklung"
      service={{ name: 'App- und KI-Entwicklung', description: DESCRIPTION, areaServed: ['Krefeld'] }}
    />
  )
}
