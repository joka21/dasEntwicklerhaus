import type { ReactNode } from 'react'
import type { Krume } from '@/lib/angebote-seo'
import Breadcrumbs from './Breadcrumbs'

interface AngebotHeroProps {
  h1: string
  intro: string
  krumen: Krume[]
  children?: ReactNode
}

// Kopfbereich im Stil der Startseite: blaue Fläche mit geometrischen Formen.
export default function AngebotHero({ h1, intro, krumen, children }: AngebotHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div aria-hidden="true" className="absolute top-0 left-0 h-16 w-24 bg-umwelt lg:h-28 lg:w-40" />
      <div
        aria-hidden="true"
        className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-frieden lg:h-56 lg:w-56"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 hidden md:block"
        style={{
          width: 0,
          height: 0,
          borderLeft: '60px solid transparent',
          borderRight: '60px solid transparent',
          borderBottom: '48px solid var(--menschen)',
        }}
      />
      <div className="relative z-10 mx-auto w-[90%] max-w-6xl pt-24 pb-16 lg:pt-28 lg:pb-24">
        <Breadcrumbs krumen={krumen} />
        <h1 className="max-w-4xl text-h3 font-bold text-balance lg:text-h2-lg">{h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed lg:text-xl">{intro}</p>
        {children}
      </div>
    </section>
  )
}
