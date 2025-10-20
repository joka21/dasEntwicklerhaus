import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import { BlogPost } from '@/types/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContentSection from '@/components/ContentSection'
import ReactMarkdown from 'react-markdown'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Artikel nicht gefunden',
    }
  }

  const baseUrl = 'https://dasentwicklerhaus.de'

  return {
    title: `${post.title} - Das Entwicklerhaus Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: 'Das Entwicklerhaus',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'de_DE',
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      creator: '@entwicklerhaus',
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ki':
      return 'bg-zukunft'
    case 'nachhaltigkeit':
      return 'bg-umwelt'
    case 'startups':
      return 'bg-menschen'
    default:
      return 'bg-secondary'
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

function getRelatedPosts(currentPost: BlogPost) {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, 3)
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-zukunft-50 py-12 lg:py-16">
        <ContentSection>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-secondary">
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <span className="mx-2">›</span>
                </li>
                <li>
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {getCategoryLabel(post.category)}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Titel */}
            <h1 className="text-3xl lg:text-5xl font-bold text-dark mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-secondary leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Metadaten */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Autor */}
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-dark">{post.author.name}</p>
                  <p className="text-sm text-secondary">{post.author.role}</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-12 bg-secondary-300" />

              {/* Datum & Lesezeit */}
              <div>
                <p className="text-sm text-secondary">
                  <time dateTime={post.publishedDate}>
                    {new Date(post.publishedDate).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </p>
                <p className="text-sm text-secondary">{post.readTime} Min. Lesezeit</p>
              </div>
            </div>
          </div>
        </ContentSection>
      </div>

      {/* Main Content */}
      <ContentSection>
        <article className="max-w-4xl mx-auto py-12">
          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-dark mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-dark mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-dark mt-6 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="text-dark leading-relaxed mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-dark" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-dark" {...props} />,
                code: ({node, ...props}) => <code className="bg-secondary-100 px-2 py-1 rounded text-sm" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-secondary my-6" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-dark mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-secondary-100 text-dark rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Teilen */}
          <div className="border-t border-b border-secondary-200 py-8 mb-12">
            <h3 className="text-lg font-semibold text-dark mb-4">Artikel teilen</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://dasentwicklerhaus.de/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://dasentwicklerhaus.de/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-dark mb-6">Ähnliche Artikel</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(relatedPost.category)}`}>
                          {getCategoryLabel(relatedPost.category)}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-secondary line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <p className="text-sm text-secondary mt-3">
                        {relatedPost.readTime} Min. Lesezeit
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </ContentSection>

      <Footer />
    </>
  )
}
