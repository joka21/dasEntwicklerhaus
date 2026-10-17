import { ANGEBOTE_UEBERSICHT } from '@/data/angebote-navigation'
import { ueberMichSeite } from '@/data/ueber-mich'

// Texte der Startseite. Angebotskarten, Ablauf und CTA kommen aus angebote.ts,
// die Projektkarten aus projects.ts.

export type VorteilIcon = 'person' | 'ki' | 'europa' | 'pflege'

export const startseite = {
  seo: {
    title: 'Websites, Onlineshops & KI in Krefeld | Das Entwicklerhaus',
    description:
      'Websites für Vereine und Handwerker, Onlineshops und KI-Lösungen aus Krefeld. Persönlich betreut, EU-souveräne KI, Hosting in Deutschland.',
  },
  h1: 'Websites, Onlineshops und KI für Betriebe und Vereine am Niederrhein',
  intro:
    'Große Unternehmen leisten sich teure Software und eigene IT-Abteilungen. Kleine Betriebe und Vereine brauchen dasselbe – nur einfacher, bezahlbar und mit einem Ansprechpartner, der erreichbar ist. Das Entwicklerhaus baut mit KI günstig und betreut persönlich, direkt aus Krefeld.',
  buttonErstgespraech: { label: 'Kostenloses Erstgespräch', href: '/contact' },
  buttonAngebote: { label: ANGEBOTE_UEBERSICHT.alleLabel, href: ANGEBOTE_UEBERSICHT.href },

  angeboteTitel: 'Wobei ich Ihnen helfe',

  vorteile: {
    titel: 'Warum Das Entwicklerhaus',
    punkte: [
      {
        icon: 'person',
        titel: 'Persönlich statt Hotline',
        text: 'Sie haben einen festen Ansprechpartner in Krefeld, der Ihr Projekt kennt.',
      },
      {
        icon: 'ki',
        titel: 'Mit KI günstiger',
        text: 'KI übernimmt Routinearbeit beim Bauen und Pflegen. Das spart Ihnen Geld und Zeit.',
      },
      {
        icon: 'europa',
        titel: 'Europäisch und datenschutzkonform',
        text: 'KI-Verarbeitung über europäische Anbieter, Hosting in Deutschland, DSGVO-konform.',
      },
      {
        icon: 'pflege',
        titel: 'Sie pflegen selbst – ganz einfach',
        text: 'Inhalte per Stichpunkt, Foto oder Sprachnachricht. Das Design bleibt immer sauber.',
      },
    ] satisfies { icon: VorteilIcon; titel: string; text: string }[],
  },

  projekte: {
    titel: 'Eigene Projekte aus Krefeld',
    intro: 'Neben Kundenprojekten entwickle ich eigene Ideen für Krefeld und den Niederrhein.',
    anzahl: 3,
    alleLabel: 'Alle Projekte',
    alleHref: '/projects',
  },

  ueberMich: {
    titel: 'Über mich',
    text: 'Ich bin Josef Kalenberg, seit 1996 selbstständig in der IT. In fast 30 Jahren habe ich als Entwickler für viele Unternehmen gearbeitet, kleine und große Projekte begleitet und gelernt, worauf es ankommt, damit aus einer guten Idee ein erfolgreiches Projekt wird. Heute nutze ich KI, um Betrieben und Vereinen Möglichkeiten zu geben, die früher nur den Großen vorbehalten waren.',
    schluss: 'Zusammen erreichen wir mehr.',
    linkLabel: 'Mehr über mich',
    linkHref: `/${ueberMichSeite.slug}`,
  },
}
