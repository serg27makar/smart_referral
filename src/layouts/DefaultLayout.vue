<template>
  <div class="default-layout">
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
import TheHeader from '@/components/TheHeader.vue'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
