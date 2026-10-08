import Link from 'next/link'

interface Props {
  titel?: string
  headingLevel?: 'h2' | 'h3'
}

/** Kontakt-Aufruf mit Weg zum Baukasten und zum Kontaktformular. */
export default function KontaktAufruf({ titel = 'Unverbindlich anfragen', headingLevel = 'h2' }: Props) {
  const Heading = headingLevel
  return (
    <section className="rounded-lg bg-gradient-to-r from-primary to-zukunft p-8 text-center text-white">
      <Heading className="text-2xl lg:text-3xl font-bold mb-4">{titel}</Heading>
      <p className="mx-auto mb-6 max-w-2xl text-lg">
        [Platzhalter: kurzer Text zum Kontakt-Aufruf]
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/baukasten"
          className="inline-block rounded-md bg-white px-8 py-3 font-medium text-primary-900 hover:bg-light-100 transition-colors"
        >
          Bausteine zusammenstellen
        </Link>
        <Link
          href="/kontakt"
          className="inline-block rounded-md border-2 border-white px-8 py-3 font-medium text-white hover:bg-white hover:text-primary-900 transition-colors"
        >
          Direkt Kontakt aufnehmen
        </Link>
      </div>
    </section>
  )
}
