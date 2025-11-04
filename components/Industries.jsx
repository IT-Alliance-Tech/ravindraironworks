export default function Industries() {
  const industries = [
    { name: 'Battery', desc: 'Power storage solutions' },
    { name: 'PEB', desc: 'Pre-engineered buildings' },
    { name: 'Automobile', desc: 'Vehicle components' },
    { name: 'Transformer', desc: 'Power equipment' },
    { name: 'Solar', desc: 'Renewable energy' },
    { name: 'Furniture', desc: 'Office & home' },
    { name: 'Electronics', desc: 'Device enclosures' },
    { name: 'Steel Doors', desc: 'Security solutions' },
    { name: 'Cleanroom', desc: 'Controlled environments' }
  ]

  return (
    <section id="industries" className="bg-offwhite py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Industries We Serve</h2>
          <p className="mt-4 text-gray-600">Trusted metal processing partner across diverse sectors</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="relative group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-center">
                <div className="mx-auto w-12 h-12 mb-4 rounded-lg bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="font-semibold text-gray-900">{industry.name}</div>
                <div className="mt-1 text-sm text-gray-500">{industry.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}