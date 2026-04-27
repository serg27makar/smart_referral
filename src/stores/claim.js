import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClaimStore = defineStore('claim', () => {
  const MIN_SERVICE_PRICE = 95
  const MAX_SERVICE_PRICE = 130

  const claim = ref({
    clientName: 'Advantage Investigate',
    requestorName: 'Joe Anderson',
    email: 'j.anderson@advantage.com',
    phone: '+1 (555) 123-4567',
    ccEmails: 'claims-notif@advantage.com, legal@advantage.com',

    claimFileNumber: 'CLM-2024-001',
    claimType: 'Workers Comp',
    claimant: 'Jane Doe',
    insured: 'John Doe',
    claimHandler: 'Sarah Miller',
    insuredRepresentative: 'Mark Wilson',
    insuredContactInformation: 'jane.doe@example.com, +1 (555) 987-6543',
    isContactMyAccountManager: false,
    isPreferPhysicalMedia: false,
    typeOfClaim: 'Workers Comp',

    state: 'California',
    county: 'Los Angeles County',

    dateOfInjury: '2024-01-15',
    descriptionOfInjury: 'Back injury sustained while lifting heavy equipment at the warehouse.',

    claimStage: 'Step 1 New Claim',
    redFlags: ["Prior claims history", "Inconsistent statements"],

    services: [],
    suggestedServices: [
      {
        title: 'Scene Investigation',
        description: 'On-site inspection and documentation of the reported incident location.',
        extra: 'Ordered in 41% of similar claims.'
      },
      {
        title: 'Witness Canvass & Interviews',
        description: 'Identify and interview potential witnesses near the incident location.',
        extra: '58% of cases resolved 20% faster.'
      },
      {
        title: 'Sub Rosa Video Surveillance',
        description: 'Extended covert video surveillance over multiple days.',
        extra: 'Ordered in 52% of high-reserve WC claims.'
      }
    ],
    budgetHours: 0,
    budget: 0.00,
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
    estimatedRangeText
  }
})
