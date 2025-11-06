// /components/LoadingCard.js
import React from 'react'

export default function LoadingCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md w-full">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/5 mb-4" />
        <div className="h-40 bg-gray-100 rounded mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  )
}
