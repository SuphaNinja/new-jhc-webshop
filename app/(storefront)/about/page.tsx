import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { companyInfo } from '@/app/assets/assets'
import Testimonials from '@/app/components/landing/testimonials/Testimonials'
import { Award, Briefcase, Building, Eye, Target, Trophy } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">{companyInfo.name}</h1>

          <section className="mb-16">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Building className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-3xl font-semibold text-primary">Om Oss</h2>
                </div>
                <p className="text-lg mb-8 leading-relaxed text-gray-700">
                  {companyInfo.description}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Target className="w-6 h-6 text-primary mr-3" />
                      <p className="text-xl font-semibold text-primary">Vår Mission:</p>
                    </div>
                    <p className="text-lg italic text-gray-700">{companyInfo.mission}</p>
                  </div>
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Eye className="w-6 h-6 text-primary mr-3" />
                      <p className="text-xl font-semibold text-primary">Vår Vision:</p>
                    </div>
                    <p className="text-lg italic text-gray-700">{companyInfo.vision}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Award className="w-8 h-8 text-primary mr-4" />
              <h2 className="text-3xl font-semibold text-primary">Våra Värderingar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyInfo.values.map((value, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-primary">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Briefcase className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-3xl font-semibold text-primary">Våra Tjänster</h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyInfo.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-lg text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Trophy className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-3xl font-semibold text-primary">Våra Prestationer</h2>
                </div>
                <ul className="space-y-4">
                  {companyInfo.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-lg text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

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

