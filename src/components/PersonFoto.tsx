import Image from 'next/image'
import { person } from '@/data/ueber-mich'

// Foto von Jo; solange keins hinterlegt ist, ein Kreis mit Initialen.
export default function PersonFoto({ className = '' }: { className?: string }) {
  if (person.foto) {
    return (
      <Image
        src={person.foto}
        alt={person.fotoAlt}
        width={320}
        height={320}
        className={`aspect-square rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`flex aspect-square items-center justify-center rounded-full bg-zukunft text-5xl font-bold ${className}`}
    >
      {person.initialen}
    </div>
  )
}
