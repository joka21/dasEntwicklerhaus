import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Literacy – KI verstehen und nutzen | Lernplattform aus Krefeld, NRW',
  description: 'KI-Kompetenz aus Krefeld am Niederrhein: Interaktive Lernplattform für künstliche Intelligenz. Verstehen, nutzen und verantwortungsvoll gestalten – ein Projekt aus NRW.',
  openGraph: {
    title: 'AI Literacy – KI verstehen und nutzen | Lernplattform aus Krefeld, NRW',
    description: 'KI-Kompetenz aus Krefeld am Niederrhein: Interaktive Lernplattform für künstliche Intelligenz. Verstehen, nutzen und verantwortungsvoll gestalten – ein Projekt aus NRW.',
    url: 'https://dasentwicklerhaus.de/ai-literacy',
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de/ai-literacy',
  },
}

export default function AILiteracyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
