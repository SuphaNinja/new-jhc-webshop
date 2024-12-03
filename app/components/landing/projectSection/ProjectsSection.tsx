"use client"

import React from 'react'
import { projects } from '@/app/assets/assets'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/app/assets/animationVariants'


export default function ProjectsSection() {
  return (
    <motion.div 
        className='py-12'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
        <h1 className='text-4xl text-center font-semibold tracking-tight mb-12'>Våra projekt</h1>
        <div className='space-y-24'>
            {projects.map((project) => (
                <motion.div 
                    variants={itemVariants}	                
                    key={project.id}
                >
                    <ProjectCard project={project} />
                </motion.div>
                
            ))}
        </div>
    </motion.div>
  )
}
