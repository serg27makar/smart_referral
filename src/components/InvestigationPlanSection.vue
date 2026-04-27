<template>
  <div class="investigation-plan-section">
    <div class="plan-header">
      <h1 class="plan-title">Your Investigation Plan</h1>
    </div>

    <CaseOverviewSection />

    <ServicesPlanSection />

    <ConsiderAddingSection />

    <EstimatedInvestmentSection />

    <div class="action-buttons">
      <BaseButton class="draft-btn" outline @click="router.push('/')">Save as Draft</BaseButton>
      <BaseButton class="submit-plan-btn" @click="$emit('submit')">Submit this plan</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import CaseOverviewSection from '@/components/CaseOverviewSection.vue'
import ServicesPlanSection from '@/components/ServicesPlanSection.vue'
import ConsiderAddingSection from '@/components/ConsiderAddingSection.vue'
import EstimatedInvestmentSection from '@/components/EstimatedInvestmentSection.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

defineEmits(['submit'])
</script>

<style scoped>
.investigation-plan-section {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.plan-header {
  text-align: center;
  margin-bottom: 40px;
}

.plan-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .plan-title {
    font-size: 24px;
  }
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}

.draft-btn {
  flex: 1;
  border-radius: 999px;
}
.submit-plan-btn {
  flex: 1;
  border-radius: 999px;
}

@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column-reverse;
  }
}
</style>
