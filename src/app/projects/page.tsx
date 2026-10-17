import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import AngebotHero from '@/components/angebote/AngebotHero'
import JsonLd from '@/components/angebote/JsonLd'
import Sektion from '@/components/angebote/Sektion'
import InspirationHinweis from '@/components/InspirationHinweis'
import { seitenTexte } from '@/data/angebote'
import { eigeneProjekte, inspirationsProjekte, projekteSeite } from '@/data/projects'
import { breadcrumbLd, type Krume } from '@/lib/angebote-seo'
import type { ProjektKarte } from '@/types/project'

const krumen: Krume[] = [
  { name: seitenTexte.startseite, path: '/' },
  { name: projekteSeite.navLabel, path: '/projects' },
]

function Raster({ karten, vorrang = false }: { karten: ProjektKarte[]; vorrang?: boolean }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {karten.map((karte, i) => (
        <li key={karte.href}>
          <ProjectCard karte={karte} vorrang={vorrang && i === 0} />
        </li>
      ))}
    </ul>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <JsonLd knoten={[breadcrumbLd(krumen)]} />
      <Header />
      <main id="main-content">
        <AngebotHero h1={projekteSeite.h1} intro={projekteSeite.intro} krumen={krumen} />

        <Sektion id="eigene-projekte" titel={projekteSeite.eigeneTitel}>
          <Raster karten={eigeneProjekte} vorrang />
        </Sektion>

        <Sektion id="inspiration" titel={projekteSeite.inspirationTitel} hell={false}>
          <InspirationHinweis className="mb-8" />
          <Raster karten={inspirationsProjekte} />
        </Sektion>
      </main>
      <Footer />
    </>
  )
}
