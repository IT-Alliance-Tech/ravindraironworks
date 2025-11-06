"use client"
import React, { useState } from 'react'
import MotionSection from '../shared/MotionSection'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ServiceCardWrapper from '../ServiceCardWrapper'
import CountUp from 'react-countup'
import useIntersection from '../../lib/useIntersection'

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false, loading: () => null })

export default function Blanking() {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useIntersection({ threshold: 0.2 })

  return (
    <MotionSection className="py-8">
      <section id="blanking" aria-labelledby="blanking-title" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ServiceCardWrapper title="Blanking" shortDesc="High-speed blanking and part preparation" details={"Blanking operations"} />
        </div>

        <div>
          <h2 id="blanking-title" className="text-xl font-semibold">Blanking</h2>
          <p className="mt-3 text-gray-400">Blanking operations supply high-volume, repeatable flat blanks for stamping and assembly. Tooling options support close-tolerance formats.</p>
          <p className="mt-2 text-gray-400">We support progressive and transfer blanking workflows along with inspection and kitting.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded">High-speed turret & die presses</div>
            <div className="bg-white/5 p-3 rounded">Precision tooling</div>
            <div className="bg-white/5 p-3 rounded">Inspection & QA</div>
            <div className="bg-white/5 p-3 rounded">Kitting available</div>
          </div>

          <ul className="mt-4 list-disc pl-5 text-gray-300">
            <li>Short lead-times</li>
            <li>Tool room support</li>
            <li>Batch & continuous runs</li>
            <li>Assembly-ready blanks</li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <div className="w-36 h-24 relative rounded overflow-hidden bg-gray-800">
              <Image src="/images/Logo.jpg" alt="Blanking" fill sizes="(max-width: 640px) 100vw, 360px" loading="lazy" />
            </div>
            <button aria-label="Request quote for Blanking" onClick={() => setOpen(true)} className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#DAA520' }}>
              Request a Quote
            </button>
          </div>

          <div ref={ref} className="mt-4">
            {inView && <CountUp end={450000} duration={2} />}
            <span className="ml-2 text-sm text-gray-400">parts per month (peak capacity)</span>
          </div>

          {open && <ContactModal onClose={() => setOpen(false)} />}
        </div>
      </section>
    </MotionSection>
  )
}
