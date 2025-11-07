"use client"
import React, { useState } from 'react'
import MotionSection from '../shared/MotionSection'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ServiceCardWrapper from '../ServiceCardWrapper'
import CountUp from 'react-countup'
import useIntersection from '../../lib/useIntersection'

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false, loading: () => null })

export default function Warehousing() {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useIntersection({ threshold: 0.2 })

  return (
    <MotionSection className="py-8">
      <section id="warehousing" aria-labelledby="warehousing-title" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ServiceCardWrapper title="Warehousing & Inventory" shortDesc="Secure material storage and vendor-managed inventory" details={"Warehousing"} />
        </div>

        <div>
          <h2 id="warehousing-title" className="text-xl font-semibold">Warehousing & Inventory</h2>
          <p className="mt-3 text-gray-400">We provide covered, secure warehousing for coils, sheets and finished assemblies. FIFO/LIFO options and inventory reporting are supported.</p>
          <p className="mt-2 text-gray-400">Kitting, barcoding and just-in-time dispatch to your production lines.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded">Covered storage</div>
            <div className="bg-white/5 p-3 rounded">Barcoded inventory</div>
            <div className="bg-white/5 p-3 rounded">Kitting services</div>
            <div className="bg-white/5 p-3 rounded">JIT dispatch</div>
          </div>

          <ul className="mt-4 list-disc pl-5 text-gray-300">
            <li>Inventory reporting</li>
            <li>Climate control options</li>
            <li>Secure handling</li>
            <li>Vendor-managed inventory</li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <div className="w-36 h-24 relative rounded overflow-hidden bg-gray-800">
              <Image src="/images/Why Choose Us.jpg" alt="Warehousing" fill sizes="(max-width: 640px) 100vw, 360px" loading="lazy" />
            </div>
            <button aria-label="Request quote for Warehousing" onClick={() => setOpen(true)} className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#DAA520' }}>
              Request a Quote
            </button>
          </div>

          <div ref={ref} className="mt-4">
            {inView && <CountUp end={12000} duration={2} />}
            <span className="ml-2 text-sm text-gray-400">square feet available (approx)</span>
          </div>

          {open && <ContactModal onClose={() => setOpen(false)} />}
        </div>
      </section>
    </MotionSection>
  )
}
