import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PersonFoto from '@/components/PersonFoto'
import ProjectCard from '@/components/ProjectCard'
import AblaufSchritte from '@/components/angebote/AblaufSchritte'
import AngebotHero from '@/components/angebote/AngebotHero'
import AngebotKarte from '@/components/angebote/AngebotKarte'
import CtaBlock from '@/components/angebote/CtaBlock'
import Sektion from '@/components/angebote/Sektion'
import VorteilsListe from '@/components/angebote/VorteilsListe'
import { uebersicht, zielgruppen } from '@/data/angebote'
import { eigeneProjekte } from '@/data/projects'
import { startseite } from '@/data/startseite'
import { angebotMetadata } from '@/lib/angebote-seo'

export const metadata = angebotMetadata({ ...startseite.seo, path: '/', og: 'start' })

const LINK_PFEIL = 'font-bold underline underline-offset-4 hover:text-zusammenarbeit'

export default function Home() {
  const { ueberMich, projekte } = startseite

  return (
    <>
      <Header />
      <main id="main-content">
        <AngebotHero h1={startseite.h1} intro={startseite.intro}>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={startseite.buttonErstgespraech.href}
              className="rounded-full bg-dark px-8 py-4 text-center font-bold text-white transition-colors hover:bg-zusammenarbeit"
            >
              {startseite.buttonErstgespraech.label}
            </Link>
            <Link
              href={startseite.buttonAngebote.href}
              className="rounded-full border-2 border-dark px-8 py-4 text-center font-bold transition-colors hover:bg-dark hover:text-white"
            >
              {startseite.buttonAngebote.label}
            </Link>
          </div>
        </AngebotHero>

        <Sektion id="angebote-karten" titel={startseite.angeboteTitel}>
          <div className="grid gap-8 md:grid-cols-3">
            {zielgruppen.map((z, i) => (
              <AngebotKarte key={z.slug} href={`/${z.slug}`} titel={z.karte.titel} text={z.karte.text} index={i} />
            ))}
          </div>
        </Sektion>

        <Sektion id="vorteile" titel={startseite.vorteile.titel} hell={false}>
          <VorteilsListe punkte={startseite.vorteile.punkte} />
        </Sektion>

        <Sektion id="ablauf" titel={uebersicht.ablauf.titel}>
          <AblaufSchritte schritte={uebersicht.ablauf.schritte} />
        </Sektion>

        <Sektion id="projekte" titel={projekte.titel} hell={false}>
          <p className="-mt-4 mb-8 max-w-3xl text-lg leading-relaxed">{projekte.intro}</p>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eigeneProjekte.slice(0, projekte.anzahl).map((karte) => (
              <li key={karte.href}>
                <ProjectCard karte={karte} />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-lg">
            <Link href={projekte.alleHref} className={LINK_PFEIL}>
              {projekte.alleLabel} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </Sektion>

        <Sektion id="ueber-mich" titel={ueberMich.titel}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            <PersonFoto className="w-40 flex-none lg:w-56" />
            <div className="max-w-3xl text-lg leading-relaxed">
              <p>{ueberMich.text}</p>
              <p className="mt-4 font-bold">{ueberMich.schluss}</p>
              <p className="mt-6">
                <Link href={ueberMich.linkHref} className={LINK_PFEIL}>
                  {ueberMich.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </div>
        </Sektion>

        <CtaBlock />
      </main>
      <Footer />
    </>
  )
}
