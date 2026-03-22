<template>
  <select
    :value="current"
    @change="setStatus(applicantId, $event.target.value || null)"
    @click.stop
    class="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
  >
    <option value="">-- Set Status --</option>
    <option value="accepted">Accepted</option>
    <option value="waitlisted">Waitlisted</option>
    <option value="rejected">Rejected</option>
  </select>
</template>

<script setup>
const props = defineProps({
  applicantId: { type: Number, required: true }
})

const { getStatus, setStatus } = useStatus()
const current = computed(() => getStatus(props.applicantId))
</script>
