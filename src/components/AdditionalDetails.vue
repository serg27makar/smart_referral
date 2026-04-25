<template>
  <BaseSection label="ADDITIONAL DETAILS">
    <div class="insured-grid">
      <BaseInput v-model="claimStore.claim.insuredContactInformation" label="Insured Contact Information" />
      <BaseInput v-model="claimStore.claim.ccEmails" label=" CC Emails for Correspondence" />
    </div>
    <div class="budget-grid">
      <BaseInput
          v-model.number="claimStore.claim.budgetHours"
          label="Budget Hours"
          type="number"
      />
      <BaseInput
          v-model.number="claimStore.claim.budget"
          label="Budget $"
          type="number"
          step="0.01"
      />
      <BaseInput
          v-model="claimStore.claim.dueDate"
          label="Due Date"
          type="date"
      />
    </div>
    <div class="checkbox-row">
      <BaseCheckbox v-model="claimStore.claim.isContactMyAccountManager" label="Contact My Account Manager" />
      <BaseCheckbox v-model="claimStore.claim.isPreferPhysicalMedia" label="Prefer Physical Media" />
    </div>
  </BaseSection>
</template>

<script setup>
import BaseSection from "@/components/BaseSection.vue";
import BaseInput from "@/components/BaseInput.vue";
import {useClaimStore} from "@/stores/claim.js";
import BaseCheckbox from "@/components/BaseCheckbox.vue";

const claimStore = useClaimStore()
</script>

<style scoped>
.budget-grid, .insured-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  padding-bottom: 1rem;
}
.checkbox-row {
  display: flex;
  gap: 1rem;
  margin-top: 20px;
  flex-direction: column;
}

@media (min-width: 768px) {
  .budget-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .insured-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .checkbox-row {
    flex-direction: row;
    gap: 2rem;
  }
}

</style>