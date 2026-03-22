<template>
  <div class="space-y-1">
    <div class="flex justify-between text-sm">
      <span class="text-gray-600 font-medium">{{ label }}</span>
      <span class="text-gray-800 font-semibold">{{ displayValue }}</span>
    </div>
    <div class="w-full bg-gray-100 rounded-full h-2.5">
      <div
        class="h-2.5 rounded-full transition-all duration-500"
        :class="color"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label:        { type: String,  required: true },
  value:        { type: Number,  required: true },
  max:          { type: Number,  default: 100 },
  displayValue: { type: String,  required: true },
  color:        { type: String,  default: 'bg-indigo-500' }
})

const percentage = computed(() => Math.min((props.value / props.max) * 100, 100))
</script>
