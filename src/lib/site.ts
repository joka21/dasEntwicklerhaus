import type { Metadata } from 'next'

// Einzige Quelle für die Basis-URL (metadataBase, Canonicals, Open Graph,
// Sitemap, robots.txt, JSON-LD).
export const SITE_URL = 'https://www.dasentwicklerhaus.de'
export const SITE_NAME = 'Das Entwicklerhaus'

const MAX_TITLE = 60
const MAX_DESCRIPTION = 155
const DEFAULT_IMAGE = {
  url: '/images/logo/logo-dasentwicklerhaus-1024x783.png',
  width: 1024,
  height: 783,
  alt: 'Das Entwicklerhaus Logo',
}

export function absoluteUrl(path: string = '/'): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

// Kürzt an einer Wortgrenze und hängt „…" an, wenn der Text zu lang ist.
function clip(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:–-]+$/, '')}…`
}

// Hängt den Markennamen an, sofern er nicht schon enthalten ist und der Titel
// dann noch in 60 Zeichen passt.
export function fullTitle(title: string): string {
  if (title.includes(SITE_NAME)) return clip(title, MAX_TITLE)
  const withBrand = `${title} | ${SITE_NAME}`
  return withBrand.length <= MAX_TITLE ? withBrand : clip(title, MAX_TITLE)
}

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  image?: { url: string; width?: number; height?: number; alt?: string }
  openGraph?: Metadata['openGraph']
}

// Metadaten für eine Seite: Titel, Beschreibung, Canonical sowie Open Graph
// und Twitter mit genau diesem Titel und dieser Beschreibung.
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  openGraph,
}: PageMetadataOptions): Metadata {
  const t = fullTitle(title)
  const d = clip(description, MAX_DESCRIPTION)
  const url = absoluteUrl(path)

  return {
    title: { absolute: t },
    description: d,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: SITE_NAME,
      ...openGraph,
      title: t,
      description: d,
      url,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@entwicklerhaus',
      title: t,
      description: d,
      images: [image.url],
    },
  }
}
