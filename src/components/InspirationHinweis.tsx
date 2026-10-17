import { projekteSeite } from '@/data/projects'

// Klarstellung, dass vorgestellte Unternehmen keine Kundenprojekte sind.
export default function InspirationHinweis({ className = '' }: { className?: string }) {
  return (
    <p role="note" className={`max-w-3xl rounded-lg border-l-8 border-menschen bg-light p-4 leading-relaxed shadow-sm ${className}`}>
      {projekteSeite.inspirationHinweis}
    </p>
  )
}
