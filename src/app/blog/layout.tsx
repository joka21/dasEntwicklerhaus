import type { Metadata } from 'next'
import { OG_BILD, TITEL_VORLAGE, vollerTitel } from '@/lib/angebote-seo'

const TITEL = 'Ratgeber: Websites, Shops & KI'
const DESCRIPTION = 'Ratgeber zu Websites, Onlineshops und KI für Vereine, Handwerksbetriebe und Händler – aus Krefeld.'

export const metadata: Metadata = {
  // Vorlage erneut setzen, sonst fehlt sie in den Artikeln; default (/blog)
  // bekommt die Marke über die Vorlage aus dem Root-Layout
  title: { default: TITEL, template: TITEL_VORLAGE },
  description: DESCRIPTION,
  openGraph: {
    title: vollerTitel(TITEL),
    description: DESCRIPTION,
    url: 'https://www.dasentwicklerhaus.de/blog',
    images: [OG_BILD],
  },
  twitter: {
    title: vollerTitel(TITEL),
    description: DESCRIPTION,
    images: [OG_BILD.url],
  },
  alternates: {
    canonical: 'https://www.dasentwicklerhaus.de/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
