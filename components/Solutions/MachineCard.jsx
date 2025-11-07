"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function MachineCard({ name, spec, img }) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} className="bg-white/5 border border-white/5 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-800 rounded-md flex items-center justify-center overflow-hidden">
          {img ? <img src={img} alt={name} className="object-cover w-full h-full" /> : <div className="text-sm text-gray-400">Image</div>}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-300 mt-1">{spec}</p>
        </div>
      </div>
    </motion.div>
  )
}
