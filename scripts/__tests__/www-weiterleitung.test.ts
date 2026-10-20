import { describe, expect, it } from 'vitest'
import nextConfig from '../../next.config.mjs'

// Weiterleitung dasentwicklerhaus.de → www.dasentwicklerhaus.de (301).
// Prüft die Regel in next.config.mjs; das tatsächliche Verhalten des Servers
// (Status, Location) ist zusätzlich per curl gegen `next start` geprüft.

interface Regel {
  source: string
  destination: string
  statusCode?: number
  permanent?: boolean
  has?: { type: string; value?: string }[]
}

async function wwwRegel(): Promise<Regel> {
  const regeln = (await nextConfig.redirects!()) as Regel[]
  const regel = regeln.find((r) => r.has?.some((h) => h.type === 'host'))
  if (!regel) throw new Error('Keine Host-Weiterleitung gefunden')
  return regel
}

describe('Weiterleitung ohne www', () => {
  it('ist die erste Regel, damit sie vor allen anderen greift', async () => {
    const regeln = (await nextConfig.redirects!()) as Regel[]
    expect(regeln[0]).toBe(regeln.find((r) => r.has?.some((h) => h.type === 'host')))
  })
  it('leitet mit 301 auf www weiter und behält den Pfad', async () => {
    const regel = await wwwRegel()
    expect(regel).toMatchObject({
      source: '/:path*',
      destination: 'https://www.dasentwicklerhaus.de/:path*',
      statusCode: 301,
    })
    expect(regel.permanent).toBeUndefined()
  })
  it('greift genau für dasentwicklerhaus.de, nicht für www oder andere Hosts', async () => {
    const wert = (await wwwRegel()).has!.find((h) => h.type === 'host')!.value!
    // Next vergleicht den Host mit dem Wert als vollständigem regulären Ausdruck.
    const passt = (host: string) => new RegExp(`^${wert}$`).test(host)
    expect(passt('dasentwicklerhaus.de')).toBe(true)
    expect(passt('www.dasentwicklerhaus.de')).toBe(false)
    expect(passt('dasentwicklerhausXde')).toBe(false)
    expect(passt('neu.p-123456.project.space')).toBe(false)
    expect(passt('localhost')).toBe(false)
  })
})
