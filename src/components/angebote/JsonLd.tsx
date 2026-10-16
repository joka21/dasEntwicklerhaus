import { jsonLdString } from '@/lib/angebote-seo'

// Normales <script> (nicht next/script), damit die Daten direkt im HTML stehen.
export default function JsonLd({ knoten }: { knoten: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(knoten) }}
    />
  )
}
