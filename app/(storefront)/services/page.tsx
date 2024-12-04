import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { services } from '@/app/assets/assets'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">Våra tjänster</h1>

      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
        På JHC erbjuder vi ett omfattande utbud av takläggningstjänster för att möta alla dina behov.
        Från bostadstak till kommersiella fastigheter, nyinstallationer till akuta reparationer - vårt expertteam står redo att hjälpa dig.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => (
          <Card key={index} className="overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{service.description}</p>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm">{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-secondary/10 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">Behöver du professionell takläggning?</h2>
        <p className="text-xl mb-6">
          Vart team av professionella takläggare är redo att hjälpa dig.
          <br />
          Kontakta oss för en gratis konsultation och ge ditt tak ett nytt liv.
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-4">
          <Link href="/contact">Kontakta Oss</Link>
        </Button>
      </div>
    </div>
  )
}

