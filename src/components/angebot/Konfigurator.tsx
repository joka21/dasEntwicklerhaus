'use client'

import { useState } from 'react'
import Link from 'next/link'
import { bausteine, zusatzbausteine, preisZeile } from '@/data/bausteine'

/**
 * Auswahl von Stufen und Zusatzbausteinen. Die Auswahl steht in einer
 * mitlaufenden Übersicht und wird per URL (?bausteine=slug,slug) an das
 * Kontaktformular übergeben.
 */
export default function Konfigurator() {
  const [auswahl, setAuswahl] = useState<string[]>([])

  const toggle = (slug: string) =>
    setAuswahl((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))

  // Anzeige-Reihenfolge wie in den Daten, unabhängig von der Klick-Reihenfolge
  const gewaehlt = [...bausteine, ...zusatzbausteine].filter((b) => auswahl.includes(b.slug))
  const anfrageHref = `/kontakt?bausteine=${encodeURIComponent(gewaehlt.map((b) => b.slug).join(','))}`

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-10">
        <fieldset>
          <legend className="text-2xl font-bold text-umwelt-800 mb-4">Stufen</legend>
          <div className="space-y-3">
            {bausteine.map((b) => (
              <Option
                key={b.slug}
                checked={auswahl.includes(b.slug)}
                onChange={() => toggle(b.slug)}
                titel={`${b.stufe}. ${b.titel}`}
                kurztext={b.kurztext}
                preis={preisZeile(b.abrechnung)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-2xl font-bold text-umwelt-800 mb-4">Zusatzbausteine</legend>
          <div className="space-y-3">
            {zusatzbausteine.map((z) => (
              <Option
                key={z.slug}
                checked={auswahl.includes(z.slug)}
                onChange={() => toggle(z.slug)}
                titel={z.titel}
                kurztext={z.kurztext}
                preis={preisZeile(z.abrechnung)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Mitlaufende Übersicht der Auswahl */}
      <aside className="lg:sticky lg:top-6 self-start rounded-lg bg-white p-6 shadow-md" aria-live="polite">
        <h2 className="text-xl font-bold text-dark mb-4">Ihre Auswahl</h2>
        {gewaehlt.length === 0 ? (
          <p className="text-secondary-900">Noch nichts ausgewählt.</p>
        ) : (
          <ul className="space-y-2">
            {gewaehlt.map((b) => (
              <li key={b.slug} className="flex items-start justify-between gap-2">
                <span className="text-dark">{b.titel}</span>
                <button
                  type="button"
                  onClick={() => toggle(b.slug)}
                  className="text-sm text-secondary-800 underline hover:text-dark"
                  aria-label={`${b.titel} entfernen`}
                >
                  entfernen
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-sm text-secondary-800">Preis auf Anfrage</p>
        <Link
          href={anfrageHref}
          aria-disabled={gewaehlt.length === 0}
          className={`mt-6 block w-full rounded-lg px-6 py-3 text-center font-medium transition-colors ${
            gewaehlt.length === 0
              ? 'pointer-events-none bg-secondary-300 text-secondary-800'
              : 'bg-primary text-white hover:bg-primary-700'
          }`}
        >
          Unverbindlich anfragen
        </Link>
      </aside>
    </div>
  )
}

function Option({
  checked,
  onChange,
  titel,
  kurztext,
  preis,
}: {
  checked: boolean
  onChange: () => void
  titel: string
  kurztext: string
  preis: string
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 bg-white p-4 transition-colors ${
        checked ? 'border-primary-700' : 'border-transparent shadow-md hover:border-secondary-300'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
      />
      <span className="flex-1">
        <span className="block text-lg font-semibold text-dark">{titel}</span>
        <span className="block text-secondary-900">{kurztext}</span>
        <span className="mt-1 block text-sm font-medium text-secondary-800">{preis}</span>
      </span>
    </label>
  )
}
