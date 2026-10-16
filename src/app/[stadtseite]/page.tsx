import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import StadtSeite from '@/components/angebote/StadtSeite'
import { getStadtseite, veroeffentlichteStadtseiten } from '@/data/angebote'
import { angebotMetadata } from '@/lib/angebote-seo'

// Städteseiten wie /website-fuer-vereine-krefeld. Gebaut werden nur Einträge
// mit veroeffentlicht: true, alle anderen Pfade ergeben 404. Feste Routen
// (z. B. /angebote, /blog) haben in Next immer Vorrang vor diesem Segment.
export const dynamicParams = false

export function generateStaticParams() {
  return veroeffentlichteStadtseiten().map((s) => ({ stadtseite: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[stadtseite]'>): Promise<Metadata> {
  const { stadtseite } = await params
  const seite = getStadtseite(stadtseite)
  if (!seite) return {}
  return angebotMetadata({ title: seite.titel, description: seite.description, path: `/${seite.slug}` })
}

export default async function Page({ params }: PageProps<'/[stadtseite]'>) {
  const { stadtseite } = await params
  const seite = getStadtseite(stadtseite)
  if (!seite) notFound()
  return <StadtSeite seite={seite} />
}
