# 📋 Projektzusammenfassung: Das Entwicklerhaus

**Stand:** 13. November 2025
**Version:** 0.1.0
**Status:** Aktive Entwicklung

---

## 🎯 Projektübersicht

**Das Entwicklerhaus** ist eine Next.js 14 Plattform zur Präsentation und Förderung innovativer, gesellschaftlich relevanter Projekte aus Europa. Die Plattform verbindet moderne Webtechnologien mit sozialer Mission und fokussiert sich auf Projekte in den Bereichen Menschen, Frieden, Umwelt, Zusammenarbeit und Zukunft.

### Kernziel
Eine digitale Heimat für Projekte schaffen, die Europa nachhaltig gestalten – mit Fokus auf Transparenz, Gemeinschaft und echte gesellschaftliche Wirkung.

---

## 🏗️ Technischer Stack

### Frontend
- **Framework:** Next.js 14.2.31 (App Router)
- **Sprache:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.1
- **UI-Library:** React 18
- **Markdown:** react-markdown 10.1.0

### Backend & Services
- **Authentication:** Firebase 12.1.0 (Auth)
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Email:** Nodemailer 7.0.5

### Development Tools
- **Linting:** ESLint 8 mit Next.js Config
- **Package Manager:** npm
- **Version Control:** Git

---

## 📁 Projektstruktur

```
dasEntwicklerhaus/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root Layout
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Globale Styles + CSS Variablen
│   │   ├── projects/           # Projekte-Übersicht & Details
│   │   │   ├── page.tsx        # Projektliste
│   │   │   └── [slug]/         # Dynamische Projekt-Details
│   │   ├── blog/               # Blog-Bereich
│   │   │   ├── page.tsx        # Blog-Übersicht
│   │   │   └── [slug]/         # Einzelne Artikel
│   │   ├── ai-literacy/        # AI Literacy Lernplattform
│   │   ├── contact/            # Kontaktformular
│   │   ├── dieidee/            # "Die Idee" Seite
│   │   ├── impressum/          # Impressum
│   │   ├── datenschutz/        # Datenschutzerklärung
│   │   ├── ki-startups/        # KI-Startups Übersicht
│   │   └── ki-deutschland/     # KI Deutschland Seite
│   │
│   ├── components/             # Wiederverwendbare Komponenten
│   │   ├── Header.tsx          # Navigation Header
│   │   ├── Footer.tsx          # Footer mit Links
│   │   ├── Hero.tsx            # Hero Section
│   │   ├── FilterSection.tsx   # Kategoriefilter
│   │   ├── ProjectsSection.tsx # Projektliste mit Filter
│   │   ├── ProjectCard.tsx     # Einzelne Projektkarte
│   │   ├── ProjectsGrid.tsx    # Grid Layout
│   │   ├── ContactForm.tsx     # Kontaktformular
│   │   ├── CookieBanner.tsx    # DSGVO Cookie Banner
│   │   ├── StructuredData.tsx  # SEO Structured Data
│   │   ├── ContentSection.tsx  # Wiederverwendbare Section
│   │   ├── blog/               # Blog-spezifische Components
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogFilter.tsx
│   │   │   └── BlogHero.tsx
│   │   └── ai-literacy/        # AI Literacy Components
│   │       ├── AILiteracyHero.tsx
│   │       ├── LearningPhase.tsx
│   │       ├── Quiz.tsx
│   │       ├── PracticeExample.tsx
│   │       ├── InteractiveTask.tsx
│   │       └── Certificate.tsx
│   │
│   ├── data/                   # Statische Daten
│   │   └── projects.ts         # Projekt-Daten (12 Projekte)
│   │
│   ├── lib/                    # Utilities & Konfiguration
│   │   ├── firebase.ts         # Firebase Setup
│   │   ├── auth.ts             # Authentifizierung
│   │   └── projects.ts         # Projekt-Verwaltung
│   │
│   └── types/                  # TypeScript Definitionen
│       └── project.ts          # Project Interface
│
├── public/                     # Statische Assets
│   ├── images/                 # Bilder
│   └── favicon.ico            # Favicon
│
├── .env.local                  # Environment Variables
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript Config
├── tailwind.config.ts          # Tailwind Config
├── next.config.js              # Next.js Config
├── README.md                   # Projekt-Dokumentation
├── CLAUDE.md                   # Claude Code Instructions
├── VERCEL_EMAIL_SETUP.md       # Email Setup Dokumentation
└── WORDPRESS_BACKEND_MIGRATION.md  # Migration Guide
```

