"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function loading() {
  return (
      <div className="flex items-center justify-center h-screen">
          <motion.div
              className="w-16 h-16 border-4 border-blue-500 rounded-full"
              style={{
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
      </div>
  )
}
