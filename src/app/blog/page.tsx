'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogHero from '@/components/blog/BlogHero'
import BlogFilter from '@/components/blog/BlogFilter'
import BlogCard from '@/components/blog/BlogCard'
import { blogPosts } from '@/data/blog'
import { BlogCategory } from '@/types/blog'

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<BlogCategory>('alle')

  const filteredPosts = activeFilter === 'alle'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter)

  // Sortiere nach Datum (neueste zuerst)
  const sortedPosts = [...filteredPosts].sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )

  // Featured Posts
  const featuredPosts = sortedPosts.filter(post => post.featured)
  const regularPosts = sortedPosts.filter(post => !post.featured)

  return (
    <>
      <Header />
      <div className="sr-only">
        <h1>Blog - Das Entwicklerhaus</h1>
      </div>

      <BlogHero />

      <main id="main-content" className="bg-light py-12">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
          {/* Filter */}
          <BlogFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Featured Posts */}
          {featuredPosts.length > 0 && activeFilter === 'alle' && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-6">Empfohlene Artikel</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 && (
            <section>
              {featuredPosts.length > 0 && activeFilter === 'alle' && (
                <h2 className="text-2xl font-bold text-dark mb-6">Alle Artikel</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Keine Ergebnisse */}
          {sortedPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-secondary">
                Keine Artikel in dieser Kategorie gefunden.
              </p>
            </div>
          )}

          {/* Call-to-Action */}
          <div className="mt-16 bg-gradient-to-r from-primary to-zukunft rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Bleib auf dem Laufenden
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Neue Artikel zu Startups, KI und Nachhaltigkeit direkt in dein Postfach.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-light-100 transition-colors"
            >
              Newsletter abonnieren
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
