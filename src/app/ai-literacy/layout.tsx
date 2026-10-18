import type { Metadata } from 'next'
import { vollerTitel } from '@/lib/angebote-seo'

const TITEL = 'AI Literacy: KI verstehen und nutzen'

export const metadata: Metadata = {
  title: TITEL,
  description: 'KI-Kompetenz aus Krefeld am Niederrhein: Interaktive Lernplattform für künstliche Intelligenz. Verstehen, nutzen und verantwortungsvoll gestalten – ein Projekt aus NRW.',
  openGraph: {
    title: vollerTitel(TITEL),
    description: 'KI-Kompetenz aus Krefeld am Niederrhein: Interaktive Lernplattform für künstliche Intelligenz. Verstehen, nutzen und verantwortungsvoll gestalten – ein Projekt aus NRW.',
    url: 'https://www.dasentwicklerhaus.de/ai-literacy',
  },
  alternates: {
    canonical: 'https://www.dasentwicklerhaus.de/ai-literacy',
  },
}

export default function AILiteracyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
