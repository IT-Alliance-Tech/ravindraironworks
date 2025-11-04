export default function Stats() {
  const stats = [
    { value: '10,000 MT', label: 'Monthly Processing' },
    { value: '8 Acres', label: 'Facility Area' },
    { value: 'TATA', label: 'Steel Partnership' },
    { value: 'Skilled Team', label: 'Experienced Workforce' }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 text-gray-600 max-w-xl">
              Our commitment to quality and efficiency makes us the preferred choice for metal processing needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="p-6 rounded-xl bg-gradient-to-br from-white to-yellow-50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-gold font-extrabold text-2xl">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Production Image Placeholder */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-xl bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-white/80 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm font-medium">Production line placeholder</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-200/50" />
          </div>
        </div>
      </div>
    </section>
  )
}
 