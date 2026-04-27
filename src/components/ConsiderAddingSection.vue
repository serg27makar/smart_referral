<template>
  <div class="consider-adding-section">
    <h3 class="section-title">CONSIDER ADDING</h3>
    
    <div class="cards-grid">
      <div v-for="(card, index) in claimStore.claim.suggestedServices" :key="index" class="suggested-card">
        <button class="delete-btn" @click="removeCard(index)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h4 class="card-header">{{ card.title }}</h4>
        <p class="card-description">{{ card.description }}</p>
        <p class="card-extra">{{ card.extra }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClaimStore } from '@/stores/claim'

const claimStore = useClaimStore()

const removeCard = (index) => {
  claimStore.claim.suggestedServices.splice(index, 1)
}
</script>

<style scoped>
.consider-adding-section {
  margin-top: 40px;
  padding: 0;
  /* Без рамок, фона и теней как просили */
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.suggested-card {
  position: relative;
  padding: 24px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.suggested-card:hover {
  border-color: var(--my-primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.delete-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #f5f5f5;
  color: #ff4d4f;
}

.card-header {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
  padding-right: 20px;
}

.card-description {
  font-size: 14px;
  color: var(--secondary-color);
  line-height: 1.5;
  margin-bottom: 16px;
}

.card-extra {
  font-size: 13px;
  font-weight: 500;
  color: var(--my-primary-color);
}

@media (max-width: 600px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .consider-adding-section {
    margin-top: 32px;
  }
}
</style>
