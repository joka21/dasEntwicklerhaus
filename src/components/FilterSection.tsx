'use client'

import { useState } from 'react'
import ContentSection from './ContentSection'

export type FilterCategory = 'alle' | 'menschen' | 'frieden' | 'umwelt' | 'zusammenarbeit' | 'zukunft'

interface FilterSectionProps {
  onFilterChange?: (filter: FilterCategory) => void
}

export default function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('alle')

  const handleFilterClick = (filter: FilterCategory) => {
    setActiveFilter(filter)
    if (onFilterChange) {
      onFilterChange(filter)
    }
  }

  return (
    <ContentSection>
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-umwelt-800 mb-6">
          Die größte Superkraft von uns Menschen sind unsere Ideen
        </h2>
        <p className="text-base lg:text-lg text-secondary max-w-3xl mx-auto">
         Deshalb präsentieren wir Ideen – gute Ideen, kluge Ideen aus ganz Deutschland und Europa. Ideen von Menschen, die sich auf den Weg gemacht haben, unser Leben ein wenig besser zu gestalten. 

Hier sind einige Beispielprojekte, um unseren Weg zu verdeutlichen:
        </p>
      </div>

      <div className="mb-16">
        <h3 className="text-xl lg:text-2xl font-semibold text-umwelt-800 mb-6 text-center">
          Filter nach Themen
        </h3>
        
        <div className="flex flex-wrap gap-6 justify-center items-center">
          <button
            onClick={() => handleFilterClick('alle')}
            className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === 'alle' 
                ? 'shadow-lg scale-105' 
                : 'hover:opacity-75'
            }`}
            aria-label="Alle Themen anzeigen"
            title="Alle Themen"
          >
            <img 
              src="/images/categories/all.png" 
              alt="Alle Themen Icon" 
              className="w-12 h-12"
            />
          </button>
          
          <button
            onClick={() => handleFilterClick('menschen')}
            className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === 'menschen' 
                ? 'shadow-lg scale-105' 
                : 'hover:opacity-75'
            }`}
            aria-label="Menschen-Projekte anzeigen"
            title="Menschen"
          >
            <img 
              src="/images/categories/menschen.png" 
              alt="Menschen Icon" 
              className="w-12 h-12"
            />
          </button>
          
          <button
            onClick={() => handleFilterClick('frieden')}
            className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === 'frieden' 
                ? 'shadow-lg scale-105' 
                : 'hover:opacity-75'
            }`}
            aria-label="Frieden-Projekte anzeigen"
            title="Frieden"
          >
            <img 
              src="/images/categories/frieden.png" 
              alt="Frieden Icon" 
              className="w-12 h-12"
            />
          </button>
          
          <button
            onClick={() => handleFilterClick('umwelt')}
            className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === 'umwelt' 
                ? 'shadow-lg scale-105' 
                : 'hover:opacity-75'
            }`}
            aria-label="Umwelt-Projekte anzeigen"
            title="Umwelt"
          >
            <img 
              src="/images/categories/umwelt.png" 
              alt="Umwelt Icon" 
              className="w-12 h-12"
            />
          </button>
          
          <button
            onClick={() => handleFilterClick('zusammenarbeit')}
            className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === 'zusammenarbeit' 
                ? 'shadow-lg scale-105' 
                : 'hover:opacity-75'
            }`}
            aria-label="Zusammenarbeit-Projekte anzeigen"
            title="Zusammenarbeit"
          >
            <img 
              src="/images/categories/zusammenarbeite.png" 
              alt="Zusammenarbeit Icon" 
              className="w-12 h-12"
            />
          </button>
          
          <button
            onClick={() => handleFilterClick('zukunft')}
            className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === 'zukunft' 
                ? 'shadow-lg scale-105' 
                : 'hover:opacity-75'
            }`}
            aria-label="Zukunft-Projekte anzeigen"
            title="Zukunft"
          >
            <img 
              src="/images/categories/zulunft.png" 
              alt="Zukunft Icon" 
              className="w-12 h-12"
            />
          </button>
        </div>
      </div>
    </ContentSection>
  )
}

