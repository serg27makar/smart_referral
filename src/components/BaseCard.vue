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
  box-shadow: var(--box-shadow);
  transition: all var(--transition-speed);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.base-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  background-color: var(--background-hover-color);
}

.base-card-body {
  padding: 24px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.base-card-header, .base-card-footer {
  padding: 16px 24px;
}
</style>
