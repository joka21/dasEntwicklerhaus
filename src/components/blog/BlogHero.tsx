export default function BlogHero() {
  return (
    <section className="bg-gradient-to-br from-zukunft-50 to-primary-50 py-16 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6">
            Was ich gelernt hab
          </h1>
          <p className="text-xl text-secondary leading-relaxed mb-8">
            Gedanken zu Startups, KI und was wirklich zählt. Keine Theorie – nur das, was ich selbst erlebt hab.
          </p>

          {/* Statistiken */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-3xl font-bold text-zukunft mb-1">8</div>
              <div className="text-sm text-secondary">Artikel</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-3xl font-bold text-umwelt mb-1">3</div>
              <div className="text-sm text-secondary">Themen</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-3xl font-bold text-menschen mb-1">103</div>
              <div className="text-sm text-secondary">Min. Lesezeit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
