// components/Admin/AdminLayout.js
import React, { useEffect, useState, useCallback, useRef } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminPanel from './AdminPanel'
import { loadDrafts, saveDrafts } from '../../lib/localStorage'

export default function AdminLayout() {
  console.info('AdminLayout mounted')

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [drafts, setDrafts] = useState(null)
  const [selected, setSelected] = useState({ page: null, section: null })
  const [lastSaved, setLastSaved] = useState(null)

  const saveTimer = useRef(null)

  // Load drafts on mount (safe for SSR)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const loaded = loadDrafts()
      setDrafts(loaded)
    } catch (e) {
      console.warn('Failed to load drafts on mount', e)
      setDrafts(null)
    }
  }, [])

  // Autosave drafts when they change (debounced 400ms)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    if (!drafts) return
    saveTimer.current = setTimeout(() => {
      try {
        saveDrafts(drafts)
        setLastSaved(new Date())
      } catch (e) {
        console.warn('Auto-save error', e)
      }
    }, 400)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [drafts])

  const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), [])

  const explicitSave = useCallback(() => {
    if (typeof window === 'undefined' || !drafts) return
    saveDrafts(drafts)
    setLastSaved(new Date())
    try { alert('Saved (demo)') } catch (e) { }
  }, [drafts])

  const revertToSaved = useCallback(() => {
    if (typeof window === 'undefined') return
    const loaded = loadDrafts()
    setDrafts(loaded)
    setLastSaved(null)
  }, [])

  const selectSection = useCallback(({ page, section } = {}) => {
    if (!page) {
      setSelected({ page: null, section: null })
    } else {
      setSelected({ page, section })
    }
  }, [])

  // Provide a safe setter that merges partial updates when passed a function or object
  const setDraftsSafe = useCallback((updater) => {
    setDrafts(prev => {
      const prevSafe = prev || {}
      const next = typeof updater === 'function' ? updater(prevSafe) : { ...prevSafe, ...updater }
      return next
    })
  }, [])

  if (!drafts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-4" />
          <div>Loading admin...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar open={sidebarOpen} onToggle={toggleSidebar} onSelect={selectSection} selected={selected} />

      <main className="flex-1 p-6 overflow-auto transition-colors duration-150">
        <AdminPanel
          drafts={drafts}
          onChangeDrafts={setDraftsSafe}    // <- important: matches AdminPanel prop name
          selected={selected}
          setSelected={setSelected}
          onSave={explicitSave}             // <- matches AdminPanel onSave
          onRevert={revertToSaved}          // <- matches AdminPanel onRevert
          lastSaved={lastSaved}
        />
      </main>
    </div>
  )
}
