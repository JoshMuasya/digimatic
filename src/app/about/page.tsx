import type { Metadata } from "next"
import Hero from '@/components/About/Hero'
import Story from '@/components/About/Story'
import Values from '@/components/About/Values'
import CTA from '@/components/CTA'
import React from 'react'

export const metadata: Metadata = {
    title: "About",
    description: "Meet Digimatic Marketers, a Kenyan digital solutions company.",
}

const page = () => {
  return (
    <>
      <Hero />
      <div className="site-container space-y-6 pt-14 sm:pt-20">
        <div className="about-story">
          <Story />
        </div>
        <Values />
      </div>
      <CTA />
    </>
  )
}

export default page
