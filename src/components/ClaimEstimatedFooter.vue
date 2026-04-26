<template>
  <footer class="claim-estimated-footer" :class="{ 'is-hidden-mobile': !isMobileVisible }">
    <div class="footer-inner">
      <div class="plan-block">
        <div class="block-label">YOUR PLAN</div>
        <div class="services-line" :title="selectedServicesText">
          {{ selectedServicesText }}
        </div>
        <div class="plan-meta">
          {{ planMetaText }}
        </div>
      </div>

      <div class="investment-block">
        <div class="block-label">ESTIMATED INVESTMENT</div>
        <div class="investment-value">{{ estimatedRangeText }}</div>
      </div>

      <div class="actions-block">
        <BaseButton class="draft-btn" outline @click="router.push('/')">Save as Draft</BaseButton>
        <BaseButton type="primary" @click="emit('submit')">
          Submit Plan →
        </BaseButton>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import { useClaimStore } from '@/stores/claim'
import BaseButton from '@/components/BaseButton.vue'
import { useRouter } from "vue-router";

const emit = defineEmits(['submit'])

const claimStore = useClaimStore()
const router = useRouter()

const MIN_SERVICE_PRICE = 65
const MAX_SERVICE_PRICE = 90

const isMobileVisible = ref(true)
const lastScrollY = ref(0)

const selectedServicesCount = computed(() => claimStore.claim.services.length)

watch(() => selectedServicesCount.value, (value, oldValue) => {
  if (value !== oldValue) {
    isMobileVisible.value = true
  }
})

const selectedServicesText = computed(() => {
  if (!selectedServicesCount.value) return 'No services selected'
  return claimStore.claim.services.join(', ')
})

const estimatedRangeText = computed(() => {
  const min = selectedServicesCount.value * MIN_SERVICE_PRICE
  const max = selectedServicesCount.value * MAX_SERVICE_PRICE

  const minFormatted = `$${min.toLocaleString('en-US')}`
  const maxFormatted = `$${max.toLocaleString('en-US')}`

  return `${minFormatted} – ${maxFormatted}`
})

const planMetaText = computed(() => {
  const { state, county, typeOfClaim } = claimStore.claim
  return [state, county, typeOfClaim, 'Active / Ongoing'].filter(Boolean).join(' · ')
})

const handleScroll = () => {

  const currentY = window.scrollY || window.pageYOffset
  const delta = currentY - lastScrollY.value

  if (currentY <= 8) {
    isMobileVisible.value = false
  } else if (delta > 6) {
    isMobileVisible.value = true
  } else if (delta < -6) {
    isMobileVisible.value = false
  }

  lastScrollY.value = currentY
}

onMounted(() => {
  lastScrollY.value = window.scrollY || 0
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
.claim-estimated-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  border-top: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--background-color) 92%, white 8%);
  backdrop-filter: blur(8px);
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 24px;
}

.block-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--secondary-color);
  margin-bottom: 4px;
}

.plan-block {
  min-width: 0;
}

.services-line {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.plan-meta {
  margin-top: 3px;
  font-size: 12px;
  color: var(--secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.investment-value {
  font-size: 32px;
  line-height: 1;
  font-weight: 800;
  color: var(--text-color);
  white-space: nowrap;
}

.actions-block {
  display: flex;
  gap: 12px;
  align-items: center;
}

.actions-block :deep(.base-button) {
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.is-hidden-mobile {
  transform: translateY(110%);
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 1024px) {
  .investment-value {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px 14px;
  }

  .actions-block {
    width: 100%;
    justify-content: stretch;
  }

  .actions-block :deep(.base-button) {
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
  }
}
</style>