import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function GalleryRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/solutions') }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to Our Solutions — <a href="/solutions" className="underline">Open solutions</a></p>
    </div>
  )
}
