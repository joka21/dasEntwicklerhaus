import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { ZielgruppenSlug } from '@/types/angebote'
import {
  anbieter,
  getStadt,
  getZielgruppe,
  seitenTexte,
  uebersicht,
  veroeffentlichteStadtseiten,
  zielgruppen,
} from '@/data/angebote'
import {
  angebotMetadata,
  breadcrumbLd,
  faqPageLd,
  professionalServiceLd,
  serviceLd,
  type Krume,
} from '@/lib/angebote-seo'
import AngebotHero from './AngebotHero'
import AngebotKarte from './AngebotKarte'
import CtaBlock from './CtaBlock'
import FaqListe from './FaqListe'
import JsonLd from './JsonLd'
import ModulListe from './ModulListe'
import PaketVergleich from './PaketVergleich'
import Sektion from './Sektion'

const pfad = (slug: string) => `/${slug}`

export function zielgruppenKrumen(slug: ZielgruppenSlug): Krume[] {
  return [
    { name: seitenTexte.startseite, path: '/' },
    { name: uebersicht.navLabel, path: pfad(uebersicht.slug) },
    { name: getZielgruppe(slug).navLabel, path: pfad(slug) },
  ]
}

export function zielgruppenMetadata(slug: ZielgruppenSlug) {
  const z = getZielgruppe(slug)
  return angebotMetadata({ ...z.seo, path: pfad(slug) })
}

export default function ZielgruppenSeite({ slug }: { slug: ZielgruppenSlug }) {
  const z = getZielgruppe(slug)
  const krumen = zielgruppenKrumen(slug)
  const staedte = veroeffentlichteStadtseiten(slug)
  const andere = zielgruppen.filter((a) => a.slug !== slug)
  // Abschnitte wechseln sich weiß/hellblau ab, egal wie viele es gibt.
  let nr = 0
  const hell = () => nr++ % 2 === 0

  return (
    <>
      <JsonLd
        knoten={[
          professionalServiceLd(),
          serviceLd({
            name: z.navLabel,
            description: z.seo.description,
            serviceType: z.serviceTyp,
            path: pfad(slug),
            areaServed: anbieter.einzugsgebiet,
          }),
          faqPageLd(z.faqs, pfad(slug)),
          breadcrumbLd(krumen),
        ]}
      />
      <Header />
      <main id="main-content">
        <AngebotHero h1={z.h1} intro={z.intro} krumen={krumen} />

        <Sektion id="pakete" titel={z.paketeTitel} hell={hell()}>
          <PaketVergleich titel={z.paketeTitel} pakete={z.pakete} />
        </Sektion>

        {z.zusatzAbschnitte.map((a, i) => (
          <Sektion key={a.titel} id={`zusatz-${i}`} titel={a.titel} hell={hell()}>
            <p className="max-w-3xl text-lg leading-relaxed">{a.text}</p>
          </Sektion>
        ))}

        <Sektion id="betreuung" titel={z.betreuung.titel} hell={hell()}>
          <p className="max-w-3xl text-lg leading-relaxed">{z.betreuung.text}</p>
        </Sektion>

        <Sektion id="module" titel={z.module.titel} hell={hell()}>
          <ModulListe eintraege={z.module.eintraege} />
        </Sektion>

        <Sektion id="faq" titel={seitenTexte.faqTitel} hell={hell()}>
          <FaqListe faqs={z.faqs} />
        </Sektion>

        {staedte.length > 0 && (
          <Sektion id="in-ihrer-naehe" titel={seitenTexte.inIhrerNaeheTitel} hell={hell()}>
            <ul className="flex flex-wrap gap-3">
              {staedte.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={pfad(s.slug)}
                    className="inline-block rounded-full border-2 border-dark bg-light px-5 py-2 font-semibold hover:bg-dark hover:text-white"
                  >
                    {getStadt(s.stadt).name}
                  </Link>
                </li>
              ))}
            </ul>
          </Sektion>
        )}

        <Sektion id="weitere-angebote" titel={seitenTexte.weitereAngeboteTitel} hell={hell()}>
          <div className="grid gap-8 md:grid-cols-2">
            {andere.map((a) => (
              <AngebotKarte
                key={a.slug}
                href={pfad(a.slug)}
                titel={a.karte.titel}
                text={a.karte.text}
                index={zielgruppen.indexOf(a)}
              />
            ))}
          </div>
          <p className="mt-8">
            <Link href={pfad(uebersicht.slug)} className="font-bold underline underline-offset-2 hover:no-underline">
              {seitenTexte.zurUebersicht}
            </Link>
          </p>
        </Sektion>

        <CtaBlock thema={z.thema} />
      </main>
      <Footer />
    </>
  )
}
