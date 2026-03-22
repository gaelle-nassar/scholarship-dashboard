<template>
  <span class="inline-flex flex-col ml-1 text-gray-400">
    <svg
      class="w-2.5 h-2.5 -mb-0.5 transition-colors"
      :class="active && direction === 'asc' ? 'text-indigo-600' : ''"
      viewBox="0 0 10 6" fill="currentColor"
    >
      <path d="M5 0L10 6H0L5 0Z" />
    </svg>
    <svg
      class="w-2.5 h-2.5 transition-colors"
      :class="active && direction === 'desc' ? 'text-indigo-600' : ''"
      viewBox="0 0 10 6" fill="currentColor"
    >
      <path d="M5 6L0 0H10L5 6Z" />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  active: { type: Boolean, default: false },
  direction: { type: String, default: 'asc' }
})
</script>
