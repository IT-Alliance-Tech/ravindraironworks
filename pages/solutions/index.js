"use client"
import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import MotionSection from '../../components/shared/MotionSection'
import ServiceCardWrapper from '../../components/ServiceCardWrapper'
import GalleryGrid from '../../components/Solutions/GalleryGrid'
import ContactModal from '../../components/ContactModal'
import solutions from '../../lib/solutionsData'

export default function SolutionsPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  function openQuote(sol) {
    setSelected(sol)
    setQuoteOpen(true)
  }

  return (
    <div>
      <Head>
        <title>Our Solutions — Ravindra Iron Works</title>
        <meta name="description" content="Comprehensive solutions: Cut to Length, Precision Slitting, Blanking, Warehousing, Packaging, Logistics and more." />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl font-bold">Our Solutions</h1>
        <p className="mt-2 text-gray-400 max-w-3xl">We offer end-to-end metal processing, supply chain and logistics services tailored to industrial customers.</p>

        <div className="mt-8 space-y-12">
          {solutions.map((sol) => (
            <MotionSection key={sol.id} className="py-6" threshold={0.12}>
              <section aria-labelledby={`sol-${sol.id}`} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <ServiceCardWrapper title={sol.title} shortDesc={sol.short} details={sol.description.join('\n\n')} />
                </div>

                <div>
                  <h2 id={`sol-${sol.id}`} className="text-xl font-semibold">{sol.title}</h2>
                  {sol.description.map((p, idx) => (
                    <p key={idx} className="mt-3 text-gray-400">{p}</p>
                  ))}

                  <ul className="mt-4 list-disc pl-5 text-gray-300 space-y-1">
                    {sol.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    {sol.images && sol.images.length > 0 && (
                      <div className="w-full">
                        <GalleryGrid items={sol.images.map((src, i) => ({ src, alt: `${sol.title} ${i+1}` }))} />
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button aria-label={`Request quote for ${sol.title}`} onClick={() => openQuote(sol)} className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#DAA520' }}>
                      Request a Quote
                    </button>
                  </div>
                </div>
              </section>
            </MotionSection>
          ))}
        </div>
      </main>

      <Footer />

      {quoteOpen && (
        <ContactModal onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  )
}
