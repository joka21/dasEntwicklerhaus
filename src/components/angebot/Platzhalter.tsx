/** Deutlich markierter Platzhalter für Texte, die noch geliefert werden. */
export default function Platzhalter({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-menschen-600 bg-menschen-50 p-6 text-dark">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-menschen-800">
        Platzhalter – Text folgt
      </p>
      <div className="text-base lg:text-lg">{children}</div>
    </div>
  )
}
