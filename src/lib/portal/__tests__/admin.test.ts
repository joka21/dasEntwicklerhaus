import { and, eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/lib/db'
import { authUser, portalClientMembers, portalClients, portalProjects } from '@/lib/db/schema'
import { kundeAnlegen, ladeAdminUebersicht, personZuordnen, projektAnlegen } from '../admin'
import { freigabeSpeichern, kommentarSpeichern, ladeProjektliste } from '../daten'
import { ID, testdatenAnlegen, viewer } from './testdaten'

// Regel 11: Jede Admin-Funktion – erlaubt für Admins, verboten für Kunden und ohne Login.
// Der Upload (entwurfHochladen) ist in speicher.test.ts getestet.

beforeEach(testdatenAnlegen)

describe('Übersicht', () => {
  it('Admin sieht alle Kunden mit Personen, Projekten, Kommentaren und Freigaben', async () => {
    await freigabeSpeichern(viewer.kundeA, { slug: 'projekt-1', variantId: ID.variante1b })
    await kommentarSpeichern(viewer.admin, { slug: 'projekt-1', variantId: ID.variante1a, body: 'Antwort' })

    const u = await ladeAdminUebersicht(viewer.admin)
    expect(u?.kunden.map((k) => k.name)).toEqual(['Kunde 1', 'Kunde 2'])
    const k1 = u!.kunden[0]
    expect(k1.mitglieder.map((m) => m.email)).toEqual([viewer.kundeA.email])
    expect(k1.projekte[0]).toMatchObject({
      slug: 'projekt-1',
      kommentare: 2,
      freigabe: { variantTitle: 'Variante 1b', approvedBy: viewer.kundeA.email },
    })
    expect(k1.projekte[0].varianten.map((v) => [v.title, v.freigegeben])).toEqual([
      ['Variante 1a', false],
      ['Variante 1b', true],
    ])
    expect(u!.kunden[1].projekte[0]).toMatchObject({ kommentare: 0, freigabe: null })
    expect(u!.kunden[1].projekte[0].varianten).toHaveLength(1)
    expect(u!.neuesteKommentare.map((c) => [c.body, c.vonAdmin])).toEqual([
      ['Antwort', true],
      ['Schön!', false],
    ])
  })
  it('Kunde bekommt keine Übersicht', async () => {
    expect(await ladeAdminUebersicht(viewer.kundeA)).toBeNull()
  })
  it('ohne Login nicht', async () => {
    expect(await ladeAdminUebersicht(null)).toBeNull()
  })
})

describe('Kunde anlegen', () => {
  it('Admin legt an', async () => {
    const e = await kundeAnlegen(viewer.admin, { name: '  Bäckerei Meier ' })
    expect(e.status).toBe('ok')
    if (e.status !== 'ok') return
    const [k] = await db.select().from(portalClients).where(eq(portalClients.id, e.id))
    expect(k.name).toBe('Bäckerei Meier')
  })
  it('leerer Name abgelehnt', async () => {
    expect((await kundeAnlegen(viewer.admin, { name: '  ' })).status).toBe('ungueltig')
  })
  it('Kunde darf nicht', async () => {
    expect((await kundeAnlegen(viewer.kundeA, { name: 'X' })).status).toBe('kein-zugriff')
  })
  it('ohne Login nicht', async () => {
    expect((await kundeAnlegen(null, { name: 'X' })).status).toBe('kein-zugriff')
  })
})

describe('Person zuordnen (Einladung)', () => {
  it('neue Adresse: Nutzer angelegt (noch nicht bestätigt) und dem Kunden zugeordnet', async () => {
    const e = await personZuordnen(viewer.admin, { clientId: ID.kunde1, email: ' Neu@Kunde1.TEST ', name: 'Neu' })
    expect(e).toMatchObject({ status: 'ok', email: 'neu@kunde1.test', neu: true })
    const [u] = await db.select().from(authUser).where(eq(authUser.email, 'neu@kunde1.test'))
    expect(u).toMatchObject({ name: 'Neu', emailVerified: false })
    const mitglied = await db
      .select()
      .from(portalClientMembers)
      .where(and(eq(portalClientMembers.clientId, ID.kunde1), eq(portalClientMembers.userId, u.id)))
    expect(mitglied).toHaveLength(1)
  })
  it('vorhandene Adresse wird wiederverwendet, die Person sieht danach beide Kunden', async () => {
    const e = await personZuordnen(viewer.admin, { clientId: ID.kunde2, email: viewer.kundeA.email })
    expect(e).toMatchObject({ status: 'ok', userId: ID.kundeA, neu: false })
    expect((await ladeProjektliste(viewer.kundeA)).map((p) => p.slug).sort()).toEqual(['projekt-1', 'projekt-2'])
  })
  it('doppelte Zuordnung ist kein Fehler', async () => {
    expect((await personZuordnen(viewer.admin, { clientId: ID.kunde1, email: viewer.kundeA.email })).status).toBe('ok')
  })
  it('ungültige Adresse oder unbekannter Kunde abgelehnt', async () => {
    expect((await personZuordnen(viewer.admin, { clientId: ID.kunde1, email: 'keine-adresse' })).status).toBe('ungueltig')
    expect(
      (await personZuordnen(viewer.admin, { clientId: '00000000-0000-4000-8000-0000000000ff', email: 'x@y.de' })).status
    ).toBe('ungueltig')
    expect(await db.select().from(authUser).where(eq(authUser.email, 'x@y.de'))).toHaveLength(0)
  })
  it('Kunde darf niemanden zuordnen', async () => {
    expect((await personZuordnen(viewer.kundeA, { clientId: ID.kunde1, email: 'freund@x.de' })).status).toBe('kein-zugriff')
    expect(await db.select().from(authUser).where(eq(authUser.email, 'freund@x.de'))).toHaveLength(0)
  })
  it('ohne Login nicht', async () => {
    expect((await personZuordnen(null, { clientId: ID.kunde1, email: 'x@y.de' })).status).toBe('kein-zugriff')
  })
})

describe('Projekt anlegen', () => {
  const eingabe = { clientId: ID.kunde1, slug: 'neues-projekt', title: 'Neues Projekt' }

  it('Admin legt an, Mitglieder des Kunden sehen es', async () => {
    expect((await projektAnlegen(viewer.admin, eingabe)).status).toBe('ok')
    expect((await ladeProjektliste(viewer.kundeA)).map((p) => p.slug)).toContain('neues-projekt')
    expect((await ladeProjektliste(viewer.kundeB)).map((p) => p.slug)).not.toContain('neues-projekt')
  })
  it('vergebener oder ungültiger Kurzname abgelehnt', async () => {
    expect((await projektAnlegen(viewer.admin, { ...eingabe, slug: 'projekt-1' })).status).toBe('ungueltig')
    expect((await projektAnlegen(viewer.admin, { ...eingabe, slug: 'Mit Leerzeichen' })).status).toBe('ungueltig')
  })
  it('unbekannter Kunde abgelehnt', async () => {
    expect(
      (await projektAnlegen(viewer.admin, { ...eingabe, clientId: '00000000-0000-4000-8000-0000000000ff' })).status
    ).toBe('ungueltig')
  })
  it('Kunde darf nicht', async () => {
    expect((await projektAnlegen(viewer.kundeA, eingabe)).status).toBe('kein-zugriff')
    expect(await db.select().from(portalProjects).where(eq(portalProjects.slug, 'neues-projekt'))).toHaveLength(0)
  })
  it('ohne Login nicht', async () => {
    expect((await projektAnlegen(null, eingabe)).status).toBe('kein-zugriff')
  })
})
