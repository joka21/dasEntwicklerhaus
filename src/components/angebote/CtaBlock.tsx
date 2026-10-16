import Link from 'next/link'
import type { KontaktThema } from '@/types/angebote'
import { cta } from '@/data/angebote'

export default function CtaBlock({ thema }: { thema?: KontaktThema }) {
  const anfrageHref = thema ? `${cta.kontaktPfad}?thema=${thema}` : cta.kontaktPfad

  return (
    <section aria-labelledby="cta-titel" className="bg-menschen">
      <div className="mx-auto w-[90%] max-w-4xl py-14 text-center lg:py-20">
        <h2 id="cta-titel" className="text-h4 font-bold text-balance lg:text-h3-lg">
          {cta.titel}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed">{cta.text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={anfrageHref}
            className="rounded-full bg-dark px-8 py-4 font-bold text-white transition-colors hover:bg-zusammenarbeit"
          >
            {cta.buttonAnfrage}
          </Link>
          {cta.telefon && (
            <a
              href={`tel:${cta.telefon}`}
              className="rounded-full border-2 border-dark px-8 py-4 font-bold transition-colors hover:bg-dark hover:text-white"
            >
              {cta.buttonAnrufen}
              {cta.telefonAnzeige && `: ${cta.telefonAnzeige}`}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
