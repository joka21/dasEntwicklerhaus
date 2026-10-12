'use client'

import { startTransition, useActionState, useEffect, useRef } from 'react'
import { kommentieren, type AktionsStatus } from '@/app/portal/[projekt]/actions'

interface KommentarFormularProps {
  projektSlug: string
  varianteId: string
}

export default function KommentarFormular({ projektSlug, varianteId }: KommentarFormularProps) {
  const [status, action, wirdGesendet] = useActionState<AktionsStatus, FormData>(kommentieren, null)
  const formRef = useRef<HTMLFormElement>(null)
  const feldId = `kommentar-${varianteId}`

  useEffect(() => {
    if (status?.ok) formRef.current?.reset()
  }, [status])

  return (
    <form
      ref={formRef}
      // Aktion per onSubmit statt action-Prop: React 19 leert Formulare mit
      // action-Prop nach jedem Absenden – bei einem Fehler wäre der Text weg.
      onSubmit={(e) => {
        e.preventDefault()
        const daten = new FormData(e.currentTarget)
        startTransition(() => action(daten))
      }}
      className="space-y-3"
    >
      <input type="hidden" name="projekt" value={projektSlug} />
      <input type="hidden" name="variant_id" value={varianteId} />
      <label htmlFor={feldId} className="block font-medium text-dark">
        Ihr Kommentar zu dieser Variante
      </label>
      <textarea
        id={feldId}
        name="body"
        rows={4}
        maxLength={5000}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={wirdGesendet}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {wirdGesendet ? 'Wird gesendet …' : 'Kommentar senden'}
        </button>
        {status && (
          <p role="status" className={status.ok ? 'text-umwelt-700' : 'text-red-600'}>
            {status.meldung}
          </p>
        )}
      </div>
    </form>
  )
}
