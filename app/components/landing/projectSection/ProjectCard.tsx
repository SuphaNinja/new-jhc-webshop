import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface iAppProps {
    id: number;
    adress: string;
    description: string;
    images: string[];
    title: string;
}

export default function ProjectCard({project}: {project: iAppProps}) {
  return (
      <div
          className={`flex flex-col lg:flex-row justify-between gap-16 items-center  lg:p-8 bg-background/50 rounded-2xl backdrop-blur-sm ${project.id % 2 === 0 ? "lg:flex-row-reverse" : ""
              }`}
      >
          <div className='w-full lg:w-3/5'>
              <Carousel className="w-full">
                  <CarouselContent className=''>
                      {project.images.map((image, index) => (
                          <CarouselItem key={index}>
                              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                                  <Image
                                      src={image}
                                      alt={`${project.title} - Image ${index + 1}`}
                                      fill
                                      className="object-cover"
                                      priority={index === 0}
                                  />
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
              </Carousel>
          </div>

          <div className='flex flex-col w-full lg:w-2/5 h-full'>
              <div className="space-y-4">
                  <h1 className='text-3xl font-bold tracking-tight'>{project.title}</h1>
                  <p className='text-muted-foreground font-medium'>{project.adress}</p>
                  <p className='text-md text-muted-foreground leading-relaxed line-clamp-6'>{project.description}</p>
              </div>
              <Button
                  className={`mt-8 w-full sm:w-auto hover:scale-105 ${project.id % 2 === 0 ? "sm:self-start" : "sm:self-end"}`}
                  size="lg"
              >
                  <Link href="/projects" className="flex items-center">
                      Läs mer
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
          </div>
      </div>
  )
}
