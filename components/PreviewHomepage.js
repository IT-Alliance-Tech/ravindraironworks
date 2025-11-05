// /components/PreviewHomepage.js
import React from 'react'

export default function PreviewHomepage({ pageState }) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="md:flex items-center">
          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900">{pageState.hero.title}</h1>
            <p className="mt-4 text-gray-700">{pageState.hero.subtitle}</p>
            <button
              className="mt-6 px-6 py-3 rounded-lg text-white shadow-sm transition-colors"
              style={{ backgroundColor: pageState.cta.colorHex }}
            >
              {pageState.hero.primaryButtonText}
            </button>
          </div>
          <div className="md:w-1/2">
            {pageState.hero.heroImageDataUrl ? (
              <img
                src={pageState.hero.heroImageDataUrl}
                alt="Hero"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                No image selected
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pageState.services.map(service => (
            <div key={service.id} className="p-6 rounded-xl bg-gray-50 border">
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl shadow-md p-8">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-600">{pageState.stats.years}</div>
            <div className="mt-1 text-gray-600">Years</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600">{pageState.stats.projects}</div>
            <div className="mt-1 text-gray-600">Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600">{pageState.stats.clients}</div>
            <div className="mt-1 text-gray-600">Clients</div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Industries We Serve</h2>
        <div className="flex flex-wrap gap-3">
          {pageState.industries.map((industry, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm"
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Our Clients</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {pageState.clients.map(client => (
            <div
              key={client.id}
              className="h-24 rounded-lg bg-gray-50 border flex items-center justify-center p-4"
            >
              {client.logoDataUrl ? (
                <img
                  src={client.logoDataUrl}
                  alt={client.name}
                  className="max-h-full w-auto object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-gray-500">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-2xl shadow-md p-8">
        <div className="text-center">
          <button
            className="px-8 py-3 rounded-lg text-white text-lg shadow-sm transition-colors"
            style={{ backgroundColor: pageState.cta.colorHex }}
          >
            {pageState.cta.text}
          </button>
        </div>
      </section>
    </div>
  )
}