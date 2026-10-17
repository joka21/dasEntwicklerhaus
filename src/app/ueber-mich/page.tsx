import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PersonFoto from '@/components/PersonFoto'
import AngebotHero from '@/components/angebote/AngebotHero'
import CtaBlock from '@/components/angebote/CtaBlock'
import JsonLd from '@/components/angebote/JsonLd'
import Sektion from '@/components/angebote/Sektion'
import { seitenTexte } from '@/data/angebote'
import { ueberMichSeite } from '@/data/ueber-mich'
import { aboutPageLd, angebotMetadata, breadcrumbLd, type Krume } from '@/lib/angebote-seo'

const PFAD = `/${ueberMichSeite.slug}`

export const metadata = angebotMetadata({ ...ueberMichSeite.seo, path: PFAD, og: 'ueber-mich' })

const krumen: Krume[] = [
  { name: seitenTexte.startseite, path: '/' },
  { name: ueberMichSeite.navLabel, path: PFAD },
]

function Absaetze({ absaetze }: { absaetze: string[] }) {
  return (
    <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
      {absaetze.map((a) => (
        <p key={a}>{a}</p>
      ))}
    </div>
  )
}

export default function UeberMichPage() {
  const { seo, regeln, fazit } = ueberMichSeite

  return (
    <>
      <JsonLd knoten={[aboutPageLd({ name: seo.title, description: seo.description, path: PFAD }), breadcrumbLd(krumen)]} />
      <Header />
      <main id="main-content">
        <AngebotHero h1={ueberMichSeite.h1} intro={ueberMichSeite.intro} krumen={krumen} />

        <div className="bg-light">
          <div className="mx-auto flex w-[90%] max-w-6xl flex-col gap-8 py-14 md:flex-row md:items-center md:gap-12 lg:py-20">
            <PersonFoto className="w-40 flex-none lg:w-56" />
            <p className="max-w-3xl text-lg leading-relaxed">{ueberMichSeite.einleitung}</p>
          </div>
        </div>

        {regeln.map((r, i) => (
          <Sektion key={r.titel} id={`regel-${i + 1}`} titel={r.titel} hell={i % 2 === 1}>
            <Absaetze absaetze={r.absaetze} />
          </Sektion>
        ))}

        <Sektion id="fazit" titel={fazit.titel} hell={regeln.length % 2 === 1}>
          <Absaetze absaetze={fazit.absaetze} />
        </Sektion>

        <CtaBlock />
      </main>
      <Footer />
    </>
  )
}
