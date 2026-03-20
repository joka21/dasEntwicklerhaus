import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Literacy – KI verstehen, nutzen und verantwortungsvoll gestalten',
  description: 'Interaktive Lernplattform für KI-Kompetenz: Verstehe künstliche Intelligenz und gestalte sie verantwortungsvoll mit.',
  openGraph: {
    title: 'AI Literacy – KI verstehen, nutzen und verantwortungsvoll gestalten',
    description: 'Interaktive Lernplattform für KI-Kompetenz: Verstehe künstliche Intelligenz und gestalte sie verantwortungsvoll mit.',
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
