import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClaimStore = defineStore('claim', () => {
  const MIN_SERVICE_PRICE = 95
  const MAX_SERVICE_PRICE = 130

  const claim = ref({
    clientName: '',
    requestorName: 'Guest User',
    email: '',
    phone: '',
    ccEmails: '',

    claimFileNumber: '',
    claimType: '',
    claimant: '',
    insured: '',
    claimHandler: '',
    insuredRepresentative: '',
    insuredContactInformation: '',
    isContactMyAccountManager: false,
    isPreferPhysicalMedia: false,
    typeOfClaim: '',

    state: '',
    county: '',

    dateOfInjury: '',
    descriptionOfInjury: '',

    claimStage: '',
    redFlags: [],

    services: [],
    suggestedServices: [],
    budgetHours: 0,
    budget: 0,
    dueDate: ''
  })

  const estimatedRangeText = computed(() => {
    const count = claim.value.services.length
    if (count === 0) return '$ 0 – $ 0'
    
    const min = count * MIN_SERVICE_PRICE
    const max = count * MAX_SERVICE_PRICE

    const minFormatted = `$${min.toLocaleString('en-US')}`
    const maxFormatted = `$${max.toLocaleString('en-US')}`

    return `${minFormatted} – ${maxFormatted}`
  })

  return {
    claim,
    estimatedRangeText,
    updateClaim(data) {
      claim.value = { ...claim.value, ...data }
    },
    resetStore() {
      claim.value = {
        clientName: '',
        requestorName: 'Guest User',
        email: '',
        phone: '',
        ccEmails: '',

        claimFileNumber: '',
        claimType: '',
        claimant: '',
        insured: '',
        claimHandler: '',
        insuredRepresentative: '',
        insuredContactInformation: '',
        isContactMyAccountManager: false,
        isPreferPhysicalMedia: false,
        typeOfClaim: '',

        state: '',
        county: '',

        dateOfInjury: '',
        descriptionOfInjury: '',

        claimStage: '',
        redFlags: [],

        services: [],
        suggestedServices: [],
        budgetHours: 0,
        budget: 0,
        dueDate: ''
      }
    }
  }
})
