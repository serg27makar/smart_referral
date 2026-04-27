<template>
  <div class="case-overview-section">
    <div class="section-header-outer">
      <div class="section-title-wrapper">
        <div class="section-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <span class="section-label">CASE OVERVIEW</span>
      </div>
      
      <div class="edit-action" @click="isEditing = !isEditing">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <span>{{ isEditing ? 'save' : 'edit' }}</span>
      </div>
    </div>
    
    <BaseSection>
      <div class="overview-grid">
        <div class="overview-field">
          <label>COMPANY NAME</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.clientName" placeholder="e.g. Acme Corp" />
          <div v-else class="field-value">{{ claimStore.claim.clientName || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>CLAIM TYPE</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.typeOfClaim" placeholder="Select Type" />
          <div v-else class="field-value">{{ claimStore.claim.typeOfClaim || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>CLAIMANT</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.claimant" placeholder="Full Name" />
          <div v-else class="field-value">{{ claimStore.claim.claimant || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>INSURED REP</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.insuredRepresentative" placeholder="Full Name" />
          <div v-else class="field-value">{{ claimStore.claim.insuredRepresentative || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>DATE OF LOSS</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.dateOfInjury" type="date" placeholder="YYYY-MM-DD" />
          <div v-else class="field-value">{{ claimStore.claim.dateOfInjury || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>CLAIM / FILE NUMBER</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.claimFileNumber" placeholder="CLM-000-000" />
          <div v-else class="field-value">{{ claimStore.claim.claimFileNumber || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>STATE</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.state" placeholder="e.g. California" />
          <div v-else class="field-value">{{ claimStore.claim.state || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>INSURED</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.insured" placeholder="Full Name" />
          <div v-else class="field-value">{{ claimStore.claim.insured || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>CLAIM HANDLER</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.claimHandler" placeholder="Full Name" />
          <div v-else class="field-value">{{ claimStore.claim.claimHandler || '—' }}</div>
        </div>
        <div class="overview-field">
          <label>DESCRIPTION</label>
          <BaseInput v-if="isEditing" v-model="claimStore.claim.descriptionOfInjury" placeholder="Describe the injury" />
          <div v-else class="field-value">{{ claimStore.claim.descriptionOfInjury || '—' }}</div>
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
            :read-only="!isEditing"
          />
        </div>
      </div>

      <div class="sub-section">
        <div class="sub-section-header">RED FLAGS</div>
        <div class="red-flags-list">
          <div 
            v-for="flag in claimStore.claim.redFlags" 
            :key="flag" 
            class="red-flag-chip"
          >
            {{ flag }}
          </div>
          <div v-if="claimStore.claim.redFlags.length === 0" class="field-value">No red flags detected</div>
        </div>
      </div>
    </BaseSection>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClaimStore } from '@/stores/claim'
import BaseSection from '@/components/BaseSection.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseRadioButton from '@/components/BaseRadioButton.vue'

const claimStore = useClaimStore()
const isEditing = ref(false)

const claimStages = [
  'Step 1 New Claim', 
  'Step 2 Active / Ongoing', 
  'Step 3 Attorney Involved', 
  'Step 4 SIU Escalation', 
  'Step 5 Approaching Settlement'
]
</script>

<style scoped>
.case-overview-section {
  position: relative;
}

.section-header-outer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: var(--my-primary-color);
  display: flex;
  align-items: center;
}

.section-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.edit-action {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--my-primary-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: opacity 0.2s;
}

.edit-action:hover {
  opacity: 0.8;
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 600px) {
  .overview-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.overview-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.overview-field label {
  font-size: 12px;
  font-weight: 700;
  color: var(--secondary-color);
  letter-spacing: 0.5px;
}

.field-value {
  font-size: 16px;
  color: var(--text-color);
  font-weight: 500;
  min-height: 24px;
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
  text-transform: uppercase;
}

.radio-group {
  display: flex;
  gap: 12px;
}

.radio-group.wrap {
  flex-wrap: wrap;
}

.red-flags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.red-flag-chip {
  padding: 6px 16px;
  background-color: var(--background-table-color);
  color: var(--primary-color);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(41, 129, 250, 0.2);
}
</style>
