import React, { useEffect, useState, useRef } from 'react'

export default function CountUpFallback({ end = 0, duration = 2, decimals = 0, prefix = '', suffix = '' }) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    let raf;
    const from = 0
    const to = Number(end) || 0

    function tick(now) {
      if (!startRef.current) startRef.current = now
      const elapsed = (now - startRef.current) / 1000
      const t = Math.min(elapsed / duration, 1)
      const current = from + (to - from) * t
      setValue(Number(current.toFixed(decimals)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, decimals])

  return <span>{prefix}{value}{suffix}</span>
}
