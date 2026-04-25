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
      <div class="info-row">
        <div class="info-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div class="info-text">
          Based on Nationwide’s configuration, these services are pre-approved within your carrier’s program. No additional authorization required.
        </div>
      </div>

      <div class="info-row warning">
        <div class="info-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
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
import { ref, reactive } from 'vue'
import AddServicesModal from './AddServicesModal.vue'

const showModal = ref(false)

const planServices = reactive([
  {
    title: 'AOE/COE Investigation',
    description: 'Establishes whether the injury occurred during the scope of employment.',
    isRecommended: true,
    recommendedText: 'State-mandated for California WC claims.',
    extraText: 'Ordered in 94% of California WC claims at initial and active stages.',
    metric: '94% of CA WC claims',
    showMore: false
  },
  {
    title: 'Activity Check – Field Surveillance',
    description: 'Covert field observation to document claimant’s physical activity and capabilities.',
    isRecommended: false,
    recommendedText: 'Recommended to verify self-reported physical limitations.',
    extraText: 'Highly effective for identifying activity inconsistencies.',
    metric: '78% similar claims',
    showMore: false
  },
  {
    title: 'Social Media Investigation (NetSwep)',
    description: 'Comprehensive social media and digital footprint analysis across all major platforms.',
    isRecommended: false,
    recommendedText: 'Recommended when physical activity inconsistency is suspected.',
    extraText: 'Can reveal public activities inconsistent with claim details.',
    metric: '67% similar claims',
    showMore: false
  },
  {
    title: 'Recorded Statement',
    description: 'Formal recorded interview with claimant to document their account on record.',
    isRecommended: true,
    recommendedText: 'Recommended for memorializing early claimant testimony.',
    extraText: 'Reduces likelihood of litigation by 82% when taken within 48 hours.',
    metric: '82% avoided litigation',
    showMore: false
  },
  {
    title: 'Background Investigation',
    description: 'Full background check including employment history, criminal records, and financial status.',
    isRecommended: false,
    descriptionShort: 'Full background check.',
    metric: '35% relevant info',
    showMore: false
  },
  {
    title: 'Medical Records Review',
    description: 'Comprehensive review of claimant’s medical history and treatment records.',
    isRecommended: false,
    recommendedText: 'Recommended for identifying pre-existing conditions.',
    extraText: 'Identifies relevant prior medical history in 72% of cases.',
    metric: '72% of flagged claims',
    showMore: false
  }
])

const removeService = (title) => {
  const index = planServices.findIndex(s => s.title === title)
  if (index !== -1) {
    planServices.splice(index, 1)
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

.service-card {
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
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
  display: flex;
  align-items: center;
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
</style>
