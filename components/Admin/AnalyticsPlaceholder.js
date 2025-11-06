// /components/AnalyticsPlaceholder.js
import React from 'react'

export default function AnalyticsPlaceholder({ enabled }) {
  const bars = [65, 45, 80, 35, 90, 55, 70]
  const maxHeight = 100

  return (
    <div className={`p-4 rounded-lg border ${enabled ? 'bg-gray-50' : 'bg-gray-100'}`}>
      <div className="flex items-end h-24 gap-2">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: `${(height / maxHeight) * 100}%`,
              backgroundColor: enabled ? '#b8860b' : '#d1d5db',
              opacity: enabled ? 1 : 0.5,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        {enabled ? 'Analytics tracking enabled' : 'Analytics disabled'}
      </div>
    </div>
  )
}