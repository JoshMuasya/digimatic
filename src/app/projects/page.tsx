import type { Metadata } from "next"
import Hero from '@/components/Projects/Hero'
import ProjectsSection from '@/components/ProjectsSection'
import React from 'react'

export const metadata: Metadata = {
    title: "Work",
    description: "Explore websites and digital products built by Digimatic Marketers.",
}

const page = () => {
  return (
    <div>
      <Hero />
      <ProjectsSection />
    </div>
  )
}

export default page
