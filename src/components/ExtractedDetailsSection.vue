<template>
  <BaseSection>
    <div class="extracted-details-grid">
      <EditableField v-model="claimStore.claim.clientName" label="COMPANY NAME" />
      <EditableField v-model="claimStore.claim.claimFileNumber" label="CLAIM / FILE NUMBER" />
      <EditableField v-model="claimStore.claim.typeOfClaim" label="CLAIM TYPE" />
      <EditableField v-model="claimStore.claim.claimant" label="CLAIMANT" />
      <EditableField v-model="claimStore.claim.insured" label="INSURED (POLICY HOLDER)" />
      <EditableField v-model="claimStore.claim.insuredRepresentative" label="INSURED REPRESENTATIVE" />
      <EditableField v-model="claimStore.claim.claimHandler" label="CLAIM HANDLER" />
      <EditableField v-model="claimStore.claim.dateOfInjury" label="DATE OF INSURY / LOSS" />
      <EditableField v-model="claimStore.claim.descriptionOfInjury" label="DESCRIPTION OF INJURY / LOSS" />
      <EditableField v-model="claimStore.claim.claimStage" label="LIFECYCLE STAGE" />
      <div class="checkbox-button-group">
        <BaseRadioButton
            v-for="flag in availableRedFlags"
            :key="flag"
            :model-value="!claimStore.claim.redFlags.includes(flag)"
            :label="flag"
            @update:model-value="toggleRedFlag(flag)"
        />
      </div>
    </div>
  </BaseSection>
</template>

<script setup>
import { useClaimStore } from '@/stores/claim'
import EditableField from '@/components/EditableField.vue'
import BaseSection from '@/components/BaseSection.vue'
import BaseRadioButton from "@/components/BaseRadioButton.vue";

const claimStore = useClaimStore()

const availableRedFlags = [
  'Prior claims history',
  'Inconsistent statements',
  'Attorney involved',
  'Social media activity',
  'High reserve value',
  'Claimant location unknown'
]

const toggleRedFlag = (flag) => {
  const index = claimStore.claim.redFlags.indexOf(flag)
  if (index === -1) {
    claimStore.claim.redFlags.push(flag)
  } else {
    claimStore.claim.redFlags.splice(index, 1)
  }
}

</script>

<style scoped>
.extracted-details-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.checkbox-button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

</style>
