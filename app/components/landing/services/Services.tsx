import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Hammer, House, PaintBucket, Snowflake, Sun, Wrench } from 'lucide-react'

const services = [
    {
        icon: <House className="h-6 w-6" />,
        title: "Takläggning",
        description: "Professionell takläggning för både bostäder och kommersiella fastigheter."
    },
    {
        icon: <Snowflake className="h-6 w-6" />,
        title: "Snöskottning",
        description: "Högkvalitativ målning för både interiör och exteriör."
    },
    {
        icon: <Sun className="h-6 w-6" />,
        title: "Solpaneler",
        description: "Omfattande renoveringstjänster för att modernisera och förbättra din fastighet."
    }
]

export default function Services() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="md:text-3xl text-2xl font-bold mb-4">Våra Tjänster</h2>
                    <p className="md:text-xl text-lg font-medium max-w-2xl mx-auto">
                        Vi erbjuder ett brett utbud av högkvalitativa takläggningstjänster för att möta alla dina behov.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {services.map((service, index) => (
                        <Card key={index} className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button asChild size="lg">
                        <Link href="/tjanster" className="inline-flex items-center">
                            Se alla våra tjänster
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

