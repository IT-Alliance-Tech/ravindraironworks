// /components/Controls/Input.js
import React from 'react'

export default function Input({ value, onChange, className = '', type = 'text', id, placeholder = '', ...props }) {
  return (
    <input
      id={id}
      type={type}
      value={value === undefined || value === null ? '' : value}
      onChange={e => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className={`rounded-md border p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-300 ${className}`}
      {...props}
    />
  )
}
