import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import MotionSection from '../shared/MotionSection.jsx'

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false })

export default function Hero() {
  const [open, setOpen] = useState(false)

  return (
    <MotionSection as="section" id="home" className="relative hero-fallback overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative min-h-[480px] md:min-h-[640px] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Delivering Precision in Every Sheet Since 1978
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
              Your one-stop sheet metal service center partnered with TATA Steel â€” quality, capacity and on-time delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="#services" 
                className="inline-flex items-center px-6 py-3 bg-white text-charcoal rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Explore Services
              </a>
              <button 
                onClick={() => setOpen(true)}
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && <ContactModal onClose={() => setOpen(false)} />}
    </MotionSection>
  )
}
