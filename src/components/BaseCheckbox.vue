<template>
  <div class="base-checkbox" @click="$emit('update:modelValue', !modelValue)">
    <div class="checkbox-box" :class="{ checked: modelValue }">
      <svg v-if="modelValue" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="checkbox-label" v-if="label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  label: String
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  transition: all 0.2s;
  color: white;
}

.checkbox-box.checked {
  background-color: var(--my-primary-color);
  border-color: var(--my-primary-color);
}

.checkbox-label {
  font-size: 14px;
  color: var(--text-color);
}
</style>
