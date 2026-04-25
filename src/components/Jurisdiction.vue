<template>

  <BaseSection label="JURISDICTION">

    <div class="form-grid-1">
      <BaseSelect
          v-model="claimStore.claim.state"
          label="State"
          :options="states"
      />
      <BaseSelect
          v-model="claimStore.claim.county"
          label="County / Jurisdiction"
          :options="counties"
      />
    </div>
  </BaseSection>
</template>

<script setup>
import { useClaimStore } from '@/stores/claim'
import BaseSelect from "@/components/BaseSelect.vue";
import BaseSection from "@/components/BaseSection.vue";

const claimStore = useClaimStore()

const states = ['California', 'Texas', 'Florida', 'New York', 'Nevada']
const counties = ['Los Angeles County', 'Orange County', 'San Diego County', 'Harris County', 'Miami-Dade County']

</script>

<style scoped>
.jurisdiction-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--background-hover-color);
}

.sub-section-header {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 16px;
  text-transform: uppercase;
}

.form-grid-1 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-box {
  margin-top: 20px;
  padding: 16px;
  background-color: var(--background-table-color);
  border-radius: var(--border-radius);
  border-left: 4px solid var(--my-primary-color);
}

.info-content {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
}

.note-box {
  margin-top: 20px;
  padding: 16px;
  background-color: var(--background-hover-color);
  border-radius: var(--border-radius);
}

.note-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 4px;
}

.note-content {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
}
</style>