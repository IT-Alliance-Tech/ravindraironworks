import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ServiceCard({ title, shortDesc, details }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white/5 border border-white/5 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-gray-200">{shortDesc}</p>
        </div>
        <div className="ml-4 flex items-center">
          <button
            aria-expanded={open}
            aria-controls={`service-${title}`}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen((v) => !v) }}
            className="px-3 py-2 bg-white/10 rounded-md text-sm"
          >
            {open ? 'Hide' : 'More'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`service-${title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3 text-sm text-gray-300"
          >
            <div className="pt-2">
              {details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
