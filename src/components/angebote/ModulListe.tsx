export default function ModulListe({ eintraege }: { eintraege: string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {eintraege.map((e) => (
        <li key={e} className="rounded-full border-2 border-dark bg-light px-5 py-2 font-semibold">
          {e}
        </li>
      ))}
    </ul>
  )
}
