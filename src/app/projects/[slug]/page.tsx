import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sampleProjects } from '@/data/projects'
import { Project } from '@/types/project'
import ContentSection from '@/components/ContentSection'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return sampleProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = sampleProjects.find(p => p.slug === params.slug)
  
  if (!project) {
    return {
      title: 'Projekt nicht gefunden',
    }
  }

  return {
    title: `${project.name} - ${project.city} | dasEntwicklerhaus`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.image],
    },
  }
}

function getProjectNavigation(currentProject: Project) {
  const currentIndex = sampleProjects.findIndex(p => p.id === currentProject.id)
  const prevProject = currentIndex > 0 ? sampleProjects[currentIndex - 1] : null
  const nextProject = currentIndex < sampleProjects.length - 1 ? sampleProjects[currentIndex + 1] : null
  
  return { prevProject, nextProject }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getStatusColor(status: string) {
  switch (status) {
    case 'aktiv':
      return 'bg-green-500'
    case 'geplant':
      return 'bg-yellow-500'
    case 'abgeschlossen':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'menschen':
      return 'bg-yellow-400'
    case 'frieden':
      return 'bg-purple-400'
    case 'umwelt':
      return 'bg-green-400'
    case 'zusammenarbeit':
      return 'bg-blue-500'
    case 'zukunft':
      return 'bg-cyan-300'
    default:
      return 'bg-gray-400'
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = sampleProjects.find(p => p.slug === params.slug)
  
  if (!project) {
    notFound()
  }

  const { prevProject, nextProject } = getProjectNavigation(project)

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} Hero Bild`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-end">
          <ContentSection>
            <div className="text-white pb-12">
              {/* Category Badge */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${getCategoryColor(project.category)} mb-4`}>
                <img
                  src={`/images/categories/${
                    project.category === 'zusammenarbeit' ? 'zusammenarbeite' :
                    project.category === 'zukunft' ? 'zulunft' :
                    project.category
                  }.png`}
                  alt={`${project.category} Icon`}
                  className="w-5 h-5 mr-2"
                />
                <span className="text-black font-medium capitalize">
                  {project.category}
                </span>
              </div>

              {/* Project Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                {project.name}
              </h1>

              {/* Location */}
              <div className="flex items-center text-xl">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{project.city}</span>
              </div>
            </div>
          </ContentSection>
        </div>
      </div>

      {/* Main Content */}
      <ContentSection>
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zu allen Projekten
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Description */}
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-dark mb-6">
                Über das Projekt
              </h2>
              <p className="text-lg text-secondary leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-dark mb-4">
                Kontakt
              </h3>
              <div className="space-y-2">
                <p className="font-medium text-dark">{project.contact.name}</p>
                <p className="text-secondary">
                  <a href={`mailto:${project.contact.email}`} className="hover:text-primary transition-colors">
                    {project.contact.email}
                  </a>
                </p>
                {project.contact.phone && (
                  <p className="text-secondary">
                    <a href={`tel:${project.contact.phone}`} className="hover:text-primary transition-colors">
                      {project.contact.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Social Media */}
            {(project.socialMedia.website || project.socialMedia.facebook || project.socialMedia.instagram || project.socialMedia.twitter) && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-dark mb-4">
                  Links & Social Media
                </h3>
                <div className="flex flex-wrap gap-4">
                  {project.socialMedia.website && (
                    <a
                      href={project.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Website
                    </a>
                  )}
                  {project.socialMedia.facebook && (
                    <a
                      href={project.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Facebook
                    </a>
                  )}
                  {project.socialMedia.instagram && (
                    <a
                      href={project.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                  {project.socialMedia.twitter && (
                    <a
                      href={project.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-dark mb-4">
                Projekt-Info
              </h3>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-secondary">Status</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-secondary">Startdatum</dt>
                  <dd className="mt-1 text-dark">{formatDate(project.startDate)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-secondary">Team-Größe</dt>
                  <dd className="mt-1 text-dark">{project.teamSize} Personen</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-secondary">Kategorie</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-black ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </dd>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-dark mb-4">
                Weitere Projekte
              </h3>
              <div className="space-y-3">
                {prevProject && (
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    className="block p-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm text-secondary mb-1">← Vorheriges</div>
                    <div className="font-medium text-dark">{prevProject.name}</div>
                  </Link>
                )}
                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="block p-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm text-secondary mb-1">Nächstes →</div>
                    <div className="font-medium text-dark">{nextProject.name}</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  )
}