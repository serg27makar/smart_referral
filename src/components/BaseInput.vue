<template>
  <div class="base-input-container">
    <label v-if="label" class="base-input-label">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="base-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.base-input-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
}

.base-input {
  padding: 12px 16px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all var(--transition-speed);
  font-size: 16px;
  outline: none;
}

.base-input:focus {
  border-color: var(--my-primary-color);
  box-shadow: 0 0 0 3px rgba(41, 129, 250, 0.2);
}

.base-input::placeholder {
  color: var(--secondary-color);
  opacity: 0.7;
}
</style>
