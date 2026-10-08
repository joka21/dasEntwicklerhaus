export interface Referenz {
  slug: string
  titel: string
  /** Slug aus staedte.ts, z. B. 'krefeld' */
  stadt: string
  /** Slugs aus bausteine.ts (Stufen oder Zusatzbausteine) */
  bausteine: string[]
  ausgangslage: string
  loesung: string
  ergebnis: string
}

// Noch leer – solange keine Einträge vorhanden sind, zeigen die Seiten keine Referenzen an.
export const referenzen: Referenz[] = []
