import Image from 'next/image'
import Link from 'next/link'
import type { ProjektKarte } from '@/types/project'
import { projekteSeite } from '@/data/projects'

const categoryBorders = {
  menschen: 'border-t-menschen',
  frieden: 'border-t-frieden',
  umwelt: 'border-t-umwelt',
  zusammenarbeit: 'border-t-zusammenarbeit',
  zukunft: 'border-t-zukunft',
}

// Höhe bei 24 px Breite, passend zum Seitenverhältnis der PNGs (100 px breit)
const categoryIcons = {
  menschen: { src: '/images/categories/menschen.png', hoehe: 15 },
  frieden: { src: '/images/categories/frieden.png', hoehe: 24 },
  umwelt: { src: '/images/categories/umwelt.png', hoehe: 24 },
  zusammenarbeit: { src: '/images/categories/zusammenarbeite.png', hoehe: 19 },
  zukunft: { src: '/images/categories/zulunft.png', hoehe: 20 },
}

const KARTE =
  'group flex h-full flex-col overflow-hidden rounded-lg bg-light shadow-md transition-shadow hover:shadow-xl'

// Verlinkte Projektkarte; externe Projekte öffnen ihre Website in einem neuen Tab.
// vorrang: Bild sofort laden (erste Karte im sichtbaren Bereich, LCP).
export default function ProjectCard({ karte, vorrang = false }: { karte: ProjektKarte; vorrang?: boolean }) {
  const inhalt = (
    <>
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={karte.image}
          alt=""
          fill
          loading={vorrang ? 'eager' : 'lazy'}
          fetchPriority={vorrang ? 'high' : 'auto'}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className={`relative flex flex-1 flex-col border-t-8 p-6 ${categoryBorders[karte.category]}`}>
        <div className="absolute -top-7 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-light shadow-md">
          <Image
            src={categoryIcons[karte.category].src}
            alt=""
            width={24}
            height={categoryIcons[karte.category].hoehe}
            className="h-auto w-6"
          />
        </div>

        <h3 className="text-h5 font-bold group-hover:underline lg:text-h5-lg">{karte.name}</h3>
        <p className="mt-1 flex items-center text-sm font-medium">
          <svg aria-hidden="true" className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {karte.city}
        </p>
        <p className="mt-3 flex-1 leading-relaxed">{karte.description}</p>
        <p className="mt-6 font-bold">
          {karte.extern ? (
            <>
              {projekteSeite.zurWebsite} <span aria-hidden="true">↗</span>
              <span className="sr-only"> {projekteSeite.neuerTab}</span>
            </>
          ) : (
            <>
              {projekteSeite.mehrErfahren} <span aria-hidden="true">→</span>
            </>
          )}
        </p>
      </div>
    </>
  )

  if (karte.extern) {
    return (
      <a href={karte.href} target="_blank" rel="noopener noreferrer" className={KARTE}>
        {inhalt}
      </a>
    )
  }

  return (
    <Link href={karte.href} className={KARTE}>
      {inhalt}
    </Link>
  )
}
