<template>
  <div class="empty-page">
    <BaseButton type="secondary" outline @click="goBack">
      ← Back
    </BaseButton>
    <div class="empty-content">
      <h2>{{ title }}</h2>
      <p>This page is currently empty. Content coming soon!</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const router = useRouter()

const titles = {
  'not-sure': 'Not sure where to start',
  'walk-through': 'Walk me through it',
  'know-what-i-need': 'I know what I need'
}

const title = computed(() => {
  const segment = route.path.substring(1)
  return titles[segment] || 'Page Not Found'
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.empty-page {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.empty-content {
  text-align: center;
  margin-top: 100px;
  padding: 60px;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.empty-content h2 {
  margin-bottom: 16px;
  color: var(--my-primary-color);
}
</style>
