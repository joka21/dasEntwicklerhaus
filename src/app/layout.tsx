import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Fallback-Werte; jede Seite setzt eigene Metadaten über pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  authors: [{ name: 'Das Entwicklerhaus Team', url: SITE_URL }],
  creator: 'Das Entwicklerhaus',
  publisher: 'Das Entwicklerhaus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}