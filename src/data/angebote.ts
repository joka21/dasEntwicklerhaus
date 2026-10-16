import type {
  CtaTexte,
  Stadt,
  Stadtseite,
  Uebersicht,
  Zielgruppe,
  ZielgruppenSlug,
} from '@/types/angebote'
import { ANGEBOTE_UEBERSICHT, navLabel } from '@/data/angebote-navigation'

// Inhalte der Angebotsseiten. Keine Texte in den Komponenten – alles kommt
// von hier, damit es später nach WordPress (Headless) umziehen kann.

/** Platzhalter für Inhalte, die Jo noch liefern muss */
export const TODO_JO = 'TODO_JO'

// ---------------------------------------------------------------------------
// Gemeinsame Texte
// ---------------------------------------------------------------------------

export const cta: CtaTexte = {
  titel: 'Lassen Sie uns über Ihr Projekt sprechen',
  text: 'Ein kurzes Gespräch reicht, um zu klären, welches Paket zu Ihnen passt. Unverbindlich und persönlich – direkt aus Krefeld.',
  buttonAnfrage: 'Kostenloses Erstgespräch anfragen',
  buttonAnrufen: 'Anrufen',
  // TODO_JO: Telefonnummer eintragen (telefon z. B. '+49…', telefonAnzeige z. B. '0176 …').
  // Solange null, wird der Anrufen-Button nicht angezeigt.
  telefon: null,
  telefonAnzeige: null,
  kontaktPfad: '/contact',
}

/** Anbieterangaben für JSON-LD (Adresse wie im OrganizationSchema der Website) */
export const anbieter = {
  name: 'Das Entwicklerhaus',
  beschreibung:
    'Websites, Onlineshops und KI-Lösungen für kleine und mittlere Betriebe und Vereine am Niederrhein – mit KI günstig gebaut und persönlich betreut aus Krefeld.',
  adresse: {
    strasse: 'Am Königshof 47',
    plz: '47807',
    ort: 'Krefeld',
    region: 'Nordrhein-Westfalen',
    land: 'DE',
  },
  /** Einzugsgebiet für die Seiten ohne Stadtbezug */
  einzugsgebiet: ['Krefeld', 'Niederrhein'],
}

export const seitenTexte = {
  startseite: 'Startseite',
  breadcrumbLabel: 'Brotkrumennavigation',
  vergleichBeschriftung: (titel: string) => `${titel} im Vergleich`,
  preisAufAnfrage: 'Preis auf Anfrage',
  empfehlung: 'Empfehlung',
  allesAus: (paket: string) => `Alles aus „${paket}“`,
  vergleichSpalteFuerWen: 'Für wen',
  vergleichSpalteLeistungen: 'Leistungen',
  vergleichSpaltePreis: 'Preis',
  faqTitel: 'Häufige Fragen',
  inIhrerNaeheTitel: 'In Ihrer Nähe',
  weitereAngeboteTitel: 'Weitere Angebote',
  zurUebersicht: 'Alle Angebote im Überblick',
  mehrErfahren: 'Mehr erfahren',
  // Städteseiten
  paketeKurzTitel: 'Unsere Pakete im Überblick',
  paketeDetails: (zielgruppe: string) => `Alle Details: ${zielgruppe}`,
  persoenlichTitel: 'Persönlich erreichbar',
  persoenlichText: (stadt: string) =>
    `Das Entwicklerhaus sitzt in Krefeld. Für ein Gespräch kommen wir auch gern zu Ihnen nach ${stadt}.`,
  referenzTitel: 'Referenz',
  andereStaedteTitel: (zielgruppe: string) => `${zielgruppe} in weiteren Städten`,
}

// ---------------------------------------------------------------------------
// Übersicht /angebote
// ---------------------------------------------------------------------------

