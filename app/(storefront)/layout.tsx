import React from 'react'
import { Navbar } from '../components/storefront/Navbar'
import { Footer } from '../components/storefront/Footer'
import { Hero } from '../components/landing/Hero'
import ScrollingCompanies from '../components/landing/marquee/ScrollingCompanies'

export default function StorefrontLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
        {children}
      <Footer/>
    </>
  )
}
