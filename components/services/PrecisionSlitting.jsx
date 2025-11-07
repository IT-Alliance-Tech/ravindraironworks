"use client"
import React, { useState } from 'react'
import MotionSection from '../shared/MotionSection'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ServiceCardWrapper from '../ServiceCardWrapper'
import CountUp from 'react-countup'
import useIntersection from '../../lib/useIntersection'

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false, loading: () => null })

export default function PrecisionSlitting() {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useIntersection({ threshold: 0.2 })

  return (
    <MotionSection className="py-8">
      <section id="precision-slitting" aria-labelledby="precision-slitting-title" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ServiceCardWrapper title="Precision Slitting" shortDesc="High-accuracy slitting for coil-to-slit-strip production" details={"Precision slitting"} />
        </div>

        <div>
          <h2 id="precision-slitting-title" className="text-xl font-semibold">Precision Slitting</h2>
          <p className="mt-3 text-gray-400">Our slitting lines convert wide coils into narrow strips with excellent edge condition and burr control — ready for forming and stamping.</p>
          <p className="mt-2 text-gray-400">We maintain consistent slit widths and quality for downstream processes.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded">Strip widths from 8mm</div>
            <div className="bg-white/5 p-3 rounded">Edge condition control</div>
            <div className="bg-white/5 p-3 rounded">Compatible: stainless, carbon, aluminum</div>
            <div className="bg-white/5 p-3 rounded">Deburring available</div>
          </div>

          <ul className="mt-4 list-disc pl-5 text-gray-300">
            <li>High repeatability</li>
            <li>Quick tool changes</li>
            <li>Quality assurance on slit edges</li>
            <li>Coil handling expertise</li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <div className="w-36 h-24 relative rounded overflow-hidden bg-gray-800">
              <Image src="/images/About us.jpg" alt="Precision slitting" fill sizes="(max-width: 640px) 100vw, 360px" loading="lazy" />
            </div>
            <button aria-label="Request quote for Precision Slitting" onClick={() => setOpen(true)} className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#DAA520' }}>
              Request a Quote
            </button>
          </div>

          <div ref={ref} className="mt-4">
            {inView && <CountUp end={3200} duration={2} />}
            <span className="ml-2 text-sm text-gray-400">meters slit per hour (max line)</span>
          </div>

          {open && <ContactModal onClose={() => setOpen(false)} />}
        </div>
      </section>
    </MotionSection>
  )
}
