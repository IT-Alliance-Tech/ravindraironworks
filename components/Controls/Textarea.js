// /components/Controls/Textarea.js
import React from 'react'

export default function Textarea({ value, onChange, id, rows = 4, className = '', placeholder = '', ...props }) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value === undefined || value === null ? '' : value}
      onChange={e => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className={`rounded-md border p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-300 ${className}`}
      {...props}
    />
  )
}
