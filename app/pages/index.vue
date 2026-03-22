<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Scholarship Dashboard</h1>
      <p class="text-gray-500 mb-6">Applicant overview and scoring</p>

      <div class="bg-white rounded-2xl shadow overflow-hidden">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th class="px-6 py-4">#</th>
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4 text-center">GPA</th>
              <th class="px-6 py-4 text-center">Essay Score</th>
              <th class="px-6 py-4 text-center">Financial Need</th>
              <th class="px-6 py-4 text-center">Extracurricular</th>
              <th class="px-6 py-4 text-center">Total Score</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="applicant in applicants"
              :key="applicant.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-gray-400">{{ applicant.id }}</td>
              <td class="px-6 py-4 font-medium text-gray-800">{{ applicant.name }}</td>
              <td class="px-6 py-4 text-center text-gray-700">{{ applicant.gpa.toFixed(2) }}</td>
              <td class="px-6 py-4 text-center text-gray-700">{{ applicant.essayScore }}</td>
              <td class="px-6 py-4 text-center text-gray-700">{{ applicant.financialNeed }}</td>
              <td class="px-6 py-4 text-center text-gray-700">{{ applicant.extracurricular }}</td>
              <td class="px-6 py-4 text-center">
                <span class="inline-block bg-gray-100 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full">
                  TBD
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { applicants } from '~/data/applicants.js'
</script>
