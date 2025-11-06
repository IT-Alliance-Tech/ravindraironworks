import Head from 'next/head'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import MotionSection from '../../components/shared/MotionSection'
import MachineCard from '../../components/Solutions/MachineCard'

const machines = [
  { name: 'CNC Press Brake', spec: '2500mm, 200T' },
  { name: 'Laser Cutter', spec: '3kW, high precision' },
  { name: 'Turret Punch', spec: 'Multiple tooling options' },
]

export default function CapabilitiesPage() {
  return (
    <div>
      <Head>
        <title>Capabilities — Ravindra Iron Works</title>
        <meta name="description" content="Our capabilities, machines and production strengths." />
      </Head>
      <Header />

      <main className="min-h-screen">
        <MotionSection className="py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold">Capabilities</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">State-of-the-art machinery for diverse manufacturing needs.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {machines.map((m) => (
                <MachineCard key={m.name} name={m.name} spec={m.spec} />
              ))}
            </div>
          </div>
        </MotionSection>
      </main>

      <Footer />
    </div>
  )
}
