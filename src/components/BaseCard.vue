<template>
  <div class="base-card" @click="$emit('click')">
    <div v-if="$slots.header" class="base-card-header">
      <slot name="header" />
    </div>
    <div class="base-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.base-card {
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.base-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
  background-color: var(--background-hover-color);
}

.base-card-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.base-card-header, .base-card-footer {
  padding: 0 10px 10px;
}
</style>
