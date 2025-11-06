// /components/AdminLayout.js
import React from 'react'

export default function AdminLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-transparent">{children}</div>
    </div>
  )
}
