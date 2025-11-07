import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#2E2E2E] text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="font-bold text-xl">Ravindra Iron Works</div>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed max-w-md">
              Since 1978, we've been the trusted name in sheet metal processing. Our commitment to quality and innovation has made us the preferred partner for industries across India.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#DAA520] transition-colors" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" className="text-gray-300 hover:text-[#DAA520] transition-colors" aria-label="YouTube">YouTube</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#DAA520] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#DAA520] transition-colors">About</Link>
              </li>
              <li>
                <Link href="/solutions/services" className="text-gray-300 hover:text-[#DAA520] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/solutions/capabilities" className="text-gray-300 hover:text-[#DAA520] transition-colors">Capabilities</Link>
              </li>
              <li>
                <Link href="/solutions/supply-division" className="text-gray-300 hover:text-[#DAA520] transition-colors">Supply Division</Link>
              </li>
              <li>
                <Link href="/solutions/industries" className="text-gray-300 hover:text-[#DAA520] transition-colors">Industries</Link>
              </li>
              <li>
                <Link href="/solutions/gallery" className="text-gray-300 hover:text-[#DAA520] transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#DAA520] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#DAA520] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-300">
                  Industrial Area, Plot No. XX<br />
                  City, State - PIN Code
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#DAA520] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-300">info@ravindrairon.example</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#DAA520] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-300">+91-XXXXXXXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">© {new Date().getFullYear()} Ravindra Iron Works. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-[#DAA520] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-[#DAA520] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}