import type { Metadata } from 'next'
import { ogBild } from '@/lib/angebote-seo'

const TITEL = 'Kostenloses Erstgespräch anfragen | Entwicklerhaus'
const DESCRIPTION = 'Kostenloses Erstgespräch zu Website, Onlineshop oder KI-Lösung für Ihren Verein oder Betrieb. Persönlich und unverbindlich – direkt aus Krefeld.'
const BILD = ogBild('contact', TITEL)

export const metadata: Metadata = {
  title: { absolute: TITEL },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Das Entwicklerhaus',
    title: TITEL,
    description: DESCRIPTION,
    url: 'https://www.dasentwicklerhaus.de/contact',
    images: [BILD],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITEL,
    description: DESCRIPTION,
    images: [BILD.url],
  },
  alternates: {
    canonical: 'https://www.dasentwicklerhaus.de/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
