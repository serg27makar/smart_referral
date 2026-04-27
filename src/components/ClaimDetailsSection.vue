<template>
  <BaseSection label="CLIENT / IR">
    <template #icon>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </template>

    <div class="form-grid">
      <BaseInput v-model="claimStore.claim.clientName" label="Company" placeholder="e.g. Acme Corp" class="grid-col-1" />
      <BaseInput v-model="claimStore.claim.requestorName" label="Requestor Name" placeholder="Full Name" class="grid-col-2" />
      <BaseInput v-model="claimStore.claim.email" label="Email" placeholder="email@example.com" class="grid-col-1" />
      <BaseInput v-model="claimStore.claim.phone" label="Phone" placeholder="+1 (555) 000-0000" class="grid-col-2" />
      <BaseInput v-model="claimStore.claim.ccEmails" label="CC Emails (comma separated)" placeholder="copy1@example.com, copy2@example.com" class="grid-full-width" />
    </div>

    <div class="sub-section">
      <div class="sub-section-header">ASSIGNMENT INFORMATION</div>
      <div class="form-grid-3">
        <BaseInput v-model="claimStore.claim.claimFileNumber" label="Claim / File Number" placeholder="CLM-000-000" />
        <BaseInput v-model="claimStore.claim.claimant" label="Claimant" placeholder="Full Name" />
        <BaseInput v-model="claimStore.claim.insured" label="Insured (Policy Holder)" placeholder="Full Name" />
        <BaseInput v-model="claimStore.claim.claimHandler" label="Claim Handler" placeholder="Full Name" />
        <BaseInput v-model="claimStore.claim.insuredRepresentative" label="Insured Representative" placeholder="Full Name" />
        <BaseInput v-model="claimStore.claim.insuredContactInformation" label="Insured Contact Information" placeholder="Email or Phone" />
      </div>
      <div class="checkbox-row">
        <BaseCheckbox v-model="claimStore.claim.isContactMyAccountManager" label="Contact My Account Manager" />
        <BaseCheckbox v-model="claimStore.claim.isPreferPhysicalMedia" label="Prefer Physical Media" />
      </div>
    </div>

    <div class="sub-section">
      <div class="sub-section-header">TYPE OF CLAIM</div>
      <div class="radio-group">
        <BaseRadioButton 
          v-for="type in claimTypes" 
          :key="type" 
          v-model="claimStore.claim.typeOfClaim" 
          :value="type" 
          :label="type" 
        />
      </div>
    </div>

    <div class="sub-section">
      <div class="sub-section-header">JURISDICTION</div>
      <div class="form-grid-1">
        <BaseSelect 
          v-model="claimStore.claim.state" 
          label="State" 
          placeholder="Select State"
          :options="states" 
        />
        <BaseSelect 
          v-model="claimStore.claim.county" 
          label="County / Jurisdiction" 
          placeholder="Select County"
          :options="counties" 
        />
      </div>
      
      <div class="info-box" v-if="claimStore.claim.county">
        <div class="info-content">
          {{ getCountyInfo(claimStore.claim.county) }}
        </div>
      </div>

      <div class="info-box">
        <div class="note-label">STATE NOTE</div>
        <div class="info-content">
          {{ getStateNote(claimStore.claim.state) }}
        </div>
      </div>
    </div>

    <div class="sub-section">
      <div class="sub-section-header">CLAIM DETAILS</div>
      <div class="form-grid">
        <BaseInput v-model="claimStore.claim.dateOfInjury" label="Date of Injury / Loss" type="date" placeholder="YYYY-MM-DD" class="grid-col-1" />
        <BaseInput v-model="claimStore.claim.descriptionOfInjury" label="Description of Injury / Loss" placeholder="Briefly describe what happened" class="grid-col-2" />
      </div>
    </div>

    <div class="sub-section">
      <div class="sub-section-header">LIFECYCLE STAGE</div>
      <div class="radio-group wrap">
        <BaseRadioButton 
          v-for="stage in claimStages" 
          :key="stage" 
          v-model="claimStore.claim.claimStage" 
          :value="stage" 
          :label="stage" 
        />
      </div>
    </div>

    <div class="sub-section">
      <div class="sub-section-header">RED FLAGS</div>
      <p class="sub-section-desc">Flag anything relevant - this sharpens your recommendation</p>
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
import BaseInput from '@/components/BaseInput.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseRadioButton from '@/components/BaseRadioButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseSection from '@/components/BaseSection.vue'

const claimStore = useClaimStore()

const claimTypes = ['Workers Comp', 'Auto', 'Liability', 'Property', 'Disability']
const claimStages = [
  'Step 1 New Claim', 
  'Step 2 Active / Ongoing', 
  'Step 3 Attorney Involved', 
  'Step 4 SIU Escalation', 
  'Step 5 Approaching Settlement'
]
const availableRedFlags = [
  'Prior claims history', 
  'Inconsistent statements', 
  'Attorney involved', 
  'Social media activity', 
  'High reserve value', 
  'Claimant location unknown'
]

const states = ['California', 'Texas', 'Florida', 'New York', 'Nevada']
const counties = ['Los Angeles County', 'Orange County', 'San Diego County', 'Harris County', 'Miami-Dade County']

const toggleRedFlag = (flag) => {
  const index = claimStore.claim.redFlags.indexOf(flag)
  if (index === -1) {
    claimStore.claim.redFlags.push(flag)
  } else {
    claimStore.claim.redFlags.splice(index, 1)
  }
}

const getCountyInfo = (county) => {
  if (county === 'Los Angeles County') {
    return 'Los Angeles County - AOE/COE investigation is required at date of loss for all Workers Comp claims.'
  }
  if (county === 'Orange County') {
    return 'Orange County - Local SIU presence is recommended for efficient surveillance operations.'
  }
  return `${county} - Standard investigation protocols apply based on state requirements.`
}

const getStateNote = (state) => {
  if (state === 'California') {
    return 'California restricts certain vehicle-related and legal process for WC claims. AOE/COE investigation is mandated.'
  }
  if (state === 'Texas') {
    return 'Texas specific labor codes may affect claim eligibility. Thorough background checks are advised.'
  }
  return `${state} - Please ensure all local regulatory guidelines are followed for the investigation.`
}
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (min-width: 768px) {
  .form-grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.form-grid-1 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.grid-col-1 {
  grid-column: 1;
}

.grid-col-2 {
  grid-column: 2;
}

.grid-full-width {
  grid-column: 1 / -1;
}

.sub-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--background-hover-color);
}

.sub-section-header {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 16px;
}

.sub-section-desc {
  font-size: 13px;
  color: var(--secondary-color);
  margin-bottom: 16px;
  margin-top: -8px;
}

.checkbox-row {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.radio-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.checkbox-button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.info-box {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: var(--background-table-color);
  border-left: 4px solid var(--my-primary-color);
  border-radius: 4px;
}

.info-content {
  font-size: 14px;
  color: var(--secondary-color);
}

.note-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--secondary-color);
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .form-grid, .form-grid-3 {
    grid-template-columns: 1fr;
  }
  
  .grid-col-1, .grid-col-2 {
    grid-column: auto;
  }
  
  .checkbox-row {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
