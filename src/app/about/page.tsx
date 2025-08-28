import Hero from '@/components/About/Hero'
import Story from '@/components/About/Story'
import Values from '@/components/About/Values'
import CTA from '@/components/CTA'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Values />
      <Story />
      <CTA />
    </div>
  )
}

export default page
