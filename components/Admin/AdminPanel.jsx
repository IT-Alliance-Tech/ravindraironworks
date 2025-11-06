// DEMO ONLY — frontend-only Admin Panel. Changes persist only to localStorage.
import React, { useEffect, useState } from 'react';
import AdminSection from './AdminSection';
import defaults from '../lib/adminDefaults';
import Image from 'next/image';

const STORAGE_KEY = 'ravindra_admin_demo';

function safeLoad() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load admin demo state', e);
    return null;
  }
}

function safeSave(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save admin demo state', e);
  }
}

export default function AdminPanel() {
  const [state, setState] = useState(() => safeLoad() || defaults);

  function update(path, value) {
    setState(prev => {
      const next = { ...prev };
      const parts = path.split('.');
      let target = next;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!target[parts[i]]) target[parts[i]] = {};
        target = target[parts[i]];
      }
      target[parts[parts.length - 1]] = value;
      return next;
    });
  }

  function addService() {
    setState(prev => ({
      ...prev,
      services: [...prev.services, { id: Date.now(), title: 'New Service', description: 'Description' }]
    }));
  }

  function updateService(id, key, val) {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, [key]: val } : s)
    }));
  }

  function removeService(id) {
    setState(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  }

  function addClient() {
    setState(prev => ({
      ...prev,
      clients: [...prev.clients, { id: Date.now(), name: 'New Client', logo: null }]
    }));
  }

  function updateClientName(id, name) {
    setState(prev => ({
      ...prev,
      clients: prev.clients.map(c => c.id === id ? { ...c, name } : c)
    }));
  }

  function updateClientLogo(id, file) {
    const url = file ? URL.createObjectURL(file) : null;
    setState(prev => ({
      ...prev,
      clients: prev.clients.map(c => c.id === id ? { ...c, logo: url } : c)
    }));
  }

  function removeClient(id) {
    setState(prev => ({
      ...prev,
      clients: prev.clients.filter(c => c.id !== id)
    }));
  }

  function handleHeroImage(file) {
    const url = file ? URL.createObjectURL(file) : null;
    update('hero.image', url);
  }

  function saveDemo() {
    safeSave(state);
    alert('Changes saved to localStorage!');
  }

  function resetDemo() {
    if (confirm('Reset to defaults?')) {
      setState(defaults);
      safeSave(defaults);
    }
  }

  const marqueeItems = [...state.clients, ...state.clients];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls (left, sticky) */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <h3 className="text-xl font-bold text-gray-900">Admin Dashboard (Demo)</h3>
              <p className="text-sm text-gray-600 mt-2">
                This is a frontend-only demo. Changes are stored locally in your browser.
              </p>
              <div className="mt-4 flex gap-2">
                <button onClick={saveDemo} className="flex-1 bg-gold hover:bg-yellow-600 text-white px-4 py-2 rounded transition">
                  Save (Demo)
                </button>
                <button onClick={resetDemo} className="flex-1 bg-white border hover:bg-gray-50 px-4 py-2 rounded transition">
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <AdminSection id="hero" title="Hero Editor">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  value={state.hero.title}
                  onChange={e => update('hero.title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">Subtitle</label>
                <textarea
                  value={state.hero.subtitle}
                  onChange={e => update('hero.subtitle', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  rows={3}
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">Primary Button</label>
                <input
                  value={state.hero.buttonPrimary}
                  onChange={e => update('hero.buttonPrimary', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">Hero Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleHeroImage(e.target.files?.[0])}
                  className="mt-1 block w-full text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">Image is previewed locally and not uploaded.</p>
              </AdminSection>

              <AdminSection id="services" title="Services Editor">
                <p className="text-xs text-gray-500">Add, edit or remove services. Preview updates live.</p>
                <div className="space-y-3 mt-3">
                  {state.services.map(s => (
                    <div key={s.id} className="border rounded p-3">
                      <input
                        value={s.title}
                        onChange={e => updateService(s.id, 'title', e.target.value)}
                        className="block w-full rounded-md border-gray-300 p-2"
                        placeholder="Service title"
                      />
                      <input
                        value={s.description}
                        onChange={e => updateService(s.id, 'description', e.target.value)}
                        className="block w-full rounded-md border-gray-300 p-2 mt-2"
                        placeholder="Service description"
                      />
                      <button
                        onClick={() => removeService(s.id)}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addService}
                    className="w-full mt-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm transition"
                  >
                    Add Service
                  </button>
                </div>
              </AdminSection>

              <AdminSection id="stats" title="Stats Editor">
                <p className="text-xs text-gray-500">Edit numeric/stat items.</p>
                <div className="mt-3 space-y-3">
                  {state.stats.map(s => (
                    <div key={s.id} className="flex gap-3 items-center">
                      <input
                        value={s.label}
                        onChange={e => setState(prev => ({
                          ...prev,
                          stats: prev.stats.map(x => x.id === s.id ? { ...x, label: e.target.value } : x)
                        }))}
                        className="flex-1 rounded-md border-gray-300 p-2"
                        placeholder="Label"
                      />
                      <input
                        type="number"
                        value={s.value}
                        onChange={e => setState(prev => ({
                          ...prev,
                          stats: prev.stats.map(x => x.id === s.id ? { ...x, value: Number(e.target.value) } : x)
                        }))}
                        className="w-24 rounded-md border-gray-300 p-2"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection id="industries" title="Industries Editor">
                <label className="block text-sm font-medium text-gray-700">
                  Comma-separated industries
                </label>
                <input
                  value={state.industries.join(', ')}
                  onChange={e => update('industries', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2"
                  placeholder="e.g., Automotive, Construction"
                />
                <p className="text-xs text-gray-500 mt-2">Preview will show chips.</p>
              </AdminSection>

              <AdminSection id="clients" title="Clients Editor">
                <p className="text-xs text-gray-500">Add client names and optional logo image (preview only).</p>
                <div className="space-y-3 mt-3">
                  {state.clients.map(c => (
                    <div key={c.id} className="border rounded p-3 flex gap-3 items-center">
                      <input
                        value={c.name}
                        onChange={e => updateClientName(c.id, e.target.value)}
                        className="flex-1 rounded-md border-gray-300 p-2"
                        placeholder="Client name"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => updateClientLogo(c.id, e.target.files?.[0])}
                        className="text-sm"
                      />
                      <button
                        onClick={() => removeClient(c.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addClient}
                    className="w-full mt-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm transition"
                  >
                    Add Client
                  </button>
                </div>
              </AdminSection>

              <AdminSection id="cta" title="CTA Editor">
                <label className="block text-sm font-medium text-gray-700">Button Text</label>
                <input
                  value={state.cta.text}
                  onChange={e => update('cta.text', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2"
                  placeholder="e.g., Get Started"
                />
                <label className="block text-sm font-medium text-gray-700 mt-4">Button Color</label>
                <input
                  type="color"
                  value={state.cta.color}
                  onChange={e => update('cta.color', e.target.value)}
                  className="mt-1 block w-16 h-8"
                />
              </AdminSection>

              <AdminSection id="ga" title="Google Analytics">
                <label className="block text-sm font-medium text-gray-700">GA Tracking ID</label>
                <input
                  value={state.ga.id}
                  onChange={e => update('ga.id', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2"
                  placeholder="UA-XXXXXXXXX-X"
                />
                <div className="mt-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={state.ga.enabled}
                      onChange={e => update('ga.enabled', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Enable tracking (demo only)</span>
                  </label>
                </div>
                <div className="mt-3 inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                  GA: {state.ga.id || '—'} — {state.ga.enabled ? 'Enabled' : 'Disabled'}
                </div>
              </AdminSection>
            </div>
          </div>
        </aside>

        {/* Live Preview (right) */}
        <main className="lg:col-span-2">
          <div className="space-y-6">
            {/* Hero preview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="p-8 md:w-1/2">
                  <h1 className="text-2xl font-bold text-gray-900">{state.hero.title}</h1>
                  <p className="mt-3 text-gray-700">{state.hero.subtitle}</p>
                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: state.cta.color }}>
                      {state.hero.buttonPrimary}
                    </button>
                    <button className="px-4 py-2 rounded border">
                      {state.hero.buttonSecondary}
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  {state.hero.image ? (
                    <img src={state.hero.image} alt="Hero preview" className="w-full h-56 object-cover" />
                  ) : (
                    <div className="w-full h-56 bg-gray-50 flex items-center justify-center">
                      <span className="text-gray-400">No image selected</span>
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
              <div className="flex gap-6 justify-center">
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

            {/* Clients preview */}
            <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
              <h3 className="font-semibold mb-4">Clients</h3>
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-6 animate-marquee">
                  {marqueeItems.map((c, i) => (
                    <div key={`${c.id}-${i}`} className="flex items-center gap-3 shrink-0">
                      {c.logo ? (
                        <img src={c.logo} alt={c.name} className="w-24 h-12 object-contain" />
                      ) : (
                        <div className="w-24 h-12 flex items-center justify-center bg-gray-100 rounded text-sm">
                          {c.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA preview */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
              <div>
                <button className="px-4 py-2 rounded text-white transition-colors" style={{ backgroundColor: state.cta.color }}>
                  {state.cta.text}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}