<template>
  <div class="default-layout">
    <LoginGreeting v-if="showGreeting" @animation-end="handleGreetingEnd" />
    <TheHeader :is-dark="isDark" @toggle-theme="$emit('toggle-theme')" />
    <main class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import LoginGreeting from '@/components/LoginGreeting.vue'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const showGreeting = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('showGreeting') === 'true') {
    showGreeting.value = true
  }
})

const handleGreetingEnd = () => {
  showGreeting.value = false
  sessionStorage.removeItem('showGreeting')
}
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
