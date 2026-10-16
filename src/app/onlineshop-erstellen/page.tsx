import ZielgruppenSeite, { zielgruppenMetadata } from '@/components/angebote/ZielgruppenSeite'

export const metadata = zielgruppenMetadata('onlineshop-erstellen')

export default function Page() {
  return <ZielgruppenSeite slug="onlineshop-erstellen" />
}
