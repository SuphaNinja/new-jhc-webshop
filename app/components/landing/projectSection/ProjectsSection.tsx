"use client"

import React from 'react'
import { projects } from '@/app/assets/assets'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/app/assets/animationVariants'


export default function ProjectsSection() {
  return (
      <section className='bg-[#416A98] py-24'>
          <motion.div
              className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
              <h1 className='text-5xl text-center text-muted font-semibold tracking-tight mb-12'>Utvalda Projekt</h1>
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
    </section>
  )
}
