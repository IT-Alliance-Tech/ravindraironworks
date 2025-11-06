export default function ValuesGrid() {
  const values = [
    {
      title: 'Mission',
      icon: (
        <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'To deliver exceptional sheet metal processing solutions that empower industries and drive innovation.'
    },
    {
      title: 'Vision',
      icon: (
        <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: 'To be the most trusted and innovative metal processing partner, setting industry standards for quality and reliability.'
    },
    {
      title: 'Core Values',
      icon: (
        <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'Excellence in quality, integrity in business, commitment to innovation, and dedication to customer success.'
    }
  ]

  return (
    <div className="bg-offwhite">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Built on strong principles and unwavering commitment to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 text-center">{item.title}</h3>
              <p className="mt-4 text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}