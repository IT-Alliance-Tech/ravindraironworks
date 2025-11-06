// /components/PreviewCard.js
import React from 'react'

export default function PreviewCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  )
}