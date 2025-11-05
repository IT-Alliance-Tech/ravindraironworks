// DEMO ONLY — frontend-only Admin Panel. Changes persist only to localStorage under 'ravindra_admin_demo'.
import React, { useEffect, useState, useRef } from 'react'
import AdminSection from './AdminSection'
import defaults from '../lib/adminDefaults'
import Image from 'next/image'

const STORAGE_KEY = 'ravindra_admin_demo'

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to load admin demo state', e)
    return null
  }
}

function safeSave(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to save admin demo state', e)
  }
}

export default function AdminPanel() {
  const persisted = typeof window !== 'undefined' ? safeLoad() : null
  const [state, setState] = useState(persisted || defaults)
  const fileInputs = useRef({})

  useEffect(() => {
    // If there is a persisted value in localStorage, load it on mount
    if (!persisted) {
      // ensure defaults are set
      setState(defaults)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handlers
  function update(path, value) {
    setState(prev => {
      const next = { ...prev }
      const parts = path.split('.')
      let target = next
      for (let i = 0; i < parts.length - 1; i++) {
        if (!target[parts[i]]) target[parts[i]] = {}
        target = target[parts[i]]
      }
      target[parts[parts.length - 1]] = value
      return next
    })
  }

  // Services handlers
  function addService() {
    setState(prev => ({
      ...prev,
      services: [...prev.services, { id: Date.now(), title: 'New Service', description: 'Description' }]
    }))
  }
  function updateService(id, key, val) {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, [key]: val } : s)
    }))
  }
  function removeService(id) {
    setState(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }))
  }

  // Clients handlers
  function addClient() {
    setState(prev => ({ ...prev, clients: [...prev.clients, { id: Date.now(), name: 'New Client', logo: null }] }))
  }
  function updateClientName(id, name) {
    setState(prev => ({
      ...prev,
      clients: prev.clients.map(c => c.id === id ? { ...c, name } : c)
    }))
  }
  function updateClientLogo(id, file) {
    const url = file ? URL.createObjectURL(file) : null
    setState(prev => ({
      ...prev,
      clients: prev.clients.map(c => c.id === id ? { ...c, logo: url } : c)
    }))
  }
  function removeClient(id) {
    setState(prev => ({ ...prev, clients: prev.clients.filter(c => c.id !== id) }))
  }

  function handleHeroImage(file) {
    const url = file ? URL.createObjectURL(file) : null
    update('hero.image', url)
  }

  function saveDemo() {
    safeSave(state)
    // small visual cue could be added; for now console
    console.log('Admin demo saved to localStorage')
  }

  function resetDemo() {
    setState(defaults)
    safeSave(defaults)
  }

  // Clients marquee implementation uses CSS animation. Duplicate content to loop.
  const marqueeItems = [...state.clients, ...state.clients]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls (left, sticky) */}
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold">Admin Dashboard (Demo)</h3>
              <p className="text-sm text-gray-600 mt-2">This is a frontend-only demo. Changes are stored locally in your browser.</p>
            </div>

            <div className="mt-4">
              <AdminSection id="hero" title="Hero Editor">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input aria-label="hero-title" value={state.hero.title} onChange={e => update('hero.title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
                <label className="block text-sm font-medium text-gray-700 mt-3">Subtitle</label>
                <textarea aria-label="hero-subtitle" value={state.hero.subtitle} onChange={e => update('hero.subtitle', e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" rows={3} />
                <label className="block text-sm font-medium text-gray-700 mt-3">Primary Button Text</label>
                <input aria-label="hero-primary" value={state.hero.buttonPrimary} onChange={e => update('hero.buttonPrimary', e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
                <label className="block text-sm font-medium text-gray-700 mt-3">Hero Image (preview only)</label>
                <input aria-label="hero-image" type="file" accept="image/*" onChange={e => handleHeroImage(e.target.files?.[0])} className="mt-1 block w-full" />
                <p className="text-xs text-gray-500 mt-2">Image is previewed locally and not uploaded.</p>
              </AdminSection>

              <AdminSection id="services" title="Services Editor">
                <p className="text-xs text-gray-500">Add, edit or remove services. Preview updates live.</p>
                <div className="space-y-3 mt-3">
                  {state.services.map(s => (
                    <div key={s.id} className="border rounded p-2">
                      <input aria-label={`service-title-${s.id}`} value={s.title} onChange={e => updateService(s.id, 'title', e.target.value)} className="block w-full rounded-md border-gray-200 p-1" />
                      <input aria-label={`service-desc-${s.id}`} value={s.description} onChange={e => updateService(s.id, 'description', e.target.value)} className="block w-full rounded-md border-gray-200 p-1 mt-2" />
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => removeService(s.id)} className="text-sm text-red-600">Remove</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={addService} className="mt-2 inline-block bg-gray-100 px-3 py-1 rounded text-sm">Add Service</button>
                </div>
              </AdminSection>

              <AdminSection id="stats" title="Stats Editor">
                <p className="text-xs text-gray-500">Edit numeric/stat items.</p>
                <div className="mt-3 space-y-2">
                  {state.stats.map(s => (
                    <div key={s.id} className="flex gap-2 items-center">
                      <input aria-label={`stat-label-${s.id}`} value={s.label} onChange={e => setState(prev => ({ ...prev, stats: prev.stats.map(x => x.id === s.id ? { ...x, label: e.target.value } : x) }))} className="rounded border-gray-200 p-1" />
                      <input aria-label={`stat-value-${s.id}`} type="number" value={s.value} onChange={e => setState(prev => ({ ...prev, stats: prev.stats.map(x => x.id === s.id ? { ...x, value: Number(e.target.value) } : x) }))} className="rounded border-gray-200 p-1 w-24" />
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection id="industries" title="Industries Editor">
                <label className="block text-sm font-medium text-gray-700">Comma-separated industries</label>
                <input aria-label="industries-input" value={state.industries.join(', ')} onChange={e => update('industries', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                <p className="text-xs text-gray-500 mt-2">Preview will show chips.</p>
              </AdminSection>

              <AdminSection id="clients" title="Clients Editor">
                <p className="text-xs text-gray-500">Add client names and optional logo image (preview only).</p>
                <div className="space-y-2 mt-3">
                  {state.clients.map(c => (
                    <div key={c.id} className="border rounded p-2 flex gap-2 items-center">
                      <input aria-label={`client-name-${c.id}`} value={c.name} onChange={e => updateClientName(c.id, e.target.value)} className="flex-1 rounded border-gray-200 p-1" />
                      <input aria-label={`client-logo-${c.id}`} type="file" accept="image/*" onChange={e => updateClientLogo(c.id, e.target.files?.[0])} />
                      <button onClick={() => removeClient(c.id)} className="text-red-600">Remove</button>
                    </div>
                  ))}
                  <button onClick={addClient} className="mt-2 inline-block bg-gray-100 px-3 py-1 rounded text-sm">Add Client</button>
                </div>
              </AdminSection>

              <AdminSection id="cta" title="CTA Editor">
                <label className="block text-sm font-medium text-gray-700">CTA Text</label>
                <input aria-label="cta-text" value={state.cta.text} onChange={e => update('cta.text', e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                <label className="block text-sm font-medium text-gray-700 mt-3">Button Color</label>
                <input aria-label="cta-color" type="color" value={state.cta.color} onChange={e => update('cta.color', e.target.value)} className="mt-1" />
                <p className="text-xs text-gray-500 mt-2">Color updates preview button background.</p>
              </AdminSection>

              <AdminSection id="ga" title="Google Analytics (Demo)">
                <label className="block text-sm font-medium text-gray-700">GA Tracking ID</label>
                <input aria-label="ga-id" value={state.ga.id} onChange={e => update('ga.id', e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                <div className="flex items-center gap-3 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={state.ga.enabled} onChange={e => update('ga.enabled', e.target.checked)} />
                    <span className="text-sm">Enabled (demo only)</span>
                  </label>
                </div>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-gray-100 text-sm">
                  GA: {state.ga.id || '—'} — {state.ga.enabled ? 'Enabled' : 'Disabled'}
                </div>
              </AdminSection>

              <div className="flex gap-2 mt-4">
                <button onClick={saveDemo} className="bg-gold hover:bg-yellow-600 transition text-white px-4 py-2 rounded shadow">Save (Demo)</button>
                <button onClick={resetDemo} className="bg-white border hover:bg-gray-50 transition px-4 py-2 rounded">Reset</button>
              </div>
            </div>
          </div>
        </aside>

        {/* Live Preview (right) */}
        <main className="md:col-span-2">
          <div className="space-y-6">
            {/* Hero preview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="p-8 md:w-1/2">
                  <h1 className="text-2xl font-bold text-gray-900">{state.hero.title}</h1>
                  <p className="mt-3 text-gray-700">{state.hero.subtitle}</p>
                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: state.cta.color }}>{state.hero.buttonPrimary}</button>
                    <button className="px-4 py-2 rounded border" >{state.hero.buttonSecondary}</button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  {state.hero.image ? (
                    // blob URLs are allowed in img tag
                    <img src={state.hero.image} alt="Hero preview" className="w-full h-56 object-cover" />
                  ) : (
                    <div className="w-full h-56 bg-gray-50 flex items-center justify-center">
                      <Image src={defaults.hero.image} alt="hero default" width={600} height={240} className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Services preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold">Services</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {state.services.map(s => (
                  <div key={s.id} className="p-4 rounded-lg border bg-gray-50">
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex gap-6">
                {state.stats.map(s => (
                  <div key={s.id} className="text-center">
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold">Industries</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {state.industries.map((i, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 text-sm">{i}</span>
                ))}
              </div>
            </div>

            {/* Clients marquee preview */}
            <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
              <h3 className="font-semibold">Clients</h3>
              <div className="mt-4 overflow-hidden">
                <div className="flex gap-6 items-center marquee" style={{ animation: 'marquee 18s linear infinite' }}>
                  {marqueeItems.map((c, i) => (
                    <div key={`${c.id}-${i}`} className="flex items-center gap-3 pr-6">
                      {c.logo ? (
                        // use img for blob/object URLs
                        <img src={c.logo} alt={c.name} className="w-24 h-12 object-contain" />
                      ) : (
                        <div className="w-24 h-12 flex items-center justify-center bg-gray-100 rounded text-sm">{c.name}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA preview */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{state.cta.text}</h3>
                <p className="text-sm text-gray-600">Call to action preview</p>
              </div>
              <div>
                <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: state.cta.color }}>{state.cta.text}</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee { display: flex; }
      `}</style>
    </div>
  )
}
