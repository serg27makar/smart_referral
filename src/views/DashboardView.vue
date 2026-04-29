<template>
  <div class="page-container">
    <header class="header">
      <h1 class="page-title">Welcome back, {{ claimStore.claim.requestorName }}</h1>
      <p class="page-subtitle">Your investigation command center — manage plans, review cases, and stay on top of your workflow.</p>
    </header>

    <div class="grid">
      <!-- LEFT COLUMN -->
      <div class="left">
        <BaseCard class="primary-card mb-2" @click="router.push('/')">
          <div class="create-btn-content">
            <span class="create-icon">+</span>
            <div class="create-text">
              <span class="btn-label">Create New Plan</span>
              <small class="btn-sublabel">Start a new investigation plan from scratch</small>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="info-card mb-2">
          <h3 class="card-title">{{ claimStore.claim.clientName || 'Nationwide Insurance' }}</h3>
          <p class="muted">Claims Investigation Division</p>
          <div class="info-list">
            <div class="info-item"><span>Role</span><b>Senior Adjuster</b></div>
            <div class="info-item"><span>Jurisdiction</span><b>CA, TX, FL, OH</b></div>
            <div class="info-item"><span>Spend Limit</span><b>$10,000/claim</b></div>
          </div>
        </BaseCard>

        <BaseCard class="info-card mb-2">
          <h3 class="card-title">Active Guardrails</h3>
          <ul class="guardrails-list">
            <li>All services require manager approval</li>
            <li>Surveillance limited to 2 days per order</li>
            <li>California claims require AO/Code</li>
          </ul>
        </BaseCard>

        <BaseCard class="info-card">
          <h3 class="card-title">Case Success Tracker</h3>
          <div class="stats-list">
            <div class="stat-item"><span>Total Cases</span><b>24</b></div>
            <div class="stat-item"><span>Success Rate</span><b>87%</b></div>
            <div class="stat-item"><span>Evidence Rate</span><b>79%</b></div>
            <div class="stat-item"><span>Total Savings</span><b>$142,800</b></div>
          </div>
        </BaseCard>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="right">
        <BaseCard class="plans-card mb-2">
          <div class="card-header-row">
            <h3 class="card-title">My Plans</h3>
            <a href="#" class="view-all">View all →</a>
          </div>

          <div class="plans-list">
            <div class="plan-item submitted">
              <span class="tag tag-green">SUBMITTED</span>
              <div class="plan-info">
                <b class="plan-name">Workers Comp — Robert M.</b>
                <p class="plan-details">ADV-2026-447 • California • Apr 23, 2026</p>
              </div>
            </div>

            <div class="plan-item draft">
              <span class="tag tag-yellow">DRAFT</span>
              <div class="plan-info">
                <b class="plan-name">Auto Accident — Maria L.</b>
                <p class="plan-details">ADV-2026-389 • Texas • Apr 12, 2026</p>
              </div>
            </div>

            <div class="plan-item draft">
              <span class="tag tag-yellow">DRAFT</span>
              <div class="plan-info">
                <b class="plan-name">Workers Comp — James K.</b>
                <p class="plan-details">ADV-2026-370 • Ohio • Apr 9, 2026</p>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="info-card mb-2">
          <div class="card-header-row">
            <h3 class="card-title">Insurance News</h3>
            <a href="#" class="view-all">View all →</a>
          </div>

          <ul class="news-list">
            <li>SB-127 expands presumption of compensability for first responders</li>
            <li>DWC raises maximum medical fee guideline by 3.2%</li>
            <li>OIR Bulletin: New AOB documentation requirements effective May 1</li>
            <li>BWC announces premium reduction for safety-compliant employers</li>
          </ul>
        </BaseCard>

        <BaseCard class="info-card">
          <h3 class="card-title">Savings Trend</h3>
          <div class="chart-container">
            <div class="bar" style="height:40%"></div>
            <div class="bar" style="height:70%"></div>
            <div class="bar" style="height:90%"></div>
            <div class="bar" style="height:60%"></div>
            <div class="bar" style="height:80%"></div>
            <div class="bar highlight" style="height:75%"></div>
          </div>
          <p class="success-msg">✔ Great work! Above team average of 68%.</p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useClaimStore } from '@/stores/claim'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const claimStore = useClaimStore()
</script>

<style scoped>
.header {
  margin-bottom: 32px;
}

.page-subtitle {
  color: var(--secondary-color);
  font-size: 1.1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 992px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.primary-card {
  background: linear-gradient(135deg, var(--primary-color), var(--my-primary-color));
  color: white;
  border: none;
}

.primary-card :deep(.base-card-body) {
  align-items: flex-start;
  text-align: left;
}

.create-btn-content {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.create-icon {
  font-size: 32px;
  font-weight: 300;
  background: rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.create-text {
  display: flex;
  flex-direction: column;
}

.btn-label {
  font-size: 1.25rem;
  font-weight: 600;
}

.btn-sublabel {
  opacity: 0.9;
  font-size: 0.9rem;
}

.info-card :deep(.base-card-body),
.plans-card :deep(.base-card-body) {
  align-items: flex-start;
  text-align: left;
  padding: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-color);
}

.muted {
  color: var(--secondary-color);
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.info-list, .stats-list {
  width: 100%;
}

.info-item, .stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--background-hover-color);
}

.info-item:last-child, .stat-item:last-child {
  border-bottom: none;
}

.info-item span, .stat-item span {
  color: var(--secondary-color);
}

.guardrails-list, .news-list {
  padding-left: 20px;
  margin-top: 8px;
  color: var(--text-color);
}

.guardrails-list li, .news-list li {
  margin-bottom: 12px;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
}

.view-all {
  color: var(--my-primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.view-all:hover {
  text-decoration: underline;
}

.plans-list {
  width: 100%;
}

.plan-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--background-hover-color);
}

.plan-item:last-child {
  border-bottom: none;
}

.tag {
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
  height: fit-content;
}

.tag-green {
  background-color: var(--background-table-color);
  color: var(--success-color);
}

.tag-yellow {
  background-color: #fff9db;
  color: var(--warning-color);
}

.plan-name {
  display: block;
  font-size: 1rem;
  color: var(--text-color);
}

.plan-details {
  font-size: 0.85rem;
  color: var(--secondary-color);
}

.chart-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 120px;
  width: 100%;
  margin-top: 16px;
}

.bar {
  flex: 1;
  background-color: var(--background-header);
  border-radius: 4px;
  transition: height 0.3s ease;
}

.bar.highlight {
  background-color: var(--my-primary-color);
}

.success-msg {
  margin-top: 16px;
  color: var(--success-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
