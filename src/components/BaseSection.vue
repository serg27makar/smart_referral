<template>
  <div class="base-section">
    <div v-if="label" class="section-label">
      <div v-if="$slots.icon" class="section-icon">
        <slot name="icon" />
      </div>
      <span class="label-text">{{ label }}</span>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String
})
</script>

<style scoped>
.base-section {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 24px;
  transition: all var(--transition-speed);
}

.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--background-hover-color);
  padding-bottom: 12px;
}

.label-text {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-icon {
  color: var(--my-primary-color);
  display: flex;
  align-items: center;
}

.section-content {
  display: flex;
  flex-direction: column;
}
</style>
