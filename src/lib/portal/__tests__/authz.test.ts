import { and, eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/lib/db'
import { portalProjectApprovals, portalVariantComments } from '@/lib/db/schema'
import {
  darfEntwurfLesen,
  darfFreigeben,
  darfKommentieren,
  darfKundeLesen,
  darfMitgliedschaftLesen,
  darfProjektLesen,
  istAdmin,
  mussAdminSein,
} from '../authz'
import {
  freigabeSpeichern,
  kommentarSpeichern,
  ladeEntwurfPfad,
  ladeProjekt,
  ladeProjektInhalt,
  ladeProjektliste,
} from '../daten'
import { ID, testdatenAnlegen, viewer } from './testdaten'

// Je Regel: erlaubter Zugriff, Zugriff durch fremden Kunden, Zugriff ohne Login.
// Nummern wie in MIGRATION-PLAN.md, Abschnitt 3.

beforeEach(testdatenAnlegen)

describe('1 – portal_admins', () => {
  it('erkennt Admins aus der Tabelle', async () => {
    expect(await istAdmin(ID.admin)).toBe(true)
  })
  it('Kunden sind keine Admins', async () => {
    expect(await istAdmin(ID.kundeA)).toBe(false)
  })
})

describe('2 – portal_clients_select', () => {
  it('Mitglied darf den eigenen Kunden lesen', async () => {
    expect(await darfKundeLesen(viewer.kundeA, ID.kunde1)).toBe(true)
  })
  it('fremder Kunde darf nicht', async () => {
    expect(await darfKundeLesen(viewer.kundeB, ID.kunde1)).toBe(false)
  })
  it('ohne Login nicht', async () => {
    expect(await darfKundeLesen(null, ID.kunde1)).toBe(false)
  })
  it('Admin darf alle Kunden lesen', async () => {
    expect(await darfKundeLesen(viewer.admin, ID.kunde2)).toBe(true)
  })
})

describe('3 – portal_client_members_select', () => {
  it('eigene Mitgliedschaft lesbar', () => {
    expect(darfMitgliedschaftLesen(viewer.kundeA, ID.kundeA)).toBe(true)
  })
  it('Mitgliedschaft eines fremden Kunden nicht lesbar', () => {
    expect(darfMitgliedschaftLesen(viewer.kundeB, ID.kundeA)).toBe(false)
  })
  it('ohne Login nicht', () => {
    expect(darfMitgliedschaftLesen(null, ID.kundeA)).toBe(false)
  })
  it('Admin darf alle lesen', () => {
    expect(darfMitgliedschaftLesen(viewer.admin, ID.kundeA)).toBe(true)
  })
})

describe('4 – portal_projects_select', () => {
  it('Kunde sieht nur eigene Projekte', async () => {
    expect((await ladeProjektliste(viewer.kundeA)).map((p) => p.slug)).toEqual(['projekt-1'])
    expect(await darfProjektLesen(viewer.kundeA, ID.projekt1)).toBe(true)
    expect((await ladeProjekt(viewer.kundeA, 'projekt-1'))?.id).toBe(ID.projekt1)
  })
  it('fremder Kunde bekommt das Projekt nicht', async () => {
    expect(await darfProjektLesen(viewer.kundeB, ID.projekt1)).toBe(false)
    expect(await ladeProjekt(viewer.kundeB, 'projekt-1')).toBeNull()
    expect((await ladeProjektliste(viewer.kundeB)).map((p) => p.slug)).toEqual(['projekt-2'])
  })
  it('ohne Login nichts', async () => {
    expect(await darfProjektLesen(null, ID.projekt1)).toBe(false)
    expect(await ladeProjekt(null, 'projekt-1')).toBeNull()
    expect(await ladeProjektliste(null)).toEqual([])
  })
  it('Admin sieht alle Projekte', async () => {
    expect((await ladeProjektliste(viewer.admin)).map((p) => p.slug).sort()).toEqual(['projekt-1', 'projekt-2'])
  })
})

describe('5, 6, 8 – Varianten, Kommentare und Freigabe lesen', () => {
  it('Kunde bekommt Varianten, Kommentare und darf mitwirken', async () => {
    const inhalt = await ladeProjektInhalt(viewer.kundeA, ID.projekt1)
    expect(inhalt?.varianten.map((v) => v.id)).toEqual([ID.variante1a, ID.variante1b])
    expect(inhalt?.kommentare.map((k) => k.body)).toEqual(['Schön!'])
    expect(inhalt?.freigabe).toBeNull()
    expect(inhalt?.darfKommentieren).toBe(true)
    expect(inhalt?.darfFreigeben).toBe(true)
  })
  it('fremder Kunde bekommt nichts', async () => {
    expect(await ladeProjektInhalt(viewer.kundeB, ID.projekt1)).toBeNull()
  })
  it('ohne Login nichts', async () => {
    expect(await ladeProjektInhalt(null, ID.projekt1)).toBeNull()
  })
  it('Admin liest mit und darf antworten, aber nicht freigeben', async () => {
    const inhalt = await ladeProjektInhalt(viewer.admin, ID.projekt1)
    expect(inhalt?.varianten).toHaveLength(2)
    expect(inhalt?.darfKommentieren).toBe(true)
    expect(inhalt?.darfFreigeben).toBe(false)
  })
  it('Kommentare von Admins sind gekennzeichnet', async () => {
    await kommentarSpeichern(viewer.admin, { slug: 'projekt-1', variantId: ID.variante1a, body: 'Antwort' })
    const inhalt = await ladeProjektInhalt(viewer.kundeA, ID.projekt1)
    expect(inhalt?.kommentare.map((k) => [k.body, k.vonAdmin])).toEqual([
      ['Schön!', false],
      ['Antwort', true],
    ])
  })
})

describe('7 – portal_variant_comments_insert', () => {
  const eingabe = { slug: 'projekt-1', variantId: ID.variante1a, body: 'Bitte größer' }

  it('Kunde kommentiert, Autor ist immer der Kunde', async () => {
    expect(await darfKommentieren(viewer.kundeA, ID.variante1a)).toBe(true)
    expect((await kommentarSpeichern(viewer.kundeA, eingabe)).status).toBe('ok')
    const [k] = await db
      .select()
      .from(portalVariantComments)
      .where(eq(portalVariantComments.body, 'Bitte größer'))
    expect(k.authorId).toBe(ID.kundeA)
  })
  it('fremder Kunde darf nicht', async () => {
    expect(await darfKommentieren(viewer.kundeB, ID.variante1a)).toBe(false)
    expect((await kommentarSpeichern(viewer.kundeB, eingabe)).status).toBe('kein-zugriff')
  })
  it('ohne Login nicht', async () => {
    expect(await darfKommentieren(null, ID.variante1a)).toBe(false)
    expect((await kommentarSpeichern(null, eingabe)).status).toBe('kein-zugriff')
  })
  it('Admin darf antworten (Phase 5), Autor ist der Admin', async () => {
    expect(await darfKommentieren(viewer.admin, ID.variante1a)).toBe(true)
    expect((await kommentarSpeichern(viewer.admin, eingabe)).status).toBe('ok')
    const [k] = await db.select().from(portalVariantComments).where(eq(portalVariantComments.body, eingabe.body))
    expect(k.authorId).toBe(ID.admin)
  })
  it('Admin darf auch bei fremden Kunden antworten, aber nicht ohne passende Projekt-URL', async () => {
    expect((await kommentarSpeichern(viewer.admin, { ...eingabe, slug: 'projekt-2' })).status).toBe('kein-zugriff')
  })
  it('Variante muss zum Projekt aus der URL gehören', async () => {
    expect((await kommentarSpeichern(viewer.kundeB, { ...eingabe, slug: 'projekt-2' })).status).toBe('kein-zugriff')
  })
  it('es wird nichts gespeichert, wenn der Zugriff fehlt', async () => {
    await kommentarSpeichern(viewer.kundeB, eingabe)
    expect(await db.select().from(portalVariantComments)).toHaveLength(1)
  })
})

describe('9 – portal_project_approvals_insert', () => {
  const eingabe = { slug: 'projekt-1', variantId: ID.variante1b }

  it('Kunde gibt frei, freigegeben von ist immer der Kunde', async () => {
    expect(await darfFreigeben(viewer.kundeA, ID.projekt1, ID.variante1b)).toBe(true)
    expect((await freigabeSpeichern(viewer.kundeA, eingabe)).status).toBe('ok')
    const [f] = await db.select().from(portalProjectApprovals).where(eq(portalProjectApprovals.projectId, ID.projekt1))
    expect(f).toMatchObject({ variantId: ID.variante1b, approvedBy: ID.kundeA })
  })
  it('zweite Freigabe scheitert', async () => {
    await freigabeSpeichern(viewer.kundeA, eingabe)
    expect((await freigabeSpeichern(viewer.kundeA, { ...eingabe, variantId: ID.variante1a })).status).toBe(
      'schon-freigegeben'
    )
  })
  it('fremder Kunde darf nicht', async () => {
    expect(await darfFreigeben(viewer.kundeB, ID.projekt1, ID.variante1b)).toBe(false)
    expect((await freigabeSpeichern(viewer.kundeB, eingabe)).status).toBe('kein-zugriff')
  })
  it('ohne Login nicht', async () => {
    expect(await darfFreigeben(null, ID.projekt1, ID.variante1b)).toBe(false)
    expect((await freigabeSpeichern(null, eingabe)).status).toBe('kein-zugriff')
  })
  it('Admin darf nicht freigeben', async () => {
    expect(await darfFreigeben(viewer.admin, ID.projekt1, ID.variante1b)).toBe(false)
    expect((await freigabeSpeichern(viewer.admin, eingabe)).status).toBe('kein-zugriff')
  })
  it('Variante eines anderen Projekts kann nicht freigegeben werden', async () => {
    expect(await darfFreigeben(viewer.kundeA, ID.projekt1, ID.variante2)).toBe(false)
  })
  it('es wird nichts gespeichert, wenn der Zugriff fehlt', async () => {
    await freigabeSpeichern(viewer.kundeB, eingabe)
    const zeilen = await db
      .select()
      .from(portalProjectApprovals)
      .where(and(eq(portalProjectApprovals.projectId, ID.projekt1)))
    expect(zeilen).toHaveLength(0)
  })
})

describe('10 – Entwürfe (bisher Storage-Policy)', () => {
  it('Kunde bekommt den Pfad aus der Datenbank', async () => {
    expect(await darfEntwurfLesen(viewer.kundeA, ID.variante1a)).toBe(true)
    expect(await ladeEntwurfPfad(viewer.kundeA, 'projekt-1', ID.variante1a)).toBe(`${ID.projekt1}/a.html`)
  })
  it('fremder Kunde bekommt nichts', async () => {
    expect(await darfEntwurfLesen(viewer.kundeB, ID.variante1a)).toBe(false)
    expect(await ladeEntwurfPfad(viewer.kundeB, 'projekt-1', ID.variante1a)).toBeNull()
  })
  it('ohne Login nichts', async () => {
    expect(await darfEntwurfLesen(null, ID.variante1a)).toBe(false)
    expect(await ladeEntwurfPfad(null, 'projekt-1', ID.variante1a)).toBeNull()
  })
  it('falscher Projekt-Slug in der URL liefert nichts', async () => {
    expect(await ladeEntwurfPfad(viewer.kundeA, 'projekt-2', ID.variante1a)).toBeNull()
  })
  it('Admin darf alle Entwürfe sehen', async () => {
    expect(await ladeEntwurfPfad(viewer.admin, 'projekt-2', ID.variante2)).toBe(`${ID.projekt2}/a.html`)
  })
})

describe('11 – Admin-Bereich', () => {
  it('Admin erlaubt', () => {
    expect(mussAdminSein(viewer.admin)).toBe(true)
  })
  it('Kunde nicht', () => {
    expect(mussAdminSein(viewer.kundeA)).toBe(false)
  })
  it('ohne Login nicht', () => {
    expect(mussAdminSein(null)).toBe(false)
  })
})
