<template>
  <div class="base-select" v-outside-click="close">
    <label v-if="label" class="select-label">{{ label }}</label>
    <div class="select-container" @click="toggle">
      <div class="selected-value" :class="{ placeholder: !modelValue }">
        {{ modelValue || placeholder }}
      </div>
      <div class="select-arrow" :class="{ open: isOpen }">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="select-dropdown">
        <div
          v-for="option in options"
          :key="option"
          class="select-option"
          :class="{ selected: modelValue === option }"
          @click="select(option)"
        >
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  options: Array,
  label: String,
  placeholder: {
    type: String,
    default: 'Select option'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const toggle = () => isOpen.value = !isOpen.value
const close = () => isOpen.value = false
const select = (option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const vOutsideClick = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.base-select {
  position: relative;
  width: 100%;
}

.select-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
}

.select-container {
  padding: 5px 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
}

.selected-value {
  font-size: 14px;
  color: var(--text-color);
}

.selected-value.placeholder {
  color: var(--secondary-color);
}

.select-arrow {
  transition: transform 0.2s;
  color: var(--secondary-color);
}

.select-arrow.open {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;
}

.select-option {
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-color);
}

.select-option:hover {
  background-color: var(--background-hover-color);
}

.select-option.selected {
  background-color: var(--background-table-color);
  color: var(--my-primary-color);
  font-weight: 600;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
