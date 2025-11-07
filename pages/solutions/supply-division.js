// Generated per client doc — replace placeholder images/text as needed.
import React, { useEffect } from 'react'
import Image from 'next/image'
import MotionSection from '../../components/shared/MotionSection.jsx'
import CountUpFallback from '../../components/shared/CountUpFallback.jsx'
import { useRouter } from 'next/router'
import Header from '../../components/shared/Header.jsx'
import Footer from '../../components/shared/Footer.jsx'

const materials = [
  { id: 'HR', label: 'Hot Rolled (HR)', monthly: '5,000 MT' },
  { id: 'HRPO', label: 'HRPO', monthly: '2,000 MT' },
  { id: 'CRCA', label: 'CRCA', monthly: '1,200 MT' },
  { id: 'GI', label: 'Galvanized (GI)', monthly: '1,800 MT' },
  { id: 'GPSP', label: 'GP/SP', monthly: '900 MT' },
  { id: 'Coated', label: 'Coated', monthly: '600 MT' }
]

const turnover = [
  { year: '2021-22', value: 160 },
  { year: '2022-23', value: 165 },
  { year: '2023-24', value: 150 },
  { year: '2024-25', value: 175 }
]

export default function SupplyDivision() {
  return (
    <>
      <Header />
      <main className="text-gray-900">
      <MotionSection className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Supply Division</h1>
          <p className="mt-4 text-gray-600 max-w-2xl">Reliable sourcing and timely supply of steel products tailored to customer needs.</p>
        </div>
      </MotionSection>

      {/* Materials grid */}
      <MotionSection className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Materials We Supply</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((m) => (
              <div key={m.id} className="bg-white rounded-lg p-5 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold">{m.id}</div>
                <div>
                  <div className="font-semibold">{m.label}</div>
                  <div className="text-sm text-gray-500">Monthly supply: {m.monthly}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Partnership highlight */}
      <MotionSection className="py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl font-semibold">Exclusive Supply Partner</h2>
            <p className="mt-2 text-gray-600">Proud to partner with leading steel manufacturers.</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image src="/images/Logo.jpg" alt="Partner logo" width={240} height={80} className="object-contain" />
          </div>
        </div>
      </MotionSection>

      {/* Turnover visual */}
      <MotionSection className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Turnover (₹ Crore)</h2>
          <div className="mt-6 space-y-4">
            {turnover.map((t) => (
              <div key={t.year} className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">{t.year}</div>
                <div className="flex-1 bg-white rounded overflow-hidden h-6 shadow-sm">
                  <div className="h-6 bg-yellow-500" style={{ width: `${Math.min(100, (t.value / 175) * 100)}%` }} />
                </div>
                <div className="w-20 text-right font-semibold">₹{t.value} Cr</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-6">
            {turnover.map((t) => (
              <div key={t.year} className="bg-white p-4 rounded shadow-sm text-center w-28">
                <div className="text-2xl font-bold"><CountUpFallback end={t.value} /></div>
                <div className="text-xs text-gray-500">{t.year}</div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Logistics & Warehouse */}
      <MotionSection className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-semibold">Logistics & Warehouse</h2>
            <p className="mt-2 text-gray-600">Strategically located warehousing and an experienced logistics team ensure timely deliveries and inventory management.</p>
          </div>
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <Image src="/images/WhatsApp Image 2025-10-24 at 15.23.09_7635d6e9.jpg" alt="Warehouse" width={800} height={520} className="object-cover w-full h-64" />
          </div>
        </div>
      </MotionSection>

      {/* CTA */}
      <MotionSection className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-lg p-6 flex items-center justify-between" style={{ backgroundColor: '#DAA520' }}>
            <div>
              <h3 className="text-xl font-semibold text-white">Request a Quote for Supply</h3>
              <p className="text-white mt-1 text-sm opacity-90">Tell us your requirements and we'll respond promptly.</p>
            </div>
            <div>
              <a href="/contact" className="inline-block bg-white text-gray-900 font-semibold px-5 py-3 rounded">Contact / Request Quote</a>
            </div>
          </div>
        </div>
      </MotionSection>
      </main>
      <Footer />
    </>
  )
}

export function SupplyDivisionRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/solutions') }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to Our Solutions — <a href="/solutions" className="underline">Open solutions</a></p>
    </div>
  )
}
