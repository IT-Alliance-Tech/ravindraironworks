"use client"
import React from 'react'
import Head from 'next/head'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import MotionSection from '../components/shared/MotionSection'
import dynamic from 'next/dynamic'
import CutToLength from '../components/services/CutToLength'
import PrecisionSlitting from '../components/services/PrecisionSlitting'
import Blanking from '../components/services/Blanking'
import Warehousing from '../components/services/Warehousing'
import Packaging from '../components/services/Packaging'
import Logistics from '../components/services/Logistics'
import ServicesSkeleton from '../components/ServicesSkeleton'

const ContactModal = dynamic(() => import('../components/ContactModal'), { ssr: false, loading: () => <ServicesSkeleton/> })

export default function ServicesPage() {
  return (
    <div>
      <Head>
        <title>Services — Ravindra Iron Works</title>
        <meta name="description" content="Our Services: CTL, Slitting, Blanking, Warehousing, Packaging, Logistics and more." />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <MotionSection className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Services</h1>
              <p className="mt-2 text-gray-400">Explore our manufacturing and supply chain services. Use the links to jump to sections.</p>
            </div>
            <nav aria-label="Services TOC" className="hidden lg:block">
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#cut-to-length" className="hover:text-[#DAA520]">Cut to Length</a></li>
                <li><a href="#precision-slitting" className="hover:text-[#DAA520]">Precision Slitting</a></li>
                <li><a href="#blanking" className="hover:text-[#DAA520]">Blanking</a></li>
                <li><a href="#warehousing" className="hover:text-[#DAA520]">Warehousing</a></li>
                <li><a href="#packaging" className="hover:text-[#DAA520]">Packaging</a></li>
                <li><a href="#logistics" className="hover:text-[#DAA520]">Logistics</a></li>
              </ul>
            </nav>
          </div>
        </MotionSection>

        <CutToLength />
        <PrecisionSlitting />
        <Blanking />
        <Warehousing />
        <Packaging />
        <Logistics />
      </main>

      <Footer />
    </div>
  )
}
