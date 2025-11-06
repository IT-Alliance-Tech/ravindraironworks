import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';


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
    <div className="text-lg font-bold text-gray-900 leading-tight">
      Ravindra Iron Works
    </div>
    <div className="text-sm text-gray-600">The Iron People</div>
  </div>
</Link>



        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/" className="text-sm hover:text-gold transition">Home</Link>
          <Link href="/about" className="text-sm hover:text-gold transition">About</Link>
          {process.env.NODE_ENV !== 'production' && (
            <Link href="/admin" className="text-sm hover:text-gold transition">Admin</Link>
          )}
          <details className="group relative">
            <summary className="text-sm cursor-pointer hover:text-gold transition list-none">
              Our Solutions ▾
            </summary>
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 w-56">
              <div className="flex flex-col gap-2">
                <a href="#services" className="text-sm hover:text-gold transition">Services</a>
                <a href="#industries" className="text-sm hover:text-gold transition">Industries</a>
                <a href="#capabilities" className="text-sm hover:text-gold transition">Capabilities</a>
              </div>
            </div>
          </details>
          <Link href="/contact" className="text-sm hover:text-gold transition">Contact</Link>
          <Link href="/contact" className="bg-gold px-4 py-2 rounded-lg text-white text-sm font-semibold hover:bg-yellow-600 transition shadow-sm">
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
          <Link href="/" className="block py-2 hover:text-gold transition">Home</Link>
          <Link href="/about" className="block py-2 hover:text-gold transition">About</Link>
          {process.env.NODE_ENV !== 'production' && (
            <Link href="/admin" className="block py-2 hover:text-gold transition">Admin</Link>
          )}
          <details className="py-2">
            <summary className="list-none">Our Solutions</summary>
            <div className="pl-4 mt-2 space-y-2">
              <a href="#services" className="block py-1 hover:text-gold transition">Services</a>
              <a href="#industries" className="block py-1 hover:text-gold transition">Industries</a>
              <a href="#capabilities" className="block py-1 hover:text-gold transition">Capabilities</a>
            </div>
          </details>
          <Link href="/contact" className="block py-2 hover:text-gold transition">Contact</Link>
          <Link href="/contact" className="inline-block bg-gold px-4 py-2 rounded-lg text-white font-semibold hover:bg-yellow-600 transition shadow-sm">
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}