// ─────────────────────────────────────────────────────────────
// VELOX — Customer Information & Rental Policy Data (Phase 4)
// Illustrative demo content only.
// All conditions, documents, and policies represent demonstration
// examples and must be verified with actual providers.
// ─────────────────────────────────────────────────────────────

export const bookingSteps = [
  {
    step: '01',
    title: 'Explore Your Options',
    description: 'Browse the available vehicle categories and discover the car that suits your journey.',
    iconName: 'Compass',
  },
  {
    step: '02',
    title: 'Send an Enquiry',
    description: 'Choose your preferred vehicle and submit your pickup date, rental duration and contact information.',
    iconName: 'FileText',
  },
  {
    step: '03',
    title: 'Confirm Your Booking',
    description: 'The rental team will contact you to confirm availability, pricing and rental conditions.',
    iconName: 'PhoneCall',
  },
  {
    step: '04',
    title: 'Hit the Road',
    description: 'Complete the necessary rental formalities, collect your vehicle and enjoy your journey.',
    iconName: 'KeyRound',
  },
]

export const rentalRequirements = [
  {
    id: '01',
    title: 'Valid Driving Licence',
    description: 'A valid driving licence appropriate for the selected vehicle and rental location.',
    iconName: 'FileText',
    highlight: 'Mandatory',
  },
  {
    id: '02',
    title: 'Government ID Proof',
    description: 'An accepted identity document for customer verification.',
    iconName: 'UserCheck',
    highlight: 'Mandatory',
  },
  {
    id: '03',
    title: 'Address Verification',
    description: "Address proof may be requested depending on the rental provider's policy.",
    iconName: 'MapPin',
    highlight: 'As Applicable',
  },
  {
    id: '04',
    title: 'Security Deposit',
    description: 'A refundable security deposit may be applicable depending on the selected vehicle and rental terms.',
    iconName: 'Wallet',
    highlight: 'Refundable',
  },
  {
    id: '05',
    title: 'Eligibility',
    description: "Customers must satisfy the rental provider's minimum age and driving experience requirements.",
    iconName: 'Award',
    highlight: 'Age & Experience',
  },
  {
    id: '06',
    title: 'Booking Confirmation',
    description: 'Complete the provider\'s verification and booking confirmation process before vehicle collection.',
    iconName: 'ClipboardCheck',
    highlight: 'Prior to Delivery',
  },
]

export const rentalPolicies = [
  {
    id: '01',
    title: 'Fuel Policy',
    description: 'Fuel arrangements depend on the selected rental package. Confirm the applicable fuel policy before collection.',
    iconName: 'Fuel',
    keyPoint: 'Same-to-same or prepaid packages available on consultation.',
  },
  {
    id: '02',
    title: 'Pickup and Drop',
    description: 'Pickup and delivery options may depend on your location, the selected vehicle, and availability.',
    iconName: 'MapPin',
    keyPoint: 'Doorstep concierge delivery or airport terminal meet available.',
  },
  {
    id: '03',
    title: 'Rental Duration',
    description: "Rental periods, extensions, and additional usage are subject to the provider's terms and approval.",
    iconName: 'Clock',
    keyPoint: 'Flexible daily, weekend, and long-term executive leasing tiers.',
  },
  {
    id: '04',
    title: 'Cancellation',
    description: 'Review provider-specific terms regarding timeline allowances and modification flexibilities.',
    iconName: 'RotateCcw',
    keyPoint: 'Flexible modification subject to vehicle return conditions.',
  },
  {
    id: '05',
    title: 'Outstation Travel',
    description: 'State crossing permits, toll arrangements, and speed governance guidelines must be pre-arranged.',
    iconName: 'Route',
    keyPoint: 'Permitted state borders & transit toll clearances provided.',
  },
  {
    id: '06',
    title: 'Security Deposit',
    description: 'Pre-authorizations on credit cards are settled upon formal check-in and post-trip vehicle audit.',
    iconName: 'Wallet',
    keyPoint: 'Standard collision waiver included; zero-dep options available.',
  },
]
