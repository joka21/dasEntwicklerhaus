import Link from 'next/link'
import { zusatzbausteine, preisZeile, type Zusatzbaustein } from '@/data/bausteine'

interface Props {
  auswahl?: Zusatzbaustein[]
  headingLevel?: 'h2' | 'h3'
}

export default function ZusatzbausteinListe({ auswahl = zusatzbausteine, headingLevel = 'h3' }: Props) {
  const Heading = headingLevel
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {auswahl.map((z) => (
        <li key={z.slug} className="rounded-lg bg-white p-5 shadow-md">
          <Heading className="text-lg font-semibold text-dark">
            {z.leistungsseite ? (
              <Link href={z.leistungsseite} className="underline hover:text-primary-800">
                {z.titel}
              </Link>
            ) : (
              z.titel
            )}
          </Heading>
          <p className="mt-1 text-secondary-900">{z.kurztext}</p>
          <p className="mt-2 text-sm font-medium text-secondary-800">{preisZeile(z.abrechnung)}</p>
        </li>
      ))}
    </ul>
  )
}
