// Generated per client doc — replace placeholder images/text as needed.
import React, { useState, useEffect } from 'react'
import MotionSection from '../../components/shared/MotionSection.jsx'
import Image from 'next/image'
import ClientsCarousel from '../../components/HomePage/ClientsCarousel.jsx'
import { useRouter } from 'next/router'
import Header from '../../components/shared/Header.jsx'
import Footer from '../../components/shared/Footer.jsx'

const industriesData = [
  { id: 'Battery', short: 'Battery', desc: 'Cells & modules', cat: 'Energy' },
  { id: 'Automobile', short: 'Auto', desc: 'Automotive components', cat: 'Transport' },
  { id: 'PEB', short: 'PEB', desc: 'Pre-engineered buildings', cat: 'Construction' },
  { id: 'Transformer', short: 'XFMR', desc: 'Transformer lamination', cat: 'Energy' },
  { id: 'Furniture', short: 'Furn', desc: 'Metal furniture parts', cat: 'Consumer' },
  { id: 'Solar', short: 'Solar', desc: 'Mounting & frames', cat: 'Energy' },
  { id: 'Electronics', short: 'Elec', desc: 'Enclosures & chassis', cat: 'Electronics' },
  { id: 'Steel Doors', short: 'Doors', desc: 'Security & industrial doors', cat: 'Construction' },
  { id: 'Cleanroom', short: 'CR', desc: 'Precision parts for clean environments', cat: 'Healthcare' }
]

const categories = ['All', 'Energy', 'Transport', 'Construction', 'Consumer', 'Electronics', 'Healthcare']

export default function Industries() {
  const [filter, setFilter] = useState('All')
  const visible = industriesData.filter(i => filter === 'All' || i.cat === filter)

  return (
    <>
      <Header />
      <main className="text-gray-900">
      <MotionSection className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Industries We Serve</h1>
          <p className="mt-4 text-gray-600 max-w-2xl">We partner across sectors — delivering tailored sheet metal solutions to each industry's needs.</p>
        </div>
      </MotionSection>

      <MotionSection className="py-6 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <div className="flex gap-2 overflow-auto">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-sm ${filter === c ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>{c}</button>
            ))}
          </div>
          <div className="ml-auto text-sm text-gray-600">Showing <strong>{visible.length}</strong> industries</div>
        </div>
      </MotionSection>

      <MotionSection className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visible.map((ind) => (
              <article key={ind.id} className="bg-white rounded-lg p-6 shadow-sm transform hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl">{ind.short[0]}</div>
                  <div>
                    <h3 className="font-semibold">{ind.id}</h3>
                    <p className="text-sm text-gray-500">{ind.desc}</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">Specialized processing and QA for {ind.id} customers.</div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Our Clients</h2>
          <div className="mt-6">
            <ClientsCarousel />
          </div>
        </div>
      </MotionSection>
      </main>
      <Footer />
    </>
  )
}

export function IndustriesRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/solutions') }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to Our Solutions — <a href="/solutions" className="underline">Open solutions</a></p>
    </div>
  )
}
