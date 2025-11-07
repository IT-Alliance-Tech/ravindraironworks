import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import MotionSection from '../shared/MotionSection.jsx'

// Determine video source and optional poster on the server (build/SSR). This
// runs only when `typeof window === 'undefined'` so bundlers shouldn't try to
// include `fs` for the client bundle. If detection fails or is unavailable,
// default to /hero/background.mp4 so the runtime will attempt to load it and
// gracefully fall back to the static background.
let VIDEO_SRC = '/hero/background.mp4'
let POSTER_SRC = undefined
let VIDEO_DETECTED = false
try {
    if (typeof window === 'undefined') {
    const fs = require('fs')
    const path = require('path')
    const publicDir = path.join(process.cwd(), 'public')
    const heroVideo = path.join(publicDir, 'hero', 'background.mp4')
    if (fs.existsSync(heroVideo)) {
      VIDEO_SRC = '/hero/background.mp4'
        VIDEO_DETECTED = true
    } else {
      const files = fs.readdirSync(publicDir).filter((f) => f.toLowerCase().endsWith('.mp4'))
      if (files.length) {
        // use the first .mp4 found at the root of public/
        VIDEO_SRC = '/' + files[0].replace(/\\/g, '/')
          VIDEO_DETECTED = true
      }
    }

    const heroPoster = path.join(publicDir, 'hero', 'poster.jpg')
    if (fs.existsSync(heroPoster)) {
      POSTER_SRC = '/hero/poster.jpg'
    }
  }
} catch (e) {
  // ignore and keep defaults
}

const ContactModal = dynamic(() => import('../ContactModal'), { ssr: false })

export default function Hero() {
  const [open, setOpen] = useState(false)
  // client-side reactive source: if SSR detected the video, initialize to
  // that value to avoid client-side verification (prevents unnecessary
  // fetches and 404s). Otherwise start null and verify on mount.
  // Render video only on the client after hydration to avoid SSR/client
  // mismatches. Start with null; the effect will verify the canonical
  // '/hero/background.mp4' and set videoSrc if reachable.
  const [videoSrc, setVideoSrc] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    let mounted = true
    async function verifyVideo() {
      try {
        // mark client mounted
        if (mounted) setIsClient(true)

        // Prefer the canonical path first
        const tryFetchRange = async (url) => {
          try {
            const res = await fetch(url, {
              method: 'GET',
              headers: { Range: 'bytes=0-1' },
            })
            if (res && (res.status === 206 || res.status === 200)) return true
          } catch (e) {
            // swallow
          }
          return false
        }

        const canonical = '/hero/background.mp4'
        const ok = await tryFetchRange(canonical)
        if (mounted && ok) {
          setVideoSrc(canonical)
          return
        }

        // Fallback: try module-level VIDEO_SRC only if different
        if (VIDEO_SRC && VIDEO_SRC !== canonical) {
          const ok2 = await tryFetchRange(VIDEO_SRC)
          if (mounted && ok2) {
            setVideoSrc(VIDEO_SRC)
            return
          }
        }

        // Not found: leave videoSrc null (no video rendered)
        if (mounted) setVideoSrc(null)
      } catch (e) {
        if (mounted) setVideoSrc(null)
      }
    }

    verifyVideo()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <MotionSection as="section" id="home" className="relative hero-fallback overflow-hidden">
      {/* NOTE: We intentionally do NOT render the <video> on the server.
          Video will be mounted client-side only after hydration to avoid
          React hydration mismatches. Server-side fs detection is retained
          (see top of file) but we don't serialize or render the video HTML. */}
      {/* Background video (absolute) - render only when client-side verification succeeded to avoid 404s on navigation */}
      {isClient && videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Decorative Elements (kept, but pushed slightly above video with a low z-index) */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Overlay (between video/decorative and content) to preserve text contrast */}
      <div className="absolute inset-0 bg-black/30 z-5 pointer-events-none" />

      {/* Content (keep layout & classes; ensure it sits above video/overlay) */}
      <div className="relative z-10 min-h-[480px] md:min-h-[640px] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Delivering Precision in Every Sheet Since 1978
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
              Your one-stop sheet metal service center partnered with TATA Steel â€” quality, capacity and on-time delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="#services" 
                className="inline-flex items-center px-6 py-3 bg-white text-charcoal rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Explore Services
              </a>
              <button 
                onClick={() => setOpen(true)}
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && <ContactModal onClose={() => setOpen(false)} />}
    </MotionSection>
  )
}
