<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">

      <NuxtLink to="/" class="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to List
      </NuxtLink>

      <template v-if="applicant">
        <ApplicantDetail :applicant="applicant" />
        <ScoreBreakdown :applicant="applicant" />
      </template>

      <div v-else class="text-center text-gray-400 mt-20">Applicant not found.</div>

    </div>
  </div>
</template>

<script setup>
import { applicants } from '~/data/applicants.js'

const route = useRoute()
const applicant = computed(() => applicants.find(a => a.id === Number(route.params.id)))
</script>
