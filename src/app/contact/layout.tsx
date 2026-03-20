import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – Das Entwicklerhaus',
  description: 'Nimm Kontakt mit Josef Kalenberg und dem Entwicklerhaus-Team auf. Ideen einreichen, Projekte vorstellen oder einfach Hallo sagen.',
  openGraph: {
    title: 'Kontakt – Das Entwicklerhaus',
    description: 'Nimm Kontakt mit Josef Kalenberg und dem Entwicklerhaus-Team auf. Ideen einreichen, Projekte vorstellen oder einfach Hallo sagen.',
    url: 'https://dasentwicklerhaus.de/contact',
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}