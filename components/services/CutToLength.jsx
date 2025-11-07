"use client"
import React, { useState } from 'react'
import MotionSection from '../shared/MotionSection'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ServiceCardWrapper from '../ServiceCardWrapper'
import CountUp from 'react-countup'
import useIntersection from '../../lib/useIntersection'

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false, loading: () => null })

export default function CutToLength() {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useIntersection({ threshold: 0.2 })

  return (
    <MotionSection className="py-8" threshold={0.12}>
      <section id="cut-to-length" aria-labelledby="cut-to-length-title" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ServiceCardWrapper title="Cut to Length (CTL)" shortDesc="Accurate short-length cutting from coils to flat blanks" details={"Precision CTL line"} />
        </div>

        <div>
          <h2 id="cut-to-length-title" className="text-xl font-semibold">Cut to Length (CTL)</h2>
          <p className="mt-3 text-gray-400">Our Cut-to-Length line processes coils into precise flat sheets ready for downstream fabrication. We handle a wide range of thicknesses and materials with tight tolerance control.</p>
          <p className="mt-2 text-gray-400">Ideal for manufacturers needing precise sheet lengths with consistent edge quality and flatness.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded">Thickness range: 0.5mm – 12mm</div>
            <div className="bg-white/5 p-3 rounded">Max width: 1600mm</div>
            <div className="bg-white/5 p-3 rounded">Tolerance: ±0.1mm</div>
            <div className="bg-white/5 p-3 rounded">High flatness control</div>
          </div>

          <ul className="mt-4 list-disc pl-5 text-gray-300">
            <li>Fast throughput for large batches</li>
            <li>Precision edge quality</li>
            <li>Suitable for many alloys</li>
            <li>Kitting & dispatch available</li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <div className="w-36 h-24 relative rounded overflow-hidden bg-gray-800">
              <Image src="/images/Why Choose Us.jpg" alt="Cut to length image" fill sizes="(max-width: 640px) 100vw, 360px" loading="lazy" />
            </div>
            <button aria-label="Request quote for Cut to Length" onClick={() => setOpen(true)} className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#DAA520' }}>
              Request a Quote
            </button>
          </div>

          <div ref={ref} className="mt-4">
            {inView && <CountUp end={1250} duration={2} />}
            <span className="ml-2 text-sm text-gray-400">tons processed monthly (typical)</span>
          </div>

          {open && <ContactModal onClose={() => setOpen(false)} />}
        </div>
      </section>
    </MotionSection>
  )
}
