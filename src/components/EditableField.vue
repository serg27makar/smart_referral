<template>
  <div class="editable-field">
    <label class="field-label">{{ label }}</label>
    <div class="field-content">
      <div v-if="!isEditing" class="display-value" @click="startEditing">
        <span class="value-text">{{ modelValue || '—' }}</span>
        <button class="edit-btn">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </div>
      <input
        v-else
        ref="inputRef"
        :value="modelValue"
        class="edit-input"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="stopEditing"
        @keyup.enter="stopEditing"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

defineProps({
  label: String,
  modelValue: [String, Number]
})

defineEmits(['update:modelValue'])

const isEditing = ref(false)
const inputRef = ref(null)

const startEditing = async () => {
  isEditing.value = true
  await nextTick()
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const stopEditing = () => {
  isEditing.value = false
}
</script>

<style scoped>
.editable-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 13px;
  color: var(--secondary-color);
  font-weight: 500;
  text-transform: uppercase;
}

.field-content {
  min-height: 40px;
  display: flex;
  align-items: center;
}

.display-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid transparent;
}

.display-value:hover .value-text {
  color: var(--my-primary-color);
}

.value-text {
  font-size: 16px;
  color: var(--text-color);
  font-weight: 400;
}

.edit-btn {
  background: none;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
}

.edit-btn:hover {
  opacity: 1;
  color: var(--my-primary-color);
}

.edit-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid var(--my-primary-color);
  border-radius: var(--border-radius);
  background: var(--background-color);
  color: var(--text-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(41, 129, 250, 0.1);
}
</style>
