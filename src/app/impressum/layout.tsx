import { angebotMetadata } from '@/lib/angebote-seo'

export const metadata = angebotMetadata({
  title: 'Impressum',
  description: 'Impressum von Das Entwicklerhaus: Josef Kalenberg, Am Königshof 47, 47807 Krefeld – Kontakt, Steuernummer und rechtliche Hinweise.',
  path: '/impressum',
})

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
