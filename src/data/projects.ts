import { Project } from '@/types/project'

export const sampleProjects: Project[] = [
  // Menschen Kategorie (2 Projekte)
  {
    id: '1',
    name: 'Urban Gardening Berlin',
    city: 'Berlin',
    description: 'Gemeinschaftsgärten in der Innenstadt schaffen grüne Oasen und fördern nachbarschaftliche Zusammenarbeit.',
    fullDescription: 'Das Urban Gardening Projekt in Berlin verwandelt ungenutzten Stadtraum in blühende Gemeinschaftsgärten. Seit 2019 haben wir bereits 15 Gärten in verschiedenen Stadtteilen etabliert, die nicht nur als grüne Oasen dienen, sondern auch Menschen unterschiedlicher Herkunft und Altersgruppen zusammenbringen. Unser Ansatz kombiniert ökologischen Anbau mit sozialer Integration. Die Gärten werden gemeinschaftlich gepflegt und die Ernte fair geteilt. Wir bieten regelmäßige Workshops zu nachhaltiger Gartenarbeit, Kompostierung und saisonalem Kochen an. Besonders stolz sind wir auf unser Bildungsprogramm für Schulkinder, das bereits über 500 Kinder erreicht hat. Die Gärten sind mehr als nur Anbauflächen - sie sind Begegnungsstätten, Lernorte und Refugien mitten in der Stadt. Durch die Zusammenarbeit mit lokalen Restaurants können überschüssige Erträge sinnvoll verwertet werden.',
    category: 'menschen',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    slug: 'urban-gardening-berlin',
    status: 'aktiv',
    startDate: '2019-03-15',
    teamSize: 8,
    contact: {
      name: 'Maria Schmidt',
      email: 'maria@urban-gardening-berlin.de',
      phone: '+49 30 12345678'
    },
    socialMedia: {
      website: 'https://urban-gardening-berlin.de',
      facebook: 'https://facebook.com/urbangardening.berlin',
      instagram: 'https://instagram.com/urbangardening_berlin'
    }
  },
  {
    id: '2', 
    name: 'Seniorentreff Hamburg',
    city: 'Hamburg',
    description: 'Digitale Kompetenz für Senioren durch Tablet-Kurse und Online-Beratung in gemütlicher Atmosphäre.',
    fullDescription: 'Der Seniorentreff Hamburg ist ein innovatives Projekt, das älteren Menschen dabei hilft, sich in der digitalen Welt zurechtzufinden. In unseren modern eingerichteten, aber gemütlichen Räumlichkeiten bieten wir individuell angepasste Tablet- und Smartphone-Kurse an. Unsere geschulten Trainer nehmen sich Zeit für jede Frage und schaffen eine entspannte Lernatmosphäre ohne Zeitdruck. Das Angebot reicht von den Grundlagen der Bedienung über Online-Banking und Videoanrufe bis hin zu sozialen Medien und digitalen Gesundheitsdiensten. Besonders beliebt sind unsere "Enkelkinder-Calls", bei denen Senioren lernen, wie sie mit ihren Familien über Videoanrufe in Kontakt bleiben können. Neben den Kursen entstehen oft dauerhafte Freundschaften, und viele Teilnehmer treffen sich auch außerhalb der Kurse. Unser Café-Bereich lädt zum Austausch ein, und regelmäßige Themennachmittage zu digitalen Themen ergänzen das Programm. Seit der Gründung haben über 800 Senioren unsere Angebote genutzt.',
    category: 'menschen',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop',
    slug: 'seniorentreff-hamburg',
    status: 'aktiv',
    startDate: '2020-09-10',
    teamSize: 5,
    contact: {
      name: 'Hans Müller',
      email: 'info@seniorentreff-hamburg.de',
      phone: '+49 40 98765432'
    },
    socialMedia: {
      website: 'https://seniorentreff-hamburg.de',
      facebook: 'https://facebook.com/seniorentreff.hamburg'
    }
  },

  // Frieden Kategorie (2 Projekte) 
  {
    id: '3',
    name: 'Friedensworkshop München',
    city: 'München',
    description: 'Interkulturelle Begegnungen und Konfliktlösung für Jugendliche verschiedener Herkunftsländer.',
    fullDescription: 'Der Friedensworkshop München bringt Jugendliche aus über 20 verschiedenen Herkunftsländern zusammen, um gemeinsam Vorurteile abzubauen und Konfliktlösungsstrategien zu entwickeln. In mehrtägigen Workshops lernen die Teilnehmer im Alter von 14 bis 18 Jahren, wie kulturelle Unterschiede als Bereicherung verstanden werden können. Durch Rollenspiele, Diskussionsrunden und kreative Methoden wie Theater und Musik werden Brücken zwischen den Kulturen gebaut. Ein besonderer Fokus liegt auf der Mediation und gewaltfreien Kommunikation. Die Jugendlichen werden zu Friedensbotschaftern ausgebildet und geben ihr Wissen an Gleichaltrige in Schulen weiter. Regelmäßige interkulturelle Feste und gemeinsame Projekte stärken den Zusammenhalt. Viele ehemalige Teilnehmer engagieren sich heute als Mentoren und unterstützen neue Gruppen. Das Projekt arbeitet eng mit Schulen, Jugendverbänden und städtischen Einrichtungen zusammen und hat bereits über 400 Jugendliche erreicht.',
    category: 'frieden',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
    slug: 'friedensworkshop-muenchen',
    status: 'aktiv',
    startDate: '2018-05-20',
    teamSize: 12,
    contact: {
      name: 'Amira Hassan',
      email: 'amira@friedensworkshop-muenchen.de',
      phone: '+49 89 12345678'
    },
    socialMedia: {
      website: 'https://friedensworkshop-muenchen.de',
      instagram: 'https://instagram.com/friedensworkshop_muc',
      facebook: 'https://facebook.com/friedensworkshop.muenchen'
    }
  },
  {
    id: '4',
    name: 'Dialog Café Köln',
    city: 'Köln', 
    description: 'Wöchentliche Gesprächsrunden zwischen Einheimischen und Geflüchteten bei Kaffee und Kuchen.',
    fullDescription: 'Das Dialog Café Köln ist ein wöchentlicher Treffpunkt, der Einheimische und Geflüchtete in entspannter Atmosphäre zusammenbringt. Jeden Donnerstagabend verwandelt sich unser gemütliches Café in einen Ort der Begegnung, des Austauschs und des gegenseitigen Lernens. Bei fair gehandeltem Kaffee, selbstgebackenem Kuchen und internationalen Spezialitäten entstehen Gespräche über Kulturen, Traditionen und persönliche Geschichten. Das Projekt bietet nicht nur sprachliche Unterstützung, sondern schafft echte menschliche Verbindungen. Viele Teilnehmer haben hier neue Freundschaften geschlossen, Arbeitsstellen gefunden oder sich gegenseitig bei Behördengängen geholfen. Besondere Highlights sind unsere multikulturellen Kochabende, Lesungen und kleinen Konzerte. Ehrenamtliche Helfer unterstützen bei Übersetzungen und organisieren Aktivitäten. Das Café ist zu einem wichtigen sozialen Ankerpunkt im Stadtviertel geworden und zeigt, wie Integration im Kleinen funktioniert.',
    category: 'frieden',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    slug: 'dialog-cafe-koeln',
    status: 'aktiv',
    startDate: '2017-11-02',
    teamSize: 15,
    contact: {
      name: 'Sarah Weber',
      email: 'sarah@dialog-cafe-koeln.de',
      phone: '+49 221 87654321'
    },
    socialMedia: {
      website: 'https://dialog-cafe-koeln.de',
      facebook: 'https://facebook.com/dialogcafe.koeln',
      instagram: 'https://instagram.com/dialog_cafe_koeln'
    }
  },

  // Umwelt Kategorie (2 Projekte)
  {
    id: '5',
    name: 'Solar-Initiative Stuttgart',
    city: 'Stuttgart',
    description: 'Bürgersolarprojekt auf Schuldächern mit Bildungsprogramm für nachhaltige Energiegewinnung.',
    fullDescription: 'Die Solar-Initiative Stuttgart zeigt, wie Bürger aktiv zur Energiewende beitragen können. Auf 25 Schuldächern in der Region haben wir gemeinsam mit der Stadt und interessierten Bürgern Solaranlagen installiert. Das Besondere: Die Anlagen gehören einer Bürgergenossenschaft und jeder kann ab 500 Euro Anteile erwerben. Der erzeugte Strom wird ins Netz eingespeist und sorgt für stabile Renditen. Parallel dazu haben wir ein umfassendes Bildungsprogramm entwickelt. Schüler lernen in praktischen Workshops, wie Solarenergie funktioniert und können den Ertrag "ihrer" Schulanlage live verfolgen. Lehrkräfte erhalten Unterrichtsmaterialien und Fortbildungen. Regelmäßige Infoabende informieren Eltern und Anwohner über erneuerbare Energien. Mittlerweile produzieren unsere Anlagen über 2,5 GWh sauberen Strom pro Jahr und versorgen rechnerisch 800 Haushalte. Das Projekt hat Vorbildcharakter und wird in anderen Städten nachgeahmt.',
    category: 'umwelt',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
    slug: 'solar-initiative-stuttgart',
    status: 'aktiv',
    startDate: '2019-01-15',
    teamSize: 6,
    contact: {
      name: 'Dr. Thomas Green',
      email: 'thomas@solar-stuttgart.de',
      phone: '+49 711 55566677'
    },
    socialMedia: {
      website: 'https://solar-initiative-stuttgart.de',
      facebook: 'https://facebook.com/solarinitiative.stuttgart',
      twitter: 'https://twitter.com/solar_stuttgart'
    }
  },
  {
    id: '6',
    name: 'Plastikfrei Dresden',
    city: 'Dresden',
    description: 'Zero-Waste Läden und Refill-Stationen reduzieren Verpackungsmüll im Stadtzentrum nachhaltig.',
    fullDescription: 'Plastikfrei Dresden ist eine Bürgerinitiative, die das Stadtzentrum schrittweise plastikfrei gestaltet. In Zusammenarbeit mit lokalen Händlern haben wir ein Netzwerk von Zero-Waste-Läden und Unverpackt-Stationen aufgebaut. Kunden können ihre eigenen Behälter mitbringen und Lebensmittel, Kosmetik und Haushaltswaren ohne Verpackung kaufen. Über 40 Geschäfte beteiligen sich bereits an unserem Refill-System für Shampoo, Spülmittel und Reiniger. Besonders stolz sind wir auf unser mobiles Refill-Café, das bei Veranstaltungen und Märkten für Aufmerksamkeit sorgt. Workshops zu DIY-Kosmetik, nachhaltiger Haushaltsführung und Upcycling ergänzen das Angebot. Eine interaktive Karte zeigt alle teilnehmenden Geschäfte und deren Angebote. Seit Projektstart konnten wir den Verpackungsmüll in der Innenstadt um geschätzt 15% reduzieren. Das Projekt inspiriert andere Städte und wurde mit dem Umweltpreis der Stadt Dresden ausgezeichnet.',
    category: 'umwelt', 
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
    slug: 'plastikfrei-dresden',
    status: 'aktiv',
    startDate: '2020-02-28',
    teamSize: 9,
    contact: {
      name: 'Lisa Müller',
      email: 'lisa@plastikfrei-dresden.de',
      phone: '+49 351 99887766'
    },
    socialMedia: {
      website: 'https://plastikfrei-dresden.de',
      instagram: 'https://instagram.com/plastikfrei_dresden',
      facebook: 'https://facebook.com/plastikfreidresden'
    }
  },

  // Zusammenarbeit Kategorie (2 Projekte)
  {
    id: '7',
    name: 'Co-Working Düsseldorf',
    city: 'Düsseldorf',
    description: 'Flexible Arbeitsplätze und Netzwerk-Events fördern Startup-Kultur und kreative Zusammenarbeit.',
    fullDescription: 'Das Co-Working Düsseldorf ist mehr als nur ein Arbeitsplatz – es ist eine lebendige Gemeinschaft von Gründern, Freelancern und kreativen Köpfen. Auf 800 Quadratmetern bieten wir flexible Arbeitsplätze, von Einzelbüros bis hin zu offenen Bereichen für kollaboratives Arbeiten. Unsere moderne Ausstattung umfasst High-Speed-Internet, Konferenzräume mit neuester Technik und eine voll ausgestattete Küche. Das Besondere sind jedoch die Menschen und die Atmosphäre: Täglich entstehen neue Ideen, Kooperationen und Freundschaften. Regelmäßige Events wie Pitch-Nights, Networking-Abende und Fachvorträge fördern den Austausch. Unser Mentoring-Programm bringt erfahrene Unternehmer mit Startup-Gründern zusammen. Viele erfolgreiche Unternehmen sind hier entstanden, und wir sind stolz darauf, Teil ihrer Geschichte zu sein. Die zentrale Lage und die inspirierende Umgebung machen uns zum idealen Ort für alle, die Großes bewegen wollen.',
    category: 'zusammenarbeit',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&h=400&fit=crop',
    slug: 'coworking-duesseldorf',
    status: 'aktiv',
    startDate: '2018-08-01',
    teamSize: 4,
    contact: {
      name: 'Max Schneider',
      email: 'max@coworking-duesseldorf.de',
      phone: '+49 211 44332211'
    },
    socialMedia: {
      website: 'https://coworking-duesseldorf.de',
      instagram: 'https://instagram.com/coworking_dus',
      facebook: 'https://facebook.com/coworking.duesseldorf',
      twitter: 'https://twitter.com/coworking_dus'
    }
  },
  {
    id: '8',
    name: 'Nachbarschaftshilfe Leipzig',
    city: 'Leipzig',
    description: 'Digital-App vernetzt Hilfesuchende mit ehrenamtlichen Helfern für alltägliche Aufgaben.',
    fullDescription: 'Die Nachbarschaftshilfe Leipzig bringt Menschen zusammen und stärkt den sozialen Zusammenhalt in der Stadt. Über unsere benutzerfreundliche App können Hilfesuchende unkompliziert Unterstützung für alltägliche Aufgaben finden – vom Einkauf über Haustierbetreuung bis hin zu handwerklichen Arbeiten. Gleichzeitig können sich hilfsbereite Nachbarn registrieren und ihre Fähigkeiten anbieten. Das integrierte Bewertungssystem sorgt für Vertrauen und Qualität. Besonders während der Pandemie hat sich unser Service bewährt: Über 2000 Hilfegesuche wurden erfolgreich vermittelt. Regelmäßige Nachbarschaftsfeste und Tauschbörsen stärken die persönlichen Kontakte. Unser Zeitbank-System ermöglicht es, geleistete Hilfe zu "sparen" und später selbst Unterstützung zu erhalten. Mittlerweile nutzen über 5000 Leipziger unsere Plattform. Das Projekt wird von der Stadt unterstützt und soll auf andere Städte ausgeweitet werden.',
    category: 'zusammenarbeit',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
    slug: 'nachbarschaftshilfe-leipzig',
    status: 'aktiv',
    startDate: '2019-10-12',
    teamSize: 7,
    contact: {
      name: 'Anna Richter',
      email: 'anna@nachbarschaftshilfe-leipzig.de',
      phone: '+49 341 77889900'
    },
    socialMedia: {
      website: 'https://nachbarschaftshilfe-leipzig.de',
      facebook: 'https://facebook.com/nachbarschaftshilfe.leipzig',
      instagram: 'https://instagram.com/nachbarschaftshilfe_le'
    }
  },

  // Zukunft Kategorie (2 Projekte)
  {
    id: '9',
    name: 'KI-Lernlabor Frankfurt',
    city: 'Frankfurt',
    description: 'Coding-Workshops für Kinder und Jugendliche mit Fokus auf künstliche Intelligenz und Robotik.',
    fullDescription: 'Das KI-Lernlabor Frankfurt fördert die nächste Generation digitaler Innovatoren. In unseren modern ausgestatteten Räumen lernen Kinder und Jugendliche im Alter von 8 bis 18 Jahren spielerisch programmieren und verstehen, wie künstliche Intelligenz funktioniert. Von visueller Programmierung mit Scratch bis hin zu Python und maschinellem Lernen – unser Curriculum passt sich dem Alter und den Fähigkeiten der Teilnehmer an. Robotik-Workshops mit LEGO Mindstorms und Arduino machen abstrakte Konzepte greifbar. Besonders beliebt sind unsere KI-Projekte, bei denen Jugendliche eigene Chatbots oder Bilderkennungssysteme entwickeln. Regelmäßige Hackathons und Wettbewerbe motivieren zu kreativen Lösungen. Unser Mentoring-Programm bringt Schüler mit IT-Profis aus der Finanzbranche zusammen. Viele ehemalige Teilnehmer studieren heute Informatik oder haben bereits eigene Apps veröffentlicht. Das Labor arbeitet eng mit Schulen zusammen und bietet auch Lehrerfortbildungen an.',
    category: 'zukunft',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    slug: 'ki-lernlabor-frankfurt',
    status: 'aktiv',
    startDate: '2020-01-20',
    teamSize: 10,
    contact: {
      name: 'Dr. Petra Wagner',
      email: 'petra@ki-lernlabor-frankfurt.de',
      phone: '+49 69 33445566'
    },
    socialMedia: {
      website: 'https://ki-lernlabor-frankfurt.de',
      instagram: 'https://instagram.com/ki_lernlabor_ffm',
      twitter: 'https://twitter.com/kilabor_ffm'
    }
  },
  {
    id: '10',
    name: 'Smart City Hannover',
    city: 'Hannover',
    description: 'IoT-Sensoren optimieren Verkehrsfluss und Energieverbrauch für eine vernetzte Stadtentwicklung.',
    fullDescription: 'Smart City Hannover macht die Landeshauptstadt zur Modellstadt für digitale Stadtentwicklung. Über 1000 IoT-Sensoren erfassen in Echtzeit Daten zu Verkehrsflüssen, Luftqualität, Lärmpegel und Energieverbrauch. Diese Informationen fließen in intelligente Steuerungssysteme ein, die Ampelschaltungen optimieren, Parkplatzsuche verknüpfen und die Städte-beleuchtung bedarfsgerecht regeln. Bürger profitieren von einer App, die ihnen die besten Routen anzeigt und über Veranstaltungen informiert. Besonders innovativ ist unser Bürgerbeteiligungsportal: Hier können Einwohner Probleme melden, Vorschläge einreichen und bei Stadtentscheidungen mitwirken. Das Projekt arbeitet mit lokalen Universitäten und Tech-Unternehmen zusammen. Open Data Initiativen stellen die gesammelten Daten für Forschung und Innovation zur Verfügung. Durch die intelligente Verkehrssteuerung konnten wir bereits 20% der Staus reduzieren und den CO2-Ausstoß um 15% senken. Das Projekt dient anderen Städten als Vorbild für digitale Transformation.',
    category: 'zukunft',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop',
    slug: 'smart-city-hannover',
    status: 'aktiv',
    startDate: '2021-04-01',
    teamSize: 15,
    contact: {
      name: 'Prof. Dr. Michael Tech',
      email: 'michael@smart-city-hannover.de',
      phone: '+49 511 22334455'
    },
    socialMedia: {
      website: 'https://smart-city-hannover.de',
      twitter: 'https://twitter.com/smartcity_h',
      facebook: 'https://facebook.com/smartcity.hannover'
    }
  }
]