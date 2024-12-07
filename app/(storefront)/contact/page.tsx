import React from 'react'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import { employees } from '@/app/assets/assets'

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-center mb-12 text-primary">Kontakta Oss</h1>

            {/* <div className="grid gap-6 md:grid-cols-2">
                {employees.map((employee) => (
                    <div key={employee.id} className="flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-full">
                            <Image
                                src={employee.image}
                                alt={employee.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{employee.name}</h3>
                        <p className="text-muted-foreground mb-4">{employee.title}</p>
                        <div className="flex flex-col items-start space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{employee.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <a href={`mailto:${employee.email}`} className="text-primary hover:underline">
                                    {employee.email}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

            <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Vet du inte vem du ska ringa?</h2>
                <p className="text-lg">
                    Ring kontoret{" "}
                    <a href="tel:(123) 456-7800" className="text-primary hover:underline font-semibold">
                        (123) 456-7800
                    </a>
                </p>
            </div>
        </div>
    )
}

