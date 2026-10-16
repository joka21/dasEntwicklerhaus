import ZielgruppenSeite, { zielgruppenMetadata } from '@/components/angebote/ZielgruppenSeite'

export const metadata = zielgruppenMetadata('website-fuer-handwerker')

export default function Page() {
  return <ZielgruppenSeite slug="website-fuer-handwerker" />
}
