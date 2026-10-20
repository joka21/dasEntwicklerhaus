export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Server laufen in UTC – Datum immer in deutscher Zeit anzeigen.
export function formatDatum(datum: Date | string, mitUhrzeit = false): string {
  return new Date(datum).toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'medium',
    ...(mitUhrzeit ? { timeStyle: 'short' } : {}),
  })
}

export function entwurfUrl(projektSlug: string, varianteId: string): string {
  return `/portal/${projektSlug}/entwurf/${varianteId}`
}
