<template>
  <BaseSection class="walkthrough-basics-section">
    <div class="section-head">
      <h1 class="section-title">Let's start with the basics.</h1>
      <p class="section-subtitle">
        This helps us match your claim to the right investigative services and configure the
        experience for your organization.
      </p>
    </div>

    <div class="form-grid">
      <div class="field full-width">
        <div class="field-label">
          <span>FULL NAME</span>
          <span class="field-mark">*</span>
        </div>
        <BaseInput v-model="fullName" />
      </div>

      <div class="field">
        <div class="field-label">
          <span>COMPANY / ORGANIZATION</span>
          <span class="field-mark">*</span>
        </div>
        <BaseInput v-model="claimStore.claim.clientName" />
      </div>

      <div class="field">
        <div class="field-label">
          <span>CLIENT / CARRIER</span>
          <span class="field-mark">*</span>
        </div>
        <BaseInput v-model="claimStore.claim.insured" />
      </div>

      <div class="field full-width">
        <div class="field-label">
          <span>EMAIL</span>
          <span class="field-mark">*</span>
        </div>
        <BaseInput v-model="claimStore.claim.email" type="email" />
        <p class="field-help">Locked - tied to your login.</p>
      </div>
    </div>

    <BaseButton class="continue-btn" @click="$emit('continue')">This looks right - continue</BaseButton>
  </BaseSection>
</template>

<script setup>
import { computed } from 'vue'
import BaseSection from '@/components/BaseSection.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useClaimStore } from '@/stores/claim'

const claimStore = useClaimStore()
defineEmits(['continue'])

const fullName = computed({
  get: () => claimStore.claim.requestorName,
  set: (value) => {
    claimStore.claim.requestorName = value
  }
})
</script>

<style scoped>
.walkthrough-basics-section {
  margin-bottom: 0;
}

.section-head {
  margin-bottom: 24px;
}

.section-title {
  font-size: 38px;
  line-height: 1.15;
  color: #133b74;
  letter-spacing: -0.01em;
}

.section-subtitle {
  margin-top: 12px;
  font-size: 16px;
  color: var(--secondary-color);
  max-width: 700px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.full-width {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 12px;
  letter-spacing: 0.06em;
  font-weight: 700;
  color: var(--secondary-color);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.field-mark {
  color: #cda349;
  line-height: 1;
}

.field-help {
  font-size: 13px;
  color: var(--secondary-color);
}

.continue-btn {
  margin-top: 20px;
  width: 100%;
  min-height: 52px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }
}
</style>
