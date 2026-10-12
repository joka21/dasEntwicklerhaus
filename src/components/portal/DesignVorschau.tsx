'use client'

import { useEffect, useRef, useState } from 'react'

const ANSICHTEN = {
  desktop: { label: 'Desktop', breite: 1440, hoehe: 900 },
  mobil: { label: 'Mobil', breite: 390, hoehe: 844 },
} as const

type Ansicht = keyof typeof ANSICHTEN

interface DesignVorschauProps {
  src: string
  titel: string
}

// Zeigt den Entwurf in echter Breite (1440 bzw. 390 px) und skaliert ihn
// herunter, wenn der Platz nicht reicht.
export default function DesignVorschau({ src, titel }: DesignVorschauProps) {
  const [ansicht, setAnsicht] = useState<Ansicht>('desktop')
  const [verfuegbar, setVerfuegbar] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setVerfuegbar(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { breite, hoehe } = ANSICHTEN[ansicht]
  const skalierung = verfuegbar ? Math.min(1, verfuegbar / breite) : 1

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Ansicht" className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
          {(Object.keys(ANSICHTEN) as Ansicht[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={ansicht === key}
              onClick={() => setAnsicht(key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                ansicht === key ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-gray-100'
              }`}
            >
              {ANSICHTEN[key].label} ({ANSICHTEN[key].breite}px)
            </button>
          ))}
        </div>
        <a href={src} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
          In neuem Tab öffnen
        </a>
      </div>

      <div ref={containerRef} className="w-full">
        <div
          className="mx-auto overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm"
          style={{ width: breite * skalierung, height: hoehe * skalierung }}
        >
          <iframe
            src={src}
            title={`Entwurf: ${titel} (${ANSICHTEN[ansicht].label})`}
            sandbox=""
            referrerPolicy="no-referrer"
            loading="lazy"
            style={{
              width: breite,
              height: hoehe,
              transform: `scale(${skalierung})`,
              transformOrigin: 'top left',
              border: 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}
