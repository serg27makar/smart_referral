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
      <button class="save-draft-btn" @click="router.push('/')">Save as draft</button>
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
