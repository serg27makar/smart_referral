<template>
  <div class="home-view">
    <div class="home-header">
      <h1>How would you like to get started?</h1>
      <p>Choose the approach that fits how you work today.</p>
    </div>

    <div class="cards-grid">
      <BaseCard 
        v-for="card in cards" 
        :key="card.title" 
        @click="navigateTo(card.path)"
        :class="{ 'recommended-card': card.isRecommended }"
      >
        <div class="card-top-row">
          <div class="card-icon" v-html="card.icon"></div>
          <div v-if="card.isRecommended" class="recommended-badge">
            <span class="badge-text">Recommended</span>
            <span class="badge-subtext">Based on your history</span>
          </div>
        </div>
        <h3>{{ card.title }}</h3>
        <p class="card-description">{{ card.description }}</p>
        <BaseButton class="card-button" @click.stop="navigateTo(card.path)">
          {{ card.buttonText }}
        </BaseButton>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const icons = {
  upload: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`,
  compass: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
  lightning: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
}

const cards = [
  { 
    title: 'Not sure where to start', 
    description: 'Upload your claim documents and we’ll extract the details and build your investigation plan.',
    buttonText: 'Upload Files',
    path: '/not-sure',
    icon: icons.upload
  },
  { 
    title: 'Walk me through it', 
    description: 'Answer a few questions about your claim and we’ll recommend the right investigation plan.',
    buttonText: 'Guided Intake',
    path: '/walk-through',
    icon: icons.compass
  },
  { 
    title: 'I know what I need', 
    description: 'I’m familiar with investigative services and ready to build my order directly.',
    buttonText: 'Get started',
    path: '/know-what-i-need',
    icon: icons.lightning,
    isRecommended: true
  },
]

const navigateTo = (path) => {
  if (path === '/logout') {
    localStorage.removeItem('isLoggedIn')
    router.push('/auth/login')
    return
  }
  router.push(path)
}
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.home-header {
  text-align: center;
  margin-bottom: 50px;
}

.home-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-color);
}

.home-header p {
  font-size: 1.2rem;
  color: var(--secondary-color);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
}

.card-icon {
  color: var(--my-primary-color);
  background-color: rgba(41, 129, 250, 0.1);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 5px rgba(41, 129, 250, 0.25);
}

.base-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.recommended-badge {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.badge-text {
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 10px rgba(255, 140, 0, 0.3);
  animation: pulse 2s infinite;
}

.badge-subtext {
  font-size: 0.65rem;
  color: var(--secondary-color);
  margin-top: 4px;
  font-weight: 500;
}

.recommended-card {
  border: 1px solid rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.recommended-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%);
  pointer-events: none;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.card-description {
  color: var(--secondary-color);
  font-size: 1rem;
  line-height: 1.5;
  flex: 1;
}

.card-button {
  width: 100%;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .home-header h1 {
    font-size: 1.8rem;
  }
  
  .home-header p {
    font-size: 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
