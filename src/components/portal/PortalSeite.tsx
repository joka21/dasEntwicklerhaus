import ContentSection from '@/components/ContentSection'

interface PortalSeiteProps {
  title: React.ReactNode
  children: React.ReactNode
}

/** Seitenrahmen für Login und Kundenportal: Hintergrund, Hauptbereich und einzige H1. */
export default function PortalSeite({ title, children }: PortalSeiteProps) {
  return (
    <ContentSection>
      <main id="main-content" className="max-w-5xl mx-auto">
        <h1 className="text-h2 lg:text-h2-lg font-bold text-umwelt-800 mb-8">{title}</h1>
        <div className="space-y-12">{children}</div>
      </main>
    </ContentSection>
  )
}
