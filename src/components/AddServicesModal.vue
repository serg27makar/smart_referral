<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="cancel">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-content">
          <h2 class="modal-title">Add Services</h2>
          <p class="modal-subtitle">Click a service to add it to your plan. Hover for details.</p>
        </div>
        <button class="close-btn" @click="cancel">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="info-box">
          <span class="info-content">
            4 services hidden – 4 services unavailable in CA and 3 services not applicable for Workers Comp. Only services available for your current selections are shown below.
          </span>
        </div>

        <div class="services-list">
          <div
            v-for="service in allAvailableServices"
            :key="service"
            class="service-pill"
            :class="{ 'is-selected': localSelectedServices.includes(service) }"
            @click="toggleService(service)"
          >
            <span class="service-name">{{ service }}</span>
            <div v-if="localSelectedServices.includes(service)" class="check-icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="4">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <BaseButton type="outline-primary" @click="cancel">Cancel</BaseButton>
        <BaseButton @click="save">Save Changes</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useClaimStore } from '@/stores/claim'
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])
const claimStore = useClaimStore()

// Все возможные сервисы (для примера, так как в сторе нет полного списка)
const allAvailableServices = [
  'Background Investigation',
  'Background Investigation + Social Media',
  'Asset Check',
  'NetSweep',
  'Social Media Only',
  'Claims Investigations',
  'Locate',
  'Report Procurement',
  'Activity Check',
  'Activity Check – Field Surveillance',
  'Surveillance - 1 Investigator',
  'Surveillance - 2 Investigator',
  'Remote Controlled Surveillance (RCS)',
  'True View Package',
  'Scene Investigation',
  'AOE/COE Investigation',
  'Medical Canvass with 15 locations',
  'Dependency Check',
  'Alive and Wellness Check',
  'Recorded Statement',
  'Document Delivery',
  'Subpoena',
  'Subrogation',
  'SIU',
  'SIU Compliance'
]

const localSelectedServices = ref([])

// Синхронизируем локальное состояние при открытии модалки
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    localSelectedServices.value = [...claimStore.claim.services]
  }
})

const toggleService = (service) => {
  const index = localSelectedServices.value.indexOf(service)
  if (index === -1) {
    localSelectedServices.value.push(service)
  } else {
    localSelectedServices.value.splice(index, 1)
  }
}

const cancel = () => {
  emit('update:modelValue', false)
}

const save = () => {
  claimStore.claim.services = [...localSelectedServices.value]
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-container {
  background: var(--background-color);
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid var(--background-hover-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #185bbb;
  margin: 0;
}

.modal-subtitle {
  font-size: 14px;
  color: var(--secondary-color);
  margin-top: 4px;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

.info-banner.compact {
  margin-bottom: 24px;
  padding: 12px 16px;
  background-color: #efe8d7;
  border: 1px solid #d5c59e;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.banner-icon {
  background: #cda349;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

.banner-text {
  font-size: 13px;
  color: #665939;
  line-height: 1.4;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.service-pill {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  transition: all 0.2s;
  background: white;
  background: var(--background-color);
}

.service-pill:hover {
  border-color: var(--my-primary-color);
  background-color: rgba(41, 129, 250, 0.05);
}

.service-pill.is-selected {
  border-color: var(--my-primary-color);
  background-color: rgba(41, 129, 250, 0.1);
  color: var(--my-primary-color);
}

.check-icon {
  color: var(--my-primary-color);
  display: flex;
  align-items: center;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--background-hover-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary-color);
  padding: 4px;
}

@media (max-width: 600px) {
  .modal-container {
    width: 95%;
  }
  .modal-footer {
    flex-direction: column-reverse;
  }
}
.info-box {
  padding: 12px 16px;
  background-color: var(--background-table-color);
  border-left: 4px solid var(--my-primary-color);
  border-radius: 4px;
  margin-bottom: 24px;
}

.info-content {
  font-size: 14px;
  color: var(--secondary-color);
}

</style>
