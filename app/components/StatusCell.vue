<template>
  <div class="inline-flex items-center gap-2" @click.stop>
    <!-- Editing mode: show the select -->
    <template v-if="editing">
      <select
        :value="current"
        @change="handleChange"
        @blur="editing = false"
        class="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
        ref="selectEl"
      >
        <option value="">-- Clear --</option>
        <option value="accepted">Accepted</option>
        <option value="waitlisted">Waitlisted</option>
        <option value="rejected">Rejected</option>
      </select>
    </template>

    <!-- Display mode: show badge + edit icon -->
    <template v-else>
      <StatusBadge :status="current" />
      <button @click="startEditing" class="text-gray-300 hover:text-indigo-500 transition-colors" title="Edit status">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  applicantId: { type: Number, required: true }
})

const { getStatus, setStatus } = useStatus()
const current = computed(() => getStatus(props.applicantId))

const editing = ref(false)
const selectEl = ref(null)

async function startEditing() {
  editing.value = true
  await nextTick()
  selectEl.value?.focus()
}

function handleChange(e) {
  setStatus(props.applicantId, e.target.value || null)
  editing.value = false
}
</script>
