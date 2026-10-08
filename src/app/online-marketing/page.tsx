import type { Metadata } from 'next'
import Leistungsseite from '@/components/angebot/Leistungsseite'
import { pageMetadata } from '@/lib/site'

const DESCRIPTION =
  'Online-Marketing für Onlineshops und lokale Betriebe in Krefeld und am Niederrhein – als Baustein im Baukasten. Preis auf Anfrage.'

export const metadata: Metadata = pageMetadata({
  title: 'Online-Marketing für Shops & Betriebe',
  description: DESCRIPTION,
  path: '/online-marketing',
})

export default function OnlineMarketingPage() {
  return (
    <Leistungsseite
      path="/online-marketing"
      h1="Online-Marketing für Shops und lokale Betriebe"
      breadcrumb="Online-Marketing"
      service={{ name: 'Online-Marketing', description: DESCRIPTION }}
    />
  )
}
