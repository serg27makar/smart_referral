<template>
  <button
    type="button"
    class="base-radio-button"
    :class="{ active: modelValue === value }"
    @click="$emit('update:modelValue', value)"
    :disabled="readOnly"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  modelValue: [String, Number, Boolean],
  value: [String, Number, Boolean],
  label: String,
  readOnly: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-radio-button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  white-space: nowrap;
}

.base-radio-button:hover {
  border-color: var(--my-primary-color);
  background-color: var(--background-hover-color);
}

.base-radio-button.active {
  background-color: var(--my-primary-color);
  border-color: var(--my-primary-color);
  color: white;
}
</style>
