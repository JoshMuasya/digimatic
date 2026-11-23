import type { Metadata } from "next"
import Services from '@/components/Home/Services'
import Hero from '@/components/Services/Hero'
import React from 'react'

export const metadata: Metadata = {
    title: "Services",
    description: "Explore software development, websites, mobile apps, digital marketing, design and cybersecurity services.",
}

const page = () => {
  return (
    <div>
      <Hero />
      <Services />
    </div>
  )
}

export default page
