import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dasentwicklerhaus.de'),
  title: {
    default: 'Das Entwicklerhaus - Gemeinsam sind wir weniger allein',
    template: '%s | Das Entwicklerhaus'
  },
  description: 'Dein Projekt verdient es, gesehen zu werden. Eine Plattform für innovative Ideen aus Europa – vom Niederrhein bis Europa. KI, Startups, soziale Initiativen. Ehrlich, transparent, echt.',
  keywords: ['Projekte Europa', 'Innovation Niederrhein', 'Soziale Initiativen', 'KI Projekte', 'Startup Plattform', 'Entwicklerhaus', 'Projektförderung', 'Community', 'Vernetzung', 'Digitale Innovation', 'AI Literacy', 'KI-Startups Deutschland'],
  authors: [{ name: 'Das Entwicklerhaus Team', url: 'https://dasentwicklerhaus.de' }],
  creator: 'Das Entwicklerhaus',
  publisher: 'Das Entwicklerhaus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://dasentwicklerhaus.de',
    siteName: 'Das Entwicklerhaus',
    title: 'Das Entwicklerhaus - Gemeinsam sind wir weniger allein',
    description: 'Dein Projekt verdient es, gesehen zu werden. Eine Plattform für innovative Ideen aus Europa. KI, Startups, soziale Initiativen. Ehrlich, transparent, echt.',
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
    title: 'Das Entwicklerhaus - Gemeinsam sind wir weniger allein',
    description: 'Dein Projekt verdient es, gesehen zu werden. KI, Startups, soziale Initiativen aus Europa. Ehrlich, transparent, echt.',
    creator: '@entwicklerhaus',
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
  alternates: {
    canonical: 'https://dasentwicklerhaus.de',
  },
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
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}