export const uebersicht: Uebersicht = {
  slug: 'angebote',
  navLabel: ANGEBOTE_UEBERSICHT.label,
  seo: {
    title: 'Websites, Onlineshops & KI am Niederrhein | Entwicklerhaus',
    description:
      'Websites für Vereine und Handwerksbetriebe, Onlineshops vom Starter bis zum Großhandel – mit KI-Assistent, persönlicher Betreuung und Hosting in Deutschland.',
  },
  h1: 'Websites, Onlineshops und KI – passend für Ihren Betrieb',
  intro:
    'Große Unternehmen leisten sich teure Software und ganze IT-Abteilungen. Kleine Betriebe und Vereine brauchen dasselbe – nur einfacher, bezahlbar und mit einem Ansprechpartner, der erreichbar ist. Genau das bietet Das Entwicklerhaus: Lösungen nach dem Baukastenprinzip, mit KI günstig umgesetzt und persönlich betreut.',
  kartenTitel: 'Unsere Angebote',
  gemeinsam: {
    titel: 'Was alle Angebote gemeinsam haben',
    punkte: [
      'Design und Inhalt sind getrennt: Sie pflegen Inhalte, das Layout bleibt immer sauber.',
      'KI-Assistent: Aus Stichpunkten, Fotos oder Sprachnachrichten werden fertige Beiträge – immer erst als Entwurf zur Freigabe.',
      'EU-souveräne KI und Hosting in Deutschland, DSGVO-konform.',
      'Rechtssichere Grundlage: Impressum, Datenschutz, Cookie-Hinweis.',
      'Persönliche Betreuung aus Krefeld statt Hotline.',
    ],
  },
  ablauf: {
    titel: 'So arbeiten wir',
    schritte: [
      { titel: 'Erstgespräch', text: 'Wir klären Ziel, Umfang und das passende Paket.' },
      { titel: 'Umsetzung', text: 'Wir bauen Ihre Seite auf unserem erprobten Baukasten.' },
      { titel: 'Einweisung', text: 'Sie lernen in kurzer Zeit, Inhalte selbst zu pflegen.' },
      { titel: 'Betreuung', text: 'Updates, Sicherheit und Hilfe laufen monatlich weiter.' },
    ],
  },
  preisHinweis: 'Alle Pakete werden individuell kalkuliert. Preis auf Anfrage.',
}

// ---------------------------------------------------------------------------
// Zielgruppen
// ---------------------------------------------------------------------------

