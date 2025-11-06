import Head from 'next/head'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import MotionSection from '../../components/shared/MotionSection'
import GalleryGrid from '../../components/Solutions/GalleryGrid'

const images = [
  { src: '/images/Why Choose Us.jpg', alt: 'Why Choose Us' },
  { src: '/images/About us.jpg', alt: 'About us' },
  { src: '/images/Logo.jpg', alt: 'Logo' },
]

export default function GalleryPage() {
  return (
    <div>
      <Head>
        <title>Gallery — Ravindra Iron Works</title>
        <meta name="description" content="Gallery of our work and facilities." />
      </Head>
      <Header />

      <main className="min-h-screen">
        <MotionSection className="py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold">Gallery</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">A selection of projects and shop-floor photos.</p>

            <div className="mt-8">
              <GalleryGrid items={images} />
            </div>
          </div>
        </MotionSection>
      </main>

      <Footer />
    </div>
  )
}
