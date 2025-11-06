"use client"
import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function ServiceCardWrapper(props) {
  return (
    <motion.div variants={item} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -6, scale: 1.02 }} className="w-full">
      <ServiceCard {...props} />
    </motion.div>
  )
}
