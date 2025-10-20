'use client'

import { BlogCategory } from '@/types/blog'

interface BlogFilterProps {
  activeFilter: BlogCategory
  onFilterChange: (filter: BlogCategory) => void
}

const categories: { value: BlogCategory; label: string; color: string }[] = [
  { value: 'alle', label: 'Alle Artikel', color: 'hover:bg-primary hover:text-white' },
  { value: 'ki', label: 'KI & Technologie', color: 'hover:bg-zukunft hover:text-white' },
  { value: 'nachhaltigkeit', label: 'Nachhaltigkeit', color: 'hover:bg-umwelt hover:text-white' },
  { value: 'startups', label: 'Startups', color: 'hover:bg-menschen hover:text-black' },
]

export default function BlogFilter({ activeFilter, onFilterChange }: BlogFilterProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const isActive = activeFilter === category.value

          let activeColorClass = ''
          if (isActive) {
            switch (category.value) {
              case 'ki':
                activeColorClass = 'bg-zukunft text-white'
                break
              case 'nachhaltigkeit':
                activeColorClass = 'bg-umwelt text-white'
                break
              case 'startups':
                activeColorClass = 'bg-menschen text-black'
                break
              default:
                activeColorClass = 'bg-primary text-white'
            }
          }

          return (
            <button
              key={category.value}
              onClick={() => onFilterChange(category.value)}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-200
                ${isActive
                  ? activeColorClass
                  : `bg-secondary-100 text-dark ${category.color}`
                }
              `}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
