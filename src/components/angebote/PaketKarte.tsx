import type { Paket } from '@/types/angebote'
import { seitenTexte } from '@/data/angebote'
import LeistungsListe from './LeistungsListe'

export function paketPunkte(paket: Paket, kompakt = false): string[] {
  return [
    ...(paket.basiertAuf ? [seitenTexte.allesAus(paket.basiertAuf)] : []),
    ...(kompakt ? paket.leistungen.slice(0, 3) : paket.leistungen),
  ]
}

// Bei kompakt (Städteseiten) nur die ersten drei eigenen Leistungen.
export default function PaketKarte({ paket, kompakt = false }: { paket: Paket; kompakt?: boolean }) {
  return (
    <article
      className={`relative flex flex-col rounded-lg bg-light p-6 shadow-md lg:p-8 ${
        paket.empfohlen ? 'border-4 border-zusammenarbeit' : 'border border-secondary-300'
      }`}
    >
      {paket.empfohlen && (
        <p className="absolute -top-4 left-6 rounded-full bg-zusammenarbeit px-4 py-1 text-sm font-bold text-white">
          {seitenTexte.empfehlung}
        </p>
      )}
      <p className="text-sm font-semibold uppercase tracking-wide">{paket.bezeichnung}</p>
      <h3 className="mt-1 text-h5 font-bold lg:text-h5-lg">„{paket.name}“</h3>
      <p className="mt-3 leading-relaxed">{paket.fuerWen}</p>
      <LeistungsListe punkte={paketPunkte(paket, kompakt)} className="mt-6 flex-1" />
      <p className="mt-6 border-t border-secondary-300 pt-4 font-semibold">{seitenTexte.preisAufAnfrage}</p>
    </article>
  )
}