const vereine: Zielgruppe = {
  slug: 'website-fuer-vereine',
  thema: 'verein',
  navLabel: navLabel('website-fuer-vereine'),
  seo: {
    title: 'Website für Vereine mit KI-Pflege | Entwicklerhaus',
    description:
      'Vereinswebsite mit Terminen, Berichten und Galerie. Inhalte per Stichpunkt, Foto oder Sprachnachricht – der KI-Assistent schreibt, Sie geben frei.',
  },
  h1: 'Die Website für Ihren Verein – aktuell ohne Aufwand',
  intro:
    'In vielen Vereinen kümmert sich eine Person nebenbei um die Website – und irgendwann ist der letzte Bericht zwei Jahre alt. Unsere Vereinswebsites sind so gebaut, dass jedes Vorstandsmitglied Inhalte in wenigen Minuten einstellen kann. Das Design bleibt dabei immer stimmig.',
  karte: {
    titel: 'Website für Vereine',
    text: 'Termine, Berichte und Fotos in Minuten online. Ohne Technikwissen, auch vom Handy.',
  },
  paketeTitel: 'Unsere Pakete für Vereine',
  pakete: [
    {
      bezeichnung: 'Paket',
      name: 'Basis',
      fuerWen: 'Für Vereine, die einfach online präsent und aktuell sein wollen.',
      leistungen: [
        'Neue Website auf unserem Vereins-Baukasten, 5–10 Seiten',
        'Feste Bereiche: Termine, Berichte, Vorstand und Ansprechpartner, Downloads, Galerie, Kontakt',
        'Geschütztes Design – es kann nichts verrutschen',
        'Eigener, einfacher Zugang für den Verein, auch mobil bedienbar',
        'Impressum, Datenschutz und Cookie-Hinweis',
        'Kurze Einweisung',
      ],
    },
    {
      bezeichnung: 'Paket',
      name: 'KI-Assistent',
      fuerWen: 'Für Vereine, in denen niemand Zeit zum Schreiben hat.',
      basiertAuf: 'Basis',
      empfohlen: true,
      leistungen: [
        'Stichpunkte, Sprachnachricht oder Fotos werden zu einem fertigen Termin oder Bericht',
        'Jeder Beitrag landet zuerst als Entwurf und geht erst nach Ihrer Freigabe online',
        'Bilder werden automatisch verkleinert und mit Bildbeschreibung versehen',
        'Abfrage der Einwilligung, wenn Personen auf Fotos zu sehen sind',
      ],
    },
    {
      bezeichnung: 'Paket',
      name: 'Sichtbar',
      fuerWen: 'Für Vereine, die Mitglieder, Publikum oder Sponsoren gewinnen wollen.',
      basiertAuf: 'KI-Assistent',
      leistungen: [
        'Beiträge zusätzlich aufbereitet für Instagram und Facebook',
        'Sponsorenseite mit Logos und Links',
        'Veranstaltungsseite mit Anmeldung oder Ticket-Link',
        'Optional: Newsletter für Mitglieder',
      ],
    },
  ],
  zusatzAbschnitte: [],
  betreuung: {
    titel: 'Betreuung, die mitläuft',
    text: 'Updates, Sicherheit, Backups und Hosting in Deutschland. KI-Nutzung im fairen Rahmen inklusive. Kleine Änderungen einfach per Mail oder Sprachnachricht. Auf Wunsch als Jahresbetrag – planbar für die Vereinskasse.',
  },
  module: {
    titel: 'Zusatzmodule',
    eintraege: [
      'Mitgliederbereich mit Login für Protokolle und Satzung',
      'Online-Mitgliedsantrag',
      'Spendenbutton',
      'Chronik- oder Jubiläumsseite',
      'Archiv für die Vereinszeitung',
    ],
  },
  faqs: [
    {
      frage: 'Brauchen wir Technikkenntnisse?',
      antwort: 'Nein. Wer eine Nachricht auf dem Handy schreiben kann, kann auch einen Bericht einstellen.',
    },
    {
      frage: 'Was passiert beim Vorstandswechsel?',
      antwort: 'Zugänge werden einfach übertragen. Inhalte und Design bleiben erhalten, nichts geht verloren.',
    },
    {
      frage: 'Schreibt die KI einfach selbst etwas auf unsere Seite?',
      antwort: 'Nein. Die KI erstellt nur Entwürfe. Online geht ein Beitrag erst, wenn Sie ihn freigeben.',
    },
    {
      frage: 'Wo werden unsere Daten verarbeitet?',
      antwort: 'Hosting in Deutschland und KI-Verarbeitung über europäische Anbieter, DSGVO-konform.',
    },
    {
      frage: 'Können wir unsere alte Website übernehmen?',
      antwort: 'Ja. Wir übernehmen die bestehenden Inhalte und bringen sie in die neue Struktur.',
    },
    {
      frage: 'Was kostet eine Vereinswebsite?',
      antwort:
        'Das hängt vom Paket und vom Umfang ab. Wir erstellen Ihnen ein individuelles Angebot – auch passend zum Budget eines kleinen Vereins.',
    },
  ],
  serviceTyp: 'Website-Erstellung für Vereine',
  stadtMuster: {
    h1: 'Website für Vereine in {stadt}',
    lokaleBeispieleTitel: 'Vereine in {stadt}',
  },
}

