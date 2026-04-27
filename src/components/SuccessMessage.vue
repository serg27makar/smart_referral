<template>
  <section class="success-page">
    <div class="status-icon-wrap">
      <div class="status-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>

    <h1 class="title">Investigation Submitted</h1>
    <p class="subtitle">
      Your Advantage account manager will confirm your assignment and strategy within 24 hours.
    </p>

    <div class="case-card">
      <div class="case-label">CASE REFERENCE</div>
      <div class="case-number">ADV-2026-4471</div>
    </div>

    <div class="steps-card">
      <div class="steps-label">NEXT STEPS</div>
      <ol class="steps-list">
        <li>Receipt confirmation from your account manager (within 24 hours)</li>
        <li>Pre-surveillance investigation begins</li>
        <li>Assignment scheduled and worked</li>
      </ol>
    </div>

    <p class="secondary-note">Want to submit another case?</p>
    <BaseButton class="cta-btn" @click="router.push('/')">
      Start New Case →
    </BaseButton>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from "@/components/BaseButton.vue";

const router = useRouter()
</script>

<style scoped>
.success-page {
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 20px 8px;
  text-align: center;
  animation: fadeIn 0.35s ease-out;
}

.status-icon-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.status-icon {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: #c5a24a;
  background: #fff9e8;
  border: 1px solid #f0e1b3;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 42px;
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
  color: #185bbb;
  font-weight: 700;
}

.subtitle {
  font-size: 14px;
  color: var(--secondary-color);
  margin: 0 auto 26px;
  max-width: 500px;
  line-height: 1.5;
}

.case-card,
.steps-card {
  background: var(--background-color);
  border: 1px solid color-mix(in srgb, var(--border-color) 45%, white);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(23, 57, 106, 0.08);
}

.case-card {
  max-width: 320px;
  margin: 0 auto 18px;
  padding: 16px 18px;
}

.case-label,
.steps-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--secondary-color);
  font-weight: 700;
  margin-bottom: 8px;
}

.case-number {
  font-size: 32px;
  line-height: 1.1;
  font-weight: 700;
  color: #c5a24a;
  letter-spacing: 0.01em;
}

.steps-card {
  text-align: left;
  padding: 16px 18px;
  margin: 0 auto 22px;
  max-width: 420px;
}

.steps-list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: var(--text-color);
  font-size: 14px;
}

.secondary-note {
  color: var(--secondary-color);
  font-size: 13px;
  margin-bottom: 10px;
}

.cta-btn {
  min-width: 190px;
}

@media (max-width: 768px) {
  .success-page {
    padding-top: 8px;
  }

  .title {
    font-size: 30px;
  }

  .case-number {
    font-size: 26px;
  }

  .steps-card {
    max-width: 100%;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
