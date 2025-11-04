export default function AboutPreview() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Placeholder for facility image */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
            <div className="relative text-gray-400 text-sm font-medium">Facility placeholder</div>
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-200/50" />
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/80 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Legacy of Quality & Growth</h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Since 1978, Ravindra Iron Works has grown into a trusted industry partner. Our integrated services—cut to length, slitting, blanking, packaging and logistics—support leading brands across India.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="/about" 
              className="inline-flex items-center px-6 py-3 bg-gold text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Know More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}