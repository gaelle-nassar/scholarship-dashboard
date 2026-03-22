<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-400">GPA</span>
    <select
      :value="modelValue.min"
      @change="emit('update:modelValue', { ...modelValue, min: $event.target.value })"
      class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
    >
      <option value="">Min</option>
      <option v-for="val in steps" :key="val" :value="val">{{ val.toFixed(1) }}</option>
    </select>
    <span class="text-gray-400 text-sm">–</span>
    <select
      :value="modelValue.max"
      @change="emit('update:modelValue', { ...modelValue, max: $event.target.value })"
      class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
    >
      <option value="">Max</option>
      <option v-for="val in steps" :key="val" :value="val">{{ val.toFixed(1) }}</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Object, default: () => ({ min: '', max: '' }) }
})
const emit = defineEmits(['update:modelValue'])

const steps = Array.from({ length: 8 }, (_, i) => parseFloat((0.5 + i * 0.5).toFixed(1)))
</script>
