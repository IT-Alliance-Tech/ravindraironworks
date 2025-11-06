"use client"
import React, { useState } from 'react'
import MotionSection from '../shared/MotionSection'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ServiceCardWrapper from '../ServiceCardWrapper'
import CountUp from 'react-countup'
import useIntersection from '../../lib/useIntersection'

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false, loading: () => null })

export default function Logistics() {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useIntersection({ threshold: 0.2 })

  return (
    <MotionSection className="py-8">
      <section id="logistics" aria-labelledby="logistics-title" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ServiceCardWrapper title="Logistics" shortDesc="Coordinated transport and delivery solutions" details={"Logistics"} />
        </div>

        <div>
          <h2 id="logistics-title" className="text-xl font-semibold">Logistics</h2>
          <p className="mt-3 text-gray-400">We coordinate domestic and international transport with trusted carriers, offering consolidation and customs support.</p>
          <p className="mt-2 text-gray-400">Our logistics services ensure timely, traceable delivery with options for insurance and tracking.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded">Domestic & international</div>
            <div className="bg-white/5 p-3 rounded">Consolidation services</div>
            <div className="bg-white/5 p-3 rounded">Customs documentation</div>
            <div className="bg-white/5 p-3 rounded">Insurance options</div>
          </div>

          <ul className="mt-4 list-disc pl-5 text-gray-300">
            <li>Trackable shipments</li>
            <li>Partnered carriers</li>
            <li>Expedited options</li>
            <li>Consolidation & returns</li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <div className="w-36 h-24 relative rounded overflow-hidden bg-gray-800">
              <Image src="/images/Logo.jpg" alt="Logistics" fill sizes="(max-width: 640px) 100vw, 360px" loading="lazy" />
            </div>
            <button aria-label="Request quote for Logistics" onClick={() => setOpen(true)} className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#DAA520' }}>
              Request a Quote
            </button>
          </div>

          <div ref={ref} className="mt-4">
            {inView && <CountUp end={98} duration={2} />}
            <span className="ml-2 text-sm text-gray-400">% on-time deliveries (recent)</span>
          </div>

          {open && <ContactModal onClose={() => setOpen(false)} />}
        </div>
      </section>
    </MotionSection>
  )
}
