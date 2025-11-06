// /lib/localStorage.js
const STORAGE_KEY = 'riw_admin_v1'

export function saveData(data) {
  if (typeof window === 'undefined') return false
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (e) {
    console.warn('Failed to save admin state:', e)
    return false
  }
}

export function loadData() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to load admin state:', e)
    return null
  }
}

export function clearData() {
  if (typeof window === 'undefined') return false
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.warn('Failed to clear admin state:', e)
    return false
  }
}