---

## 🎨 Design System

### Farbschema
- **Gradient Sky-Blue:** `--gradient-mid-to-sky` (radial-gradient von #a8dcf4 zu #5095cb)
- **Navy/Dunkelblau:** #1e40af (Haupttextfarbe)
- **Akzentfarben:** Kategoriebasiert (menschen, frieden, umwelt, zusammenarbeit, zukunft)

### Kategorien
1. **Menschen** - Soziale Projekte
2. **Frieden** - Friedensförderung
3. **Umwelt** - Nachhaltigkeit & Klima
4. **Zusammenarbeit** - Kollaboration & Partizipation
5. **Zukunft** - Innovation & Technologie

---

## 🚀 Hauptfunktionen

### 1. Projekt-Präsentation
- **Projektübersicht:** Filterbare Liste aller Projekte
- **Projekt-Details:** Ausführliche Beschreibungen mit Metadaten
- **Kategoriefilter:** Dynamische Filterung nach Themenbereichen
- **Status-Tracking:** aktiv, geplant, abgeschlossen

### 2. AI Literacy Lernplattform
- Interaktive Lernphasen (4 Stufen)
- Quiz-Funktionen
- Praxisbeispiele (12+ Anwendungsfälle)
- Digitales Zertifikat bei Abschluss
- Branchen-spezifische Beispiele

### 3. Blog-System
- Artikelübersicht mit Kategoriefilter
- Einzelartikel-Ansicht mit Markdown-Support
- SEO-optimierte Struktur
- Responsive Blog-Cards

### 4. Kontakt & Kommunikation
- Kontaktformular mit Nodemailer-Integration
- Email-Versand über SMTP
- Cookie-Banner (DSGVO-konform)

### 5. SEO & Performance
- Structured Data (JSON-LD)
- Meta-Tags Optimierung
- Open Graph Support
- Responsive Design (Mobile-First)

---

## 📊 Aktueller Projektstand

### Implementierte Features ✅
- ✅ Next.js 14 Setup mit App Router
- ✅ TypeScript Integration
- ✅ Tailwind CSS Styling
- ✅ Firebase Backend (Auth, Firestore, Storage)
- ✅ 12 dokumentierte Projekte
- ✅ Filterbare Projektübersicht
- ✅ Dynamische Projekt-Detailseiten
- ✅ AI Literacy Lernplattform (vollständig)
- ✅ Blog-System mit Markdown
- ✅ Kontaktformular mit Email-Integration
- ✅ Cookie Banner (DSGVO)
- ✅ Responsive Design
- ✅ SEO Optimierung

### Geplante Features 🔜
- 🔜 WordPress Headless CMS Integration (siehe WORDPRESS_BACKEND_MIGRATION.md)
- 🔜 User Authentication & Profile
- 🔜 Projekt-Submission durch User
- 🔜 Community Features
- 🔜 Newsletter Integration
- 🔜 Analytics Dashboard

---

## 🎯 Hauptprojekte auf der Plattform

### Eigene Projekte (Das Entwicklerhaus)

1. **AI Literacy Lernplattform** (aktiv)
   - Kategorie: Zukunft
   - 4 Lernphasen, 12+ Praxisbeispiele
   - Digitales Zertifikat

2. **Krefeld 2030** (geplant)
   - Kategorie: Zusammenarbeit
   - Digitale Bürgerbeteiligung nach Taiwan-Vorbild
   - KI-gestützte Moderation & Konsensfindung

3. **Das Ladenprojekt** (geplant)
   - Kategorie: Zukunft
   - KI-Onlineshops für lokale Händler
   - Start: November 2025

### Kuratierte Projekte (Deutschland/Europa)

#### Umwelt-Projekte
4. **Makersite** (Stuttgart) - Product Lifecycle Intelligence
5. **TWAICE** (München) - Batterieanalytik
6. **Climatiq** (Berlin) - CO₂-Bilanzierung
7. **Greenlyte** (Essen) - Direct Air Capture
8. **vGreens** (Essen) - Vertical Farming
9. **Planted** (Köln) - ESG-Management
10. **Envelio** (Köln) - Smart Grid Software
11. **ecoligo** (Berlin) - Solar-as-a-Service
12. **KONUX** (München) - KI für Bahninfrastruktur

---

## 🔧 Development Workflow

### Lokale Entwicklung
```bash
# Dependencies installieren
npm install

# Dev Server starten
npm run dev

# Produktionsbuild
npm run build

# Produktionsserver
npm start

# Linting
npm run lint
```

### Environment Variables
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Email (Nodemailer)
EMAIL_USER=
EMAIL_PASS=
EMAIL_HOST=
EMAIL_PORT=
```

---

## 📈 Geplante Migration

### WordPress Headless CMS (Phase 2)
- **Status:** Dokumentiert in WORDPRESS_BACKEND_MIGRATION.md
- **Ziel:** Dynamische Content-Verwaltung über WordPress Admin
- **Umfang:** 18 Schritte über 3 Phasen
- **Timeline:** Q1-Q2 2026

**Hauptvorteile:**
- Content-Management ohne Code-Änderungen
- Multi-User Verwaltung
- REST API Integration
- Identisches Frontend-UI

---

## 🌐 Deployment

### Vercel (Aktuell)
- Automatische Deployments via Git
- Environment Variables über Vercel Dashboard
- Custom Domain Support
- Edge Functions für Performance

### Alternativen
- Netlify
- Railway
- Eigener Server mit Docker

---

## 📝 Dokumentation

### Vorhandene Dokumentation
1. **README.md** - Setup & Features
2. **CLAUDE.md** - Entwicklungsanweisungen
3. **VERCEL_EMAIL_SETUP.md** - Email-Konfiguration
4. **WORDPRESS_BACKEND_MIGRATION.md** - CMS-Migration Guide

---

## 🎓 Philosophie & Werte

### Mission
Technologie für gesellschaftlichen Fortschritt einsetzen – nicht für Überwachung oder Manipulation.

### Fokus-Bereiche
- **Demokratie:** Partizipation & Transparenz
- **Nachhaltigkeit:** Klima & Umwelt
- **Gemeinschaft:** Lokale Stärkung
- **Innovation:** KI für das Gemeinwohl
- **Bildung:** Digitale Kompetenz für alle

### Haltung
- Open Source wo möglich
- Privacy by Design
- DSGVO-konform
- Barrierefreiheit
- Community-orientiert

---

## 📊 Metriken & Ziele 2025-2030

### 2025 (Aktuell)
- ✅ Plattform live
- ✅ 12 kuratierte Projekte
- ✅ AI Literacy Plattform (Phase 1)
- 🎯 100 aktive Nutzer
- 🎯 3 eigene Projekte

### 2026
- 🎯 WordPress CMS Integration
- 🎯 Krefeld 2030 Beta-Launch
- 🎯 Das Ladenprojekt Live
- 🎯 50+ kuratierte Projekte
- 🎯 1.000 Platform User

### 2030
- 🎯 Europaweit führende Plattform für Social Impact Projekte
- 🎯 Krefeld als Modellstadt für digitale Demokratie
- 🎯 5.000+ dokumentierte Projekte
- 🎯 100.000+ Community Members

---

## 🤝 Beitragen

Das Projekt ist aktuell in privater Entwicklung. Für Fragen oder Kooperationen:

**Website:** https://dasentwicklerhaus.de
**Kontakt:** Über Kontaktformular auf der Website
**Email:** via Nodemailer konfiguriert

---

## 📄 Lizenz

Alle Rechte vorbehalten.
© 2025 Das Entwicklerhaus

---

## 🔗 Wichtige Links

- **Live Platform:** https://dasentwicklerhaus.de
- **AI Literacy:** https://dasentwicklerhaus.de/ai-literacy
- **Blog:** https://dasentwicklerhaus.de/blog
- **Projekte:** https://dasentwicklerhaus.de/projects

---

## 📌 Nächste Schritte

### Kurzfristig (Q4 2025)
1. ✅ Projekt-Dokumentation vervollständigen
2. 🔜 WordPress Backend Setup vorbereiten
3. 🔜 User Testing AI Literacy
4. 🔜 SEO-Audit durchführen
5. 🔜 Analytics integrieren

### Mittelfristig (Q1-Q2 2026)
1. WordPress Headless CMS Migration
2. Krefeld 2030 Prototyp
3. Das Ladenprojekt MVP
4. Community-Features Launch
5. Newsletter-System

### Langfristig (2026-2030)
1. Skalierung auf europäische Ebene
2. Multi-Language Support
3. Mobile Apps (iOS/Android)
4. API für externe Integrations
5. White-Label Lösungen für Städte

---

**Erstellt am:** 13. November 2025
**Letzte Aktualisierung:** 13. November 2025
**Version:** 1.0.0
**Autor:** Das Entwicklerhaus Team
