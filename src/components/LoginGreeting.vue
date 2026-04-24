<template>
  <transition name="fade-overlay" @after-leave="afterLeave">
    <div v-if="visible" class="greeting-overlay">
      <div class="greeting-content">
        <h1 class="welcome-text">Welcome back, {{ claimStore.claim.requestorName }}</h1>
        <p class="client-text">{{ claimStore.claim.clientName + ", " + claimStore.claim.typeOfClaim + " Desk" }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClaimStore } from '@/stores/claim'

const claimStore = useClaimStore()
const visible = ref(true)

const emit = defineEmits(['animation-end'])

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 2000)
})

const afterLeave = () => {
  emit('animation-end')
}
</script>

<style scoped>
.greeting-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
}

.greeting-content {
  text-align: center;
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.welcome-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: #133b74;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.client-text {
  font-size: 1.25rem;
  color: #cda349;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.5s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>