const handwerker: Zielgruppe = {
  slug: 'website-fuer-handwerker',
  thema: 'handwerk',
  navLabel: navLabel('website-fuer-handwerker'),
  seo: {
    title: 'Website für Handwerker: mehr Anfragen | Entwicklerhaus',
    description:
      'Handwerker-Website mit Referenzen von der Baustelle, Anfrage mit Foto-Upload und Karriereseite für Azubis und Gesellen. Pflege per Sprachnachricht.',
  },
  h1: 'Die Website für Ihren Handwerksbetrieb – gefunden werden, Fachkräfte gewinnen',
  intro:
    'Ihre Arbeit spricht für sich – wenn man sie sieht. Mit unseren Handwerker-Websites zeigen Sie Ihre Projekte, ohne nach Feierabend Texte zu schreiben: Foto auf der Baustelle, kurze Sprachnachricht, fertig. Und wenn Sie Verstärkung suchen, finden Bewerber Sie direkt.',
  karte: {
    titel: 'Website für Handwerker',
    text: 'Mehr Anfragen, bessere Bewerber und Referenzen direkt von der Baustelle.',
  },
  paketeTitel: 'Unsere Pakete für Handwerksbetriebe',
  pakete: [
    {
      bezeichnung: 'Paket',
      name: 'Basis',
      fuerWen: 'Für Betriebe, die seriös gefunden werden wollen.',
      leistungen: [
        'Neue Website auf unserem Baukasten, 5–10 Seiten',
        'Leistungen, Referenzen, Team, Einsatzgebiet, Kontakt',
        'Anruf und WhatsApp mit einem Klick',
        'Lokale Suchmaschinenoptimierung und Abgleich mit Ihrem Google-Unternehmensprofil',
        'Impressum, Datenschutz und Cookie-Hinweis',
      ],
    },
    {
      bezeichnung: 'Paket',
      name: 'KI-Assistent',
      fuerWen: 'Für Betriebe, die zeigen wollen, was sie können.',
      basiertAuf: 'Basis',
      empfohlen: true,
      leistungen: [
        'Vorher-Nachher-Fotos und eine Sprachnachricht werden zur fertigen Referenz – als Entwurf zur Freigabe',
        'Ratgeberbeiträge zu typischen Kundenfragen, die bei Google gefunden werden',
        'Anfrageformular mit Foto-Upload: Kunden schicken direkt ein Bild vom Schaden oder Vorhaben',
      ],
    },
    {
      bezeichnung: 'Paket',
      name: 'Sichtbar & gesucht',
      fuerWen: 'Für Betriebe, die wachsen oder Personal suchen.',
      basiertAuf: 'KI-Assistent',
      leistungen: [
        'Referenzen zusätzlich für Instagram, Facebook und Ihr Google-Unternehmensprofil',
        'Karriereseite mit Kurzbewerbung per Handy – ohne Anschreiben und Lebenslauf',
        'Bewertungsanfrage nach Auftragsabschluss per Link oder QR-Code',
        'Vorbereitung auf die KI-Suche, damit Ihr Betrieb auch in KI-Assistenten auftaucht',
      ],
    },
  ],
  zusatzAbschnitte: [],
  betreuung: {
    titel: 'Betreuung, die mitläuft',
    text: 'Updates, Sicherheit, Backups und Hosting in Deutschland. KI-Nutzung im vereinbarten Rahmen inklusive. Änderungen per Sprachnachricht. Optional ein monatlicher Kurzbericht zu Anfragen und Sichtbarkeit.',
  },
  module: {
    titel: 'Zusatzmodule',
    eintraege: [
      'Online-Terminbuchung für Aufmaß und Beratung',
      'Notdienstseite',
      'Preisrahmen oder Kostenrechner für Standardleistungen',
      'Hinweise zu Förderprogrammen',
      'Mehrsprachigkeit',
    ],
  },
  faqs: [
    {
      frage: 'Ich habe keine Zeit für eine Website. Funktioniert das trotzdem?',
      antwort:
        'Ja. Ein Foto und eine Sprachnachricht von der Baustelle reichen. Den Text erstellt der KI-Assistent, Sie geben nur frei.',
    },
    {
      frage: 'Bringt mir eine Website wirklich Aufträge?',
      antwort:
        'Kunden suchen Handwerker in ihrer Nähe zuerst online. Wer mit echten Referenzen und klaren Leistungen gefunden wird, bekommt passendere Anfragen.',
    },
    {
      frage: 'Hilft die Website bei der Suche nach Fachkräften?',
      antwort:
        'Ja. Eine Karriereseite mit Kurzbewerbung per Handy senkt die Hürde für Azubis und Gesellen deutlich.',
    },
    {
      frage: 'Kaufen oder erfinden Sie Bewertungen?',
      antwort: 'Nein. Wir helfen Ihnen, echte Bewertungen zufriedener Kunden einzuholen – sonst nichts.',
    },
    {
      frage: 'Wo werden meine Daten verarbeitet?',
      antwort: 'Hosting in Deutschland und KI-Verarbeitung über europäische Anbieter, DSGVO-konform.',
    },
    {
      frage: 'Was kostet eine Handwerker-Website?',
      antwort: 'Das hängt vom Paket und vom Umfang ab. Sie bekommen ein individuelles Angebot.',
    },
  ],
  serviceTyp: 'Website-Erstellung für Handwerksbetriebe',
  stadtMuster: {
    h1: 'Website für Handwerksbetriebe in {stadt}',
    lokaleBeispieleTitel: 'Handwerk in {stadt}',
  },
}

