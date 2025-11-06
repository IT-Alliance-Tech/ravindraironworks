"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function GalleryGrid({ items = [] }) {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 })

  return (
    <div>
      <Swiper spaceBetween={12} slidesPerView={1.2} breakpoints={{640:{slidesPerView:2},1024:{slidesPerView:3}}}>
        {items.map((it, i) => (
          <SwiperSlide key={i}>
            <motion.div whileHover={{ scale: 1.02 }} onClick={() => setLightbox({ open: true, idx: i })} className="cursor-pointer rounded-lg overflow-hidden">
              <img src={it.src} alt={it.alt || `gallery-${i}`} className="w-full h-48 object-cover" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {lightbox.open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.img initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }} src={items[lightbox.idx].src} alt={items[lightbox.idx].alt} className="max-w-full max-h-full rounded-lg" />
            <button aria-label="close lightbox" onClick={() => setLightbox({ open: false, idx: 0 })} className="absolute top-6 right-6 text-white bg-black/40 rounded-full p-2">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
