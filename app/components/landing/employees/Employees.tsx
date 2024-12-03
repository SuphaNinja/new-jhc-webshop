"use client"
import React from 'react'
import Image from 'next/image'
import { employees } from '@/app/assets/assets'
import { Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/app/assets/animationVariants'

export default function Employees() {
    return (
        <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} 
            className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Vårt Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                </div>
            </div>
        </motion.section>
    )
}

