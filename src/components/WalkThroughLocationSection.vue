<template>
  <BaseSection class="walkthrough-location-section">
    <div class="section-head">
      <h1 class="page-title">Where is the claim located?</h1>
      <p class="section-subtitle">
        Investigation rules and available services vary significantly by state and county.
      </p>
    </div>

    <div class="jurisdiction-block">
      <div class="jurisdiction-label">
        <span>JURISDICTION</span>
      </div>

      <div class="field">
        <div class="field-label">
          <span>STATE</span>
          <span class="field-mark">*</span>
        </div>
        <BaseSelect
          v-model="claimStore.claim.state"
          :options="states"
          placeholder="Select state..."
        />
      </div>

      <div class="field">
        <div class="field-label">
          <span>COUNTY / JURISDICTION</span>
          <span class="field-mark">*</span>
        </div>
        <BaseSelect
          v-model="claimStore.claim.county"
          :options="countyOptions"
          placeholder="Select county..."
        />
      </div>
    </div>

    <BaseButton class="continue-btn" :disabled="!canContinue" @click="$emit('continue')">
      Continue →
    </BaseButton>
  </BaseSection>
</template>

<script setup>
import { computed, watch } from 'vue'
import BaseSection from '@/components/BaseSection.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useClaimStore } from '@/stores/claim'

const claimStore = useClaimStore()
defineEmits(['continue'])

const states = ['California', 'New York', 'Texas', 'Florida', 'Maryland', 'Ohio', 'Pennsylvania']

const countiesByState = {
  California: ['Los Angeles County', 'Orange County', 'San Diego County', 'Riverside County', 'Sacramento County'],
  'New York': ['New York County', 'Kings County', 'Queens County', 'Bronx County', 'Nassau County', 'Suffolk County', 'Westchester County', 'Erie County'],
  Texas: ['Harris County', 'Dallas County', 'Tarrant County', 'Bexar County', 'Travis County'],
  Florida: ['Miami-Dade County', 'Broward County', 'Palm Beach County', 'Orange County', 'Hillsborough County'],
  Maryland: ['Baltimore County', 'Montgomery County', "Prince George's County", 'Anne Arundel County', 'Howard County'],
  Ohio: ['Franklin County', 'Cuyahoga County', 'Hamilton County', 'Summit County', 'Montgomery County'],
  Pennsylvania: ['Philadelphia County', 'Allegheny County', 'Montgomery County', 'Bucks County', 'Delaware County']
}

const countyOptions = computed(() => countiesByState[claimStore.claim.state] ?? [])

watch(
  () => claimStore.claim.state,
  (state) => {
    const options = countiesByState[state] ?? []
    if (!options.includes(claimStore.claim.county)) {
      claimStore.claim.county = ''
    }
  }
)

const canContinue = computed(() => Boolean(claimStore.claim.state && claimStore.claim.county))
</script>

<style scoped>
.walkthrough-location-section {
  margin-bottom: 0;
}

.section-head {
  margin-bottom: 24px;
}

.section-subtitle {
  margin-top: 12px;
  font-size: 16px;
  color: var(--secondary-color);
  max-width: 740px;
  line-height: 1.5;
}

.jurisdiction-block {
  border: 1px solid var(--background-hover-color);
  border-radius: 14px;
  padding: 18px;
  background-color: var(--background-table-color);
}

.jurisdiction-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  letter-spacing: 0.06em;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.field:last-of-type {
  margin-bottom: 0;
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


.field :deep(.select-container) {
  min-height: 44px;
  border-color: var(--border-color);
}

.field :deep(.selected-value) {
  font-size: 15px;
  color: var(--text-color);
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

  .jurisdiction-block {
    padding: 14px;
  }
}
</style>
