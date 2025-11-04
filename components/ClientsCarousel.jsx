import { useEffect, useRef } from 'react'

export default function ClientsCarousel() {
  const clients = [
    { name: 'TATA', desc: 'Steel Partner' },
    { name: 'HBL', desc: 'Power Systems' },
    { name: 'Toshiba', desc: 'Electronics' },
    { name: 'Kirby', desc: 'Buildings' },
    { name: 'Pennar', desc: 'Engineering' }
  ]

  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Clone items to create a smooth looping illusion
    el.innerHTML += el.innerHTML

    let raf
    const speed = 0.6 // pixels per frame
    let isPaused = false

    const animate = () => {
      if (!isPaused) {
        el.scrollLeft += speed
        // Reset scroll to create infinite loop
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    // Pause when hovering
    const onMouseEnter = () => (isPaused = true)
    const onMouseLeave = () => (isPaused = false)

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Clients & Partners</h2>
          <p className="mt-4 text-gray-600">Trusted by industry leaders</p>
        </div>

        <div className="relative">
          {/* Gradient masks for subtle edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white z-10" />

          {/* Scroll container */}
          <div
            ref={ref}
            className="flex items-center gap-8 overflow-x-auto py-8 no-scrollbar scroll-smooth"
          >
            {clients.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="flex-shrink-0 w-48 h-24 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex flex-col items-center justify-center border border-gray-100"
              >
                <div className="font-bold text-gray-900">{client.name}</div>
                <div className="text-xs text-gray-500 mt-1">{client.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
