// /components/EditorSection.js
import React from 'react'

export default function EditorSection({ title, children }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-md">
      {title && <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>}
      <div className="space-y-3">{children}</div>
    </section>
  )
}
