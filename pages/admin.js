// /pages/admin.js
import React, { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import AdminLayout from '../components/Admin/AdminLayout'
import EditorSection from '../components/Admin/EditorSection'
import Button from '../components/Controls/Button'
import Input from '../components/Controls/Input'
import Textarea from '../components/Controls/Textarea'
import FileInput from '../components/Controls/FileInput'
import LoadingCard from '../components/Admin/LoadingCard'
import { saveData, loadData, clearData } from '../lib/localStorage'

// Dynamically load the heavier preview and analytics components
const PreviewHomepage = dynamic(() => import('../components/HomePage/PreviewHomepage'), {
  ssr: false,
  loading: () => <LoadingCard />,
})
const AnalyticsPlaceholder = dynamic(() => import('../components/Admin/AnalyticsPlaceholder'), {
  ssr: false,
  loading: () => <LoadingCard />,
})

const STORAGE_KEY = 'riw_admin_v1'

const defaultPageState = {
  hero: {
    title: 'Precision Fabrication for Industry',
    subtitle: 'Custom metalwork, assemblies and turnkey solutions for manufacturing.',
    primaryButtonText: 'Get a Quote',
    heroImageDataUrl: null,
  },
  services: [
    { id: 1, title: 'Custom Fabrication', desc: 'Steel and stainless assemblies, tailored to spec.' },
    { id: 2, title: 'Welding & Joining', desc: 'MIG/TIG/Stick for diverse materials.' },
    { id: 3, title: 'Machining', desc: 'CNC turning and milling for precision parts.' },
  ],
  stats: { years: 25, projects: 1200, clients: 300 },
  industries: ['Automotive', 'Construction', 'Agriculture', 'Energy'],
  clients: [
    { id: 1, name: 'Client A', logoDataUrl: null },
    { id: 2, name: 'Client B', logoDataUrl: null },
    { id: 3, name: 'Client C', logoDataUrl: null },
  ],
  cta: { text: 'Request a Quote', colorHex: '#b8860b' },
  analytics: { enabled: false, trackingId: '' },
}

export default function AdminPage() {
  const [pageState, setPageState] = useState(defaultPageState)
  const [toast, setToast] = useState(null)
  const [freshlyAdded, setFreshlyAdded] = useState(new Set())
  const toastRef = useRef(null)

  useEffect(() => {
    const saved = loadData()
    if (saved) setPageState(saved)
  }, [])

  function announce(message) {
    setToast(message)
    clearTimeout(toastRef.current)
    toastRef.current = setTimeout(() => setToast(null), 3000)
  }

  function persist() {
    saveData(pageState)
    announce('Saved — local changes persisted')
    // TODO: Replace localStorage with server-side save to /api/admin/homepage when ready
  }

  function resetAll() {
    if (!confirm('Reset admin content to defaults?')) return
    clearData()
    setPageState(defaultPageState)
    announce('Reset to defaults')
  }

  // Helpers to update nested state
  function update(path, value) {
    setPageState(prev => {
      const next = JSON.parse(JSON.stringify(prev))
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

  function addService() {
    const id = Date.now()
    setPageState(prev => ({ ...prev, services: [...prev.services, { id, title: 'New Service', desc: 'Description' }] }))
    setFreshlyAdded(prev => new Set(prev).add(id))
    setTimeout(() => setFreshlyAdded(prev => { const s = new Set(prev); s.delete(id); return s }), 350)
  }

  function removeService(id) {
    setPageState(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }))
  }

  function addClient() {
    const id = Date.now()
    setPageState(prev => ({ ...prev, clients: [...prev.clients, { id, name: 'New Client', logoDataUrl: null }] }))
    setFreshlyAdded(prev => new Set(prev).add(id))
    setTimeout(() => setFreshlyAdded(prev => { const s = new Set(prev); s.delete(id); return s }), 350)
  }

  function removeClient(id) {
    setPageState(prev => ({ ...prev, clients: prev.clients.filter(c => c.id !== id) }))
  }

  function updateClientLogo(id, dataUrl) {
    setPageState(prev => ({ ...prev, clients: prev.clients.map(c => c.id === id ? { ...c, logoDataUrl: dataUrl } : c) }))
  }

  function handleHeroImage(dataUrl) {
    update('hero.heroImageDataUrl', dataUrl)
  }

  // Stats validation
  const [statsErrors, setStatsErrors] = useState({})
  function updateStat(key, raw) {
    const val = raw === '' ? '' : Number(raw)
    setPageState(prev => ({ ...prev, stats: { ...prev.stats, [key]: val } }))
    setStatsErrors(prev => ({ ...prev, [key]: isNaN(val) ? 'Must be a number' : null }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <AdminLayout>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button onClick={persist} variant="primary">Save</Button>
                <Button onClick={resetAll} variant="secondary">Reset</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Editor column */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-6 space-y-6">
                  <EditorSection title="Hero Editor">
                    <label htmlFor="hero-title" className="block text-sm font-medium text-gray-700">Title</label>
                    <Input id="hero-title" value={pageState.hero.title} onChange={v => update('hero.title', v)} />

                    <label htmlFor="hero-sub" className="block text-sm font-medium text-gray-700 mt-4">Subtitle</label>
                    <Textarea id="hero-sub" value={pageState.hero.subtitle} onChange={v => update('hero.subtitle', v)} rows={3} />

                    <label htmlFor="hero-cta" className="block text-sm font-medium text-gray-700 mt-4">Primary Button</label>
                    <Input id="hero-cta" value={pageState.hero.primaryButtonText} onChange={v => update('hero.primaryButtonText', v)} />

                    <label className="block text-sm font-medium text-gray-700 mt-4">Hero Image</label>
                    <FileInput accept="image/*" onDataUrl={handleHeroImage} ariaLabel="Upload hero image" />
                    <p className="text-xs text-gray-500 mt-2">Images are stored locally as Data URLs. Use responsibly.</p>
                  </EditorSection>

                  <EditorSection title="Services Editor">
                    <p className="text-xs text-gray-500">Add, edit or remove services.</p>
                    <div className="space-y-3 mt-3">
                      {pageState.services.map(s => (
                        <div key={s.id} className={`rounded-2xl bg-white p-4 shadow-md border transition transform ${freshlyAdded.has(s.id) ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                          <label className="sr-only">Service title</label>
                          <Input value={s.title} onChange={v => setPageState(prev => ({ ...prev, services: prev.services.map(x => x.id === s.id ? { ...x, title: v } : x) }))} placeholder="Service title" />
                          <Input value={s.desc} onChange={v => setPageState(prev => ({ ...prev, services: prev.services.map(x => x.id === s.id ? { ...x, desc: v } : x) }))} placeholder="Service description" className="mt-2" />
                          <div className="mt-3 flex gap-2">
                            <Button onClick={() => removeService(s.id)} variant="secondary">Remove</Button>
                          </div>
                        </div>
                      ))}
                      <Button onClick={addService} className="w-full" variant="secondary">Add Service</Button>
                    </div>
                  </EditorSection>

                  <EditorSection title="Stats Editor">
                    <p className="text-xs text-gray-500">Numeric stats (validated).</p>
                    <div className="mt-3 space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700">Years</label>
                        <Input type="number" value={pageState.stats.years} onChange={v => updateStat('years', v)} />
                        {statsErrors.years && <div className="text-xs text-red-600">{statsErrors.years}</div>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700">Projects</label>
                        <Input type="number" value={pageState.stats.projects} onChange={v => updateStat('projects', v)} />
                        {statsErrors.projects && <div className="text-xs text-red-600">{statsErrors.projects}</div>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700">Clients</label>
                        <Input type="number" value={pageState.stats.clients} onChange={v => updateStat('clients', v)} />
                        {statsErrors.clients && <div className="text-xs text-red-600">{statsErrors.clients}</div>}
                      </div>
                    </div>
                  </EditorSection>

                  <EditorSection title="Industries Editor">
                    <label className="block text-sm font-medium text-gray-700">Comma-separated industries</label>
                    <Input value={pageState.industries.join(', ')} onChange={v => update('industries', v.split(',').map(s => s.trim()).filter(Boolean))} placeholder="e.g., Automotive, Construction" />
                    <p className="text-xs text-gray-500 mt-2">Preview will show chips.</p>
                  </EditorSection>

                  <EditorSection title="Clients Editor">
                    <p className="text-xs text-gray-500">Client list and optional logos.</p>
                    <div className="space-y-3 mt-3">
                      {pageState.clients.map(c => (
                        <div key={c.id} className={`rounded-2xl bg-white p-4 shadow-md border transition transform ${freshlyAdded.has(c.id) ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                          <label className="sr-only">Client name</label>
                          <Input value={c.name} onChange={v => setPageState(prev => ({ ...prev, clients: prev.clients.map(x => x.id === c.id ? { ...x, name: v } : x) }))} placeholder="Client name" />
                          <div className="mt-2 flex items-center gap-2">
                            <FileInput accept="image/*" onDataUrl={dataUrl => updateClientLogo(c.id, dataUrl)} ariaLabel={`Upload logo for ${c.name}`} />
                            <Button onClick={() => removeClient(c.id)} variant="secondary">Remove</Button>
                          </div>
                        </div>
                      ))}
                      <Button onClick={addClient} className="w-full" variant="secondary">Add Client</Button>
                    </div>
                  </EditorSection>

                  <EditorSection title="CTA Editor">
                    <label className="block text-sm font-medium text-gray-700">Button Text</label>
                    <Input value={pageState.cta.text} onChange={v => update('cta.text', v)} />
                    <label className="block text-sm font-medium text-gray-700 mt-4">Button Color</label>
                    <Input type="color" value={pageState.cta.colorHex} onChange={v => update('cta.colorHex', v)} className="w-20 h-10 p-0" />
                  </EditorSection>

                  <EditorSection title="Analytics">
                    <label className="block text-sm font-medium text-gray-700">Tracking ID</label>
                    <Input value={pageState.analytics.trackingId} onChange={v => update('analytics.trackingId', v)} placeholder="G-XXXXXXXX" />
                    <div className="mt-3">
                      <label className="flex items-center gap-2">
                        <input aria-label="Enable analytics" type="checkbox" checked={pageState.analytics.enabled} onChange={e => update('analytics.enabled', e.target.checked)} className="rounded border-gray-300" />
                        <span className="text-sm">Enable analytics</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <AnalyticsPlaceholder enabled={pageState.analytics.enabled} />
                    </div>
                  </EditorSection>
                </div>
              </aside>

              {/* Preview column */}
              <main className="lg:col-span-2">
                <div className="md:sticky md:top-6 h-fit">
                  <PreviewHomepage pageState={pageState} />
                </div>
              </main>
            </div>
          </div>
        </AdminLayout>
      </main>

      <Footer />

      <div aria-live="polite" className="sr-only" role="status">{toast}</div>
    </div>
  )
}
