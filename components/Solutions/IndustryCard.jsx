"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function IndustryCard({ title, desc, icon }) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} className="bg-white/5 border border-white/5 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">{icon || '🏭'}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-300 mt-1">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}
