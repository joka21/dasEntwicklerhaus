export interface Stadt {
  slug: string
  name: string
  portalName: string
  /** Wird nachgetragen. Solange leer, wird das Portal ohne Link genannt. */
  portalUrl: string
  einleitung: string
}

export const staedte: Stadt[] = [
  {
    slug: 'krefeld',
    name: 'Krefeld',
    portalName: '[Platzhalter: Portalname Krefeld]',
    portalUrl: '',
    einleitung: '[Platzhalter: Einleitung für Krefeld]',
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    portalName: '[Platzhalter: Portalname Düsseldorf]',
    portalUrl: '',
    einleitung: '[Platzhalter: Einleitung für Düsseldorf]',
  },
]
