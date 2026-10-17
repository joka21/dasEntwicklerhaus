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
      <BlogHero
        artikel={blogPosts.length}
        themen={new Set(blogPosts.map(post => post.category)).size}
        lesezeit={blogPosts.reduce((summe, post) => summe + post.readTime, 0)}
      />

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

        </div>
      </main>

      <Footer />
    </>
  )
}
