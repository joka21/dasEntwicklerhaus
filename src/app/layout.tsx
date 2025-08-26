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
  title: 'Das Entwicklerhaus - Innovative Projekte aus Europa | Niederrhein bis Europa',
  description: 'Entdecken Sie innovative Projekte aus Europa: KI-Lösungen, soziale Initiativen, Webportale und DIY-Vorhaben. Vom Niederrhein bis Europa - Projekte sichtbar machen, vernetzen und unterstützen.',
  keywords: ['Projekte Europa', 'Innovation Niederrhein', 'Soziale Initiativen', 'KI Projekte', 'Startup Plattform', 'Entwicklerhaus', 'Projektförderung'],
  authors: [{ name: 'Das Entwicklerhaus Team' }],
  creator: 'Das Entwicklerhaus',
  publisher: 'Das Entwicklerhaus',
  openGraph: {
    title: 'Das Entwicklerhaus - Innovative Projekte aus Europa',
    description: 'Entdecken Sie innovative Projekte aus Europa: KI-Lösungen, soziale Initiativen, Webportale und DIY-Vorhaben. Vom Niederrhein bis Europa.',
    url: 'https://dasentwicklerhaus.de',
    siteName: 'Das Entwicklerhaus',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Das Entwicklerhaus - Innovative Projekte aus Europa',
    description: 'Entdecken Sie innovative Projekte aus Europa: KI-Lösungen, soziale Initiativen, Webportale und DIY-Vorhaben.',
    creator: '@entwicklerhaus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dasentwicklerhaus.de',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" itemScope itemType="https://schema.org/WebSite">
      <head>
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