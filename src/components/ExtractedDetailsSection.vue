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
      <EditableField v-model="claimStore.claim.redFlagsDetected" label="RED FLAGS DETECTED" />
    </div>
  </BaseSection>
</template>

<script setup>
import { useClaimStore } from '@/stores/claim'
import EditableField from '@/components/EditableField.vue'
import BaseSection from '@/components/BaseSection.vue'

const claimStore = useClaimStore()
</script>

<style scoped>
.extracted-details-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
