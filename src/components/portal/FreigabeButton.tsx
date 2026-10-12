'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { freigeben, type AktionsStatus } from '@/app/portal/[projekt]/actions'

function Button() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-umwelt-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-umwelt-800 focus:outline-none focus:ring-2 focus:ring-umwelt-700 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Wird freigegeben …' : 'Diese Variante freigeben'}
    </button>
  )
}

interface FreigabeButtonProps {
  projektSlug: string
  varianteId: string
  varianteTitel: string
}

export default function FreigabeButton({ projektSlug, varianteId, varianteTitel }: FreigabeButtonProps) {
  const [status, action] = useActionState<AktionsStatus, FormData>(freigeben, null)

  return (
    <form
      action={action}
      onSubmit={(e) => {
        // Die Freigabe ist endgültig – vorher ausdrücklich bestätigen lassen.
        if (
          !window.confirm(
            `Möchten Sie „${varianteTitel}“ verbindlich freigeben? Pro Projekt ist nur eine Freigabe möglich.`
          )
        ) {
          e.preventDefault()
        }
      }}
      className="flex flex-wrap items-center gap-4"
    >
      <input type="hidden" name="projekt" value={projektSlug} />
      <input type="hidden" name="variant_id" value={varianteId} />
      <Button />
      {status && (
        <p role="status" className={status.ok ? 'text-umwelt-700' : 'text-red-600'}>
          {status.meldung}
        </p>
      )}
    </form>
  )
}
