import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { companyInfo } from '@/app/assets/assets'
import Testimonials from '@/app/components/landing/testimonials/Testimonials'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-5xl font-bold text-center mb-12 text-primary">{companyInfo.name}</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-primary">Om Oss</h2>
        <Card className="bg-secondary/10">
          <CardContent className="p-6">
            <p className="text-lg mb-6 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="mb-4">
              <p className="text-xl font-semibold text-primary">Vår Mission:</p>
              <p className="text-lg italic">{companyInfo.mission}</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">Vår Vision:</p>
              <p className="text-lg italic">{companyInfo.vision}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-primary">Våra Värderingar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyInfo.values.map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">{value.title}</h3>
                <p>{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-primary">Våra Tjänster</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="list-disc list-inside space-y-2">
              {companyInfo.services.map((service, index) => (
                <li key={index} className="text-lg">{service}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-primary">Våra Prestationer</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="list-disc list-inside space-y-2">
              {companyInfo.achievements.map((achievement, index) => (
                <li key={index} className="text-lg">{achievement}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <Testimonials />
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-primary">Kontakta Oss</h2>
        <p className="text-lg mb-4">
          Redo att förbättra ditt tak eller har du frågor? Kontakta oss idag för en kostnadsfri konsultation!
        </p>
        <Button asChild>
          <Link href="/contact">Kontakta Oss</Link>
        </Button>
      </section>
    </div>
  )
}

