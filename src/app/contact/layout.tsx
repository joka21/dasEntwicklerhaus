import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Kostenloses Erstgespräch anfragen | Entwicklerhaus' },
  description: 'Kostenloses Erstgespräch zu Website, Onlineshop oder KI-Lösung für Ihren Verein oder Betrieb. Persönlich und unverbindlich – direkt aus Krefeld.',
  openGraph: {
    title: 'Kostenloses Erstgespräch anfragen | Entwicklerhaus',
    description: 'Kostenloses Erstgespräch zu Website, Onlineshop oder KI-Lösung für Ihren Verein oder Betrieb. Persönlich und unverbindlich – direkt aus Krefeld.',
    url: 'https://www.dasentwicklerhaus.de/contact',
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
