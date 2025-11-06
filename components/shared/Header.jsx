import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/Logo.jpg"
            alt="Ravindra Iron Works Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <div>
            <div className="text-lg font-bold text-gray-900 leading-tight">Ravindra Iron Works</div>
            <div className="text-sm text-gray-600">The Iron People</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/" className="text-sm hover:text-[#DAA520] transition">Home</Link>
          <Link href="/about" className="text-sm hover:text-[#DAA520] transition">About</Link>
          {process.env.NODE_ENV !== 'production' && (
            <Link href="/admin" className="text-sm hover:text-[#DAA520] transition">Admin</Link>
          )}

          {/* Our Solutions dropdown */}
          <details className="group relative" role="menu">
            <summary className="text-sm cursor-pointer hover:text-[#DAA520] transition list-none" aria-haspopup="true">Our Solutions ▾</summary>
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 w-64">
              <nav className="flex flex-col gap-2" aria-label="Solutions">
                <Link href="/solutions/services" className="text-sm hover:text-[#DAA520] transition" aria-label="Services">Services</Link>
                <Link href="/solutions/capabilities" className="text-sm hover:text-[#DAA520] transition" aria-label="Capabilities">Capabilities</Link>
                <Link href="/solutions/supply-division" className="text-sm hover:text-[#DAA520] transition" aria-label="Supply Division">Supply Division</Link>
                <Link href="/solutions/industries" className="text-sm hover:text-[#DAA520] transition" aria-label="Industries">Industries</Link>
                <Link href="/solutions/gallery" className="text-sm hover:text-[#DAA520] transition" aria-label="Gallery">Gallery</Link>
              </nav>
            </div>
          </details>

          <Link href="/contact" className="text-sm hover:text-[#DAA520] transition">Contact</Link>

          <Link href="/contact" aria-label="Request a quote" className="px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm" style={{ backgroundColor: '#DAA520' }}>
            Request a Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
        <nav className="border-t bg-white px-6 py-4 space-y-3" aria-label="Mobile navigation">
          <Link href="/" className="block py-2 hover:text-[#DAA520] transition">Home</Link>
          <Link href="/about" className="block py-2 hover:text-[#DAA520] transition">About</Link>
          {process.env.NODE_ENV !== 'production' && (
            <Link href="/admin" className="block py-2 hover:text-[#DAA520] transition">Admin</Link>
          )}

          <details className="py-2">
            <summary className="list-none">Our Solutions</summary>
            <div className="pl-4 mt-2 space-y-2">
              <Link href="/solutions/services" className="block py-1 hover:text-[#DAA520] transition">Services</Link>
              <Link href="/solutions/industries" className="block py-1 hover:text-[#DAA520] transition">Industries</Link>
              <Link href="/solutions/capabilities" className="block py-1 hover:text-[#DAA520] transition">Capabilities</Link>
              <Link href="/solutions/supply-division" className="block py-1 hover:text-[#DAA520] transition">Supply Division</Link>
              <Link href="/solutions/gallery" className="block py-1 hover:text-[#DAA520] transition">Gallery</Link>
            </div>
          </details>

          <Link href="/contact" className="block py-2 hover:text-[#DAA520] transition">Contact</Link>
          <Link href="/contact" aria-label="Request a quote" className="inline-block px-4 py-2 rounded-lg text-white font-semibold shadow-sm" style={{ backgroundColor: '#DAA520' }}>
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}