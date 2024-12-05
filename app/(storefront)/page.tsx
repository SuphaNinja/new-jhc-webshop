import React, { Suspense } from 'react'
import { Hero } from '../components/landing/Hero'
import { FeaturedProducts } from '../components/storefront/FeaturedProducts'
import ScrollingCompanies from '../components/landing/marquee/ScrollingCompanies'
import ProjectsSection from '../components/landing/projectSection/ProjectsSection'
import FlippableCards from '../components/landing/flippable-cards/FlippableCards'
import Employees from '../components/landing/employees/Employees'
import Testimonials from '../components/landing/testimonials/Testimonials'
import Services from '../components/landing/services/Services'
import Container from '../components/Container'

export default function page() {
  return (
    <>
      <Hero />
      <ScrollingCompanies />
      <Container>
        <FlippableCards />
        <FeaturedProducts />
        <Services />
      </Container>
        <ProjectsSection />
      <Container>
        <Testimonials />
        <Employees />
      </Container>
    </>
  )
}
