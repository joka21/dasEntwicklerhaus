import type { ReactNode } from 'react'

interface SektionProps {
  titel: string
  id: string
  children: ReactNode
  hell?: boolean
}

// Einheitlicher Abschnitt mit H2; abwechselnd weiß und hellblau.
export default function Sektion({ titel, id, children, hell = true }: SektionProps) {
  return (
    <section aria-labelledby={id} className={hell ? 'bg-light' : 'bg-primary-100'}>
      <div className="mx-auto w-[90%] max-w-6xl py-14 lg:py-20">
        <h2 id={id} className="mb-8 text-h4 font-bold text-balance lg:text-h3-lg">
          {titel}
        </h2>
        {children}
      </div>
    </section>
  )
}
