import Header from '../components/Header'
import Hero from '../components/Hero'
import AboutPreview from '../components/AboutPreview'
import ServicesGrid from '../components/ServicesGrid'
import Stats from '../components/Stats'
import Industries from '../components/Industries'
import ClientsCarousel from '../components/ClientsCarousel'
import CTA from '../components/CTA'
import ContactPreview from '../components/ContactPreview'
import Footer from '../components/Footer'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Ravindra Iron Works — The Iron People</title>
        <meta name="description" content="One-stop destination for all your sheet metal needs" />
      </Head>

      <Header />
      <main className="flex-1">
        <div className="bg-gold text-white p-2 text-center">Tailwind active — demo mode</div>
        <Hero />
        <AboutPreview />
        <ServicesGrid />
        <Stats />
        <Industries />
        <ClientsCarousel />
        <CTA />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  )
}