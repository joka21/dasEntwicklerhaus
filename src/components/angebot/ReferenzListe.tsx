import Link from 'next/link'
import type { Referenz } from '@/data/referenzen'
import { staedte } from '@/data/staedte'

interface Props {
  referenzen: Referenz[]
  headingLevel?: 'h2' | 'h3'
}

/** Liste von Referenzen. Ohne Einträge wird nichts angezeigt. */
export default function ReferenzListe({ referenzen, headingLevel = 'h3' }: Props) {
  if (referenzen.length === 0) return null
  const Heading = headingLevel

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {referenzen.map((r) => (
        <li key={r.slug} className="rounded-lg bg-white p-6 shadow-md">
          <Heading className="text-xl font-semibold text-dark">
            <Link href={`/referenzen/${r.slug}`} className="underline hover:text-primary-800">
              {r.titel}
            </Link>
          </Heading>
          <p className="mt-1 text-sm text-secondary-800">
            {staedte.find((s) => s.slug === r.stadt)?.name ?? r.stadt}
          </p>
          <p className="mt-3 line-clamp-3 text-secondary-900">{r.ausgangslage}</p>
        </li>
      ))}
    </ul>
  )
}
