# Das Entwicklerhaus

Eine Next.js 14 Plattform zur Präsentation innovativer Projekte aus Europa.

## Technische Details

- **Framework:** Next.js 14 mit App Router
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth, Postgres, Storage) für das Kundenportal
- **Design:** Responsive, Mobile-First

## Projektstruktur

```
src/
├── app/              # App Router Seiten
│   ├── layout.tsx    # Root Layout
│   ├── page.tsx      # Homepage
│   ├── globals.css   # Globale Styles
│   ├── projects/     # Projekte Seiten
│   ├── about/        # Über uns Seite
│   └── contact/      # Kontakt Seite
├── components/       # Wiederverwendbare Komponenten
│   ├── Header.tsx    # Navigation Header
│   ├── Footer.tsx    # Footer
│   └── ProjectCard.tsx # Projekt Karte
├── lib/             # Utilities und Konfigurationen
│   └── projects.ts  # Projekt-Verwaltung
└── types/           # TypeScript Definitionen
    └── index.ts     # Gemeinsame Types
```

## Setup

1. Dependencies installieren:
   ```bash
   npm install
   ```

2. Umgebungsvariablen:
   - Kopiere `.env.local.example` zu `.env.local`
   - Trage die Supabase- und SMTP-Werte ein (siehe `supabase/KUNDENPORTAL_SETUP.md`)

3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

## Features

- 🔐 Kundenportal mit Supabase (Magic Link, Design-Freigabe)
- 📱 Responsive Design
- 🎨 Tailwind CSS Styling
- 🔍 TypeScript Unterstützung
- 🚀 Next.js 14 App Router
- 🌍 Fokus auf europäische Projekte

## Deployment

Das Projekt kann auf Vercel, Netlify oder anderen Next.js-kompatiblen Plattformen deployed werden.

## Lizenz

Alle Rechte vorbehalten.