import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Stadtseite } from '@/types/angebote'
import {
  getStadt,
  getZielgruppe,
  mitStadt,
  seitenTexte,
  veroeffentlichteStadtseiten,
} from '@/data/angebote'
import { breadcrumbLd, faqPageLd, professionalServiceLd, serviceLd } from '@/lib/angebote-seo'
import AngebotHero from './AngebotHero'
import CtaBlock from './CtaBlock'
import FaqListe from './FaqListe'
import JsonLd from './JsonLd'
import LeistungsListe from './LeistungsListe'
import PaketKarte from './PaketKarte'
import Sektion from './Sektion'
import { zielgruppenKrumen } from './ZielgruppenSeite'

// Anzahl allgemeiner Fragen der Zielgruppe, die zusätzlich zu den lokalen erscheinen
const ALLGEMEINE_FAQS = 3

export default function StadtSeite({ seite }: { seite: Stadtseite }) {
  const z = getZielgruppe(seite.zielgruppe)
  const stadt = getStadt(seite.stadt)
  const pfad = `/${seite.slug}`
  const krumen = [...zielgruppenKrumen(z.slug), { name: stadt.name, path: pfad }]
  const faqs = [...seite.faqLokal, ...z.faqs.slice(0, ALLGEMEINE_FAQS)]
  const andereStaedte = veroeffentlichteStadtseiten(z.slug).filter((s) => s.slug !== seite.slug)

  let nr = 0
  const hell = () => nr++ % 2 === 0

  return (
    <>
      <JsonLd
        knoten={[
          professionalServiceLd(),
          serviceLd({
            name: mitStadt(z.stadtMuster.h1, stadt.name),
            description: seite.description,
            serviceType: z.serviceTyp,
            path: pfad,
            areaServed: [stadt.name],
          }),
          faqPageLd(faqs, pfad),
          breadcrumbLd(krumen),
        ]}
      />
      <Header />
      <main id="main-content">
        <AngebotHero h1={mitStadt(z.stadtMuster.h1, stadt.name)} intro={seite.einleitungLokal} krumen={krumen} />

        <Sektion id="pakete" titel={seitenTexte.paketeKurzTitel} hell={hell()}>
          <div className={`grid gap-10 md:grid-cols-2 ${z.pakete.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {z.pakete.map((p) => (
              <PaketKarte key={p.name} paket={p} kompakt />
            ))}
          </div>
          <p className="mt-8">
            <Link href={`/${z.slug}`} className="font-bold underline underline-offset-2 hover:no-underline">
              {seitenTexte.paketeDetails(z.navLabel)}
            </Link>
          </p>
        </Sektion>

        <Sektion
          id="lokale-beispiele"
          titel={mitStadt(z.stadtMuster.lokaleBeispieleTitel, stadt.name)}
          hell={hell()}
        >
          <LeistungsListe punkte={seite.lokaleBeispiele} className="max-w-3xl text-lg" />
        </Sektion>

        {seite.referenz && (
          <Sektion id="referenz" titel={seitenTexte.referenzTitel} hell={hell()}>
            <article className="max-w-3xl rounded-lg bg-light p-6 shadow-md lg:p-8">
              <h3 className="text-h5 font-bold lg:text-h5-lg">{seite.referenz.titel}</h3>
              <p className="mt-3 text-lg leading-relaxed">{seite.referenz.text}</p>
              {seite.referenz.url && (
                <p className="mt-4">
                  <a href={seite.referenz.url} className="font-bold underline underline-offset-2 hover:no-underline">
                    {seite.referenz.url.replace(/^https?:\/\//, '')}
                  </a>
                </p>
              )}
            </article>
          </Sektion>
        )}

        <Sektion id="persoenlich" titel={seitenTexte.persoenlichTitel} hell={hell()}>
          <p className="max-w-3xl text-lg leading-relaxed">{seitenTexte.persoenlichText(stadt.name)}</p>
        </Sektion>

        <Sektion id="faq" titel={seitenTexte.faqTitel} hell={hell()}>
          <FaqListe faqs={faqs} />
        </Sektion>

        <Sektion id="weitere-staedte" titel={seitenTexte.andereStaedteTitel(z.navLabel)} hell={hell()}>
          <ul className="flex flex-wrap gap-3">
            <li>
              <Link
                href={`/${z.slug}`}
                className="inline-block rounded-full bg-dark px-5 py-2 font-semibold text-white hover:bg-zusammenarbeit"
              >
                {z.navLabel}
              </Link>
            </li>
            {andereStaedte.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="inline-block rounded-full border-2 border-dark bg-light px-5 py-2 font-semibold hover:bg-dark hover:text-white"
                >
                  {getStadt(s.stadt).name}
                </Link>
              </li>
            ))}
          </ul>
        </Sektion>

        <CtaBlock thema={z.thema} />
      </main>
      <Footer />
    </>
  )
}
