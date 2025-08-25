'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { Project } from '@/types/project'
import { FilterCategory } from './FilterSection'

interface ProjectsGridProps {
  projects: Project[]
  initialFilter?: FilterCategory
}

export default function ProjectsGrid({ projects, initialFilter = 'alle' }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(initialFilter)

  const filteredProjects = activeFilter === 'alle' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="w-full">
      {/* Projects Count */}
      <div className="mb-8 text-center">
        <p className="text-secondary">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'Projekt gefunden' : 'Projekte gefunden'}
          {activeFilter !== 'alle' && (
            <span className="ml-2 text-dark font-medium">
              in Kategorie: {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </span>
          )}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
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
    </div>
  )
}

export { type FilterCategory }