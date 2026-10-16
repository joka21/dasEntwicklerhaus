import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

// Canonical nur hier, nicht im Root-Layout – sonst erben ihn alle Seiten
// ohne eigenen Canonical (Impressum, 404 usw.).
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.dasentwicklerhaus.de',
  },
}

export default function Home() {
  return <HomeContent />
}
