<template>
  <div class="services-section">
    <div class="services-header">
      <h2 class="services-title">{{ title }}</h2>
      <p class="services-subtitle">{{ subtitle }}</p>
    </div>

    <div v-for="category in serviceCategories" :key="category.label" class="service-category">
      <div class="category-label">{{ category.label }}</div>
      <div class="unified-services-grid">
        <BaseCard 
          v-for="service in category.services" 
          :key="service.title"
          class="service-card-unified"
          :class="{ 'is-selected': isSelected(service.title), 'is-recommended': service.isRecommended }"
          @click="toggleService(service.title)"
        >
          <div class="card-content">
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-description">{{ service.text }}</p>
          </div>
          <div v-if="isSelected(service.title)" class="selected-badge">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <template v-if="service.isRecommended" #footer>
            <div class="recommended-badge">Recommended</div>
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
import servicesData from '@/data/services.json'

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

const getServiceData = (title, defaultText = '', defaultIsRecommended = false) => {
  const service = servicesData.find(s => s.title === title)
  return service ? {
    title: service.title,
    text: service.text || service.description,
    isRecommended: service.isRecommended
  } : {
    title,
    text: defaultText,
    isRecommended: defaultIsRecommended
  }
}

const serviceCategories = [
  {
    label: 'BACKGROUND & RESEARCH',
    services: [
      getServiceData('Background Investigation'),
      getServiceData('Background Investigation + Social Media'),
      getServiceData('Asset Check'),
      getServiceData('NetSweep'),
      getServiceData('Social Media Only'),
      getServiceData('Claims Investigations'),
      getServiceData('Locate'),
      getServiceData('Report Procurement')
    ]
  },
  {
    label: 'SURVEILLANCE',
    services: [
      getServiceData('Activity Check'),
      getServiceData('Surveillance - 1 Investigator'),
      getServiceData('Surveillance - 2 Investigator'),
      getServiceData('Remote Controlled Surveillance (RCS)'),
      getServiceData('True View Package'),
      getServiceData('Scene Investigation')
    ]
  },
  {
    label: 'MEDICAL & TREATMENT',
    services: [
      getServiceData('AOE/COE Investigation'),
      getServiceData('Medical Canvass with 15 locations'),
      getServiceData('Medical Canvass with 20 locations', 'Canvass 20 medical facilities for undisclosed treatment.'),
      getServiceData('Medical Canvass with 30 locations', 'Canvass 30 medical facilities for undisclosed treatment.'),
      getServiceData('Medical Canvass with 40 locations', 'Canvass 40 medical facilities for undisclosed treatment.'),
      getServiceData('Dependency Check'),
      getServiceData('Alive and Wellness Check')
    ]
  },
  {
    label: 'INTERVIEWS & STATEMENTS',
    services: [
      getServiceData('Recorded Statement'),
      getServiceData('Document Delivery'),
      getServiceData('Subpoena'),
      getServiceData('Subrogation')
    ]
  },
  {
    label: 'SIU & FRAUD',
    services: [
      getServiceData('SIU'),
      getServiceData('SIU Compliance'),
      getServiceData('Construction', 'On-site investigation of construction-related claims.'),
      getServiceData('Other', 'Custom service request – describe in the notes.')
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

@media (max-width: 768px) {
  .services-header {
    text-align: center;
  }
}

.services-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .services-title {
    font-size: 18px;
  }
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
