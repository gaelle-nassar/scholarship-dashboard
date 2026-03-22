<template>
  <div class="space-y-4">
  <SearchBar v-model="query" />
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
        <ApplicantRow
          v-for="applicant in sortedApplicants"
          :key="applicant.id"
          :applicant="applicant"
        />
      </tbody>
    </table>
  </div>
  </div>
</template>

<script setup>
const query = ref('')
const { sortedApplicants } = useApplicants(query)
</script>
