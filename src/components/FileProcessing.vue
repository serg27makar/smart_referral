<template>
  <div class="file-processing">
    <div class="processing-header">
      <h1 class="processing-title">Reading your claim files…</h1>
    </div>
    
    <div class="files-list">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <div class="file-info">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" class="file-icon">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <span class="file-name">{{ file.name }}</span>
        </div>
        <div class="status-indicator">
          <div v-if="index < processedCount" class="status-done">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Done
          </div>
          <div v-else-if="index === processedCount" class="status-loading">
            <div class="spinner"></div>
            Processing...
          </div>
          <div v-else class="status-pending">
            Pending
          </div>
        </div>
      </div>
    </div>

    <div class="overall-progress">
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="progress-text">{{ Math.round(progress) }}% completed</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['complete'])

// Псевдо-список файлов для демонстрации, если реальные файлы не переданы
const props = defineProps({
  inputFiles: {
    type: Array,
    default: () => [
      { name: 'claim_report_v1.pdf' },
      { name: 'medical_notes.docx' },
      { name: 'accident_photo_01.jpg' }
    ]
  }
})

const files = ref(props.inputFiles)
const processedCount = ref(0)
const progress = ref(0)
let timer = null

onMounted(() => {
  const totalDuration = 5000 // 5 секунд
  const interval = 50
  const step = 100 / (totalDuration / interval)
  
  timer = setInterval(() => {
    progress.value += step
    
    // Рассчитываем сколько файлов "обработано" на основе прогресса
    const newProcessedCount = Math.floor((progress.value / 100) * files.value.length)
    if (newProcessedCount > processedCount.value && newProcessedCount <= files.value.length) {
      processedCount.value = newProcessedCount
    }

    if (progress.value >= 100) {
      progress.value = 100
      processedCount.value = files.value.length
      clearInterval(timer)
      setTimeout(() => {
        emit('complete')
      }, 500)
    }
  }, interval)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.file-processing {
  text-align: center;
  padding: 40px 0;
}

.processing-header {
  margin-bottom: 40px;
}

.processing-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .processing-title {
    font-size: 24px;
  }
}

.files-list {
  max-width: 500px;
  margin: 0 auto 40px;
  background: var(--background-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

@media (max-width: 768px) {
  .files-list {
    margin-left: 16px;
    margin-right: 16px;
  }
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--background-hover-color);
}

.file-item:last-child {
  border-bottom: none;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  color: var(--secondary-color);
}

.file-name {
  font-weight: 500;
  color: var(--text-color);
}

.status-indicator {
  font-size: 14px;
  font-weight: 600;
}

.status-done {
  color: var(--success-color);
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-loading {
  color: var(--my-primary-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-pending {
  color: var(--secondary-color);
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(41, 129, 250, 0.2);
  border-top-color: var(--my-primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.overall-progress {
  max-width: 400px;
  margin: 0 auto;
}

.progress-bar-container {
  height: 8px;
  background: var(--background-hover-color);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-bar {
  height: 100%;
  background: var(--my-primary-color);
  transition: width 0.1s linear;
}

.progress-text {
  font-size: 14px;
  color: var(--secondary-color);
  font-weight: 600;
}
</style>
