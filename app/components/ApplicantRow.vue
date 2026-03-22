<template>
  <tr class="hover:bg-gray-50 transition-colors cursor-pointer" @click="navigateTo(`/applicants/${applicant.id}`)">
    <td class="px-6 py-4 text-gray-400">{{ applicant.id }}</td>
    <td class="px-6 py-4 font-medium text-gray-800">{{ applicant.name }}</td>
    <td class="px-6 py-4 text-center text-gray-700">{{ applicant.gpa.toFixed(2) }}</td>
    <td class="px-6 py-4 text-center text-gray-700">{{ applicant.essayScore }}</td>
    <td class="px-6 py-4 text-center text-gray-700">{{ applicant.financialNeed }}</td>
    <td class="px-6 py-4 text-center text-gray-700">{{ applicant.extracurricular }}</td>
    <td class="px-6 py-4 text-center">
      <span class="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
        {{ computeTotalScore(applicant) }}
      </span>
    </td>
  </tr>
</template>

<script setup>
import { computeTotalScore } from '~/composables/useApplicants.js'

defineProps({
  applicant: { type: Object, required: true }
})
</script>
