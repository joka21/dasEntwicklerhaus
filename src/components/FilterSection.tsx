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
        <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-6">
          Entdecke innovative Projekte
        </h2>
        <p className="text-base lg:text-lg text-secondary max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
        </p>
      </div>

      <div className="mb-16">
        <h3 className="text-xl lg:text-2xl font-semibold text-dark mb-6 text-center">
          Filter nach Themen
        </h3>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleFilterClick('alle')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'alle' 
                ? 'bg-secondary text-white' 
                : 'bg-gray-200 text-dark hover:bg-gray-300'
            }`}
          >
            Alle Themen
          </button>
          
          <button
            onClick={() => handleFilterClick('menschen')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'menschen' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 text-dark hover:bg-red-100'
            }`}
          >
            Menschen
          </button>
          
          <button
            onClick={() => handleFilterClick('frieden')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'frieden' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-dark hover:bg-purple-100'
            }`}
          >
            Frieden
          </button>
          
          <button
            onClick={() => handleFilterClick('umwelt')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'umwelt' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-dark hover:bg-green-100'
            }`}
          >
            Umwelt
          </button>
          
          <button
            onClick={() => handleFilterClick('zusammenarbeit')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'zusammenarbeit' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-dark hover:bg-blue-100'
            }`}
          >
            Zusammenarbeit
          </button>
          
          <button
            onClick={() => handleFilterClick('zukunft')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeFilter === 'zukunft' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-200 text-dark hover:bg-orange-100'
            }`}
          >
            Zukunft
          </button>
        </div>
      </div>
    </ContentSection>
  )
}

