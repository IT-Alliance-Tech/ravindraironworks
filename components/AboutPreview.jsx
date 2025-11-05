import Image from 'next/image'

export default function AboutPreview() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/About us.jpg"
              alt="Ravindra Iron Works Facility"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Decorative overlay for effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Legacy of Quality & Growth
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Since 1978, Ravindra Iron Works has grown into a trusted industry
              partner. Our integrated services — cut to length, slitting,
              blanking, packaging, and logistics — support leading brands across
              India.
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
