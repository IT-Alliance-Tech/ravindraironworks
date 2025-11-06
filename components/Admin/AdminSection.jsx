// DEMO ONLY — Admin UI section wrapper. No server persistence here.
// Small reusable collapsible section used by the AdminPanel.
import React from 'react'

export default function AdminSection({ id, title, children, defaultOpen = true }) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <details className="group" open={defaultOpen} aria-labelledby={id}>
        <summary
          id={id}
          className="cursor-pointer font-medium text-gray-800 mb-2 list-none"
          aria-controls={`${id}-body`}
        >
          {title}
        </summary>
        <div id={`${id}-body`} className="mt-2">
          {children}
        </div>
      </details>
    </section>
  )
}
