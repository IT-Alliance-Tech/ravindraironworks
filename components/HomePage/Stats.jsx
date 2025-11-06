import Image from 'next/image'

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
        {/* Left section - Text + Stats */}
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

        {/* Right section - Image */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/Why Choose Us.jpg"
              alt="Ravindra Iron Works Production Line"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
