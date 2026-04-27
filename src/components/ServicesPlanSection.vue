<template>
  <div class="services-plan-section">
    <div class="services-header">
      <span class="section-label">SERVICES</span>
      <button class="add-more-btn" @click="showModal = true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add More Services
      </button>
    </div>

    <div class="info-blocks">
      <div class="info-box">
        <div class="info-content">
          Based on Nationwide’s configuration, these services are pre-approved within your carrier’s program. No additional authorization required.
        </div>
      </div>

      <div class="info-box">
        <div class="info-content">
          <div class="info-title">STATE RESTRICTIONS – CALIFORNIA</div>
          <div class="info-text">
            California restricts certain vehicle-related and legal process services for WC claims. AOE/COE investigation is mandated.
          </div>
        </div>
      </div>
    </div>

    <div class="services-grid">
      <div v-for="(service, index) in planServices" :key="service.title" class="service-card">
        <div class="card-header">
          <div class="index-badge">{{ index + 1 }}</div>
          <h3 class="card-title">{{ service.title }}</h3>
          <button class="remove-btn" @click="removeService(service.title)">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <p class="card-description">{{ service.description }}</p>

        <div class="recommended-section" :class="{ active: service.isRecommended }">
          <div class="recommended-top">
            <div class="recommended-toggle" @click="service.showMore = !service.showMore">
              <span class="recommend-star" v-if="service.isRecommended">★</span>
              <span class="recommend-label">Recommended</span>
            </div>
            <div class="recommended-metric" v-if="service.metric">
              {{ service.metric }}
            </div>
          </div>
          
          <div v-if="service.isRecommended" class="recommended-details">
            <p class="rec-text">{{ service.recommendedText }}</p>
          </div>
          <div class="recommended-details">
            <p v-if="service.showMore && service.extraText" class="extra-text">
              {{ service.extraText }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <AddServicesModal v-model="showModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useClaimStore } from '@/stores/claim'
import AddServicesModal from './AddServicesModal.vue'
import servicesData from '@/data/services.json'

const showModal = ref(false)
const claimStore = useClaimStore()

const planServices = computed(() => {
  return claimStore.claim.services.map(title => {
    const service = servicesData.find(s => s.title === title)
    return service ? { ...service } : { title, description: '', showMore: false }
  })
})

const removeService = (title) => {
  const index = claimStore.claim.services.indexOf(title)
  if (index !== -1) {
    claimStore.claim.services.splice(index, 1)
  }
}
</script>

<style scoped>
.services-plan-section {
  margin-top: 40px;
}

.services-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

@media (max-width: 600px) {
  .services-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.section-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.add-more-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--my-primary-color);
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-more-btn:hover {
  opacity: 0.8;
}

.info-blocks {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.info-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  background-color: #def6fd;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.info-icon {
  color: var(--my-primary-color);
  flex-shrink: 0;
  margin-top: 2px;
}

.info-text {
  font-size: 14px;
  color: var(--secondary-color);
  line-height: 1.5;
}

.warning .info-icon {
  color: var(--warning-color);
}

.info-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 2px;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 800px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card-title {
    white-space: normal;
    height: auto;
    line-height: 1.3;
    overflow: visible;
    text-overflow: clip;
  }

  .card-description {
    -webkit-line-clamp: unset;
    height: auto;
  }
}

.service-card {
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.service-card:hover {
  box-shadow: var(--card-shadow);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  position: relative;
}

.index-badge {
  background: var(--background-hover-color);
  color: var(--secondary-color);
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 24px;
  display: block;
  line-height: 24px;
  min-width: 0;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
  flex-shrink: 0;
}

.remove-btn:hover {
  color: var(--danger-color);
}

.card-description {
  font-size: 14px;
  color: var(--secondary-color);
  line-height: 1.5;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 42px; /* 14px * 1.5 * 2 */
}

.recommended-section {
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
}

.recommended-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.recommended-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--secondary-color);
  cursor: pointer;
}

.recommended-section.active .recommended-toggle {
  color: var(--success-color);
}

.recommend-star {
  font-size: 14px;
}

.recommended-metric {
  font-size: 12px;
  font-weight: 700;
  color: var(--my-primary-color);
  background: var(--background-table-color);
  padding: 4px 8px;
  border-radius: 4px;
}

.recommended-details {
  margin-top: 8px;
}

.rec-text {
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
}

.extra-text {
  margin-top: 4px;
  font-size: 12px;
  color: var(--secondary-color);
  font-style: italic;
}

.info-box {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: var(--background-table-color);
  border-left: 4px solid var(--my-primary-color);
  border-radius: 4px;
}

.info-content {
  font-size: 14px;
  color: var(--secondary-color);
}
</style>
