import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='mt-16 bg-gray-50 border-t border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>JHC Plåt & Bygg AB</h3>
            <p className='text-sm text-gray-600 mb-4'>Kvalitet och pålitlighet i varje projekt</p>
            <div className='flex space-x-4'>
              <Link href="https://facebook.com" className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Facebook</span>
                <Facebook size={20} />
              </Link>
              <Link href="https://instagram.com" className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Instagram</span>
                <Instagram size={20} />
              </Link>
              <Link href="https://linkedin.com" className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>LinkedIn</span>
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Kontakta oss</h3>
            <ul className='space-y-2'>
              <li className='flex items-center text-sm text-gray-600'>
                <Phone size={16} className='mr-2' />
                <span>Kundtjänst: 08-123 45 67</span>
              </li>
              <li className='flex items-center text-sm text-gray-600'>
                <Phone size={16} className='mr-2' />
                <span>Orderförfrågningar: 08-765 43 21</span>
              </li>
              <li className='flex items-center text-sm text-gray-600'>
                <Mail size={16} className='mr-2' />
                <a href="mailto:info@jhcplatochbygg.se" className='hover:underline'>info@jhcplatochbygg.se</a>
              </li>
              <li className='flex items-start text-sm text-gray-600'>
                <MapPin size={16} className='mr-2 mt-1' />
                <span>123 Byggvägen, 12345 Stockholm</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Snabblänkar</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link href="/about" className='text-gray-600 hover:underline'>Om oss</Link></li>
              <li><Link href="/services" className='text-gray-600 hover:underline'>Våra tjänster</Link></li>
              <li><Link href="/projekt" className='text-gray-600 hover:underline'>Tidigare projekt</Link></li>
              <li><Link href="/kontakt" className='text-gray-600 hover:underline'>Kontakta oss</Link></li>
            </ul>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-200'>
          <p className='text-sm text-gray-500 text-center'>&copy; {currentYear} JHC Plåt & Bygg AB. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  )
}