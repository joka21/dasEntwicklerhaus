import Seite from '@/components/angebot/Seite'
import Platzhalter from '@/components/angebot/Platzhalter'
import BausteinLeiter from '@/components/angebot/BausteinLeiter'
import ZusatzbausteinListe from '@/components/angebot/ZusatzbausteinListe'
import KontaktAufruf from '@/components/angebot/KontaktAufruf'
import { BreadcrumbSchema, ServiceSchema } from '@/components/StructuredData'
import { bausteine, zusatzbausteine } from '@/data/bausteine'

interface LeistungsseiteProps {
  /** Pfad der Seite; bestimmt auch, welche Bausteine angezeigt werden */
  path: string
  h1: string
  breadcrumb: string
  service: { name: string; description: string; areaServed?: string[] }
}

/** Vorlage für Leistungsseiten: H1, Platzhaltertext, zugehörige Bausteine, Kontakt-Aufruf. */
export default function Leistungsseite({ path, h1, breadcrumb, service }: LeistungsseiteProps) {
  const stufen = bausteine.filter((b) => b.leistungsseite === path)
  const zusatz = zusatzbausteine.filter((z) => z.leistungsseite === path)

  return (
    <>
      <BreadcrumbSchema items={[{ name: breadcrumb, path }]} />
      <ServiceSchema {...service} path={path} />
      <Seite title={h1}>
        <Platzhalter>[Platzhalter: Einleitungstext zur Leistung „{breadcrumb}"]</Platzhalter>

        {stufen.length > 0 && (
          <section aria-labelledby="stufen">
            <h2 id="stufen" className="text-2xl lg:text-3xl font-bold text-umwelt-800 mb-6">
              Passende Stufen im Baukasten
            </h2>
            <BausteinLeiter auswahl={stufen} />
          </section>
        )}

        {zusatz.length > 0 && (
          <section aria-labelledby="zusatz">
            <h2 id="zusatz" className="text-2xl lg:text-3xl font-bold text-umwelt-800 mb-6">
              Zusatzbausteine
            </h2>
            <ZusatzbausteinListe auswahl={zusatz} />
          </section>
        )}

        <KontaktAufruf />
      </Seite>
    </>
  )
}
