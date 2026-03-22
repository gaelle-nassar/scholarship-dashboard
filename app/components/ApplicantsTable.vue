<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3">
      <SearchBar v-model="query" />
      <GpaFilter v-model="gpaRange" />
    </div>

    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th class="px-6 py-4">#</th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 cursor-pointer select-none hover:text-indigo-600 transition-colors"
              :class="col.center ? 'text-center' : ''"
              @click="setSort(col.key)"
            >
              <span class="inline-flex items-center" :class="col.center ? 'justify-center w-full' : ''">
                {{ col.label }}
                <SortIcon :active="sortKey === col.key" :direction="sortDir" />
              </span>
            </th>
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
const columns = [
  { key: 'name',            label: 'Name',           center: false },
  { key: 'gpa',             label: 'GPA',             center: true  },
  { key: 'essayScore',      label: 'Essay Score',     center: true  },
  { key: 'financialNeed',   label: 'Financial Need',  center: true  },
  { key: 'extracurricular', label: 'Extracurricular', center: true  },
  { key: 'totalScore',      label: 'Total Score',     center: true  },
  { key: 'status',          label: 'Status',          center: true  },
]

const query    = ref('')
const gpaRange = ref({ min: '', max: '' })
const sortKey  = ref('totalScore')
const sortDir  = ref('desc')

function setSort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = key === 'name' ? 'asc' : 'desc'
  }
}

const { sortedApplicants } = useApplicants(query, gpaRange, sortKey, sortDir)
</script>
