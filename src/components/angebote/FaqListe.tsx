import type { Faq } from '@/types/angebote'

// Natives <details>: aufklappbar ohne JavaScript, per Tastatur bedienbar.
export default function FaqListe({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-secondary-300 rounded-lg border border-secondary-300 bg-light">
      {faqs.map((f) => (
        <details key={f.frage} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded [&::-webkit-details-marker]:hidden">
            <h3 className="text-h6 font-bold lg:text-h6-lg">{f.frage}</h3>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="mt-1 h-5 w-5 flex-none transition-transform group-open:rotate-180"
            >
              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </summary>
          <p className="mt-3 leading-relaxed">{f.antwort}</p>
        </details>
      ))}
    </div>
  )
}
