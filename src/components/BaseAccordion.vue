<template>
  <div class="base-accordion">
    <div class="accordion-header" @click="isOpen = !isOpen">
      <span class="header-label">{{ label }}</span>
      <div class="header-icon" :class="{ open: isOpen }">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    <transition name="accordion">
      <div v-if="isOpen" class="accordion-content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  label: String
})

const isOpen = ref(false)
</script>

<style scoped>
.base-accordion {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  box-shadow: var(--card-shadow);
  margin-bottom: 24px;
  overflow: hidden;
  transition: all var(--transition-speed);
}

.accordion-header {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.header-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.header-icon {
  transition: transform 0.3s ease;
  color: var(--secondary-color);
}

.header-icon.open {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 24px 24px;
  border-top: 1px solid var(--background-hover-color);
}

.accordion-enter-active, .accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 500px;
}

.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
