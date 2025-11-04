import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TimelineSection from '../components/TimelineSection'
import ValuesGrid from '../components/ValuesGrid'
import ClientsCarousel from '../components/ClientsCarousel'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>About Us - Ravindra Iron Works</title>
        <meta name="description" content="A legacy of innovation in sheet metal processing since 1978" />
      </Head>

      <Header />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="relative bg-gray-900 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800" />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
            <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
              Delivering Perfection and Precision Since 1978
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
              A legacy of innovation, trust, and excellence in sheet metal processing.
            </p>
          </div>
        </section>

        {/* Journey Section */}
        <TimelineSection />

        {/* Values Section */}
        <ValuesGrid />

        {/* Infrastructure Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Infrastructure & Capacity</h2>
              <p className="mt-4 text-gray-600">
                Our state-of-the-art facility is equipped with the latest technology and machinery,
                enabling us to deliver superior quality products with maximum efficiency.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { value: '8 Acres', label: 'Facility Area' },
                  { value: '10,000 MT', label: 'Monthly Processing' },
                  { value: 'TATA Steel', label: 'Strategic Partner' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-gold font-bold text-2xl">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-white/80 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm font-medium">Facility image placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="bg-offwhite py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Strong partnerships built on quality and performance
              </p>
            </div>
            <ClientsCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gold text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Partner with the Experts in Sheet Metal Processing</h2>
              <div className="mt-8">
                <Link 
                  href="/#services"
                  className="inline-block bg-white text-gold px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-sm"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}