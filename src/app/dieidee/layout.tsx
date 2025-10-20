import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warum es das Entwicklerhaus gibt',
  description: 'Über 20 Jahre Entwickler. Dann kam KI. Alles ändert sich. Keiner weiß, was kommt. Aber nur zuschauen? Das ist keine Option. Gemeinsam sind wir weniger allein.',
  openGraph: {
    title: 'Warum es das Entwicklerhaus gibt',
    description: 'Über 20 Jahre Entwickler. Dann kam KI. Alles ändert sich. Gemeinsam sind wir weniger allein.',
    url: 'https://dasentwicklerhaus.de/dieidee',
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de/dieidee',
  },
}

export default function DieIdeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}