import { applicants } from '~/data/applicants.js'

export function computeTotalScore(a) {
  const gpa = (a.gpa / 4.0) * 100 * 0.30
  const essay = a.essayScore * 0.25
  const financial = a.financialNeed * 0.25
  const extra = a.extracurricular * 0.20
  return (gpa + essay + financial + extra).toFixed(2)
}

export function useApplicants(query, gpaRange, sortKey, sortDir) {
  const sortedApplicants = computed(() => {
    const q = query?.value?.toLowerCase() ?? ''
    const min = parseFloat(gpaRange?.value?.min) || 0
    const max = parseFloat(gpaRange?.value?.max) || 4.0
    const key = sortKey?.value ?? 'totalScore'
    const dir = sortDir?.value ?? 'desc'

    const getValue = (a) => {
      if (key === 'totalScore') return parseFloat(computeTotalScore(a))
      return a[key]
    }

    return [...applicants]
      .filter(a => a.name.toLowerCase().includes(q) && a.gpa >= min && a.gpa <= max)
      .sort((a, b) => {
        const valA = getValue(a)
        const valB = getValue(b)
        if (valA < valB) return dir === 'asc' ? -1 : 1
        if (valA > valB) return dir === 'asc' ? 1 : -1
        return 0
      })
  })

  return { sortedApplicants }
}
