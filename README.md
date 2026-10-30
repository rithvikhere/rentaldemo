# VELOX — Premium Car Rental

A visually impressive, luxury-themed, single-page car rental landing page.

> **Demo Notice:** VELOX is a fictional brand. All vehicle details, pricing, availability, and business information are illustrative demo content only.

---

## Tech Stack

| Package            | Version   | Role |
|--------------------|-----------|------|
| React              | ^19.3.1   | Component UI |
| Vite               | ^8.3.5    | Build tooling |
| Tailwind CSS       | ^4.3.3    | Utility styling (v4, no config file) |
| @tailwindcss/vite  | ^4.3.3    | Vite plugin for Tailwind v4 |
| Motion             | ^14.9.0   | Animations (Phase 6) |
| Lenis              | ^1.3.27   | Smooth scroll (Phase 6) |
| Lucide React       | ^1.65.0   | Icon system |

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Project Structure

```
car-rental-demo/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/          # Vehicle & hero images
│   │   └── README.md        # Image asset requirements
│   ├── components/          # One file per section component
│   │   ├── Navbar.jsx       # Fixed transparent-to-scrolled navbar & mobile drawer
│   │   ├── Hero.jsx         # Full-bleed cinematic hero section with dual CTAs
│   │   ├── Categories.jsx   # Editorial 5-category showcase
│   │   ├── Fleet.jsx        # Available fleet showcase with interactive filter tabs
│   │   ├── VehicleCard.jsx  # Reusable card with specs, INR pricing, and enquire action
│   │   ├── BookingProcess.jsx   # 4-step booking workflow with connector line
│   │   ├── Requirements.jsx     # 6 rental requirement & eligibility cards
│   │   ├── RentalInformation.jsx # 6 key operational policies & guidance
│   │   ├── FAQ.jsx              # Single-open accordion with accessible ARIA triggers
│   │   ├── Contact.jsx          # Coordinated 2-column contact & enquiry section
│   │   ├── ContactInfo.jsx      # Verified/placeholder direct contact channels
│   │   └── EnquiryForm.jsx      # Client-side validated form with demo success state
│   ├── data/
│   │   ├── cars.js          # Centralised vehicle data (10 vehicles, 5 categories, formatINR)
│   │   ├── rentalInfo.js    # Centralised booking steps, requirements, and policy data
│   │   ├── faqData.js       # Centralised 6-item FAQ dataset
│   │   └── contactInfo.js   # Centralised contact configuration & channel status
│   ├── hooks/               # Custom React hooks
│   ├── design-system.md     # Full design system specification
│   ├── App.jsx              # Main landing page shell
│   ├── main.jsx
│   └── index.css            # Tailwind v4 @theme tokens + global & component styles
├── index.html               # Font loading, meta
├── vite.config.js           # Tailwind v4 plugin
└── README.md
```

---

## Design System

**Brand:** VELOX — Dark Luxury × Modern Minimalism × Automotive Editorial

### Color Tokens

| Token                | Hex       |
|----------------------|-----------|
| Background Primary   | `#101010` |
| Background Secondary | `#181818` |
| Background Card      | `#202020` |
| Background Light     | `#F4F3F0` |
| Text Primary         | `#FFFFFF` |
| Text Secondary       | `#A3A3A3` |
| Accent Gold          | `#C6A875` |
| Border               | `#303030` |

### Fonts
- **Manrope** — headings (display, section, card titles), weights 300–800
- **Inter** — body, UI, metadata, labels, weights 300–600

Full specification: [`src/design-system.md`](src/design-system.md)

---

## Development Phases

| Phase | Description                          | Status       |
|-------|--------------------------------------|--------------|
| 0     | Project Setup & Architecture         | ✅ Complete  |
| 1     | UI/UX Planning & Design System       | ✅ Complete  |
| 2     | Navbar & Hero Section                | ✅ Complete  |
| 3     | Vehicle Categories & Fleet Showcase  | ✅ Complete  |
| 4     | Booking Process & Rental Requirements| ✅ Complete  |
| 5     | Contact, Enquiry Form & FAQ          | ✅ Complete  |
| 6     | Animations & Smooth Scrolling        | ⬜ Pending   |
| 7     | Responsive Design & Optimisation     | ⬜ Pending   |
| 8     | Deployment & Client Presentation     | ⬜ Pending   |
