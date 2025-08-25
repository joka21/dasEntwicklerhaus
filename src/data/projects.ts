import { Project } from '@/types/project'

export const sampleProjects: Project[] = [
  // Menschen Kategorie (2 Projekte)
  {
    id: '1',
    name: 'Urban Gardening Berlin',
    city: 'Berlin',
    description: 'Gemeinschaftsgärten in der Innenstadt schaffen grüne Oasen und fördern nachbarschaftliche Zusammenarbeit.',
    category: 'menschen',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop'
  },
  {
    id: '2', 
    name: 'Seniorentreff Hamburg',
    city: 'Hamburg',
    description: 'Digitale Kompetenz für Senioren durch Tablet-Kurse und Online-Beratung in gemütlicher Atmosphäre.',
    category: 'menschen',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop'
  },

  // Frieden Kategorie (2 Projekte) 
  {
    id: '3',
    name: 'Friedensworkshop München',
    city: 'München',
    description: 'Interkulturelle Begegnungen und Konfliktlösung für Jugendliche verschiedener Herkunftsländer.',
    category: 'frieden',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Dialog Café Köln',
    city: 'Köln', 
    description: 'Wöchentliche Gesprächsrunden zwischen Einheimischen und Geflüchteten bei Kaffee und Kuchen.',
    category: 'frieden',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop'
  },

  // Umwelt Kategorie (2 Projekte)
  {
    id: '5',
    name: 'Solar-Initiative Stuttgart',
    city: 'Stuttgart',
    description: 'Bürgersolarprojekt auf Schuldächern mit Bildungsprogramm für nachhaltige Energiegewinnung.',
    category: 'umwelt',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Plastikfrei Dresden',
    city: 'Dresden',
    description: 'Zero-Waste Läden und Refill-Stationen reduzieren Verpackungsmüll im Stadtzentrum nachhaltig.',
    category: 'umwelt', 
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop'
  },

  // Zusammenarbeit Kategorie (2 Projekte)
  {
    id: '7',
    name: 'Co-Working Düsseldorf',
    city: 'Düsseldorf',
    description: 'Flexible Arbeitsplätze und Netzwerk-Events fördern Startup-Kultur und kreative Zusammenarbeit.',
    category: 'zusammenarbeit',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&h=400&fit=crop'
  },
  {
    id: '8',
    name: 'Nachbarschaftshilfe Leipzig',
    city: 'Leipzig',
    description: 'Digital-App vernetzt Hilfesuchende mit ehrenamtlichen Helfern für alltägliche Aufgaben.',
    category: 'zusammenarbeit',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop'
  },

  // Zukunft Kategorie (2 Projekte)
  {
    id: '9',
    name: 'KI-Lernlabor Frankfurt',
    city: 'Frankfurt',
    description: 'Coding-Workshops für Kinder und Jugendliche mit Fokus auf künstliche Intelligenz und Robotik.',
    category: 'zukunft',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop'
  },
  {
    id: '10',
    name: 'Smart City Hannover',
    city: 'Hannover',
    description: 'IoT-Sensoren optimieren Verkehrsfluss und Energieverbrauch für eine vernetzte Stadtentwicklung.',
    category: 'zukunft',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop'
  }
]