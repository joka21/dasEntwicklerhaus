import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AblaufSchritte from '@/components/angebote/AblaufSchritte'
import AngebotHero from '@/components/angebote/AngebotHero'
import AngebotKarte from '@/components/angebote/AngebotKarte'
import CtaBlock from '@/components/angebote/CtaBlock'
import JsonLd from '@/components/angebote/JsonLd'
import LeistungsListe from '@/components/angebote/LeistungsListe'
import Sektion from '@/components/angebote/Sektion'
import { seitenTexte, uebersicht, zielgruppen } from '@/data/angebote'
import { angebotMetadata, breadcrumbLd, professionalServiceLd, type Krume } from '@/lib/angebote-seo'

const PFAD = `/${uebersicht.slug}`

export const metadata = angebotMetadata({ ...uebersicht.seo, path: PFAD })

const krumen: Krume[] = [
  { name: seitenTexte.startseite, path: '/' },
  { name: uebersicht.navLabel, path: PFAD },
]

export default function AngebotePage() {
  return (
    <>
      <JsonLd knoten={[professionalServiceLd(), breadcrumbLd(krumen)]} />
      <Header />
      <main id="main-content">
        <AngebotHero h1={uebersicht.h1} intro={uebersicht.intro} krumen={krumen} />

        <Sektion id="angebote-karten" titel={uebersicht.kartenTitel}>
          <div className="grid gap-8 md:grid-cols-3">
            {zielgruppen.map((z, i) => (
              <AngebotKarte key={z.slug} href={`/${z.slug}`} titel={z.karte.titel} text={z.karte.text} index={i} />
            ))}
          </div>
        </Sektion>

        <Sektion id="gemeinsam" titel={uebersicht.gemeinsam.titel} hell={false}>
          <LeistungsListe punkte={uebersicht.gemeinsam.punkte} className="max-w-3xl text-lg" />
        </Sektion>

        <Sektion id="ablauf" titel={uebersicht.ablauf.titel}>
          <AblaufSchritte schritte={uebersicht.ablauf.schritte} />
          <p className="mt-10 text-lg font-semibold">{uebersicht.preisHinweis}</p>
        </Sektion>

        <CtaBlock />
      </main>
      <Footer />
    </>
  )
}
