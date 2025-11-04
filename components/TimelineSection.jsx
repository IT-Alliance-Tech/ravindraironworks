export default function TimelineSection() {
  const timeline = [
    {
      year: '1978',
      title: 'Foundation',
      description: 'Established as a small workshop in the heart of industrial district with a vision to revolutionize metal processing.'
    },
    {
      year: '1995',
      title: 'Major Expansion',
      description: 'Expanded to an 8-acre facility with state-of-the-art machinery and increased processing capacity.'
    },
    {
      year: '2010',
      title: 'Industry Partnership',
      description: 'Strategic partnership with TATA Steel, marking a new era of growth and innovation.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
          <p className="mt-4 text-gray-600 max-w-xl">
            For over four decades, Ravindra Iron Works has been at the forefront of sheet metal processing,
            continuously evolving and innovating to meet the changing needs of industries across India.
          </p>
        </div>

        <div className="space-y-12 relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-3 bottom-3 w-px bg-gray-200" />

          {timeline.map((item, index) => (
            <div key={index} className="relative flex gap-6 items-start">
              {/* Circle marker */}
              <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center flex-shrink-0 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>

              <div>
                <div className="text-gold font-semibold">{item.year}</div>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}