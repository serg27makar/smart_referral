import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClaimStore = defineStore('claim', () => {
  const claim = ref({
    clientName: 'Advantage Investigate',
    requestorName: 'Joe Anderson',
    email: 'j.anderson@advantage.com',
    phone: '+1 (555) 123-4567',
    ccEmails: 'claims-notif@advantage.com, legal@advantage.com',

    claimFileNumber: 'CLM-2024-001',
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
    redFlags: [],

    services: [],
    budgetHours: 0,
    budget: 0.00,
    dueDate: ''
  })

  return {
    claim
  }
})
