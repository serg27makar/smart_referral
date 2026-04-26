<template>
  <div class="know-what-need">
    <template v-if="!showSuccess">
      <template v-if="!showPlan">
        <button class="back-button" @click="goBack">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>

        <div class="page-header">
          <h1 class="page-title">New Investigation Request</h1>
          <p class="page-subtitle">Fill in the details below – select services and pricing update live at the bottom.</p>
        </div>

        <ClaimUploadSection />

        <div class="section-title">SECTION 1 – CLAIM DETAILS</div>

        <ClaimDetailsSection />

        <div class="section-title">SECTION 2 – SELECT SERVICES</div>

        <ClaimServicesSection />

        <ClaimEstimatedFooter @submit="showPlan = true" />
      </template>

      <template v-else>
        <button class="back-button" @click="goBack">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <InvestigationPlanSection @submit="handleSubmit" />
      </template>
    </template>

    <template v-else>
      <SuccessMessage />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ClaimUploadSection from '@/components/ClaimUploadSection.vue'
import ClaimDetailsSection from '@/components/ClaimDetailsSection.vue'
import ClaimServicesSection from '@/components/ClaimServicesSection.vue'
import ClaimEstimatedFooter from '@/components/ClaimEstimatedFooter.vue'
import InvestigationPlanSection from '@/components/InvestigationPlanSection.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'

const router = useRouter()
const showPlan = ref(false)
const showSuccess = ref(false)

const goBack = () => {
  if (showPlan.value) {
    showPlan.value = false
    return
  }
  router.push('/')
}

const handleSubmit = () => {
  showPlan.value = false
  showSuccess.value = true
}
</script>

<style scoped>
.know-what-need {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  padding-bottom: 140px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--my-primary-color);
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 24px;
  font-size: 16px;
  transition: opacity 0.2s;
}

.back-button:hover {
  opacity: 0.8;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--secondary-color);
}

.section-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
  margin: 40px 0 16px;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .know-what-need {
    padding-bottom: 170px;
  }
}
</style>
