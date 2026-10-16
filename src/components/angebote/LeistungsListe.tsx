function Haken() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-5 w-5 flex-none fill-umwelt-800">
      <path d="M7.6 14.2 3.4 10l1.4-1.4 2.8 2.8 7.6-7.6L16.6 5z" />
    </svg>
  )
}

export default function LeistungsListe({
  punkte,
  className = '',
}: {
  punkte: string[]
  className?: string
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {punkte.map((p) => (
        <li key={p} className="flex gap-3 leading-relaxed">
          <Haken />
          {p}
        </li>
      ))}
    </ul>
  )
}
