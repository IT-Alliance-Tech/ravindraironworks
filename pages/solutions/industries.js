import Head from 'next/head'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import MotionSection from '../../components/shared/MotionSection'
import IndustryCard from '../../components/Solutions/IndustryCard'

const industries = [
  { title: 'Automotive', desc: 'Parts & assemblies for vehicles' },
  { title: 'Appliances', desc: 'Chassis and panels for appliances' },
  { title: 'Electrical', desc: 'Enclosures and racks' },
]

export default function IndustriesPage() {
  return (
    <div>
      <Head>
        <title>Industries — Ravindra Iron Works</title>
        <meta name="description" content="Industries we serve: automotive, appliances, electrical and more." />
      </Head>
      <Header />

      <main className="min-h-screen">
        <MotionSection className="py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold">Industries Served</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">We deliver solutions across many industrial verticals.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((it) => (
                <IndustryCard key={it.title} title={it.title} desc={it.desc} />
              ))}
            </div>
          </div>
        </MotionSection>
      </main>

      <Footer />
    </div>
  )
}
