import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog – KI, Startups und Nachhaltigkeit',
  description: 'Gedanken zu Startups, KI und was wirklich zählt. Keine Theorie – nur das, was Josef Kalenberg selbst erlebt hat.',
  openGraph: {
    title: 'Blog – KI, Startups und Nachhaltigkeit',
    description: 'Gedanken zu Startups, KI und was wirklich zählt. Keine Theorie – nur das, was Josef Kalenberg selbst erlebt hat.',
    url: 'https://dasentwicklerhaus.de/blog',
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
