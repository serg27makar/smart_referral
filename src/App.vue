<template>
  <div :class="{ dark: isDark }" class="app-container">
    <transition name="fade" mode="out-in">
      <!-- Страница логина -->
      <div v-if="!isLoggedIn" class="login-page">
        <BaseCard class="login-card">
          <template #header>
            <div class="login-header">
              <img src="@/assets/images/Advantage_Icon_GoldFoil.png" alt="Logo" class="login-logo" />
              <h2>Welcome Back</h2>
            </div>
          </template>
          
          <div class="login-form">
            <BaseInput
              v-model="loginInput"
              label="Username or Email"
              placeholder="Enter your name..."
              @keyup.enter="handleLogin"
            />
            <BaseButton class="login-btn" @click="handleLogin">
              Continue
            </BaseButton>
          </div>
        </BaseCard>
      </div>

      <!-- Основной контент -->
      <div v-else class="main-layout">
        <TheHeader :is-dark="isDark" @toggle-theme="toggleTheme" />
        
        <main class="content">
          <transition name="fade" mode="out-in">
            <div v-if="!currentPath" class="cards-grid">
              <BaseCard v-for="card in cards" :key="card.text" @click="navigateTo(card.path)">
                <h3>{{ card.text }}</h3>
              </BaseCard>
            </div>
            
            <div v-else class="empty-page">
              <BaseButton type="secondary" outline @click="navigateTo('')">
                ← Back
              </BaseButton>
              <div class="empty-content">
                <h2>{{ currentPathName }}</h2>
                <p>This page is currently empty. Content coming soon!</p>
              </div>
            </div>
          </transition>
        </main>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TheHeader from './components/TheHeader.vue'
import BaseButton from './components/BaseButton.vue'
import BaseInput from './components/BaseInput.vue'
import BaseCard from './components/BaseCard.vue'

const isDark = ref(false)
const isLoggedIn = ref(false)
const loginInput = ref('')
const currentPath = ref('')

const cards = [
  { text: 'Not sure where to start', path: 'not-sure' },
  { text: 'Walk me through it', path: 'walk-through' },
  { text: 'I know what I need', path: 'know-what-i-need' }
]

const currentPathName = computed(() => {
  const card = cards.find(c => c.path === currentPath.value)
  return card ? card.text : ''
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
}

const handleLogin = () => {
  if (loginInput.value.trim()) {
    isLoggedIn.value = true
  }
}

const navigateTo = (path) => {
  currentPath.value = path
}
</script>

<style>
/* Глобальные стили анимаций */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, var(--background-table-color) 0%, var(--root-background-color) 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  cursor: default !important;
}

.login-card:hover {
  transform: none !important;
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-logo {
  height: 80px;
  margin-bottom: 16px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.login-btn {
  width: 100%;
  padding: 14px !important;
}

.main-layout {
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

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

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
