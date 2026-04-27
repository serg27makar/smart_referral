<template>
  <button
    class="base-button"
    :class="[type, { outline }]"
    :type="nativeType"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary' // primary, secondary, danger, success
  },
  nativeType: {
    type: String,
    default: 'button'
  },
  outline: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.base-button {
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-speed);
  border: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.base-button:active {
  transform: scale(0.98);
}

.primary {
  background-color: var(--my-primary-color);
  color: white;
}
.primary:hover {
  filter: brightness(1.1);
  box-shadow: 0 2px 8px rgba(41, 129, 250, 0.4);
}

.secondary {
  background-color: var(--secondary-color);
  color: white;
}
.secondary:hover {
  filter: brightness(1.1);
}

.outline-primary {
  background-color: transparent;
  border-color: var(--my-primary-color);
  color: var(--my-primary-color);
}
.outline-primary:hover {
  background-color: var(--my-primary-color);
  color: white;
}
</style>
