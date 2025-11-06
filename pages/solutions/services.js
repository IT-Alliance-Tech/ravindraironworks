import Head from 'next/head'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import MotionSection from '../../components/shared/MotionSection'
import ServiceCardWrapper from '../../components/Solutions/ServiceCardWrapper'

const services = [
  { title: 'Sheet Metal Fabrication', shortDesc: 'Precision cutting & forming', details: 'Laser cutting, bending, welding for bespoke parts.' },
  { title: 'Punching & Forming', shortDesc: 'High-speed punching', details: 'Tooling for high-volume parts.' },
  { title: 'Assembly & Finishing', shortDesc: 'Complete assemblies', details: 'Welding, painting, powder coating, QC.' },
]

export default function ServicesPage() {
  return (
    <div>
      <Head>
        <title>Services — Ravindra Iron Works</title>
        <meta name="description" content="Our services: sheet metal fabrication, punching, assembly and finishing." />
      </Head>
      <Header />

      <main className="min-h-screen">
        <MotionSection className="py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold">Our Services</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">Comprehensive sheet metal services for industrial customers.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCardWrapper key={s.title} title={s.title} shortDesc={s.shortDesc} details={s.details} />
              ))}
            </div>
          </div>
        </MotionSection>
      </main>

      <Footer />
    </div>
  )
}
