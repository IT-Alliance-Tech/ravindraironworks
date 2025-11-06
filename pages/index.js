import Header from '../components/shared/Header'
import Hero from '../components/HomePage/Hero'
import AboutPreview from '../components/HomePage/AboutPreview'
import ServicesGrid from '../components/HomePage/ServicesGrid'
import Stats from '../components/HomePage/Stats'
import Industries from '../components/HomePage/Industries'
import ClientsCarousel from '../components/HomePage/ClientsCarousel'
import CTA from '../components/HomePage/CTA'
import ContactPreview from '../components/HomePage/ContactPreview'
import Footer from '../components/shared/Footer'
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