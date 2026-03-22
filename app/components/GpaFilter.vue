<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
  >
    <option value="">All GPAs</option>
    <option value="3.5">3.5 and above</option>
    <option value="3.0">3.0 and above</option>
    <option value="2.5">2.5 and above</option>
  </select>
</template>

<script setup>
defineProps({ modelValue: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>
