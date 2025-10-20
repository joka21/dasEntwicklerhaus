import Link from 'next/link'
import { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ki':
      return 'bg-zukunft text-white'
    case 'nachhaltigkeit':
      return 'bg-umwelt text-white'
    case 'startups':
      return 'bg-menschen text-black'
    default:
      return 'bg-secondary text-black'
  }
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'ki':
      return 'KI & Technologie'
    case 'nachhaltigkeit':
      return 'Nachhaltigkeit'
    case 'startups':
      return 'Startups & Gründung'
    default:
      return category
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Bild */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
              {getCategoryLabel(post.category)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Metadaten */}
          <div className="flex items-center text-sm text-secondary mb-3">
            <time dateTime={post.publishedDate}>
              {new Date(post.publishedDate).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.readTime} Min. Lesezeit</span>
          </div>

          {/* Titel */}
          <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-secondary mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Autor */}
          <div className="flex items-center pt-4 border-t border-secondary-200">
            <div className="flex-1">
              <p className="text-sm font-medium text-dark">{post.author.name}</p>
              <p className="text-xs text-secondary">{post.author.role}</p>
            </div>
            <div className="text-primary group-hover:translate-x-2 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
