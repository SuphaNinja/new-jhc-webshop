import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    content: "This company transformed our business. Their innovative solutions and dedicated team exceeded all our expectations.",
    author: "Emma Larsson",
    role: "CEO, TechStart AB",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    content: "I've never worked with a more professional and responsive team. They truly understand customer needs.",
    author: "Anders Svensson",
    role: "Marketing Director, GrowFast",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    content: "The quality of their work is outstanding. They delivered our project on time and within budget.",
    author: "Sofia Bergström",
    role: "Project Manager, BuildRight",
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Vad våra kunder säger</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white dark:bg-gray-800 shadow-lg">
              <CardContent className="p-6">
                <QuoteIcon className="w-10 h-10  mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

