<template>
  <div class="login-page">
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseCard from '@/components/BaseCard.vue'

const router = useRouter()
const loginInput = ref('')

const handleLogin = () => {
  if (loginInput.value.trim()) {
    // В будущем здесь будет реальная авторизация
    localStorage.setItem('isLoggedIn', 'true')
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
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
</style>
