import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt - Das Entwicklerhaus | Projekt einreichen',
  description: 'Kontaktieren Sie Das Entwicklerhaus. Reichen Sie Ihr innovatives Projekt ein oder nehmen Sie Kontakt mit uns auf. Email: info@dasentwicklerhaus.de',
  openGraph: {
    title: 'Kontakt - Das Entwicklerhaus',
    description: 'Kontaktieren Sie Das Entwicklerhaus. Reichen Sie Ihr innovatives Projekt ein oder nehmen Sie Kontakt mit uns auf.',
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