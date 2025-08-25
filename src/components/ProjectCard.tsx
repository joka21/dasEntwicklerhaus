import Image from 'next/image'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

const categoryColors = {
  menschen: 'bg-menschen',
  frieden: 'bg-frieden',
  umwelt: 'bg-umwelt',
  zusammenarbeit: 'bg-zusammenarbeit',
  zukunft: 'bg-zukunft'
}

const categoryIcons = {
  menschen: '/images/categories/menschen.png',
  frieden: '/images/categories/frieden.png',
  umwelt: '/images/categories/umwelt.png',
  zusammenarbeit: '/images/categories/zusammenarbeite.png',
  zukunft: '/images/categories/zulunft.png'
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Hero Image - 50-60% of card height */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} Hero Bild`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content Area - 40-50% of card height */}
      <div className={`relative p-6 ${categoryColors[project.category]} min-h-[200px]`}>
        {/* Category Icon - positioned over content area */}
        <div className="absolute -top-6 left-4 bg-white rounded-full p-2 shadow-md">
          <Image
            src={categoryIcons[project.category]}
            alt={`${project.category} Icon`}
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
        
        {/* Content */}
        <div className="pt-4">
          {/* Project Name */}
          <h3 className="text-xl lg:text-2xl font-bold text-dark mb-2 group-hover:text-dark-800 transition-colors">
            {project.name}
          </h3>
          
          {/* City with Pin Icon */}
          <div className="flex items-center mb-3 text-dark opacity-80">
            <svg 
              className="w-4 h-4 mr-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{project.city}</span>
          </div>
          
          {/* Description - 100 characters */}
          <p className="text-dark text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
          
          {/* More Info Button */}
          <button className="bg-dark text-white px-4 py-2 rounded-md hover:bg-dark-800 transition-colors duration-200 flex items-center text-sm font-medium group">
            Mehr erfahren
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}