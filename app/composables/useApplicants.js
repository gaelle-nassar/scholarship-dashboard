import { applicants } from '~/data/applicants.js'

export function computeTotalScore(a) {
  const gpa = (a.gpa / 4.0) * 100 * 0.30
  const essay = a.essayScore * 0.25
  const financial = a.financialNeed * 0.25
  const extra = a.extracurricular * 0.20
  return (gpa + essay + financial + extra).toFixed(2)
}

export function useApplicants() {
  const sortedApplicants = computed(() =>
    [...applicants].sort((a, b) => computeTotalScore(b) - computeTotalScore(a))
  )

  return { sortedApplicants }
}
