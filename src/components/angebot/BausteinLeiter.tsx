import Link from 'next/link'
import { bausteine, preisZeile, type Baustein } from '@/data/bausteine'

// Akzentfarben der Stufen, unten nach oben
const STUFEN_FARBEN = [
  'bg-zukunft',
  'bg-primary',
  'bg-umwelt',
  'bg-menschen',
  'bg-frieden',
  'bg-zusammenarbeit',
]

interface BausteinLeiterProps {
  /** Nur diese Stufen zeigen (Standard: alle sechs) */
  auswahl?: Baustein[]
  headingLevel?: 'h2' | 'h3'
}

/** Die Stufen als Leiter: Stufe 1 unten, jede weitere eine Sprosse höher. */
export default function BausteinLeiter({ auswahl = bausteine, headingLevel = 'h3' }: BausteinLeiterProps) {
  const Heading = headingLevel
  const stufen = [...auswahl].sort((a, b) => b.stufe - a.stufe)

  return (
    <ol className="space-y-3" aria-label="Stufen des Baukastens">
      {stufen.map((b) => (
        <li
          key={b.slug}
          className="flex items-stretch overflow-hidden rounded-lg bg-white shadow-md"
          style={{ marginLeft: `${(6 - b.stufe) * 4}%` }}
        >
          <div
            className={`flex w-16 shrink-0 items-center justify-center text-2xl font-bold text-white ${STUFEN_FARBEN[(b.stufe - 1) % STUFEN_FARBEN.length]}`}
            aria-hidden="true"
          >
            {b.stufe}
          </div>
          <div className="flex-1 p-4">
            <Heading className="text-lg font-semibold text-dark">
              <span className="sr-only">Stufe {b.stufe}: </span>
              {b.leistungsseite ? (
                <Link href={b.leistungsseite} className="underline hover:text-primary-800">
                  {b.titel}
                </Link>
              ) : (
                b.titel
              )}
            </Heading>
            <p className="mt-1 text-secondary-900">{b.kurztext}</p>
            <p className="mt-2 text-sm font-medium text-secondary-800">{preisZeile(b.abrechnung)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
