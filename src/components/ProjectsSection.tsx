'use client'

import { useState } from 'react'
import ContentSection from './ContentSection'
import ProjectsGrid from './ProjectsGrid'
import { Project } from '@/types/project'
import { FilterCategory } from './FilterSection'

interface ProjectsSectionProps {
  projects: Project[]
  activeFilter?: FilterCategory
  onFilterChange?: (filter: FilterCategory) => void
}

export default function ProjectsSection({ 
  projects, 
  activeFilter = 'alle',
  onFilterChange 
}: ProjectsSectionProps) {
  const [currentFilter, setCurrentFilter] = useState<FilterCategory>(activeFilter)

  const handleFilterChange = (filter: FilterCategory) => {
    setCurrentFilter(filter)
    if (onFilterChange) {
      onFilterChange(filter)
    }
  }

  const filteredProjects = currentFilter === 'alle' 
    ? projects 
    : projects.filter(project => project.category === currentFilter)

  return (
    <ContentSection>
      {/* Projects Count */}
      <div className="mb-8 text-center">
        <p className="text-secondary">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'Projekt gefunden' : 'Projekte gefunden'}
          {currentFilter !== 'alle' && (
            <span className="ml-2 text-dark font-medium">
              in Kategorie: {currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)}
            </span>
          )}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              {/* Hero Image - 50-60% of card height */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.name} Hero Bild`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content Area - 40-50% with category color */}
              <div className={`relative p-6 min-h-[200px] ${
                project.category === 'menschen' ? 'bg-yellow-400' :
                project.category === 'frieden' ? 'bg-purple-400' :
                project.category === 'umwelt' ? 'bg-green-400' :
                project.category === 'zusammenarbeit' ? 'bg-blue-500' :
                'bg-cyan-300'
              }`}>
                {/* Category Icon */}
                <div className="absolute -top-6 left-4 bg-white rounded-full p-2 shadow-md">
                  <img
                    src={`/images/categories/${
                      project.category === 'zusammenarbeit' ? 'zusammenarbeite' :
                      project.category === 'zukunft' ? 'zulunft' :
                      project.category
                    }.png`}
                    alt={`${project.category} Icon`}
                    className="w-6 h-6"
                  />
                </div>
                
                {/* Content */}
                <div className="pt-4">
                  {/* Project Name */}
                  <h3 className="text-xl lg:text-2xl font-bold text-black mb-2">
                    {project.name}
                  </h3>
                  
                  {/* City with Pin Icon */}
                  <div className="flex items-center mb-3 text-black opacity-80">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{project.city}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-black text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* More Info Button */}
                  <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center text-sm font-medium">
                    Mehr erfahren
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-dark mb-2">
            Keine Projekte gefunden
          </h3>
          <p className="text-secondary">
            Für die gewählte Kategorie sind derzeit keine Projekte verfügbar.
          </p>
        </div>
      )}
    </ContentSection>
  )
}