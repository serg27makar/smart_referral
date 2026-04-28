<template>
  <div>
    <div v-if="!isSuccess" class="page-container">
      <div class="top-bar">
        <button class="back-button" @click="goBack">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <div class="step-indicator">Step {{ currentStep }} of 5</div>
      </div>

      <div v-if="currentStep === 1 && showBanner && !showPlan" class="info-box">
        <span class="info-content">
          Welcome back, {{ claimStore.claim.requestorName }} - we have pre-filled what we know about you.
        </span>
        <button class="banner-close" type="button" aria-label="Close" @click="showBanner = false">x</button>
      </div>

      <div v-if="currentStep >= 2 && !showPlan" class="profile-chips">
        <div class="profile-chip">
          <span class="chip-step">1</span>
          <span class="chip-tag">YOU</span>
          <span class="chip-text">{{ claimStore.claim.requestorName }} - {{ claimStore.claim.clientName }}</span>
          <button class="chip-edit" type="button" @click="currentStep = 1">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>
        </div>

        <div v-if="currentStep >= 3" class="profile-chip">
          <span class="chip-step">2</span>
          <span class="chip-tag">CLAIM TYPE</span>
          <span class="chip-text">{{ claimStore.claim.typeOfClaim }}</span>
          <button class="chip-edit" type="button" @click="currentStep = 1">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>
        </div>

        <div v-if="currentStep >= 4" class="profile-chip">
          <span class="chip-step">3</span>
          <span class="chip-tag">JURISDICTION</span>
          <span class="chip-text">{{ jurisdictionSummary }}</span>
          <button class="chip-edit" type="button" @click="currentStep = 1">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>
        </div>

        <div v-if="currentStep >= 5" class="profile-chip">
          <span class="chip-step">4</span>
          <span class="chip-tag">DATE OF LOSS</span>
          <span class="chip-text">{{ lossDateSummary }}</span>
          <button class="chip-edit" type="button" @click="currentStep = 1">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>
        </div>
      </div>

      <template v-if="!showPlan">
        <WalkThroughBasicsSection v-if="currentStep === 1" @continue="goToStep(2)" />
        <WalkThroughClaimTypeSection v-if="currentStep === 2" @continue="goToStep(3)" />
        <WalkThroughLocationSection v-if="currentStep === 3" @continue="goToStep(4)" />
        <WalkThroughLossDateSection v-if="currentStep === 4" @continue="goToStep(5)" />
        <WalkThroughServicesSection v-if="currentStep === 5" @build="showPlan = true" />
      </template>

      <template v-else>
        <InvestigationPlanSection @submit="handlePlanSubmit" />
      </template>
    </div>

    <div v-else>
      <SuccessMessage />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClaimStore } from '@/stores/claim'
import WalkThroughBasicsSection from '@/components/WalkThroughBasicsSection.vue'
import WalkThroughClaimTypeSection from '@/components/WalkThroughClaimTypeSection.vue'
import WalkThroughLocationSection from '@/components/WalkThroughLocationSection.vue'
import WalkThroughLossDateSection from '@/components/WalkThroughLossDateSection.vue'
import WalkThroughServicesSection from '@/components/WalkThroughServicesSection.vue'
import InvestigationPlanSection from '@/components/InvestigationPlanSection.vue'
import SuccessMessage from "@/components/SuccessMessage.vue";

const router = useRouter()
const claimStore = useClaimStore()
const showBanner = ref(true)
const currentStep = ref(1)
const showPlan = ref(false)
const isSuccess = ref(false)

const stateCodeMap = {
  California: 'CA',
  'New York': 'NY',
  Texas: 'TX',
  Florida: 'FL',
  Maryland: 'MD',
  Ohio: 'OH',
  Pennsylvania: 'PA'
}

const jurisdictionSummary = computed(() => {
  const state = claimStore.claim.state
  const county = claimStore.claim.county
  if (!state || !county) {
    return 'Not selected'
  }

  const stateCode = stateCodeMap[state] ?? state
  return `${stateCode} - ${county}`
})

const lossDateSummary = computed(() => {
  if (!claimStore.claim.dateOfInjury) {
    return 'Not selected'
  }

  const lifecycle = getLifecycleLabel(claimStore.claim.dateOfInjury)
  return `${claimStore.claim.dateOfInjury} - ${lifecycle}`
})

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    return
  }

  router.push('/')
}

const goToStep = (step) => {
  currentStep.value = step
}

const handlePlanSubmit = () => {
  isSuccess.value = true
}

const getLifecycleLabel = (date) => {
  const lossDate = new Date(date)
  if (Number.isNaN(lossDate.getTime())) {
    return 'Early Investigation'
  }

  const now = new Date()
  const diffMs = now.getTime() - lossDate.getTime()
  const monthMs = 1000 * 60 * 60 * 24 * 30.44
  const monthsOld = Math.max(0, Math.round(diffMs / monthMs))

  if (monthsOld <= 2) {
    return 'Early Investigation'
  }
  if (monthsOld <= 6) {
    return 'Active Investigation'
  }
  return 'Late Investigation'
}
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--my-primary-color);
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;
}

.back-button:hover {
  opacity: 0.8;
}

.profile-chips {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}

.profile-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--background-color);
}

.chip-step {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--secondary-color);
  background-color: var(--background-table-color);
}

.chip-tag {
  font-size: 13px;
  font-weight: 700;
  color: var(--secondary-color);
  letter-spacing: 0.04em;
}

.chip-text {
  flex: 1;
  color: var(--text-color);
  font-weight: 600;
  font-size: 15px;
}

.chip-edit {
  border: none;
  background: transparent;
  color: var(--my-primary-color);
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  transition: opacity 0.2s;
}

.info-box {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--background-table-color);
  border-left: 4px solid var(--my-primary-color);
  border-radius: 4px;
}

.info-content {
  font-size: 14px;
  color: var(--secondary-color);
}

.info-box .banner-close {
  border: none;
  background: transparent;
  color: var(--secondary-color);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  margin-left: auto;
}

@media (max-width: 768px) {
  .top-bar {
    margin-bottom: 16px;
  }

  .profile-chip {
    gap: 8px;
    flex-wrap: wrap;
  }

  .chip-edit {
    margin-left: auto;
  }
}
</style>
