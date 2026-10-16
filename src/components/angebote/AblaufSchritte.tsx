import type { Schritt } from '@/types/angebote'

const FARBEN = ['bg-umwelt', 'bg-menschen', 'bg-frieden', 'bg-zukunft']

export default function AblaufSchritte({ schritte }: { schritte: Schritt[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {schritte.map((s, i) => (
        <li key={s.titel} className="rounded-lg bg-light p-6 shadow-md">
          <span
            aria-hidden="true"
            className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${FARBEN[i % FARBEN.length]}`}
          >
            {i + 1}
          </span>
          <h3 className="mt-4 text-h6 font-bold lg:text-h6-lg">{s.titel}</h3>
          <p className="mt-2 leading-relaxed">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}
