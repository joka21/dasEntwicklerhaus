import ZielgruppenSeite, { zielgruppenMetadata } from '@/components/angebote/ZielgruppenSeite'

export const metadata = zielgruppenMetadata('website-fuer-vereine')

export default function Page() {
  return <ZielgruppenSeite slug="website-fuer-vereine" />
}