const onlineshop: Zielgruppe = {
  slug: 'onlineshop-erstellen',
  thema: 'onlineshop',
  navLabel: navLabel('onlineshop-erstellen'),
  seo: {
    title: 'Onlineshop erstellen: Starter bis B2B | Entwicklerhaus',
    description:
      'Onlineshop auf WooCommerce mit KI-Produkttexten, Beratungsassistent und B2B-Funktionen. Ihr Shop gehört Ihnen, Hosting in Deutschland, Betreuung aus Krefeld.',
  },
  h1: 'Ihr Onlineshop – vom ersten Produkt bis zum Großhandel',
  intro:
    'Ob kleiner T-Shirt-Laden oder Großhändler mit Tausenden Artikeln: Ihr Shop sollte mit Ihnen wachsen, nicht bei jedem Schritt neu gebaut werden. Deshalb arbeiten wir in vier Stufen auf einer gemeinsamen Basis. Der Shop gehört Ihnen, läuft in Deutschland und wird persönlich betreut.',
  karte: {
    titel: 'Onlineshop erstellen',
    text: 'Vom kleinen T-Shirt-Laden bis zum Großhandel. Ein Shop, der mit Ihnen wächst.',
  },
  paketeTitel: 'Vier Stufen für Ihren Shop',
  pakete: [
    {
      bezeichnung: 'Stufe 1',
      name: 'Starter',
      fuerWen: 'Für kleine Läden, Kreative und den ersten Schritt online.',
      leistungen: [
        'Shop auf WooCommerce mit geschütztem Design',
        'Produkte mit Varianten wie Größe und Farbe',
        'Zahlung per PayPal, Kreditkarte und Klarna, Versandetiketten',
        'Optional Print-on-Demand – ganz ohne eigenes Lager',
        'Rechtssichere Grundlage für den Onlinehandel',
        'Produkte per Handyfoto und Sprachnachricht anlegen – die KI schreibt den Entwurf',
      ],
    },
    {
      bezeichnung: 'Stufe 2',
      name: 'Wachstum',
      fuerWen: 'Für Händler, die regelmäßig verkaufen und mehr Reichweite wollen.',
      basiertAuf: 'Starter',
      leistungen: [
        'Produktfeeds für Google Shopping, Facebook und Instagram',
        'Newsletter, Erinnerung bei abgebrochenem Warenkorb',
        'Gutscheine, Produktbundles, echte Kundenbewertungen',
        'Abholung im Laden (Click & Collect)',
        'Monatlicher Kurzbericht zu Umsatz und Bestsellern',
      ],
    },
    {
      bezeichnung: 'Stufe 3',
      name: 'KI-Shop',
      fuerWen: 'Für Händler, die von KI gefunden werden und Arbeit sparen wollen.',
      basiertAuf: 'Wachstum',
      empfohlen: true,
      leistungen: [
        'Beratungsassistent im Shop, EU-souverän betrieben',
        'KI-Pflege der Produktdaten: bessere Texte, vollständige Merkmale, Produkt-FAQs',
        'Monatlicher Check, wie Ihr Shop in KI-Assistenten auftaucht',
        'Strukturierte Produktdaten und Vorbereitung auf das Einkaufen über KI-Assistenten',
        'Auswertung der Retouren: Welche Produkte kommen warum zurück?',
      ],
    },
    {
      bezeichnung: 'Stufe 4',
      name: 'B2B & Großhandel',
      fuerWen: 'Für Großhändler, Hersteller und Händler mit Geschäftskunden.',
      leistungen: [
        'Kundengruppen mit eigenen Preisen und Staffelpreisen, Nettoanzeige',
        'Kauf auf Rechnung, Freigabe neuer Geschäftskunden',
        'Schnellbestellung per Artikelnummer und CSV-Upload, Nachbestellung aus der Historie',
        'E-Rechnung (XRechnung, ZUGFeRD)',
        'Anbindung an Warenwirtschaft und ERP',
        'Individuell kalkuliert',
      ],
    },
  ],
  zusatzAbschnitte: [
    {
      titel: 'Premium-Option: Headless-Shop für maximale Geschwindigkeit',
      text: 'Für Shops mit viel Traffic, großen Sortimenten oder besonderen Funktionen wie Konfiguratoren oder Raumplanern bauen wir das Frontend separat mit Next.js. Die Daten bleiben zentral in WooCommerce, die Oberfläche lädt besonders schnell. Wir beraten Sie ehrlich, ob sich das für Ihren Shop lohnt.',
    },
  ],
  betreuung: {
    titel: 'Betreuung, die mitläuft',
    text: 'Updates, Sicherheit, Backups und Hosting in Deutschland. Überwachung von Zahlungen und Versand, Prüfung bei Rechtsänderungen. Ab Stufe 3 inklusive KI-Kontingent, ab Stufe 2 ein monatliches Strategiegespräch.',
  },
  module: {
    titel: 'Zusatzmodule',
    eintraege: [
      'Anbindung an Marktplätze',
      'Mehrsprachigkeit und Auslandsversand',
      'Produktkonfigurator',
      '3D- oder Raumansicht',
      'Abonnements',
    ],
  },
  faqs: [
    {
      frage: 'Warum WooCommerce und nicht Shopify?',
      antwort:
        'Mit WooCommerce gehört Ihnen Ihr Shop vollständig, er läuft auf Servern in Deutschland, und Sie zahlen keine Umsatzbeteiligung an eine Plattform.',
    },
    {
      frage: 'Kann mein Shop später größer werden?',
      antwort: 'Ja. Alle Stufen bauen aufeinander auf. Sie starten klein und erweitern, ohne neu anzufangen.',
    },
    {
      frage: 'Was bringt ein KI-Beratungsassistent?',
      antwort:
        'Er beantwortet Kundenfragen rund um die Uhr und hilft bei der Produktauswahl – wie eine gute Verkäuferin im Laden.',
    },
    {
      frage: 'Was bedeutet „Vorbereitung auf das Einkaufen über KI“?',
      antwort:
        'Immer mehr Menschen fragen KI-Assistenten nach Produktempfehlungen. Wir sorgen dafür, dass Ihre Produktdaten dafür sauber und vollständig sind.',
    },
    {
      frage: 'Ist der Shop rechtssicher?',
      antwort:
        'Wir setzen die gängigen Anforderungen für den Onlinehandel in Deutschland um und prüfen Änderungen im Rahmen der Betreuung. Eine Rechtsberatung ersetzt das nicht.',
    },
    {
      frage: 'Was kostet ein Onlineshop?',
      antwort: 'Das hängt von Stufe, Sortiment und Anbindungen ab. Sie bekommen ein individuelles Angebot.',
    },
  ],
  serviceTyp: 'Onlineshop-Erstellung',
  stadtMuster: {
    h1: 'Onlineshop erstellen lassen in {stadt}',
    lokaleBeispieleTitel: 'Handel in {stadt}',
  },
}

