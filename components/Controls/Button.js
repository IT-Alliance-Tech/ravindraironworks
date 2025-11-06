// /components/Controls/Button.js
import React from 'react'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300'
  if (variant === 'primary') {
    return (
      <button {...props} className={`${base} bg-yellow-600 hover:bg-yellow-700 text-white ${className}`}>
        {children}
      </button>
    )
  }
  return (
    <button {...props} className={`${base} bg-white border text-gray-700 ${className}`}>
      {children}
    </button>
  )
}
