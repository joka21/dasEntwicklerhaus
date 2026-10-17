import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog – KI, Startups und Innovation aus Krefeld & Niederrhein',
  description: 'Gedanken zu KI, Startups und Innovation aus Krefeld am Niederrhein. Keine Theorie – nur das, was Josef Kalenberg als Gründer in NRW selbst erlebt hat.',
  openGraph: {
    title: 'Blog – KI, Startups und Innovation aus Krefeld & Niederrhein',
    description: 'Gedanken zu KI, Startups und Innovation aus Krefeld am Niederrhein. Keine Theorie – nur das, was Josef Kalenberg als Gründer in NRW selbst erlebt hat.',
    url: 'https://www.dasentwicklerhaus.de/blog',
  },
  twitter: {
    title: 'Blog – KI, Startups und Innovation aus Krefeld & Niederrhein',
    description: 'Gedanken zu KI, Startups und Innovation aus Krefeld am Niederrhein. Keine Theorie – nur das, was Josef Kalenberg als Gründer in NRW selbst erlebt hat.',
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
