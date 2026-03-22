<template>
  <div class="bg-white rounded-2xl shadow p-8">
    <div class="flex gap-10">

      <!-- Left: name + total score + status -->
      <div class="flex flex-col justify-center min-w-40">
        <p class="text-gray-400 text-sm mb-1">Applicant #{{ applicant.id }}</p>
        <h1 class="text-2xl font-bold text-gray-800">{{ applicant.name }}</h1>
        <div class="mt-4">
          <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Score</p>
          <span class="text-4xl font-bold text-indigo-600">{{ total }}</span>
        </div>
        <div class="mt-5">
          <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Decision</p>
          <StatusCell :applicantId="applicant.id" />
        </div>
      </div>

      <!-- Divider -->
      <div class="w-px bg-gray-100 self-stretch"></div>

      <!-- Right: score bars -->
      <div class="flex-1 space-y-5">
        <ScoreBar
          label="GPA"
          :value="applicant.gpa"
          :max="4.0"
          :displayValue="`${applicant.gpa.toFixed(2)} / 4.00`"
          color="bg-violet-500"
        />
        <ScoreBar
          label="Essay Score"
          :value="applicant.essayScore"
          :displayValue="`${applicant.essayScore} / 100`"
          color="bg-blue-500"
        />
        <ScoreBar
          label="Financial Need"
          :value="applicant.financialNeed"
          :displayValue="`${applicant.financialNeed} / 100`"
          color="bg-emerald-500"
        />
        <ScoreBar
          label="Extracurricular"
          :value="applicant.extracurricular"
          :displayValue="`${applicant.extracurricular} / 100`"
          color="bg-amber-500"
        />
        <p class="text-xs text-gray-400 pt-2 border-t border-gray-100">
          Weighted: GPA 30% · Essay 25% · Financial Need 25% · Extracurricular 20%
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computeTotalScore } from '~/composables/useApplicants.js'

const props = defineProps({
  applicant: { type: Object, required: true }
})

const total = computed(() => computeTotalScore(props.applicant))
</script>
