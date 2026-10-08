import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Seite from '@/components/angebot/Seite'
import BausteinLeiter from '@/components/angebot/BausteinLeiter'
import ReferenzListe from '@/components/angebot/ReferenzListe'
import KontaktAufruf from '@/components/angebot/KontaktAufruf'
import { BreadcrumbSchema } from '@/components/StructuredData'
import { staedte } from '@/data/staedte'
import { referenzen } from '@/data/referenzen'
import { pageMetadata } from '@/lib/site'

type Params = { stadt: string }

// Nur Städte aus staedte.ts; alles andere ergibt 404.
export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return staedte.map((s) => ({ stadt: s.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const stadt = staedte.find((s) => s.slug === params.stadt)
  if (!stadt) return {}
  return pageMetadata({
    title: `Onlineshop und Website in ${stadt.name}`,
    description: `Onlineshop, Website und Marketing für Betriebe in ${stadt.name} – im Baukasten-Prinzip vom Eintrag im Portal bis zur Betreuung. Preis auf Anfrage.`,
    path: `/${stadt.slug}`,
  })
}

export default function StadtPage({ params }: { params: Params }) {
  const stadt = staedte.find((s) => s.slug === params.stadt)
  if (!stadt) notFound()

  const stadtReferenzen = referenzen.filter((r) => r.stadt === stadt.slug)

  return (
    <>
      <BreadcrumbSchema items={[{ name: stadt.name, path: `/${stadt.slug}` }]} />
      <Seite title={`Onlineshop und Website in ${stadt.name}`}>
        <p className="text-lg lg:text-xl text-dark leading-relaxed">{stadt.einleitung}</p>

        <section aria-labelledby="bausteine">
          <h2 id="bausteine" className="text-2xl lg:text-3xl font-bold text-umwelt-800 mb-6">
            Die Bausteine
          </h2>
          <BausteinLeiter />
        </section>

        <section aria-labelledby="portal">
          <h2 id="portal" className="text-2xl lg:text-3xl font-bold text-umwelt-800 mb-4">
            Das Portal für {stadt.name}
          </h2>
          <p className="text-lg text-dark">
            Stufe 1 und 2 beginnen im Portal{' '}
            {stadt.portalUrl ? (
              <a
                href={stadt.portalUrl}
                className="font-medium text-primary-900 underline hover:text-primary-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {stadt.portalName}
              </a>
            ) : (
              <span className="font-medium">{stadt.portalName}</span>
            )}
            .
          </p>
        </section>

        {stadtReferenzen.length > 0 && (
          <section aria-labelledby="referenzen">
            <h2 id="referenzen" className="text-2xl lg:text-3xl font-bold text-umwelt-800 mb-6">
              Referenzen aus {stadt.name}
            </h2>
            <ReferenzListe referenzen={stadtReferenzen} />
          </section>
        )}

        <KontaktAufruf />
      </Seite>
    </>
  )
}
