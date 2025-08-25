'use client'

import { useState } from 'react'
import Image from 'next/image'
import ContentSection from './ContentSection'

export type FilterCategory = 'alle' | 'menschen' | 'frieden' | 'umwelt' | 'zusammenarbeit' | 'zukunft'

interface FilterSectionProps {
  onFilterChange?: (filter: FilterCategory) => void
}

const categories = [
  {
    id: 'alle' as FilterCategory,
    label: 'Alle Themen',
    icon: null,
    bgColor: 'bg-secondary-600',
    bgHover: 'bg-secondary-700',
    textColor: 'text-light'
  },
  {
    id: 'menschen' as FilterCategory,
    label: 'Menschen',
    icon: '/images/categories/menschen.png',
    bgColor: 'bg-menschen-600',
    bgHover: 'bg-menschen-700',
    textColor: 'text-light'
  },
  {
    id: 'frieden' as FilterCategory,
    label: 'Frieden',
    icon: '/images/categories/frieden.png',
    bgColor: 'bg-frieden-600',
    bgHover: 'bg-frieden-700',
    textColor: 'text-light'
  },
  {
    id: 'umwelt' as FilterCategory,
    label: 'Umwelt',
    icon: '/images/categories/umwelt.png',
    bgColor: 'bg-umwelt-600',
    bgHover: 'bg-umwelt-700',
    textColor: 'text-light'
  },
  {
    id: 'zusammenarbeit' as FilterCategory,
    label: 'Zusammenarbeit',
    icon: '/images/categories/zusammenarbeite.png',
    bgColor: 'bg-zusammenarbeit-600',
    bgHover: 'bg-zusammenarbeit-700',
    textColor: 'text-light'
  },
  {
    id: 'zukunft' as FilterCategory,
    label: 'Zukunft',
    icon: '/images/categories/zulunft.png',
    bgColor: 'bg-zukunft-600',
    bgHover: 'bg-zukunft-700',
    textColor: 'text-light'
  }
]

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
        <h2 className="text-h2 lg:text-h1-lg font-bold text-dark mb-6">
          Entdecke innovative Projekte
        </h2>
        <p className="text-p lg:text-h5-lg text-secondary max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
        </p>
      </div>

      <div className="mb-16">
        <h3 className="text-h4 lg:text-h3-lg font-semibold text-dark mb-6 text-center">
          Filter nach Themen
        </h3>
        
        {/* Mobile: Horizontal Scrollable */}
        <div className="lg:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterClick(category.id)}
                className={`
                  flex flex-col items-center justify-center px-4 py-3 rounded-lg min-w-[100px] h-20
                  transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-focus
                  ${activeFilter === category.id 
                    ? `${category.bgColor} shadow-lg scale-105` 
                    : `bg-light-100 hover:${category.bgHover} hover:text-light`
                  }
                  ${activeFilter === category.id ? category.textColor : 'text-dark hover:text-light'}
                `}
              >
                {category.icon && (
                  <Image
                    src={category.icon}
                    alt={category.label}
                    width={24}
                    height={24}
                    className={`mb-1 transition-all duration-300 ${
                      activeFilter === category.id ? 'brightness-0 invert' : 'opacity-70'
                    }`}
                  />
                )}
                <span className="text-xs font-medium text-center leading-tight">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Evenly Distributed */}
        <div className="hidden lg:grid lg:grid-cols-6 lg:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`
                flex flex-col items-center justify-center px-6 py-4 rounded-lg h-24
                transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-focus
                ${activeFilter === category.id 
                  ? `${category.bgColor} shadow-lg scale-105` 
                  : `bg-light-100 hover:${category.bgHover} hover:text-light`
                }
                ${activeFilter === category.id ? category.textColor : 'text-dark hover:text-light'}
              `}
            >
              {category.icon && (
                <Image
                  src={category.icon}
                  alt={category.label}
                  width={32}
                  height={32}
                  className={`mb-2 transition-all duration-300 ${
                    activeFilter === category.id ? 'brightness-0 invert' : 'opacity-70'
                  }`}
                />
              )}
              <span className="text-sm font-medium text-center">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </ContentSection>
  )
}

export { type FilterCategory }