import Head from 'next/head'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import MotionSection from '../../components/shared/MotionSection'
import ServiceCardWrapper from '../../components/Solutions/ServiceCardWrapper'

const divisions = [
  { title: 'Raw Material Supply', shortDesc: 'Trusted vendors', details: 'We source high-grade coils and plates.' },
  { title: 'Kitting & Logistics', shortDesc: 'Just-in-time delivery', details: 'Kitting services and coordinated logistics.' },
]

export default function SupplyDivisionPage() {
  return (
    <div>
      <Head>
        <title>Supply Division — Ravindra Iron Works</title>
        <meta name="description" content="Supply division: raw material sourcing, kitting and logistics." />
      </Head>
      <Header />

      <main className="min-h-screen">
        <MotionSection className="py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold">Supply Division</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">Integrated supply chain services for manufacturing partners.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {divisions.map((d) => (
                <ServiceCardWrapper key={d.title} title={d.title} shortDesc={d.shortDesc} details={d.details} />
              ))}
            </div>
          </div>
        </MotionSection>
      </main>

      <Footer />
    </div>
  )
}
