// /components/Controls/FileInput.js
import React, { useRef } from 'react'

export default function FileInput({ onDataUrl, accept = '*', ariaLabel, ...props }) {
  const inputRef = useRef()

  async function handleChange(e) {
    const file = e.target.files?.[0]
    if (!file || !onDataUrl) return

    const reader = new FileReader()
    reader.onload = () => onDataUrl(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        aria-label={ariaLabel}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-yellow-50 file:text-yellow-700
          hover:file:bg-yellow-100"
        {...props}
      />
    </div>
  )
}