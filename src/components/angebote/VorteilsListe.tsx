import type { VorteilIcon } from '@/data/startseite'

const FARBEN = ['bg-umwelt', 'bg-menschen', 'bg-frieden', 'bg-zukunft']

const PFADE: Record<VorteilIcon, string> = {
  // Person
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  // Funken
  ki: 'M12 3v4m0 10v4M3 12h4m10 0h4M6.3 6.3l2.8 2.8m5.8 5.8 2.8 2.8m0-11.4-2.8 2.8m-5.8 5.8-2.8 2.8',
  // Schild
  europa: 'M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4',
  // Stift
  pflege: 'M4 20h4L19 9l-4-4L4 16v4Zm9-13 4 4',
}

export default function VorteilsListe({
  punkte,
}: {
  punkte: { icon: VorteilIcon; titel: string; text: string }[]
}) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {punkte.map((p, i) => (
        <li key={p.titel} className="flex gap-4">
          <span
            aria-hidden="true"
            className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${FARBEN[i % FARBEN.length]}`}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={PFADE[p.icon]} />
            </svg>
          </span>
          <div>
            <h3 className="text-h6 font-bold lg:text-h6-lg">{p.titel}</h3>
            <p className="mt-2 leading-relaxed">{p.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
