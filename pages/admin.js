import dynamic from 'next/dynamic'
import React from 'react'

const AdminLayout = dynamic(() => import('../components/Admin/AdminLayout'), { ssr: false, loading: () => <div className="p-8">Loading admin...</div> })

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminLayout />
    </div>
  )
}
