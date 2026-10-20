import { access, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { eq } from 'drizzle-orm'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/lib/db'
import {
  authSession,
  portalAdmins,
  portalClientMembers,
  portalDesignVariants,
  portalProjectApprovals,
  portalVariantComments,
} from '@/lib/db/schema'
import {
  empfaengerFuerAntwort,
  entwurfHochladen,
  freigabeZuruecksetzen,
  personEntfernen,
  personZuordnen,
  varianteLoeschen,
} from '../admin'
import { freigabeSpeichern, kommentarSpeichern, ladeProjekt, ladeProjektInhalt } from '../daten'
import { ID, testdatenAnlegen, viewer } from './testdaten'

// Ergänzungen in Phase 5: festes Admin-Kennzeichen, Hinweis-Mail an Kunden,
// Person entfernen, Freigabe zurücksetzen, Entwurf löschen.
// Je Funktion: Admin erlaubt, Kunde verboten, ohne Login verboten.

let ablage: string
beforeAll(async () => {
  ablage = await mkdtemp(path.join(tmpdir(), 'portal-ablage-'))
  process.env.PORTAL_STORAGE_PATH = ablage
})
afterAll(async () => {
  await rm(ablage, { recursive: true, force: true })
})
beforeEach(testdatenAnlegen)

async function sitzungAnlegen(userId: string) {
  await db.insert(authSession).values({
    userId,
    token: `token-${userId}-${Math.random()}`,
    expiresAt: new Date(Date.now() + 86_400_000),
  })
}

async function sitzungenVon(userId: string) {
  return db.select().from(authSession).where(eq(authSession.userId, userId))
}

describe('Kennzeichen is_admin', () => {
  it('Admin-Kommentar wird beim Speichern als Admin gekennzeichnet', async () => {
    await kommentarSpeichern(viewer.admin, { slug: 'projekt-1', variantId: ID.variante1a, body: 'Antwort' })
    const [k] = await db.select().from(portalVariantComments).where(eq(portalVariantComments.body, 'Antwort'))
    expect(k.isAdmin).toBe(true)
  })
  it('Kunden-Kommentar nicht', async () => {
    await kommentarSpeichern(viewer.kundeA, { slug: 'projekt-1', variantId: ID.variante1a, body: 'Frage' })
    const [k] = await db.select().from(portalVariantComments).where(eq(portalVariantComments.body, 'Frage'))
    expect(k.isAdmin).toBe(false)
  })
  it('Kennzeichen bleibt, wenn der Admin später ausgetragen wird', async () => {
    await kommentarSpeichern(viewer.admin, { slug: 'projekt-1', variantId: ID.variante1a, body: 'Antwort' })
    await db.delete(portalAdmins).where(eq(portalAdmins.userId, ID.admin))
    const inhalt = await ladeProjektInhalt(viewer.kundeA, ID.projekt1)
    expect(inhalt?.kommentare.find((k) => k.body === 'Antwort')?.vonAdmin).toBe(true)
  })
})

describe('Empfänger der Hinweis-Mail bei Admin-Antwort', () => {
  it('Admin bekommt alle Personen des Kunden, nicht die anderer Kunden', async () => {
    await personZuordnen(viewer.admin, { clientId: ID.kunde1, email: 'zweite@kunde1.test' })
    expect(await empfaengerFuerAntwort(viewer.admin, ID.projekt1)).toEqual([viewer.kundeA.email, 'zweite@kunde1.test'])
  })
  it('Kunde bekommt keine Adressen', async () => {
    expect(await empfaengerFuerAntwort(viewer.kundeA, ID.projekt1)).toEqual([])
  })
  it('ohne Login keine Adressen', async () => {
    expect(await empfaengerFuerAntwort(null, ID.projekt1)).toEqual([])
  })
})

describe('Person vom Kunden entfernen', () => {
  it('Zugriff ist sofort weg; ohne weiteren Kunden werden die Sitzungen beendet', async () => {
    await sitzungAnlegen(ID.kundeA)
    const e = await personEntfernen(viewer.admin, { clientId: ID.kunde1, userId: ID.kundeA })
    expect(e).toEqual({ status: 'ok', sitzungenBeendet: true })
    expect(await ladeProjekt(viewer.kundeA, 'projekt-1')).toBeNull()
    expect(await sitzungenVon(ID.kundeA)).toHaveLength(0)
  })
  it('bei weiterem Kunden bleiben die Sitzungen, nur dieser Zugriff endet', async () => {
    await personZuordnen(viewer.admin, { clientId: ID.kunde2, email: viewer.kundeA.email })
    await sitzungAnlegen(ID.kundeA)
    const e = await personEntfernen(viewer.admin, { clientId: ID.kunde1, userId: ID.kundeA })
    expect(e).toEqual({ status: 'ok', sitzungenBeendet: false })
    expect(await ladeProjekt(viewer.kundeA, 'projekt-1')).toBeNull()
    expect(await ladeProjekt(viewer.kundeA, 'projekt-2')).not.toBeNull()
    expect(await sitzungenVon(ID.kundeA)).toHaveLength(1)
  })
  it('Sitzungen von Admins bleiben, auch wenn sie keinem Kunden mehr zugeordnet sind', async () => {
    await db.insert(portalClientMembers).values({ clientId: ID.kunde1, userId: ID.admin })
    await sitzungAnlegen(ID.admin)
    const e = await personEntfernen(viewer.admin, { clientId: ID.kunde1, userId: ID.admin })
    expect(e).toEqual({ status: 'ok', sitzungenBeendet: false })
    expect(await sitzungenVon(ID.admin)).toHaveLength(1)
  })
  it('nicht vorhandene Zuordnung wird gemeldet', async () => {
    expect((await personEntfernen(viewer.admin, { clientId: ID.kunde2, userId: ID.kundeA })).status).toBe('ungueltig')
  })
  it('Kunde darf niemanden entfernen', async () => {
    await sitzungAnlegen(ID.kundeB)
    expect((await personEntfernen(viewer.kundeA, { clientId: ID.kunde2, userId: ID.kundeB })).status).toBe('kein-zugriff')
    expect(await ladeProjekt(viewer.kundeB, 'projekt-2')).not.toBeNull()
    expect(await sitzungenVon(ID.kundeB)).toHaveLength(1)
  })
  it('ohne Login nicht', async () => {
    expect((await personEntfernen(null, { clientId: ID.kunde1, userId: ID.kundeA })).status).toBe('kein-zugriff')
    expect(await ladeProjekt(viewer.kundeA, 'projekt-1')).not.toBeNull()
  })
})

describe('Freigabe zurücksetzen', () => {
  beforeEach(async () => {
    await freigabeSpeichern(viewer.kundeA, { slug: 'projekt-1', variantId: ID.variante1b })
  })
  const freigaben = () => db.select().from(portalProjectApprovals).where(eq(portalProjectApprovals.projectId, ID.projekt1))

  it('Admin setzt mit Bestätigung zurück, der Kunde kann neu freigeben', async () => {
    expect((await freigabeZuruecksetzen(viewer.admin, { projectId: ID.projekt1, bestaetigt: true })).status).toBe('ok')
    expect(await freigaben()).toHaveLength(0)
    expect((await freigabeSpeichern(viewer.kundeA, { slug: 'projekt-1', variantId: ID.variante1a })).status).toBe('ok')
  })
  it('ohne Bestätigung passiert nichts', async () => {
    expect((await freigabeZuruecksetzen(viewer.admin, { projectId: ID.projekt1, bestaetigt: false })).status).toBe('ungueltig')
    expect(await freigaben()).toHaveLength(1)
  })
  it('Projekt ohne Freigabe wird gemeldet', async () => {
    expect((await freigabeZuruecksetzen(viewer.admin, { projectId: ID.projekt2, bestaetigt: true })).status).toBe('ungueltig')
  })
  it('Kunde darf nicht zurücksetzen', async () => {
    expect((await freigabeZuruecksetzen(viewer.kundeA, { projectId: ID.projekt1, bestaetigt: true })).status).toBe(
      'kein-zugriff'
    )
    expect(await freigaben()).toHaveLength(1)
  })
  it('ohne Login nicht', async () => {
    expect((await freigabeZuruecksetzen(null, { projectId: ID.projekt1, bestaetigt: true })).status).toBe('kein-zugriff')
    expect(await freigaben()).toHaveLength(1)
  })
})

describe('Entwurf löschen', () => {
  async function hochgeladen() {
    const e = await entwurfHochladen(viewer.admin, {
      projectId: ID.projekt1,
      title: 'Zum Löschen',
      datei: new File(['<p>weg</p>'], 'x.html', { type: 'text/html' }),
    })
    if (e.status !== 'ok') throw new Error('Upload fehlgeschlagen')
    await kommentarSpeichern(viewer.kundeA, { slug: 'projekt-1', variantId: e.variantId, body: 'Kommentar dazu' })
    return { ...e, datei: path.join(ablage, e.storagePath) }
  }
  const gibtEs = (datei: string) =>
    access(datei).then(
      () => true,
      () => false
    )

  it('Admin löscht mit Bestätigung: Eintrag, Kommentare und Datei weg', async () => {
    const e = await hochgeladen()
    expect((await varianteLoeschen(viewer.admin, { variantId: e.variantId, bestaetigt: true })).status).toBe('ok')
    expect(await db.select().from(portalDesignVariants).where(eq(portalDesignVariants.id, e.variantId))).toHaveLength(0)
    expect(await db.select().from(portalVariantComments).where(eq(portalVariantComments.variantId, e.variantId))).toHaveLength(0)
    expect(await gibtEs(e.datei)).toBe(false)
  })
  it('freigegebener Entwurf kann nicht gelöscht werden', async () => {
    await freigabeSpeichern(viewer.kundeA, { slug: 'projekt-1', variantId: ID.variante1b })
    expect((await varianteLoeschen(viewer.admin, { variantId: ID.variante1b, bestaetigt: true })).status).toBe('ungueltig')
    expect(await db.select().from(portalDesignVariants).where(eq(portalDesignVariants.id, ID.variante1b))).toHaveLength(1)
  })
  it('ohne Bestätigung passiert nichts', async () => {
    const e = await hochgeladen()
    expect((await varianteLoeschen(viewer.admin, { variantId: e.variantId, bestaetigt: false })).status).toBe('ungueltig')
    expect(await gibtEs(e.datei)).toBe(true)
  })
  it('Kunde darf nicht löschen', async () => {
    const e = await hochgeladen()
    expect((await varianteLoeschen(viewer.kundeA, { variantId: e.variantId, bestaetigt: true })).status).toBe('kein-zugriff')
    expect(await gibtEs(e.datei)).toBe(true)
  })
  it('ohne Login nicht', async () => {
    const e = await hochgeladen()
    expect((await varianteLoeschen(null, { variantId: e.variantId, bestaetigt: true })).status).toBe('kein-zugriff')
    expect(await db.select().from(portalDesignVariants).where(eq(portalDesignVariants.id, e.variantId))).toHaveLength(1)
  })
})
