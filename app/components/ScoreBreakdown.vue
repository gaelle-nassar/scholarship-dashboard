<template>
  <div class="bg-white rounded-2xl shadow p-8 mt-6">
    <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
      How the Total Score is Calculated
    </h2>

    <div class="space-y-4 text-sm text-gray-600">
      <p>
        The total score is a weighted composite of four criteria, each normalized to a 0–100 scale before weighting is applied.
      </p>

      <div class="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        <div v-for="row in breakdown" :key="row.label" class="flex items-start gap-4 px-5 py-4">
          <span class="w-2.5 h-2.5 rounded-full mt-1 shrink-0" :class="row.dot"></span>
          <div class="flex-1">
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">{{ row.label }}</span>
              <span class="text-gray-400 text-xs">{{ row.weight }} of total</span>
            </div>
            <p class="text-gray-400 text-xs mt-0.5">{{ row.formula }}</p>
          </div>
          <span class="text-gray-700 font-semibold shrink-0">{{ row.contribution }}</span>
        </div>
      </div>

      <div class="flex justify-between items-center bg-indigo-50 rounded-xl px-5 py-3 font-semibold">
        <span class="text-indigo-700">Total Score</span>
        <span class="text-indigo-600 text-lg">{{ total }}</span>
      </div>

      <p class="text-gray-400 text-xs">
        All raw scores are out of 100 except GPA which is on a 4.0 scale and is first converted to a 0–100 value using
        <span class="font-mono">(GPA / 4.0) × 100</span> before the 30% weight is applied.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computeTotalScore } from '~/composables/useApplicants.js'

const props = defineProps({
  applicant: { type: Object, required: true }
})

const total = computed(() => computeTotalScore(props.applicant))

const breakdown = computed(() => {
  const a = props.applicant
  const gpaNorm      = (a.gpa / 4.0) * 100
  const gpaContrib   = gpaNorm * 0.30
  const essayContrib = a.essayScore * 0.25
  const finContrib   = a.financialNeed * 0.25
  const extraContrib = a.extracurricular * 0.20
  return [
    {
      label: 'GPA',
      weight: '30%',
      dot: 'bg-violet-500',
      formula: `(${a.gpa.toFixed(2)} ÷ 4.0) × 100 = ${gpaNorm.toFixed(2)}  →  ${gpaNorm.toFixed(2)} × 30% = ${gpaContrib.toFixed(2)}`,
      contribution: gpaContrib.toFixed(2)
    },
    {
      label: 'Essay Score',
      weight: '25%',
      dot: 'bg-blue-500',
      formula: `${a.essayScore} × 25% = ${essayContrib.toFixed(2)}`,
      contribution: essayContrib.toFixed(2)
    },
    {
      label: 'Financial Need',
      weight: '25%',
      dot: 'bg-emerald-500',
      formula: `${a.financialNeed} × 25% = ${finContrib.toFixed(2)}`,
      contribution: finContrib.toFixed(2)
    },
    {
      label: 'Extracurricular',
      weight: '20%',
      dot: 'bg-amber-500',
      formula: `${a.extracurricular} × 20% = ${extraContrib.toFixed(2)}`,
      contribution: extraContrib.toFixed(2)
    }
  ]
})
</script>
