import { MetadataRoute } from 'next'

// Für alle Bots gesperrt. Muss in jeder Gruppe stehen: Ein Bot mit eigener
// Gruppe liest die Regeln für '*' nicht mehr.
const GESPERRT = ['/api/', '/admin/', '/private/', '/portal', '/login']

// KI-Suche und Abrufe im Auftrag von Nutzern: erlaubt, damit die Seite in
// ChatGPT, Claude und Perplexity gefunden und zitiert werden kann.
const KI_SUCHE = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
]

// KI-Training: vorerst gesperrt. Zum Freigeben diese Zeile auf true setzen.
const TRAINING_ERLAUBT = false
const KI_TRAINING = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'CCBot',
  // ältere Kennungen von Anthropic
  'anthropic-ai',
  'Claude-Web',
]

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.dasentwicklerhaus.de'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: GESPERRT,
      },
      {
        userAgent: KI_SUCHE,
        allow: '/',
        disallow: GESPERRT,
      },
      TRAINING_ERLAUBT
        ? { userAgent: KI_TRAINING, allow: '/', disallow: GESPERRT }
        : { userAgent: KI_TRAINING, disallow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
