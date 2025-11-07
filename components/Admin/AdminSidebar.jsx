import React, { useEffect } from 'react'

export default function AdminSidebar({ open = true, onToggle, onSelect, selected = {} }) {
  useEffect(() => console.info('AdminSidebar mounted'), [])

  const pages = {
    Homepage: ['Hero', 'Services', 'Stats', 'Industries', 'Clients', 'CTA', 'Google Analytics'],
    About: ['Company Story', 'Team', 'Values'],
    Contact: ['Contact Info', 'Map', 'Business Hours'],
  }

  return (
    <nav
      role="navigation"
      aria-label="Admin sidebar"
      className={`flex-shrink-0 bg-white border-r transition-all duration-200 ease-in-out ${open ? 'w-64' : 'w-16'}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-3 border-b">
          <button type="button" onClick={() => onSelect && onSelect({ page: null, section: null })} aria-label="Admin overview" className="flex items-center gap-2 focus:outline-none transition duration-150">
            <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-white font-bold">AI</div>
            {open && <div className="font-semibold">Admin</div>}
          </button>
          <button
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={onToggle}
            className="p-2 rounded hover:bg-gray-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600">
              <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-2">
          <div>
            <div className={`px-2 py-1 rounded-md text-sm font-medium ${selected.page === 'Pages' ? 'bg-gray-100' : ''}`}>
              Pages
            </div>
            <div className="mt-2 space-y-1">
              {Object.keys(pages).map(page => (
                <div key={page} className="">
                  <button
                    onClick={() => onSelect({ page, section: pages[page][0] })}
                    className={`flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-gray-50 transition-colors duration-150 text-left ${selected.page === page ? 'bg-gray-50 border-l-4 border-gold border-yellow-500' : ''}`}
                    aria-expanded={selected.page === page}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                      <rect x="3" y="4" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1.2"></rect>
                      <rect x="3" y="14" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1.2"></rect>
                    </svg>
                    {open && <span className="flex-1">{page}</span>}
                    {open && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  {/* nested sections */}
                  <div className={`ml-4 mt-1 space-y-1 ${selected.page === page ? 'block' : 'hidden'}`}>
                    {pages[page].map(section => (
                      <button
                        key={section}
                        onClick={() => onSelect({ page, section })}
                        className={`flex items-center gap-2 w-full px-2 py-1 rounded text-sm hover:bg-gray-50 transition duration-150 ${selected.page === page && selected.section === section ? 'bg-gray-200 font-medium' : ''}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"></circle>
                        </svg>
                        {open && <span>{section}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t mt-3">
            <button onClick={() => onSelect({ page: 'Settings', section: 'General' })} className={`flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-gray-50 transition-colors duration-150 ${selected.page === 'Settings' ? 'bg-gray-100' : ''}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-600"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.2"/></svg>
              {open && <span>Settings</span>}
            </button>

            <button onClick={() => onSelect({ page: 'Media', section: 'Library' })} className={`flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-gray-50 transition-colors duration-150 ${selected.page === 'Media' ? 'bg-gray-100' : ''}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-600"><path d="M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" stroke="currentColor" strokeWidth="1.2"/></svg>
              {open && <span>Media</span>}
            </button>

            <button onClick={() => alert('Logged out (demo)')} className="flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-gray-50 transition-colors duration-150 text-red-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-600"><path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {open && <span>Log out</span>}
            </button>
          </div>
        </div>

        <div className="p-3 border-t text-xs text-gray-400">Version: demo</div>
      </div>
    </nav>
  )
}
