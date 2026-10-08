import type { Metadata } from 'next'
import Leistungsseite from '@/components/angebot/Leistungsseite'
import { pageMetadata } from '@/lib/site'

const DESCRIPTION =
  'Onlineshop erstellen lassen in Krefeld und am Niederrhein: Shop, Produkttexte und Produktfotos aus einer Hand. Preis auf Anfrage.'

export const metadata: Metadata = pageMetadata({
  title: 'Onlineshop erstellen lassen in Krefeld',
  description: DESCRIPTION,
  path: '/onlineshop-erstellen',
})

export default function OnlineshopErstellenPage() {
  return (
    <Leistungsseite
      path="/onlineshop-erstellen"
      h1="Onlineshop erstellen lassen in Krefeld und am Niederrhein"
      breadcrumb="Onlineshop erstellen"
      service={{ name: 'Onlineshop erstellen', description: DESCRIPTION, areaServed: ['Krefeld', 'Niederrhein'] }}
    />
  )
}
