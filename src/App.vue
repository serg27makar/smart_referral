<template>
  <div :class="{ dark: isDark }" class="app-container">
    <router-view :is-dark="isDark" @toggle-theme="toggleTheme" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)
let mediaQuery = null

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateThemeClass()
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const updateThemeClass = () => {
  if (isDark.value) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}

const handleSystemThemeChange = (e) => {
  if (!localStorage.getItem('theme')) {
    isDark.value = e.matches
    updateThemeClass()
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // Если в localStorage ничего нет, берем системную тему
    isDark.value = mediaQuery.matches
  }
  
  updateThemeClass()

  // Слушаем изменения системной темы
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
})
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
