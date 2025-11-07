// components/Admin/AdminPanel.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import AnalyticsPlaceholder from './AnalyticsPlaceholder'
import AdminSection from './AdminSection'
import EditorSection from './EditorSection'
import ImagePreview from './ImagePreview'
import { saveDrafts as saveDraftsLib } from '../../lib/localStorage' // optional direct use if needed

// Helpers
function normalizeUrl(value) {
  if (!value) return ''
  try {
    const hasScheme = /^https?:\/\//i.test(value)
    return hasScheme ? value : 'https://' + value
  } catch (e) {
    return value
  }
}
function safeParseJson(raw, fallback) {
  try {
    const parsed = JSON.parse(raw)
    return parsed
  } catch (e) {
    return fallback
  }
}

export default function AdminPanel({
  drafts,
  onChangeDrafts, // legacy name
  setDrafts, // AdminLayout may pass setDrafts
  selected = { page: 'Homepage', section: 'Hero' },
  setSelected,
  onSave,
  onRevert,
  onReset, // AdminLayout may pass onReset
  lastSaved,
}) {
  // support either prop name from parent
  const changeDrafts = onChangeDrafts || setDrafts || (() => {})
  const doRevert = onRevert || onReset || (() => {})
  const [localHeroImageFile, setLocalHeroImageFile] = useState(null)
  const pendingRef = useRef(null)

  useEffect(() => {
    // cleanup pending timers on unmount
    return () => {
      if (pendingRef.current) clearTimeout(pendingRef.current)
    }
  }, [])

  // Debounced update wrapper so editors call updateField and we persist after 400ms
  function debouncedChange(updater) {
    // apply immediately to UI via parent's onChangeDrafts
    changeDrafts(prev => (typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }))
    if (pendingRef.current) clearTimeout(pendingRef.current)
    pendingRef.current = setTimeout(() => {
      try {
        // parent already saves in its handler — but ensure library save as fallback
        if (typeof window !== 'undefined') {
          // best-effort write: parent should persist; this is safe fallback
          // saveDraftsLib && saveDraftsLib(window.__riw_drafts__ || {})
        }
      } catch (e) {
        // noop
      }
    }, 400)
  }

  // small helpers to update nested hero fields
  function updateHeroField(key, value) {
    debouncedChange(prev => ({ ...prev, hero: { ...(prev.hero || {}), [key]: value } }))
  }

  function handleHeroImageFile(file) {
    if (!file) return
    const url = URL.createObjectURL(file)
    updateHeroField('image', url)
    setLocalHeroImageFile(file)
  }

  function addService() {
    debouncedChange(prev => ({
      ...prev,
      services: [...(prev.services || []), { id: Date.now(), title: 'New Service', description: '' }],
    }))
  }
  function updateService(id, key, val) {
    debouncedChange(prev => ({
      ...prev,
      services: (prev.services || []).map(s => (s.id === id ? { ...s, [key]: val } : s)),
    }))
  }
  function removeService(id) {
    debouncedChange(prev => ({ ...prev, services: (prev.services || []).filter(s => s.id !== id) }))
  }

  function updateStat(id, key, val) {
    debouncedChange(prev => ({
      ...prev,
      stats: (prev.stats || []).map(x => (x.id === id ? { ...x, [key]: key === 'value' ? Number(val) : val } : x)),
    }))
  }

  function updateIndustriesFromInput(raw) {
    const arr = raw.split(',').map(s => s.trim()).filter(Boolean)
    debouncedChange({ industries: arr })
  }

  function addClient() {
    debouncedChange(prev => ({ ...prev, clients: [...(prev.clients || []), { id: Date.now(), name: 'New Client', logo: null }] }))
  }
  function updateClientName(id, name) {
    debouncedChange(prev => ({ ...prev, clients: (prev.clients || []).map(c => (c.id === id ? { ...c, name } : c)) }))
  }
  function updateClientLogo(id, file) {
    const url = file ? URL.createObjectURL(file) : null
    debouncedChange(prev => ({ ...prev, clients: (prev.clients || []).map(c => (c.id === id ? { ...c, logo: url } : c)) }))
  }
  function removeClient(id) {
    debouncedChange(prev => ({ ...prev, clients: (prev.clients || []).filter(c => c.id !== id) }))
  }

  // CTA update
  function updateCTA(key, val) {
    debouncedChange(prev => ({ ...prev, cta: { ...(prev.cta || {}), [key]: val } }))
  }

  // GA
  function updateGA(key, val) {
    debouncedChange(prev => ({ ...prev, ga: { ...(prev.ga || {}), [key]: val } }))
  }

  // last saved display
  const lastSavedText = lastSaved ? new Date(lastSaved).toLocaleString() : 'Never'

  // Preview data
  const preview = useMemo(() => drafts || {}, [drafts])

  // If no page selected, show Admin Overview
  if (!selected || !selected.page) {
    const projects = (drafts?.services || []).length
    const clients = (drafts?.clients || []).length
    const years = (drafts?.stats && drafts.stats[0] && drafts.stats[0].value) || 0
    return (
      <div className="space-y-6 transition-opacity duration-150">
        <header className="flex items-start justify-between">
          <div>
            <div className="text-sm text-gray-400">{selected?.page ? `${selected.page} → ${selected.section}` : 'Overview'}</div>
            <h1 className="text-2xl font-semibold">Admin — Overview</h1>
            <div className="text-sm text-gray-500 mt-1">Quick snapshot of site data and recent activity</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm">
              <button aria-label="Save drafts" onClick={onSave} className="px-3 py-1 text-sm bg-gold text-white rounded transition duration-150">Save</button>
              <button aria-label="Reset drafts" onClick={doRevert} className="px-3 py-1 text-sm border rounded transition duration-150">Reset</button>
            </div>
          </div>
        </header>

        {/* metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-3xl font-extrabold">{projects}</div>
            <div className="text-sm text-gray-500 mt-1">Projects</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-3xl font-extrabold">{clients}</div>
            <div className="text-sm text-gray-500 mt-1">Clients</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-3xl font-extrabold">{years}</div>
            <div className="text-sm text-gray-500 mt-1">Years</div>
          </div>
        </div>

        {/* analytics preview card */}
        <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
          <div className="flex-1 flex items-center justify-center">
            <svg width="180" height="56" viewBox="0 0 180 56" className="mx-auto" aria-hidden>
              <rect width="180" height="56" rx="8" fill="#f3f4f6" />
              <path d="M8 36c12-16 24-8 36-4s24 6 36-6 24 2 36-8" stroke="#c4c4c4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-40 text-sm text-gray-500">Analytics (preview)</div>
        </div>

        {/* quick links */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Jump to commonly edited sections</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => setSelected && setSelected({ page: 'Homepage', section: 'Hero' })} className="px-3 py-1 rounded-full text-blue-600 hover:underline bg-gray-50 transition duration-150">Homepage — Hero</button>
            <button onClick={() => setSelected && setSelected({ page: 'Homepage', section: 'Services' })} className="px-3 py-1 rounded-full text-blue-600 hover:underline bg-gray-50 transition duration-150">Homepage — Services</button>
            <button onClick={() => setSelected && setSelected({ page: 'Homepage', section: 'Clients' })} className="px-3 py-1 rounded-full text-blue-600 hover:underline bg-gray-50 transition duration-150">Homepage — Clients</button>
          </div>
        </div>
      </div>
    )
  }

  // --- Conditional rendering: only render selected.section editor ---
  const section = (selected && selected.section) || 'Hero'

  return (
    <div className="space-y-4 transition-opacity duration-150">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-400">{selected.page} → {section}</div>
          <h1 className="text-2xl font-semibold">Admin — {selected.page}</h1>
          <div className="text-sm text-gray-500 mt-1">Edit content on the left, preview on the right — changes auto-save</div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="w-48">
            <AnalyticsPlaceholder enabled={Boolean(preview.ga && preview.ga.enabled)} />
          </div>
          <div className="text-sm text-gray-500">Last saved: {lastSavedText}</div>
          <div className="inline-flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm ml-2">
            <button aria-label="Save drafts" onClick={onSave} className="px-3 py-1 text-sm bg-gold text-white rounded transition duration-150">Save</button>
            <button aria-label="Reset drafts" onClick={onRevert} className="px-3 py-1 text-sm border rounded transition duration-150">Reset</button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* controls / editor column */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-xs text-gray-500">Auto-save: debounced (demo). Explicit save stores to localStorage.</div>
            </div>

            {/* Only render the selected editor section here */}
            <div className="space-y-4">
              {section === 'Hero' && (
                <AdminSection id="hero" title="Hero Editor" defaultOpen>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input value={preview.hero?.title || ''} onChange={e => updateHeroField('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                  <label className="block text-sm font-medium text-gray-700 mt-3">Subtitle</label>
                  <textarea value={preview.hero?.subtitle || ''} onChange={e => updateHeroField('subtitle', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                  <label className="block text-sm font-medium text-gray-700 mt-3">Primary Button Label</label>
                  <input value={preview.hero?.buttonPrimary || ''} onChange={e => updateHeroField('buttonPrimary', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                  <label className="block text-sm font-medium text-gray-700 mt-3">Secondary Button Label</label>
                  <input value={preview.hero?.buttonSecondary || ''} onChange={e => updateHeroField('buttonSecondary', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                  <label className="block text-sm font-medium text-gray-700 mt-3">Background Image</label>
                  <input type="file" accept="image/*" onChange={e => handleHeroImageFile(e.target.files?.[0])} className="mt-1 block w-full text-sm" />
                  <div className="mt-3"><ImagePreview file={localHeroImageFile} url={preview.hero?.image} alt="Hero preview" /></div>
                </AdminSection>
              )}

              {section === 'Services' && (
                <AdminSection id="services" title="Services Editor" defaultOpen>
                  <p className="text-xs text-gray-500">Add, edit or remove services.</p>
                  <div className="space-y-3 mt-3">
                    {(preview.services || []).map(s => (
                      <div key={s.id} className="border rounded p-3 flex flex-col md:flex-row md:items-start md:gap-4">
                        <div className="flex-1">
                          <input value={s.title || ''} onChange={e => updateService(s.id, 'title', e.target.value)} className="block w-full rounded-md border-gray-300 p-2" placeholder="Service title" />
                          <textarea value={s.description || ''} onChange={e => updateService(s.id, 'description', e.target.value)} className="block w-full rounded-md border-gray-300 p-2 mt-2" placeholder="Service description" rows={3} />
                        </div>
                        <div className="flex justify-end items-start mt-3 md:mt-0">
                          <button onClick={() => removeService(s.id)} className="text-red-600 hover:text-red-800 text-sm transition duration-150">Remove</button>
                        </div>
                      </div>
                    ))}
                    <button onClick={addService} className="w-full mt-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm">Add Service</button>
                  </div>
                </AdminSection>
              )}

              {section === 'Stats' && (
                <AdminSection id="stats" title="Stats Editor" defaultOpen>
                  <p className="text-xs text-gray-500">Edit numeric/stat items.</p>
                  <div className="mt-3 space-y-3">
                    {(preview.stats || []).map(s => (
                      <div key={s.id} className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                        <input value={s.label || ''} onChange={e => updateStat(s.id, 'label', e.target.value)} className="flex-1 rounded-md border-gray-300 p-2" placeholder="Label" />
                        <input type="number" value={s.value || 0} onChange={e => updateStat(s.id, 'value', e.target.value)} className="w-28 rounded-md border-gray-300 p-2" min="0" />
                      </div>
                    ))}
                  </div>
                </AdminSection>
              )}

              {section === 'Industries' && (
                <AdminSection id="industries" title="Industries Editor" defaultOpen>
                  <label className="block text-sm font-medium text-gray-700">Comma-separated industries</label>
                  <input value={(preview.industries || []).join(', ')} onChange={e => updateIndustriesFromInput(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" placeholder="e.g., Automotive, Construction" />
                  <p className="text-xs text-gray-500 mt-2">Preview will show chips on the right.</p>
                </AdminSection>
              )}

              {section === 'Clients' && (
                <AdminSection id="clients" title="Clients Editor" defaultOpen>
                  <p className="text-xs text-gray-500">Add client names and optional logo image (preview only).</p>
                  <div className="space-y-3 mt-3">
                    {(preview.clients || []).map(c => (
                      <div key={c.id} className="border rounded p-3 flex flex-col md:flex-row md:items-start md:gap-4">
                        <div className="flex-1">
                          <input value={c.name || ''} onChange={e => updateClientName(c.id, e.target.value)} placeholder="Client name" className="w-full rounded-md border-gray-300 p-2" />
                          <input type="file" accept="image/*" onChange={e => updateClientLogo(c.id, e.target.files?.[0])} className="mt-2 text-sm" />
                        </div>
                        <div className="w-36 h-20 flex items-center justify-center bg-gray-50 rounded">
                          {c.logo ? <img src={c.logo} alt={c.name} className="max-h-16 object-contain" /> : <div className="text-sm text-gray-400">No image</div>}
                        </div>
                        <div className="flex justify-end mt-3 md:mt-0">
                          <button onClick={() => removeClient(c.id)} className="text-red-600 hover:text-red-800 text-sm transition duration-150">Remove</button>
                        </div>
                      </div>
                    ))}
                    <button onClick={addClient} className="w-full mt-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm">Add Client</button>
                  </div>
                </AdminSection>
              )}

              {section === 'CTA' && (
                <AdminSection id="cta" title="CTA Editor" defaultOpen>
                  <label className="block text-sm font-medium text-gray-700">Button Text</label>
                  <input value={preview.cta?.text || ''} onChange={e => updateCTA('text', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" placeholder="e.g., Request a Quote" />
                  <label className="block text-sm font-medium text-gray-700 mt-3">Button Color</label>
                  <input type="color" value={preview.cta?.color || '#b8860b'} onChange={e => updateCTA('color', e.target.value)} className="mt-1 block w-20 h-9" />
                </AdminSection>
              )}

              {section === 'Google Analytics' && (
                <AdminSection id="ga" title="Google Analytics" defaultOpen>
                  <label className="block text-sm font-medium text-gray-700">GA Tracking ID</label>
                  <input value={preview.ga?.id || ''} onChange={e => updateGA('id', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" placeholder="G-XXXXXXXX" />
                  <label className="flex items-center gap-2 mt-3">
                    <input type="checkbox" checked={Boolean(preview.ga?.enabled)} onChange={e => updateGA('enabled', e.target.checked)} />
                    <span className="text-sm">Enable tracking (demo)</span>
                  </label>
                  <div className="mt-3 inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                    GA: {preview.ga?.id || '—'} — {preview.ga?.enabled ? 'Enabled' : 'Disabled'}
                  </div>
                </AdminSection>
              )}
            </div>
          </div>
        </aside>

        {/* right: live preview (only shows preview, not editing controls) */}
        <main className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow">
            {/* Hero preview */}
            <div className="md:flex items-center gap-6">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold">{preview.hero?.title}</h2>
                <p className="mt-2 text-gray-700">{preview.hero?.subtitle}</p>
                <div className="mt-4 flex gap-3">
                  <a className="px-4 py-2 rounded text-white" style={{ backgroundColor: preview.cta?.color || '#b8860b' }}>{preview.hero?.buttonPrimary}</a>
                  <a className="px-4 py-2 rounded border">{preview.hero?.buttonSecondary}</a>
                </div>
              </div>
              <div className="md:w-1/2">
                {preview.hero?.image ? <img src={preview.hero.image} alt="hero" className="w-full h-56 object-cover rounded" /> : <div className="w-full h-56 bg-gray-50 rounded flex items-center justify-center text-gray-400">No image</div>}
              </div>
            </div>

            {/* Services preview */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(preview.services || []).map(s => (
                  <div key={s.id} className="p-4 rounded-lg border bg-gray-50">
                    <div className="font-medium">{s.title}</div>
                    <div className="text-sm text-gray-600 mt-2">{s.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(preview.stats || []).map(s => (
                <div key={s.id} className="bg-white rounded-lg p-6 text-center border shadow-sm">
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Industries */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Industries</h4>
              <div className="flex flex-wrap gap-2">
                {(preview.industries || []).map((i, idx) => <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 text-sm">{i}</span>)}
              </div>
            </div>

            {/* Clients */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Clients</h4>
              <div className="flex gap-4 items-center flex-wrap">
                {(preview.clients || []).map(c => (
                  <div key={c.id} className="w-36 h-20 bg-gray-50 rounded flex items-center justify-center">
                    {c.logo ? <img src={c.logo} alt={c.name} className="max-h-14 object-contain" /> : <div className="text-sm text-gray-600">{c.name}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA preview */}
            <div className="mt-6 text-right">
              <button className="px-5 py-3 rounded text-white" style={{ backgroundColor: preview.cta?.color || '#b8860b' }}>{preview.cta?.text}</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
