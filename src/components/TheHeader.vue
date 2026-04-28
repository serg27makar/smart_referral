<template>
  <header class="header">
    <div class="header-left">
      <div class="logo-container">
        <img src="@/assets/images/Advantage_Icon_GoldFoil.png" alt="Logo" class="logo-img" />
        <div class="logo-text">
          <span class="logo-line1">ADVANTAGE</span>
          <span class="logo-line2">INVESTIGETION</span>
        </div>
      </div>
    </div>
    
    <div class="header-center">
      <h4 class="section-label">Smart Referral</h4>
    </div>
    
    <div class="header-right">
      <div class="user-profile">
        <div class="user-avatar">JA</div>
        <span class="user-name">Joe Anderson</span>
      </div>
      <button class="theme-toggle" @click="$emit('toggle-theme')">
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  isDark: Boolean
})
defineEmits(['toggle-theme'])
</script>

<style scoped>
.header {
  height: 50px;
  background-color: var(--background-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color var(--transition-speed);
}

.header-left {
  flex: 1;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  font-weight: 800;
  font-size: 14px;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.logo-line1, .logo-line2 {
  white-space: nowrap;
}

.dark .logo-text {
  color: #ffffff;
}

.header-center {
  flex: 2;
  text-align: center;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 768px) {
  .header {
    padding: 0 16px;
  }

  .header-center {
    display: none;
  }

  .user-name {
    display: none;
  }

  .user-profile {
    padding: 4px;
    background-color: transparent;
  }

  .header-right {
    gap: 10px;
  }
  
  .logo-text {
    font-size: 14px;
  }
  
  .logo-img {
    height: 30px;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 30px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: var(--my-primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
  color: var(--text-color);
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.section-label {
  align-items: center;
  color: var(--secondary-color);
  font-size: 14px;
}
</style>
