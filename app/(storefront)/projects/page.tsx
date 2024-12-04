import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { roofingProjects } from '@/app/assets/assets'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProjectShowcase() {
    return (
        <div className="min-h-screen bg-white py-12">
            <main className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Våra Takprojekt</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {roofingProjects.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {project.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <Image
                                                src={image}
                                                alt={`${project.title} - Bild ${index + 1}`}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="ml-16"/>
                                <CarouselNext className="mr-16" />
                            </Carousel>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h2>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="text-sm text-gray-500">
                                    <p className="mb-1"><span className="font-semibold">Färdigställt:</span> {project.completionDate}</p>
                                    <p className="mb-1"><span className="font-semibold">Kund:</span> {project.clientName}</p>
                                    <p><span className="font-semibold">Plats:</span> {project.location}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

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
