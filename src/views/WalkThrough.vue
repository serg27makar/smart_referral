<template>
  <div class="walkthrough-page">
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

    <div v-if="currentStep === 1 && showBanner" class="welcome-banner">
      <span class="banner-icon">*</span>
      <span class="banner-text">
        Welcome back, {{ claimStore.claim.requestorName }} - we have pre-filled what we know about you.
      </span>
      <button class="banner-close" type="button" aria-label="Close" @click="showBanner = false">x</button>
    </div>

    <div v-if="currentStep === 2" class="profile-chip">
      <span class="chip-step">1</span>
      <span class="chip-tag">YOU</span>
      <span class="chip-text">{{ claimStore.claim.requestorName }} · {{ claimStore.claim.clientName }}</span>
      <button class="chip-edit" type="button" @click="currentStep = 1">Edit</button>
    </div>

    <WalkThroughBasicsSection v-if="currentStep === 1" @continue="goToStep(2)" />
    <WalkThroughClaimTypeSection v-if="currentStep === 2" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClaimStore } from '@/stores/claim'
import WalkThroughBasicsSection from '@/components/WalkThroughBasicsSection.vue'
import WalkThroughClaimTypeSection from '@/components/WalkThroughClaimTypeSection.vue'

const router = useRouter()
const claimStore = useClaimStore()
const showBanner = ref(true)
const currentStep = ref(2)

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
</script>

<style scoped>
.walkthrough-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

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

.step-indicator {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  padding: 8px 14px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--background-color);
}

.welcome-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #efe8d7;
  border: 1px solid #d5c59e;
  border-radius: 12px;
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
  margin-bottom: 18px;
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
  color: #6c5a2c;
  background: #efe8d7;
}

.chip-tag {
  font-size: 13px;
  font-weight: 700;
  color: var(--secondary-color);
  letter-spacing: 0.04em;
}

.chip-text {
  flex: 1;
  color: #133b74;
  font-weight: 600;
  font-size: 15px;
}

.chip-edit {
  border: none;
  background: transparent;
  color: #cda349;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
}

.banner-icon {
  color: #cda349;
  font-size: 14px;
}

.banner-text {
  font-size: 15px;
  color: #665939;
  font-weight: 500;
  flex: 1;
}

.banner-close {
  border: none;
  background: transparent;
  color: #9b8b61;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 768px) {
  .walkthrough-page {
    padding: 24px 16px;
  }

  .top-bar {
    margin-bottom: 16px;
  }

  .step-indicator {
    font-size: 12px;
    padding: 6px 10px;
  }

  .welcome-banner {
    align-items: flex-start;
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
