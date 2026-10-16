import Link from 'next/link'
import type { Krume } from '@/lib/angebote-seo'
import { seitenTexte } from '@/data/angebote'

// Sichtbare Brotkrumen; die letzte ist die aktuelle Seite und kein Link.
export default function Breadcrumbs({ krumen }: { krumen: Krume[] }) {
  return (
    <nav aria-label={seitenTexte.breadcrumbLabel} className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {krumen.map((k, i) => {
          const letzte = i === krumen.length - 1
          return (
            <li key={k.path} className="flex items-center gap-x-2">
              {letzte ? (
                <span aria-current="page" className="font-semibold">
                  {k.name}
                </span>
              ) : (
                <>
                  <Link href={k.path} className="rounded underline underline-offset-2 hover:no-underline">
                    {k.name}
                  </Link>
                  <span aria-hidden="true">›</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
