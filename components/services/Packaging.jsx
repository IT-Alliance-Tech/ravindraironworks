"use client"
import React, { useState } from 'react'
import MotionSection from '../shared/MotionSection'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ServiceCardWrapper from '../ServiceCardWrapper'
import CountUp from 'react-countup'
import useIntersection from '../../lib/useIntersection'

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false, loading: () => null })

export default function Packaging() {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useIntersection({ threshold: 0.2 })

  return (
    <MotionSection className="py-8">
      <section id="packaging" aria-labelledby="packaging-title" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ServiceCardWrapper title="Packaging & Logistics" shortDesc="Protective packing and coordinated logistics" details={"Packaging & Logistics"} />
        </div>

        <div>
          <h2 id="packaging-title" className="text-xl font-semibold">Packaging & Logistics</h2>
          <p className="mt-3 text-gray-400">Packing solutions designed to protect metal parts during transit and storage, with customs-ready documentation and consolidation services.</p>
          <p className="mt-2 text-gray-400">We work with trusted carriers to provide timely, trackable shipments.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded">Custom packing</div>
            <div className="bg-white/5 p-3 rounded">Multi-modal carriers</div>
            <div className="bg-white/5 p-3 rounded">Export docs</div>
            <div className="bg-white/5 p-3 rounded">Consolidation</div>
          </div>

          <ul className="mt-4 list-disc pl-5 text-gray-300">
            <li>Protective materials</li>
            <li>Labelling & documentation</li>
            <li>Freight consolidation</li>
            <li>Tracking & insurance options</li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <div className="w-36 h-24 relative rounded overflow-hidden bg-gray-800">
              <Image src="/images/About us.jpg" alt="Packaging" fill sizes="(max-width: 640px) 100vw, 360px" loading="lazy" />
            </div>
            <button aria-label="Request quote for Packaging" onClick={() => setOpen(true)} className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#DAA520' }}>
              Request a Quote
            </button>
          </div>

          <div ref={ref} className="mt-4">
            {inView && <CountUp end={9800} duration={2} />}
            <span className="ml-2 text-sm text-gray-400">packages per month (typical)</span>
          </div>

          {open && <ContactModal onClose={() => setOpen(false)} />}
        </div>
      </section>
    </MotionSection>
  )
}
