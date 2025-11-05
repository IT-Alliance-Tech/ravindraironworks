/*
Testing instructions:
1. Run `npm run dev`.
2. Open http://localhost:3000/admin.
3. Edit fields on left — the right preview updates live.
4. Click Save (Demo) to persist to browser localStorage. Reload to verify persistence.
5. Click Reset to restore defaults.

DEMO ONLY — frontend-only admin interface. No server calls or analytics.
*/

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminPanel from '../components/AdminPanel'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <AdminPanel />
      </main>
      <Footer />
    </div>
  )
}
