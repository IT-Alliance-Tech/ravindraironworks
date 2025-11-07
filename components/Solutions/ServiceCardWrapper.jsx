"use client"
import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../ServiceCard'

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function ServiceCardWrapper(props) {
  return (
    <motion.div variants={item} whileHover={{ y: -6, scale: 1.02 }} className="w-full">
      <ServiceCard {...props} />
    </motion.div>
  )
}
