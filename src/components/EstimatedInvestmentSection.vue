<template>
  <div class="estimated-investment-section">
    <div class="section-label-outer">ESTIMATED INVESTMENT</div>
    
    <BaseSection>
      <div class="investment-content">
        <h2 class="investment-title">$ 2,400 – $3,800</h2>
        <p class="investment-subtitle">
          First scope confirmed by your Advantage account manager within 24 hours
        </p>
      </div>
    </BaseSection>
  </div>
</template>

<script setup>
import BaseSection from './BaseSection.vue'
</script>

<style scoped>
.estimated-investment-section {
  margin-top: 40px;
}

.section-label-outer {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  padding: 0 4px;
}

.investment-content {
  text-align: left;
}

.investment-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 8px;
}

.investment-subtitle {
  font-size: 16px;
  color: var(--secondary-color);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .investment-title {
    font-size: 28px;
  }
  
  .investment-subtitle {
    font-size: 14px;
  }
}
</style>
