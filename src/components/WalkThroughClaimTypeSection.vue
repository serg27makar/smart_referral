<template>
  <BaseSection class="walkthrough-claim-type-section">
    <div class="section-head">
      <h1 class="section-title">What type of claim are you investigating?</h1>
      <p class="section-subtitle">
        This helps us recommend the right investigative services for your specific situation.
      </p>
    </div>

    <div class="claim-grid">
      <BaseCard
        v-for="option in claimOptions"
        :key="option.title"
        class="claim-card"
        :class="{ active: option.title === claimStore.claim.typeOfClaim }"
        @click="claimStore.claim.typeOfClaim = option.title"
      >
        <h3 class="claim-title">{{ option.title }}</h3>
        <p class="claim-description">{{ option.description }}</p>
      </BaseCard>
    </div>
  </BaseSection>
</template>

<script setup>
import BaseSection from '@/components/BaseSection.vue'
import BaseCard from '@/components/BaseCard.vue'
import { useClaimStore } from '@/stores/claim'

const claimStore = useClaimStore()

const claimOptions = [
  {
    title: 'Workers Comp',
    description: 'Workplace injury or illness claim'
  },
  {
    title: 'Auto Accident',
    description: 'Vehicle collision or personal injury'
  },
  {
    title: 'General Liability',
    description: 'Premises, product, or third-party claim'
  },
  {
    title: 'Property',
    description: 'Damage, theft, or loss of property'
  },
  {
    title: 'Disability',
    description: 'Short or long-term disability claim'
  }
]
</script>

<style scoped>
.walkthrough-claim-type-section {
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
}

.claim-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.claim-card {
  border: 1px solid transparent;
}

.claim-card.active {
  border-color: var(--my-primary-color);
}

.claim-card :deep(.base-card-body) {
  align-items: flex-start;
  text-align: left;
  gap: 6px;
  padding: 22px 20px;
}

.claim-title {
  font-size: 32px;
  line-height: 1.08;
  color: #133b74;
  margin: 0;
}

.claim-description {
  margin: 0;
  color: var(--secondary-color);
  font-size: 15px;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 33px;
  }

  .claim-grid {
    grid-template-columns: 1fr;
  }

  .claim-title {
    font-size: 26px;
  }
}
</style>
