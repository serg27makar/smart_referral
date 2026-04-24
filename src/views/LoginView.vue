<template>
  <div class="login-page">
    <BaseCard class="login-card">
      <div class="brand">
        <img src="@/assets/images/Advantage_Icon_GoldFoil.png" alt="Advantage logo" class="brand-logo" />
        <div class="brand-text">
          <div class="brand-title">ADVANTAGE</div>
          <div class="brand-subtitle">INVESTIGATIONS</div>
        </div>
      </div>

      <h1 class="page-title">Smart Referral</h1>
      <p class="page-subtitle">
        Intelligent investigation intake for claims professionals
      </p>

      <div class="login-form">
        <div class="input-wrap">
          <BaseInput
            v-model="loginInput"
            placeholder="exemple@advantage"
            @keyup.enter="handleLogin"
          />
        </div>

        <BaseButton class="login-btn" @click="handleLogin">
          Continue
        </BaseButton>
      </div>

      <p class="page-footer">Your experience is configured for your organization</p>
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
    localStorage.setItem('isLoggedIn', 'true')
    sessionStorage.setItem('showGreeting', 'true')
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 100vh;
  box-sizing: border-box;
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 28px;
  cursor: default !important;
  padding: 1.2rem;
}

.login-card:hover {
  transform: none !important;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.brand-logo {
  height: 44px;
  width: auto;
}

.brand-text {
  line-height: 1.1;
  letter-spacing: 0.08em;
}

.brand-title {
  font-size: 26px;
  font-weight: 700;
  color: #133b74;
}

.brand-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #133b74;
}

.page-title {
  text-align: center;
  line-height: 1.05;
  font-weight: 700;
  color: #0b2f63;
  margin-bottom: 14px;
}

.page-subtitle {
  max-width: 320px;
  text-align: center;
  line-height: 1.2;
  color: var(--secondary-color);
}

.login-form {
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-wrap {
  position: relative;
}

.input-wrap :deep(input) {
  border: 2px solid #cda349 !important;
  font-weight: 500;
  color: var(--text-color);
  box-sizing: border-box;
}

.page-footer {
  margin-top: 26px;
  text-align: center;
  color: var(--secondary-color);
  font-size: 16px;
}

@media (max-width: 480px) {
  .login-card {
    border-radius: 20px;
    padding: 1rem;
  }

  .page-title {
    font-size: 22px;
  }

  .brand-title {
    font-size: 22px;
  }
}

</style>
