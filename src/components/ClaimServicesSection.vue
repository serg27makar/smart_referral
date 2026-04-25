<template>
  <div class="services-section">
    <div class="services-header">
      <h2 class="services-title">{{ title }}</h2>
      <p class="services-subtitle">{{ subtitle }}</p>
    </div>

    <div v-for="category in serviceCategories" :key="category.label" class="service-category">
      <div class="category-label">{{ category.label }}</div>
      <div class="services-grid">
        <BaseCard 
          v-for="service in category.services" 
          :key="service.title"
          :class="{ 'is-selected': isSelected(service.title), 'is-recommended': service.isRecommended }"
          @click="toggleService(service.title)"
        >
          <div class="card-content">
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-text">{{ service.text }}</p>
          </div>
          <div v-if="isSelected(service.title)" class="selected-badge">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <template v-if="service.isRecommended" #footer>
            <div class="recommended-badge-container">
              <span class="badge-text">Recommended</span>
            </div>
          </template>
        </BaseCard>
      </div>
    </div>

    <div v-if="budgetEnabled" class="budget-section">
      <div class="category-label">$ BUDGET & TIMELINE (OPTIONAL)</div>
      <div class="budget-grid">
        <BaseInput 
          v-model.number="claimStore.claim.budgetHours" 
          label="Budget Hours" 
          type="number" 
        />
        <BaseInput 
          v-model.number="claimStore.claim.budget" 
          label="Budget $" 
          type="number" 
          step="0.01"
        />
        <BaseInput 
          v-model="claimStore.claim.dueDate" 
          label="Due Date" 
          type="date" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClaimStore } from '@/stores/claim'
import BaseCard from '@/components/BaseCard.vue'
import BaseInput from '@/components/BaseInput.vue'

const claimStore = useClaimStore()

defineProps({
  title: {
    type: String,
    default: 'Choose the services for this investigation'
  },
  subtitle: {
    type: String,
    default: 'Grouped by category. Click and tile to add or remove it from your plan.'
  },
  budgetEnabled: {
    type: Boolean,
    default: true
  }
})

const serviceCategories = [
  {
    label: 'BACKGROUND & RESEARCH',
    services: [
      { title: 'Background Investigation', text: 'Criminal records, employment & public records check.', isRecommended: false },
      { title: 'Background Investigation + Social Media', text: 'Full background plus deep social media review.', isRecommended: true },
      { title: 'Asset Check', text: 'Real property, vehicles & financial assets held by subject.', isRecommended: false },
      { title: 'NetSweep', text: 'Comprehensive social & internet presence scan.', isRecommended: false },
      { title: 'Social Media Only', text: 'Targeted review of subject’s social accounts.', isRecommended: false },
      { title: 'Claims Investigations', text: 'General review of circumstances and validity of a claim.', isRecommended: false },
      { title: 'Locate', text: 'Find current address, phone or whereabouts of a subject.', isRecommended: false },
      { title: 'Report Procurement', text: 'Obtain police, fire or other official incident reports.', isRecommended: false }
    ]
  },
  {
    label: 'SURVEILLANCE',
    services: [
      { title: 'Activity Check', text: 'Covert observation to document daily routine and activity.', isRecommended: false },
      { title: 'Surveillance – 1 Investigator', text: 'Single investigator covert surveillance.', isRecommended: false },
      { title: 'Surveillance – 2 Investigator', text: 'Two-investigator surveillance for complex subjects.', isRecommended: false },
      { title: 'Remote Control Surveillance (RSC)', text: 'GPS-assisted remote surveillance & tracking.', isRecommended: false },
      { title: 'True View Package', text: 'Background, remote and traditional surveillance combined.', isRecommended: true },
      { title: 'Scene Investigation', text: 'On-site inspection and photo/video of the incident location.', isRecommended: false }
    ]
  },
  {
    label: 'MEDICAL & TREATMENT',
    services: [
      { title: 'AOE/COE Investigation', text: 'Determines if injury arose out of and in course of employment.', isRecommended: false },
      { title: 'Medical Canvass with 15 locations', text: 'Canvass 15 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Medical Canvass with 20 locations', text: 'Canvass 20 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Medical Canvass with 30 locations', text: 'Canvass 30 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Medical Canvass with 40 locations', text: 'Canvass 40 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Dependency check', text: 'Verifies claim dependents and benefit eligibility.', isRecommended: false },
      { title: 'Alive and Wellness Check', text: 'Confirms claimant or beneficiary is alive at reported location.', isRecommended: false }
    ]
  },
  {
    label: 'INTERVIEWS & STATEMENTS',
    services: [
      { title: 'Recorder Statement', text: 'Formal recorded interview with the claimant on the record.', isRecommended: false },
      { title: 'Document Delivery', text: 'Secure hand-delivery of legal or investigative documents.', isRecommended: false },
      { title: 'Subpoena', text: 'Service of legal subpoenas to individuals or organizations.', isRecommended: false },
      { title: 'Subrogation', text: 'Identifies third-party liability to support cost recovery.', isRecommended: false }
    ]
  },
  {
    label: 'SIU & FRAUD',
    services: [
      { title: 'SIU', text: 'Special Investigations Unit referral for suspected fraud.', isRecommended: false },
      { title: 'SIU Compliance', text: 'Ensures investigation meets SIU regulatory requirements.', isRecommended: false },
      { title: 'Construction', text: 'On-site investigation of construction-related claims.', isRecommended: false },
      { title: 'Other', text: 'Custom service request – describe in the notes.', isRecommended: false }
    ]
  }
]

const isSelected = (title) => {
  return claimStore.claim.services.includes(title)
}

const toggleService = (title) => {
  const index = claimStore.claim.services.indexOf(title)
  if (index === -1) {
    claimStore.claim.services.push(title)
  } else {
    claimStore.claim.services.splice(index, 1)
  }
}
</script>

<style scoped>
.services-section {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 24px;
}

.services-header {
  margin-bottom: 32px;
}

.services-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.services-subtitle {
  font-size: 14px;
  color: var(--secondary-color);
}

.service-category {
  margin-bottom: 32px;
}

.category-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--background-hover-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.base-card {
  position: relative;
  text-align: left;
  height: 100%;
}

.base-card.is-selected {
  border: 2px solid var(--my-primary-color);
  background-color: var(--background-table-color);
}

.base-card.is-recommended {
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.base-card.is-selected.is-recommended {
  border: 2px solid var(--my-primary-color);
}

.base-card :deep(.base-card-body) {
  padding: 20px;
  align-items: flex-start;
  text-align: left;
}

.base-card :deep(.base-card-footer) {
  padding: 0 20px 20px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.card-text {
  font-size: 13px;
  color: var(--secondary-color);
  line-height: 1.4;
}

.selected-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: var(--my-primary-color);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.recommended-badge-container {
  display: flex;
  justify-content: flex-end;
}

.badge-text {
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3);
}

.is-selected .badge-text {
}

.budget-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

@media (min-width: 768px) {
  .budget-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.budget-section {
  margin-top: 40px;
}
</style>
