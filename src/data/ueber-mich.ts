import { UEBER_MICH_NAV } from '@/data/angebote-navigation'

// Texte der Seite /ueber-mich und Angaben zur Person (auch für JSON-LD).

export const person = {
  name: 'Josef Kalenberg',
  jobTitle: 'Webentwickler und KI-Berater',
  beschreibung: 'Seit 1996 selbstständig in der IT, Webentwickler und KI-Berater aus Krefeld.',
  // TODO_JO: Foto ablegen (z. B. /images/josef-kalenberg.jpg) und hier eintragen.
  // Solange null, wird ein Platzhalter mit Initialen angezeigt.
  foto: null as string | null,
  fotoAlt: 'Josef Kalenberg',
  initialen: 'JK',
}

export const ueberMichSeite = {
  slug: UEBER_MICH_NAV.slug,
  navLabel: UEBER_MICH_NAV.label,
  seo: {
    title: 'Über mich – Josef Kalenberg | Entwicklerhaus',
    description:
      'Josef Kalenberg, seit 1996 selbstständig in der IT: Erfahrung, drei Regeln für erfolgreiche Projekte und warum KI kleinen Betrieben und Vereinen neue Chancen gibt.',
  },
  h1: 'Über mich – und warum ich glaube, dass wir zusammen mehr erreichen',
  intro:
    'Seit 1996 bin ich selbstständig, immer im Bereich IT. In fast 30 Jahren habe ich viele Höhen und Tiefen erlebt. Vor allem aber habe ich gearbeitet, programmiert, gelernt und Erfahrungen gesammelt.',
  einleitung:
    'Als Freelancer habe ich für viele unterschiedliche Unternehmen gearbeitet, kleine und große Projekte begleitet und dabei verstanden, worauf es wirklich ankommt, damit aus einer guten Idee ein erfolgreiches Projekt wird. Aus diesen Erfahrungen sind für mich drei Regeln entstanden.',
  regeln: [
    {
      titel: 'Regel 1: Man muss gefunden werden',
      absaetze: [
        'Die beste Idee, das beste Produkt oder die beste Dienstleistung bringt wenig, wenn niemand davon weiß. Menschen müssen erfahren, dass ein Unternehmen gute Produkte anbietet, jemand besondere Fähigkeiten hat oder ein Verein wirklich gute Arbeit leistet.',
        'Deshalb ist Marketing so wichtig. Gutes Marketing bedeutet für mich aber nicht nur Werbung. Wer sichtbar wird, bekommt Rückmeldungen – von Kunden, von Interessenten, manchmal auch von Google, das zeigt, wie gut die eigenen Inhalte gefunden werden. Dieses Feedback hilft, die eigene Arbeit zu hinterfragen, besser zu werden und zu verstehen, was Menschen wirklich brauchen.',
      ],
    },
    {
      titel: 'Regel 2: Mit offenem Geist an einer Idee festhalten',
      absaetze: [
        'Wer von einer Idee überzeugt ist, muss bereit sein, sie konsequent zu verfolgen. Das klingt einfach, ist aber vielleicht eine der schwierigsten Aufgaben überhaupt. Wann hat man sich verrannt? Wann muss man etwas verändern? Und wann verliert man durch zu viele Änderungen die Konsequenz, die für den Erfolg nötig wäre?',
        'Darauf habe ich auch nach fast 30 Jahren keine einfache Antwort. Aber ich bin überzeugt: Man muss offen bleiben, Kritik zulassen, die eigene Idee immer wieder hinterfragen – und trotzdem den Mut haben, weiterzumachen.',
      ],
    },
    {
      titel: 'Regel 3: Fleiß',
      absaetze: [
        'Ohne Arbeit geht es nicht. Gerade in Zeiten der künstlichen Intelligenz ist mir das wichtiger denn je.',
        'KI eröffnet Möglichkeiten, die vor wenigen Jahren kaum vorstellbar waren. Was früher große Teams, viel Geld oder jahrelange Erfahrung erforderte, können heute auch Einzelpersonen oder kleine Unternehmen umsetzen. Aber diese Möglichkeiten muss man auch nutzen: Neues lernen, ausprobieren, Fehler machen und immer wieder besser werden.',
        'KI nimmt uns Arbeit ab, aber nicht die Verantwortung für das Ergebnis. Und sie ersetzt nicht die Erfahrung, die Kreativität und das Wissen der Menschen, die etwas bewegen wollen.',
      ],
    },
  ],
  fazit: {
    titel: 'Mein Fazit: Zusammen erreichen wir mehr',
    absaetze: [
      'Ich glaube, dass wir gerade eine große Chance haben. Sie kennen Ihr Produkt, Ihre Dienstleistung oder die Arbeit Ihres Vereins. Sie wissen, was Sie erreichen möchten und warum Ihnen Ihre Idee wichtig ist. Ich bringe fast 30 Jahre Erfahrung aus IT, Programmierung und der Zusammenarbeit mit Unternehmen mit. Gemeinsam können wir die neuen Möglichkeiten der künstlichen Intelligenz nutzen.',
      'Ich bin überzeugt, dass KI für mehr Chancengleichheit sorgen kann. Der Abstand zwischen kleinen Unternehmen, Selbstständigen oder Vereinen und den großen Anbietern ist in vielen Bereichen deutlich kleiner geworden – nicht, weil plötzlich alles einfach ist, sondern weil wir heute Möglichkeiten haben, die früher nur wenigen offenstanden.',
      'Wir müssen sie nur nutzen. Zusammen erreichen wir mehr.',
    ],
  },
}
