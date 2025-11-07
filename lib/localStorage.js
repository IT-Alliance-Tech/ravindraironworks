// /lib/localStorage.js
// Provide safe load/save helpers for admin drafts. These guard for SSR and
// default to adminDefaults shape when appropriate.
import adminDefaults from './adminDefaults'

const STORAGE_KEY = 'riw_admin_drafts'

export function loadDrafts() {
  if (typeof window === 'undefined') return { ...adminDefaults }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...adminDefaults }
    const parsed = JSON.parse(raw)
    // Ensure shape
    return Object.assign({}, adminDefaults, parsed)
  } catch (e) {
    console.warn('Failed to load admin drafts:', e)
    return { ...adminDefaults }
  }
}

export function saveDrafts(drafts) {
  if (typeof window === 'undefined') return false
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
    return true
  } catch (e) {
    console.warn('Failed to save admin drafts:', e)
    return false
  }
}

export function clearDrafts() {
  if (typeof window === 'undefined') return false
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.warn('Failed to clear admin drafts:', e)
    return false
  }
}