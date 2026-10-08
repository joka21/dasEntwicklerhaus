import { MetadataRoute } from 'next'
import { staedte } from '@/data/staedte'
import { referenzen } from '@/data/referenzen'
import { absoluteUrl } from '@/lib/site'

// Ohne changefreq/priority und ohne lastmod – die Datendateien haben kein
// Änderungsdatum, ein erfundenes wäre irreführend.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '/',
    '/baukasten',
    '/onlineshop-erstellen',
    '/online-marketing',
    '/app-und-ki-entwicklung',
    '/referenzen',
    '/ueber-mich',
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ]

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...staedte.map((stadt) => ({ url: absoluteUrl(`/${stadt.slug}`) })),
    ...referenzen.map((r) => ({ url: absoluteUrl(`/referenzen/${r.slug}`) })),
  ]
}
