import { cache } from 'react'
import { aktuelleSitzung } from '@/lib/auth'
import { istAdmin, type Viewer } from './authz'

/**
 * Angemeldeter Nutzer des aktuellen Requests, oder null ohne gültige Sitzung.
 * Pro Request nur einmal ermittelt (Layout, Seite und Metadaten teilen sich das).
 */
export const aktuellerViewer = cache(async (): Promise<Viewer | null> => {
  const sitzung = await aktuelleSitzung()
  if (!sitzung) return null
  return {
    userId: sitzung.user.id,
    email: sitzung.user.email,
    istAdmin: await istAdmin(sitzung.user.id),
  }
})
