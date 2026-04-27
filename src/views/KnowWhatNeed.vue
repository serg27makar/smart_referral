<template>
  <div class="page-container">
    <template v-if="!showSuccess">
      <div v-if="!showPlan" class="pb-4">
        <div class="top-bar">
          <button class="back-button" @click="goBack">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </button>

          <div class="step-indicator">
            Single Page
          </div>

        </div>


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
      </div>

      <div v-else>
        <button class="back-button" @click="goBack">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <InvestigationPlanSection @submit="handleSubmit" />
      </div>
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

@media (max-width: 768px) {
  .page-container {
    padding-bottom: 170px;
  }
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

</style>
