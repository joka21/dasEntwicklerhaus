import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/angebote/JsonLd'
import { personLd, professionalServiceLd, TITEL_VORLAGE, websiteLd } from '@/lib/angebote-seo'
import { anbieter, zielgruppen } from '@/data/angebote'
import { startseite } from '@/data/startseite'
import { person } from '@/data/ueber-mich'
import { UEBER_MICH_NAV } from '@/data/angebote-navigation'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dasentwicklerhaus.de'),
  // Standard für Seiten ohne eigene Angaben; die Startseite setzt dieselben Texte
  title: {
    default: startseite.seo.title,
    template: TITEL_VORLAGE
  },
  description: startseite.seo.description,
  authors: [{ name: person.name, url: `https://www.dasentwicklerhaus.de${UEBER_MICH_NAV.href}` }],
  creator: person.name,
  publisher: 'Das Entwicklerhaus',
  formatDetection: {
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.dasentwicklerhaus.de',
    siteName: 'Das Entwicklerhaus',
    title: startseite.seo.title,
    description: startseite.seo.description,
    images: [
      {
        url: '/images/logo/logo-dasentwicklerhaus-1024x783.png',
        width: 1024,
        height: 783,
        alt: 'Das Entwicklerhaus Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: startseite.seo.title,
    description: startseite.seo.description,
    images: ['/images/logo/logo-dasentwicklerhaus-1024x783.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo/logo-Klein.webp',
    shortcut: '/images/logo/logo-Klein.webp',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'caAjiFZudEGwlkms5VQwjcDqc5wYfs6uhVDLC9KfhVw',
  },
  category: 'technology',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" itemScope itemType="https://schema.org/WebSite">
      <head>
        <meta name="google-site-verification" content="caAjiFZudEGwlkms5VQwjcDqc5wYfs6uhVDLC9KfhVw" />
        <link rel="icon" href="/images/logo/logo-Klein.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <JsonLd
          knoten={[
            websiteLd(),
            personLd(),
            professionalServiceLd({
              areaServed: anbieter.einzugsgebietGesamt,
              angebote: zielgruppen.map((z) => ({ name: z.karte.titel, path: `/${z.slug}` })),
            }),
          ]}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}