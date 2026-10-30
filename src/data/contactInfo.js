// ─────────────────────────────────────────────────────────────
// VELOX — Contact Information Configuration (Phase 5)
// Centralized configuration for contact details.
// Illustrative placeholders are used until verified client credentials
// are provided. Action links are only active when configured is true.
// ─────────────────────────────────────────────────────────────

export const contactConfig = {
  // 01 — Phone
  phone: {
    display: '+91 (0) 00000 00000 (Demo Desk)',
    value: null, // Set to valid tel e.g. '+919876543210' when verified
    isConfigured: false,
    placeholderNote: 'Client phone number to be confirmed',
  },

  // 02 — Email
  email: {
    display: 'concierge@velox-demo.internal',
    value: null, // Set to valid email e.g. 'concierge@velox.in' when verified
    isConfigured: false,
    placeholderNote: 'Client email address to be confirmed',
  },

  // 03 — Location / Address
  location: {
    display: 'Aerocity Executive Fleet Lounge, Level 2, Mumbai, MH, India',
    value: null, // Set to verified maps URL / address when verified
    isConfigured: false,
    placeholderNote: 'Physical showroom address to be confirmed',
  },

  // 04 — Operating Hours
  operatingHours: {
    display: 'Monday – Sunday: 08:00 AM – 10:00 PM IST',
    support: '24/7 Roadside Assistance for Active Itineraries',
    isConfigured: true, // Operating schedule is defined for the demo
    placeholderNote: null,
  },

  // WhatsApp
  whatsapp: {
    display: 'WhatsApp Concierge Desk',
    value: null, // Set to valid international format e.g. '919876543210' when verified
    isConfigured: false,
    placeholderNote: 'WhatsApp concierge channel to be confirmed',
  },
}
