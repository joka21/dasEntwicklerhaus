import type { Paket } from '@/types/angebote'
import { seitenTexte } from '@/data/angebote'
import LeistungsListe from './LeistungsListe'
import PaketKarte, { paketPunkte } from './PaketKarte'

// Ab lg eine Vergleichstabelle, darunter Karten. Die jeweils andere Variante
// ist per display:none ausgeblendet und damit auch für Screenreader weg.
export default function PaketVergleich({ titel, pakete }: { titel: string; pakete: Paket[] }) {
  const spalte = (p: Paket) => (p.empfohlen ? 'bg-primary-200' : 'bg-light')

  return (
    <>
      <div className="grid gap-10 md:grid-cols-2 lg:hidden">
        {pakete.map((p) => (
          <PaketKarte key={p.name} paket={p} />
        ))}
      </div>

      <div className="hidden lg:block">
        <table className="w-full table-fixed border-separate border-spacing-x-3 text-left">
          <caption className="sr-only">{seitenTexte.vergleichBeschriftung(titel)}</caption>
          <colgroup>
            <col className="w-32" />
            {pakete.map((p) => (
              <col key={p.name} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <td />
              {pakete.map((p) => (
                <th key={p.name} scope="col" className={`rounded-t-lg px-5 pt-5 pb-4 align-bottom ${spalte(p)}`}>
                  {p.empfohlen && (
                    <span className="mb-2 inline-block rounded-full bg-zusammenarbeit px-3 py-0.5 text-xs font-bold text-white">
                      {seitenTexte.empfehlung}
                    </span>
                  )}
                  <span className="block text-sm font-semibold uppercase tracking-wide">{p.bezeichnung}</span>
                  <span className="block text-h5-lg font-bold">„{p.name}“</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="py-4 pr-2 align-top font-semibold">
                {seitenTexte.vergleichSpalteFuerWen}
              </th>
              {pakete.map((p) => (
                <td key={p.name} className={`px-5 py-4 align-top leading-relaxed ${spalte(p)}`}>
                  {p.fuerWen}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="py-4 pr-2 align-top font-semibold">
                {seitenTexte.vergleichSpalteLeistungen}
              </th>
              {pakete.map((p) => (
                <td key={p.name} className={`px-5 py-4 align-top ${spalte(p)}`}>
                  <LeistungsListe punkte={paketPunkte(p)} />
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="py-4 pr-2 align-top font-semibold">
                {seitenTexte.vergleichSpaltePreis}
              </th>
              {pakete.map((p) => (
                <td key={p.name} className={`rounded-b-lg px-5 py-4 align-top font-semibold ${spalte(p)}`}>
                  {seitenTexte.preisAufAnfrage}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
