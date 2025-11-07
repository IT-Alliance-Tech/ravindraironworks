// Generated per client doc — replace placeholder images/text as needed.
import React from 'react'
import Image from 'next/image'
import MotionSection from '../../components/shared/MotionSection.jsx'
import Header from '../../components/shared/Header.jsx'
import Footer from '../../components/shared/Footer.jsx'

const quickFacts = [
  ['Capacity', '10,000 MT/month'],
  ['Thickness', '0.10–3.5mm'],
  ['Width', '10–1600mm'],
  ['Coil handling', 'Up to 35 MT']
]

const specs = [
  { name: 'Capacity', value: '10,000 MT/month' },
  { name: 'Thickness', value: '0.10 - 3.5 mm' },
  { name: 'Width', value: '10 - 1600 mm' },
  { name: 'Coil handling', value: 'Up to 35 MT' },
  { name: 'Tolerance', value: '±0.03 mm (typical)' }
]

const gallery = [
  '/images/WhatsApp Image 2025-10-24 at 15.23.07_05bb9a63.jpg',
  '/images/WhatsApp Image 2025-10-24 at 15.23.07_b82ae481.jpg',
  '/images/WhatsApp Image 2025-10-24 at 15.23.08_3bfbe0e9.jpg',
  '/images/Why Choose Us.jpg'
]

export default function Capabilities() {
  return (
    <>
      <Header />
      <main className="text-gray-900">
      {/* Hero / intro strip */}
      <MotionSection className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Capabilities</h1>
          <p className="mt-4 text-gray-600 max-w-2xl">We process sheet metal across a broad range of thicknesses and widths with industry-grade coil handling and precision tolerances.</p>
        </div>
      </MotionSection>

      {/* Two-column facts + image */}
      <MotionSection className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <section aria-labelledby="quick-facts" className="order-2 lg:order-1">
            <h2 id="quick-facts" className="text-2xl font-semibold">Quick Facts</h2>
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickFacts.map(([k, v]) => (
                <div key={k} className="bg-white p-4 rounded-lg shadow-sm">
                  <dt className="text-sm text-gray-500">{k}</dt>
                  <dd className="mt-1 text-lg font-medium text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <figure className="order-1 lg:order-2">
            <Image
              src="/images/Why Choose Us.jpg"
              alt="Coil processing line"
              width={1200}
              height={800}
              className="rounded-lg object-cover w-full h-64 sm:h-80 lg:h-96 shadow-md"
              priority={false}
            />
          </figure>
        </div>
      </MotionSection>

      {/* Technical specs table */}
      <MotionSection className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Technical Specifications</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border">
            <table className="min-w-full table-auto text-left">
              <caption className="sr-only">Technical specifications and tolerances</caption>
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-700">Parameter</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-700">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {specs.map((s) => (
                  <tr key={s.name}>
                    <td className="px-4 py-3 text-sm text-gray-700">{s.name}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MotionSection>

      {/* Quality Control */}
      <MotionSection className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Quality Control</h2>
          <p className="mt-2 text-gray-600">Consistent inspection and calibrated instruments ensure the tolerances we promise.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="text-3xl">📏</div>
              <h3 className="mt-3 font-semibold">Flatness Table</h3>
              <p className="mt-2 text-sm text-gray-600">High-precision flatness checking for finished coils and slit strips.</p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="text-3xl">🔍</div>
              <h3 className="mt-3 font-semibold">Vernier</h3>
              <p className="mt-2 text-sm text-gray-600">Calibrated verniers for spot checks and quick reads.</p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="text-3xl">⚙️</div>
              <h3 className="mt-3 font-semibold">Micrometer</h3>
              <p className="mt-2 text-sm text-gray-600">Micrometers for thickness verification across runs.</p>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Image gallery preview */}
      <MotionSection className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <p className="mt-2 text-gray-600">Quick preview of our facility and processed parts.</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((src, idx) => (
              <div
                key={src}
                className="rounded-lg overflow-hidden bg-gray-100 hover:scale-105 transition-transform duration-300"
                role="img"
                aria-label={`Gallery image ${idx + 1}`}>
                <Image src={src} alt={`Gallery ${idx + 1}`} width={400} height={300} className="object-cover w-full h-40" />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* CTA strip */}
      <MotionSection className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-lg overflow-hidden flex items-center justify-between p-6" style={{ backgroundColor: '#DAA520' }}>
            <div>
              <h3 className="text-2xl font-semibold text-white">Partner with the Experts in Sheet Metal Processing</h3>
              <p className="text-white mt-2 opacity-90">High capacity. Tight tolerances. Reliable delivery.</p>
            </div>
            <div>
              <a href="/contact" className="inline-block bg-white text-gray-900 font-semibold px-5 py-3 rounded shadow">Explore Services</a>
            </div>
          </div>
        </div>
      </MotionSection>
      </main>
      <Footer />
    </>
  )
}

