<template>
  <BaseSection class="walkthrough-services-section">
    <div class="section-head">
      <h1 class="section-title">Here's what we recommend.</h1>
      <p class="section-subtitle">
        Based on your claim type, jurisdiction, and lifecycle stage. You can adjust before submitting.
      </p>
    </div>

    <template v-if="!showAllServices">
      <div class="services-grid compact">
        <BaseCard
          v-for="service in selectedServices"
          :key="service.title"
          class="service-card"
          :class="{ selected: isSelected(service.title) }"
          @click="toggleService(service.title)"
        >
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.text }}</p>
          <template v-if="service.isRecommended" #footer>
            <div class="recommended-badge">RECOMMENDED</div>
          </template>
        </BaseCard>
      </div>
    </template>

    <template v-else>
      <div v-for="category in serviceCategories" :key="category.label" class="category-block">
        <div class="category-label">{{ category.label }}</div>
        <div class="services-grid">
          <BaseCard
            v-for="service in category.services"
            :key="service.title"
            class="service-card"
            :class="{ selected: isSelected(service.title) }"
            @click="toggleService(service.title)"
          >
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.text }}</p>
            <div v-if="isSelected(service.title)" class="selected-badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <template v-if="service.isRecommended" #footer>
              <div class="recommended-badge">RECOMMENDED</div>
            </template>
          </BaseCard>
        </div>
      </div>
    </template>

    <button class="see-all-btn" type="button" @click="showAllServices = !showAllServices">
      {{ showAllServices ? 'Show less services ->' : 'See all services ->' }}
    </button>

    <div class="actions">
      <BaseButton class="build-btn" @click="$emit('build')">Build My Investigation Plan -></BaseButton>
      <BaseButton class="draft-btn" outline @click="router.push('/')">Save as Draft</BaseButton>
    </div>
  </BaseSection>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BaseSection from '@/components/BaseSection.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useClaimStore } from '@/stores/claim'
import {useRouter} from "vue-router";

defineEmits(['build', 'save-draft'])

const claimStore = useClaimStore()
const router = useRouter()

const showAllServices = ref(false)

const serviceCategories = [
  {
    label: 'BACKGROUND & RESEARCH',
    services: [
      { title: 'Background Investigation', text: 'Criminal records, employment & public records check.', isRecommended: false },
      { title: 'Background Investigation + Social Media', text: 'Full background plus deep social media review.', isRecommended: false },
      { title: 'Asset Check', text: 'Real property, vehicles & financial assets held by subject.', isRecommended: false },
      { title: 'NetSweep', text: 'Comprehensive social & internet presence scan.', isRecommended: true },
      { title: 'Social Media Only', text: 'Targeted review of subject social accounts.', isRecommended: false },
      { title: 'Claims Investigations', text: 'General review of circumstances and validity of a claim.', isRecommended: false },
      { title: 'Locate', text: 'Find current address, phone or whereabouts of a subject.', isRecommended: false },
      { title: 'Report Procurement', text: 'Obtain police, fire or other official incident reports.', isRecommended: false }
    ]
  },
  {
    label: 'SURVEILLANCE',
    services: [
      { title: 'Activity Check', text: 'Covert observation to document daily routine and activity.', isRecommended: true },
      { title: 'Surveillance - 1 Investigator', text: 'Single investigator covert surveillance.', isRecommended: false },
      { title: 'Surveillance - 2 Investigator', text: 'Two-investigator surveillance for complex subjects.', isRecommended: false },
      { title: 'Remote Controlled Surveillance (RCS)', text: 'GPS-assisted remote surveillance & tracking.', isRecommended: false },
      { title: 'True View Package', text: 'Background, remote and traditional surveillance combined.', isRecommended: false },
      { title: 'Scene Investigation', text: 'On-site inspection and photo/video of the incident location.', isRecommended: false }
    ]
  },
  {
    label: 'MEDICAL & TREATMENT',
    services: [
      { title: 'AOE/COE Investigation', text: 'Determines if injury arose out of and in course of employment.', isRecommended: true },
      { title: 'Medical Canvass with 15 locations', text: 'Canvass 15 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Medical Canvass with 20 locations', text: 'Canvass 20 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Medical Canvass with 30 locations', text: 'Canvass 30 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Medical Canvass with 40 locations', text: 'Canvass 40 medical facilities for undisclosed treatment.', isRecommended: false },
      { title: 'Dependency Check', text: 'Verifies claim dependents and benefit eligibility.', isRecommended: false },
      { title: 'Alive and Wellness Check', text: 'Confirms claimant or beneficiary is alive at reported location.', isRecommended: false }
    ]
  },
  {
    label: 'INTERVIEWS & STATEMENTS',
    services: [
      { title: 'Recorded Statement', text: 'Formal recorded interview with the claimant on the record.', isRecommended: true },
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
      { title: 'Other', text: 'Custom service request - describe in the notes.', isRecommended: false }
    ]
  }
]

const recommendedPreview = [
  { title: 'NetSweep', text: 'Comprehensive social & internet presence scan.' },
  { title: 'Activity Check', text: 'Covert observation to document daily routine and activity.' },
  { title: 'AOE/COE Investigation', text: 'Determines if injury arose out of and in course of employment.' },
  { title: 'Recorded Statement', text: 'Formal recorded interview with the claimant on the record.' }
]

const allServices = computed(() => serviceCategories.flatMap((category) => category.services))

const selectedServices = computed(() =>
  allServices.value.filter((service) => claimStore.claim.services.includes(service.title))
)

const isSelected = (title) => claimStore.claim.services.includes(title)

const toggleService = (title) => {
  const index = claimStore.claim.services.indexOf(title)
  if (index === -1) {
    claimStore.claim.services.push(title)
  } else {
    claimStore.claim.services.splice(index, 1)
  }
}

onMounted(() => {
  if (!claimStore.claim.services.length) {
    claimStore.claim.services = recommendedPreview.map((service) => service.title)
  }
})
</script>

<style scoped>
.walkthrough-services-section {
  margin-bottom: 0;
}

.section-head {
  margin-bottom: 24px;
}

.section-title {
  font-size: 46px;
  line-height: 1.12;
  color: #133b74;
  letter-spacing: -0.01em;
  max-width: 780px;
}

.section-subtitle {
  margin-top: 12px;
  font-size: 16px;
  color: var(--secondary-color);
  max-width: 760px;
}

.category-block {
  margin-bottom: 20px;
}

.category-label {
  font-size: 12px;
  letter-spacing: 0.06em;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 10px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.services-grid.compact {
  margin-bottom: 8px;
}

.service-card {
  border: 1px solid transparent;
  min-height: 170px;
  position: relative;
}

.service-card.selected {
  border-color: var(--my-primary-color);
}

.service-card :deep(.base-card-body) {
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  padding: 38px 16px;
}

.service-card :deep(.base-card-footer) {
  padding: 0 16px 14px;
}

.service-title {
  font-size: 26px;
  line-height: 1.08;
  color: #133b74;
  margin: 0;
}

.service-description {
  margin: 0;
  color: var(--secondary-color);
  font-size: 15px;
  line-height: 1.35;
}

.recommended-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: #efe8d7;
  color: #9e7b2f;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.see-all-btn {
  margin-top: 8px;
  width: 100%;
  border: none;
  background: transparent;
  color: #cda349;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
}

.actions {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.build-btn,
.draft-btn {
  width: 100%;
  min-height: 52px;
  font-weight: 700;
}

.draft-btn {
  border-color: #d5c59e;
  color: #cda349;
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

@media (max-width: 1100px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 33px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-title {
    font-size: 25px;
  }
}
</style>
