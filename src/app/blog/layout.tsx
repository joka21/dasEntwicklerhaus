import type { Metadata } from 'next'
import { OG_BILD } from '@/lib/angebote-seo'

const DESCRIPTION = 'Ratgeber zu Websites, Onlineshops und KI für Vereine, Handwerksbetriebe und Händler – aus Krefeld.'

export const metadata: Metadata = {
  title: 'Blog – KI, Startups und Innovation aus Krefeld & Niederrhein',
  description: DESCRIPTION,
  openGraph: {
    title: 'Blog – KI, Startups und Innovation aus Krefeld & Niederrhein',
    description: DESCRIPTION,
    url: 'https://www.dasentwicklerhaus.de/blog',
    images: [OG_BILD],
  },
  twitter: {
    title: 'Blog – KI, Startups und Innovation aus Krefeld & Niederrhein',
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
