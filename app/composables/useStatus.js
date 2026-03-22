const STORAGE_KEY = 'scholarship-statuses'

export function useStatus() {
  // useState is Nuxt's SSR-safe shared state — same instance across all components
  const statuses = useState('applicant-statuses', () => {
    if (process.client) {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  function setStatus(id, status) {
    statuses.value = { ...statuses.value, [id]: status }
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses.value))
    }
  }

  function getStatus(id) {
    return statuses.value[id] ?? null
  }

  return { setStatus, getStatus }
}
