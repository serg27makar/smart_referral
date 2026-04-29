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
      <h4 class="section-label">{{ activeLabel }}</h4>
    </div>
    
    <div class="header-right">
      <div class="user-profile-container">
        <div class="user-profile" @click="toggleMenu" v-click-outside="closeMenu">
          <div class="user-avatar">{{ initials }}</div>
          <span class="user-name">{{ requestorName }}</span>
          <span class="dropdown-arrow" :class="{ 'arrow-up': isMenuOpen }">▼</span>
        </div>

        <transition name="fade">
          <div v-if="isMenuOpen" class="user-menu">
            <div class="menu-item" @click="navigateTo('profile')">My Profile</div>
            <div class="menu-item" @click="navigateTo('smart-hub')">Smart Hub</div>
            <div class="menu-item" @click="navigateTo('home')">Smart Referral</div>
            <div class="menu-item" @click="navigateTo('dashboard')">My Dashboard</div>
            <div class="menu-item" @click="navigateTo('logic-data')">Logic & Data</div>
            <div class="menu-divider"></div>
            <div class="menu-item logout" @click="handleSignOut">Sign out</div>
          </div>
        </transition>
      </div>
      <button class="theme-toggle" @click="$emit('toggle-theme')">
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useClaimStore } from '@/stores/claim'

defineProps({
  isDark: Boolean
})
defineEmits(['toggle-theme'])

const router = useRouter()
const route = useRoute()
const claimStore = useClaimStore()
const requestorName = computed(() => claimStore.claim.requestorName)

const activeLabel = computed(() => {
  const routeLabels = {
    'profile': 'My Profile',
    'smart-hub': 'Smart Hub',
    'smart-referral-page': 'Smart Referral',
    'dashboard': 'My Dashboard',
    'logic-data': 'Logic & Data'
  }
  return routeLabels[route.name] || 'Smart Referral'
})

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

const navigateTo = (routeName) => {
  router.push({ name: routeName })
  closeMenu()
}

const handleSignOut = () => {
  claimStore.resetStore()
  localStorage.clear()
  router.push({ name: 'login' })
  closeMenu()
}

const initials = computed(() => {
  const name = requestorName.value
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})
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

.user-profile-container {
  position: relative;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--background-color);
  padding: 6px 12px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid var(--border-color);
}

.user-profile:hover {
  background-color: var(--background-hover-color);
}

.dropdown-arrow {
  font-size: 10px;
  color: var(--text-color);
  transition: transform 0.2s;
}

.arrow-up {
  transform: rotate(180deg);
}

.user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 11rem;
  overflow: hidden;
  z-index: 1000;
}

.menu-item {
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: var(--background-hover-color);
}

.menu-divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 4px 0;
}

.menu-item.logout {
  color: #e74c3c;
}

.menu-item.logout:hover {
  background-color: var(--background-hover-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
