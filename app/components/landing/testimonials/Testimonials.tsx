import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon } from 'lucide-react'
import { testimonials } from '@/app/assets/assets'

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
                  <div className="flex flex-col w-full">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <div className='flex w-full '>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      <p className='ml-auto text-sm text-gray-500'>5/5</p>
                    </div>
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

