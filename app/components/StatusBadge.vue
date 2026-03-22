<template>
  <span
    v-if="status"
    class="inline-block text-xs font-semibold px-3 py-1 rounded-full"
    :class="styles[status]"
  >
    {{ labels[status] }}
  </span>
  <span v-else class="inline-block text-xs text-gray-300 px-3 py-1">—</span>
</template>

<script setup>
defineProps({
  status: { type: String, default: null }
})

const labels = {
  accepted:   'Accepted',
  waitlisted: 'Waitlisted',
  rejected:   'Rejected'
}

const styles = {
  accepted:   'bg-emerald-100 text-emerald-700',
  waitlisted: 'bg-amber-100 text-amber-700',
  rejected:   'bg-red-100 text-red-600'
}
</script>
