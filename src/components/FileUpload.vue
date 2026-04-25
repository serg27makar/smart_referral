<template>
  <div class="file-upload">
    <div 
      class="upload-area" 
      :class="{ dragging: isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input type="file" ref="fileInput" class="hidden-input" multiple @change="handleFileSelect" />
      
      <div class="upload-icon">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      
      <h4 class="upload-title">Drag files here or click to browse</h4>
      <p class="upload-formats">PDF, PNG, JPG, DOC, DOCX, XLS, XLSX</p>
    </div>
    
    <div v-if="showEmailPaste" class="email-paste">
      <span class="email-paste-text">Or paste email text directly</span>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'

const isDragging = ref(false)
const fileInput = ref(null)

const props = defineProps({
  showEmailPaste: {
    type: Boolean,
    default: true
  }
})

const showEmailPaste = computed(() => props.showEmailPaste)

const emit = defineEmits(['files-selected'])

const handleDrop = (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  console.log('Dropped files:', files)
  if (files.length > 0) {
    emit('files-selected', files)
  }
}

const handleFileSelect = (e) => {
  const files = e.target.files
  console.log('Selected files:', files)
  if (files.length > 0) {
    emit('files-selected', files)
  }
}
</script>

<style scoped>
.file-upload {
  width: 100%;
  margin-top: 16px;
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--background-hover-color);
}

.upload-area:hover, .upload-area.dragging {
  border-color: var(--my-primary-color);
  background-color: var(--background-table-color);
}

.upload-icon {
  color: var(--my-primary-color);
  margin-bottom: 16px;
}

.upload-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.upload-formats {
  font-size: 13px;
  color: var(--secondary-color);
}

.hidden-input {
  display: none;
}

.email-paste {
  margin-top: 12px;
  text-align: left;
}

.email-paste-text {
  font-size: 14px;
  color: var(--my-primary-color);
  text-decoration: underline;
  cursor: pointer;
}
</style>
