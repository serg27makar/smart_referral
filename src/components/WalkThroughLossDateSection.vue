<template>
  <BaseSection class="walkthrough-loss-date-section">
    <div class="section-head">
      <h1 class="section-title">When did the loss occur?</h1>
      <p class="section-subtitle">
        The date of loss determines where this claim sits in its lifecycle - which changes what we recommend.
      </p>
    </div>

    <div class="field">
      <div class="field-label">
        <span>DATE OF LOSS</span>
        <span class="field-mark">*</span>
      </div>
      <BaseInput v-model="claimStore.claim.dateOfInjury" type="date" />
    </div>

    <div class="insight-box" v-if="claimStore.claim.dateOfInjury">
      <span class="insight-icon">*</span>
      <span class="insight-text">
        Based on this date, this claim is approximately {{ claimAgeText }} old -
        <strong>{{ lifecycleLabel }}</strong>.
      </span>
    </div>

    <BaseButton class="continue-btn" :disabled="!claimStore.claim.dateOfInjury" @click="$emit('continue')">
      Continue ->
    </BaseButton>
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

const monthsOld = computed(() => {
  if (!claimStore.claim.dateOfInjury) {
    return 0
  }

  const lossDate = new Date(claimStore.claim.dateOfInjury)
  if (Number.isNaN(lossDate.getTime())) {
    return 0
  }

  const now = new Date()
  const diffMs = now.getTime() - lossDate.getTime()
  const monthMs = 1000 * 60 * 60 * 24 * 30.44
  return Math.max(0, Math.round(diffMs / monthMs))
})

const claimAgeText = computed(() => {
  if (monthsOld.value < 1) {
    return 'less than 1 month'
  }
  if (monthsOld.value === 1) {
    return '1 month'
  }
  return `${monthsOld.value} months`
})

const lifecycleLabel = computed(() => {
  if (monthsOld.value <= 2) {
    return 'Early Investigation'
  }
  if (monthsOld.value <= 6) {
    return 'Active Investigation'
  }
  return 'Late Investigation'
})
</script>

<style scoped>
.walkthrough-loss-date-section {
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

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.field :deep(.base-input) {
  min-height: 52px;
  border-color: #d5c59e;
  color: #133b74;
  font-weight: 600;
}

.insight-box {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #efe8d7;
  border: 1px solid #d5c59e;
  border-radius: 12px;
}

.insight-icon {
  color: #cda349;
  font-size: 14px;
}

.insight-text {
  font-size: 15px;
  color: #665939;
  font-weight: 500;
}

.continue-btn {
  margin-top: 18px;
  width: 100%;
  min-height: 52px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 33px;
  }
}
</style>
