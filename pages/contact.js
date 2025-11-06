import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import dynamic from 'next/dynamic'

const ContactModal = dynamic(() => import('../components/ContactModal'), { ssr: false })

export default function Contact() {
  const [status] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Contact Us - Ravindra Iron Works</title>
        <meta name="description" content="Get in touch with Ravindra Iron Works for all your sheet metal processing needs" />
      </Head>

      <Header />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-white pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help you with your sheet metal needs
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-sm h-[400px] lg:h-auto">
                <iframe
                  title="Ravindra Iron Works Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2967247213007!2d78.4862!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjknMTAuMiJF!5e0!3m2!1sen!2sin!4v1635785123456!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              {/* Form (reuse ContactModal in inline mode) */}
              <div>
                <ContactModal inline />
              </div>
            </div>

            {/* Contact Details */}
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold">Address</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Ravindra Iron Works<br />
                  Industrial Area, Hyderabad<br />
                  Telangana, India
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold">Phone</h3>
                <p className="mt-2 text-sm text-gray-600">
                  +91 98765 43210
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold">Email</h3>
                <p className="mt-2 text-sm text-gray-600">
                  info@ravindraironworks.in
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold">Business Hours</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Mon - Sat: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-charcoal py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Start Your Project?</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Let us help you bring your vision to life with our expert sheet metal processing services
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg bg-gold px-8 py-4 text-white font-semibold shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}