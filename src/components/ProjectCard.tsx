import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Kein Bild verfügbar
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {project.category}
          </span>
          <span className="text-sm text-gray-500">{project.country}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 h-8 w-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">
              {project.author.displayName || project.author.email}
            </span>
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            Mehr erfahren →
          </Link>
        </div>
      </div>
    </div>
  )
}