'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FilterSection from '@/components/FilterSection'
import ProjectsSection from '@/components/ProjectsSection'
import Footer from '@/components/Footer'
import { sampleProjects } from '@/data/projects'
import { FilterCategory } from '@/components/FilterSection'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('alle')

  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter)
  }

  return (
    <>
      <Header />
      <Hero />
      <FilterSection onFilterChange={handleFilterChange} />
      <ProjectsSection 
        projects={sampleProjects} 
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <Footer />
    </>
  )
}