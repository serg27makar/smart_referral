<template>
  <div class="not-sure-page">
    <div v-if="currentStep < 5" class="top-bar">
      <button class="back-button" @click="goBack">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back
      </button>
      <div class="step-indicator">
        {{ currentStep === 4 ? 'Final Step' : 'Step ' + currentStep + ' of 4' }}
      </div>
    </div>

    <div v-if="currentStep === 1" class="step-content">
      <div class="step-header">
        <h1 class="step-title">Drop your claim files here</h1>
        <p class="step-subtitle">PDFs, emails, notes – anything you have. We’ll extract the claim details and build your investigation plan.</p>
      </div>
      <BaseSection>
        <FileUpload :showEmailPaste="false" @files-selected="handleFilesSelected" />
      </BaseSection>
    </div>

    <div v-if="currentStep === 2" class="step-content">
      <FileProcessing @complete="nextStep" />
    </div>

    <div v-if="currentStep === 3" class="step-content">
      <div class="step-header">
        <h1 class="step-title">Here’s what we found</h1>
        <p class="step-subtitle">Review the details we extracted. Correct anything that looks off.</p>
      </div>
      
      <ExtractedDetailsSection />

      <Jurisdiction />

      <AdditionalDetails />
      
      <ClaimServicesSection 
        title="RECOMMENDED SERVICES" 
        subtitle="Based on the extracted claim details. Click any tile to add or remove."
        :budgetEnabled="false"
      />

      <div class="build-btn">
        <BaseButton @click="nextStep">This looks right – Build My Plan</BaseButton>
      </div>
    </div>

    <div v-if="currentStep === 4" class="step-content">
      <div class="step-header">
        <h1 class="step-title">Your Investigation Plan</h1>
      </div>
      
      <CaseOverviewSection />

      <ServicesPlanSection />

      <ConsiderAddingSection />

      <EstimatedInvestmentSection />

      <div class="action-buttons">
        <button class="save-draft-btn" @click="router.push('/')">Save as draft</button>
        <BaseButton class="submit-plan-btn" @click="nextStep">Submit this plan</BaseButton>
      </div>
    </div>

    <div v-if="currentStep === 5">
      <SuccessMessage />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FileUpload from '@/components/FileUpload.vue'
import Jurisdiction from '@/components/Jurisdiction.vue'
import ExtractedDetailsSection from '@/components/ExtractedDetailsSection.vue'
import BaseSection from "@/components/BaseSection.vue";
import AdditionalDetails from "@/components/AdditionalDetails.vue";
import ClaimServicesSection from "@/components/ClaimServicesSection.vue";
import BaseButton from "@/components/BaseButton.vue";
import FileProcessing from "@/components/FileProcessing.vue";
import CaseOverviewSection from "@/components/CaseOverviewSection.vue";
import ServicesPlanSection from "@/components/ServicesPlanSection.vue";
import ConsiderAddingSection from "@/components/ConsiderAddingSection.vue";
import EstimatedInvestmentSection from "@/components/EstimatedInvestmentSection.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";

const router = useRouter()
const currentStep = ref(1)

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push('/')
  }
}

const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++
  }
}

const handleFilesSelected = (files) => {
  console.log('Files received in NotSure.vue:', files)
  nextStep()
}
</script>

<style scoped>
.not-sure-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

@media (max-width: 768px) {
  .not-sure-page {
    padding: 24px 16px;
  }
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .top-bar {
    margin-bottom: 32px;
  }
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--my-primary-color);
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;
}

.back-button:hover {
  opacity: 0.8;
}

.step-indicator {
  font-size: 14px;
  font-weight: 600;
  color: var(--secondary-color);
  letter-spacing: 0.5px;
}

.step-content {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-header {
  text-align: center;
  margin-bottom: 40px;
}

.step-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .step-title {
    font-size: 24px;
  }
}

.step-subtitle {
  font-size: 16px;
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .step-subtitle {
    font-size: 14px;
  }
}

.build-btn button {
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}

.save-draft-btn {
  flex: 1;
  background: white;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.save-draft-btn:hover {
  background-color: var(--background-hover-color);
}

.submit-plan-btn {
  flex: 2;
}

@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column-reverse;
  }
}
</style>