export const zielgruppen: Zielgruppe[] = [vereine, handwerker, onlineshop]

// ---------------------------------------------------------------------------
// Städteseiten
// ---------------------------------------------------------------------------
// Seiten mit veroeffentlicht: false werden nicht gebaut, nicht verlinkt und
// nicht in die Sitemap aufgenommen. Zum Veröffentlichen alle TODO_JO-Felder
// mit echten lokalen Inhalten füllen und veroeffentlicht auf true setzen –
// der Build bricht ab, wenn eine veröffentlichte Seite noch TODO_JO enthält.

export const staedte: Stadt[] = [
  { name: 'Krefeld', slug: 'krefeld' },
  { name: 'Düsseldorf', slug: 'duesseldorf' },
  { name: 'Mönchengladbach', slug: 'moenchengladbach' },
  { name: 'Duisburg', slug: 'duisburg' },
  { name: 'Neuss', slug: 'neuss' },
  { name: 'Moers', slug: 'moers' },
]

export const stadtseiten: Stadtseite[] = [
  // --- Website für Vereine -------------------------------------------------
  {
    zielgruppe: 'website-fuer-vereine',
    stadt: 'krefeld',
    slug: 'website-fuer-vereine-krefeld',
    titel: 'Website für Vereine in Krefeld | Entwicklerhaus',
    description:
      'Vereinswebsite in Krefeld: Termine, Berichte und Fotos einfach pflegen – mit KI-Assistent und persönlicher Betreuung vom Niederrhein.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-vereine',
    stadt: 'duesseldorf',
    slug: 'website-fuer-vereine-duesseldorf',
    titel: 'Website für Vereine in Düsseldorf | Entwicklerhaus',
    description:
      'Vereinswebsite in Düsseldorf: Termine, Berichte und Fotos einfach pflegen – mit KI-Assistent und persönlicher Betreuung vom Niederrhein.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-vereine',
    stadt: 'moenchengladbach',
    slug: 'website-fuer-vereine-moenchengladbach',
    titel: 'Website für Vereine in Mönchengladbach | Entwicklerhaus',
    description:
      'Vereinswebsite in Mönchengladbach: Termine, Berichte und Fotos einfach pflegen – mit KI-Assistent und persönlicher Betreuung vom Niederrhein.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-vereine',
    stadt: 'duisburg',
    slug: 'website-fuer-vereine-duisburg',
    titel: 'Website für Vereine in Duisburg | Entwicklerhaus',
    description:
      'Vereinswebsite in Duisburg: Termine, Berichte und Fotos einfach pflegen – mit KI-Assistent und persönlicher Betreuung vom Niederrhein.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-vereine',
    stadt: 'neuss',
    slug: 'website-fuer-vereine-neuss',
    titel: 'Website für Vereine in Neuss | Entwicklerhaus',
    description:
      'Vereinswebsite in Neuss: Termine, Berichte und Fotos einfach pflegen – mit KI-Assistent und persönlicher Betreuung vom Niederrhein.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-vereine',
    stadt: 'moers',
    slug: 'website-fuer-vereine-moers',
    titel: 'Website für Vereine in Moers | Entwicklerhaus',
    description:
      'Vereinswebsite in Moers: Termine, Berichte und Fotos einfach pflegen – mit KI-Assistent und persönlicher Betreuung vom Niederrhein.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },

  // --- Website für Handwerker ----------------------------------------------
  {
    zielgruppe: 'website-fuer-handwerker',
    stadt: 'krefeld',
    slug: 'website-fuer-handwerker-krefeld',
    titel: 'Website für Handwerker in Krefeld | Entwicklerhaus',
    description:
      'Handwerker-Website in Krefeld: mehr Anfragen, Referenzen von der Baustelle und Karriereseite für Fachkräfte.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-handwerker',
    stadt: 'duesseldorf',
    slug: 'website-fuer-handwerker-duesseldorf',
    titel: 'Website für Handwerker in Düsseldorf | Entwicklerhaus',
    description:
      'Handwerker-Website in Düsseldorf: mehr Anfragen, Referenzen von der Baustelle und Karriereseite für Fachkräfte.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-handwerker',
    stadt: 'moenchengladbach',
    slug: 'website-fuer-handwerker-moenchengladbach',
    titel: 'Website für Handwerker in Mönchengladbach | Entwicklerhaus',
    description:
      'Handwerker-Website in Mönchengladbach: mehr Anfragen, Referenzen von der Baustelle und Karriereseite für Fachkräfte.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-handwerker',
    stadt: 'duisburg',
    slug: 'website-fuer-handwerker-duisburg',
    titel: 'Website für Handwerker in Duisburg | Entwicklerhaus',
    description:
      'Handwerker-Website in Duisburg: mehr Anfragen, Referenzen von der Baustelle und Karriereseite für Fachkräfte.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-handwerker',
    stadt: 'neuss',
    slug: 'website-fuer-handwerker-neuss',
    titel: 'Website für Handwerker in Neuss | Entwicklerhaus',
    description:
      'Handwerker-Website in Neuss: mehr Anfragen, Referenzen von der Baustelle und Karriereseite für Fachkräfte.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'website-fuer-handwerker',
    stadt: 'moers',
    slug: 'website-fuer-handwerker-moers',
    titel: 'Website für Handwerker in Moers | Entwicklerhaus',
    description:
      'Handwerker-Website in Moers: mehr Anfragen, Referenzen von der Baustelle und Karriereseite für Fachkräfte.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },

  // --- Onlineshop erstellen ------------------------------------------------
  {
    zielgruppe: 'onlineshop-erstellen',
    stadt: 'krefeld',
    slug: 'onlineshop-erstellen-krefeld',
    titel: 'Onlineshop erstellen in Krefeld | Entwicklerhaus',
    description:
      'Onlineshop in Krefeld erstellen lassen – vom Starter bis zum Großhandel, mit KI und Hosting in Deutschland.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'onlineshop-erstellen',
    stadt: 'duesseldorf',
    slug: 'onlineshop-erstellen-duesseldorf',
    titel: 'Onlineshop erstellen in Düsseldorf | Entwicklerhaus',
    description:
      'Onlineshop in Düsseldorf erstellen lassen – vom Starter bis zum Großhandel, mit KI und Hosting in Deutschland.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'onlineshop-erstellen',
    stadt: 'moenchengladbach',
    slug: 'onlineshop-erstellen-moenchengladbach',
    titel: 'Onlineshop erstellen in Mönchengladbach | Entwicklerhaus',
    description:
      'Onlineshop in Mönchengladbach erstellen lassen – vom Starter bis zum Großhandel, mit KI und Hosting in Deutschland.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'onlineshop-erstellen',
    stadt: 'duisburg',
    slug: 'onlineshop-erstellen-duisburg',
    titel: 'Onlineshop erstellen in Duisburg | Entwicklerhaus',
    description:
      'Onlineshop in Duisburg erstellen lassen – vom Starter bis zum Großhandel, mit KI und Hosting in Deutschland.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'onlineshop-erstellen',
    stadt: 'neuss',
    slug: 'onlineshop-erstellen-neuss',
    titel: 'Onlineshop erstellen in Neuss | Entwicklerhaus',
    description:
      'Onlineshop in Neuss erstellen lassen – vom Starter bis zum Großhandel, mit KI und Hosting in Deutschland.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
  {
    zielgruppe: 'onlineshop-erstellen',
    stadt: 'moers',
    slug: 'onlineshop-erstellen-moers',
    titel: 'Onlineshop erstellen in Moers | Entwicklerhaus',
    description:
      'Onlineshop in Moers erstellen lassen – vom Starter bis zum Großhandel, mit KI und Hosting in Deutschland.',
    einleitungLokal: TODO_JO,
    lokaleBeispiele: [TODO_JO],
    faqLokal: [
      { frage: TODO_JO, antwort: TODO_JO },
      { frage: TODO_JO, antwort: TODO_JO },
    ],
    referenz: null, // TODO_JO: optional, nur echte Projekte mit Freigabe
    veroeffentlicht: false,
  },
]

// ---------------------------------------------------------------------------
// Zugriff
// ---------------------------------------------------------------------------

export function getZielgruppe(slug: ZielgruppenSlug): Zielgruppe {
  return zielgruppen.find((z) => z.slug === slug)!
}

export function getStadt(slug: string): Stadt {
  const stadt = staedte.find((s) => s.slug === slug)
  if (!stadt) throw new Error(`Unbekannte Stadt: ${slug}`)
  return stadt
}

/** Ersetzt {stadt} in den Mustern der Zielgruppe */
export function mitStadt(muster: string, stadt: string): string {
  return muster.replaceAll('{stadt}', stadt)
}

// Eine veröffentlichte Seite darf keine Platzhalter mehr enthalten und
// braucht mindestens zwei lokale Fragen – sonst bricht der Build ab.
function pruefeStadtseite(seite: Stadtseite): Stadtseite {
  if (JSON.stringify(seite).includes(TODO_JO)) {
    throw new Error(`Städteseite ${seite.slug} ist veröffentlicht, enthält aber noch ${TODO_JO}.`)
  }
  if (seite.faqLokal.length < 2) {
    throw new Error(`Städteseite ${seite.slug} braucht mindestens zwei lokale Fragen.`)
  }
  return seite
}

export function veroeffentlichteStadtseiten(zielgruppe?: ZielgruppenSlug): Stadtseite[] {
  return stadtseiten
    .filter((s) => s.veroeffentlicht && (!zielgruppe || s.zielgruppe === zielgruppe))
    .map(pruefeStadtseite)
}

export function getStadtseite(slug: string): Stadtseite | undefined {
  return veroeffentlichteStadtseiten().find((s) => s.slug === slug)
}
