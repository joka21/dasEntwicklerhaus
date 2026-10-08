import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Seite from '@/components/angebot/Seite'
import KontaktAufruf from '@/components/angebot/KontaktAufruf'
import { BreadcrumbSchema } from '@/components/StructuredData'
import { referenzen } from '@/data/referenzen'
import { staedte } from '@/data/staedte'
import { bausteinTitel } from '@/data/bausteine'
import { pageMetadata } from '@/lib/site'

type Params = { slug: string }

// Nur Referenzen aus referenzen.ts; alles andere ergibt 404.
export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return referenzen.map((r) => ({ slug: r.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const referenz = referenzen.find((r) => r.slug === params.slug)
  if (!referenz) return {}
  return pageMetadata({
    title: referenz.titel,
    description: referenz.ausgangslage,
    path: `/referenzen/${referenz.slug}`,
  })
}

export default function ReferenzPage({ params }: { params: Params }) {
  const referenz = referenzen.find((r) => r.slug === params.slug)
  if (!referenz) notFound()

  const stadt = staedte.find((s) => s.slug === referenz.stadt)
  const abschnitte = [
    { titel: 'Ausgangslage', text: referenz.ausgangslage },
    { titel: 'Lösung', text: referenz.loesung },
    { titel: 'Ergebnis', text: referenz.ergebnis },
  ]

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Referenzen', path: '/referenzen' },
          { name: referenz.titel, path: `/referenzen/${referenz.slug}` },
        ]}
      />
      <Seite title={referenz.titel}>
        <div className="flex flex-wrap gap-2">
          {stadt && (
            <Link href={`/${stadt.slug}`} className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-900">
              {stadt.name}
            </Link>
          )}
          {referenz.bausteine.map((slug) => (
            <span key={slug} className="rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-dark">
              {bausteinTitel(slug) ?? slug}
            </span>
          ))}
        </div>

        {abschnitte.map((a) => (
          <section key={a.titel}>
            <h2 className="text-2xl lg:text-3xl font-bold text-umwelt-800 mb-4">{a.titel}</h2>
            <p className="text-lg text-dark leading-relaxed whitespace-pre-line">{a.text}</p>
          </section>
        ))}

        <p>
          <Link href="/referenzen" className="font-medium text-primary-900 underline hover:text-primary-700">
            ← Alle Referenzen
          </Link>
        </p>

        <KontaktAufruf />
      </Seite>
    </>
  )
}
