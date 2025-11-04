import { useState } from 'react'

export default function ContactPreview() {
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('pending')
    const fd = new FormData(e.target)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message')
        })
      })
      const data = await res.json()
      if (data && data.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
    setTimeout(() => setStatus(null), 4000)
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about our metal processing solutions? We're here to help.
            Reach out to us and we'll respond within one business day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Map Placeholder with Contact Info */}
          <div className="space-y-6">
            <div className="aspect-[4/3] rounded-xl bg-white shadow-sm overflow-hidden">
              {/* Gradient Map Background */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 overflow-hidden opacity-5">
                  <div className="absolute w-full h-[200%] -top-1/2 left-0">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="h-px bg-gray-900 my-8" />
                    ))}
                  </div>
                  <div className="absolute h-full w-[200%] -left-1/2 top-0">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-px bg-gray-900 mx-8 h-full inline-block" />
                    ))}
                  </div>
                </div>

                {/* Location Pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform -translate-y-4">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 text-sm font-medium">Our Location</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="mt-1 text-gray-600 text-sm">
                    Industrial Area, Plot No. XX<br />
                    City, State - PIN Code
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="mt-1 text-gray-600 text-sm">info@ravindrairon.example</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="mt-1 text-gray-600 text-sm">+91-XXXXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gold focus:ring-gold"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gold focus:ring-gold"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gold focus:ring-gold"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gold focus:ring-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'pending'}
                  className={`w-full rounded-lg bg-gold px-5 py-3 text-white font-semibold shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${status === 'pending' ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {status === 'pending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
                    Thank you! We'll get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                    Sorry, there was an error. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}