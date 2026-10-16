import Link from 'next/link'
import { seitenTexte } from '@/data/angebote'

const AKZENTE = ['border-t-umwelt', 'border-t-frieden', 'border-t-zukunft']

// Verlinkte Karte für eine Zielgruppe (Übersicht und „Weitere Angebote“).
export default function AngebotKarte({
  href,
  titel,
  text,
  index,
}: {
  href: string
  titel: string
  text: string
  index: number
}) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col rounded-lg border-t-8 bg-light p-6 shadow-md transition-shadow hover:shadow-xl lg:p-8 ${
        AKZENTE[index % AKZENTE.length]
      }`}
    >
      <h3 className="text-h5 font-bold group-hover:underline lg:text-h5-lg">{titel}</h3>
      <p className="mt-3 flex-1 leading-relaxed">{text}</p>
      <p className="mt-6 font-bold">
        {seitenTexte.mehrErfahren} <span aria-hidden="true">→</span>
      </p>
    </Link>
  )
}
