import React, { useEffect, useState } from 'react'

export default function ImagePreview({ file, url, alt = 'preview' }) {
  const [objectUrl, setObjectUrl] = useState(null)

  useEffect(() => {
    if (file) {
      const u = URL.createObjectURL(file)
      setObjectUrl(u)
      return () => {
        try { URL.revokeObjectURL(u) } catch (e) { /* ignore */ }
      }
    }
    return undefined
  }, [file])

  const src = objectUrl || url || ''

  if (!src) {
    return (
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded">No image</div>
    )
  }

  return (
    <img src={src} alt={alt} className="w-full h-40 object-cover rounded" />
  )
}
