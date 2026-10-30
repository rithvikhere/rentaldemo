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
│   │   ├── images/
│   │   └── README.md        # Image asset requirements
│   ├── components/
│   ├── data/
│   │   └── cars.js          # 10 vehicles, 5 categories
│   ├── hooks/
│   ├── design-system.md # Full design system spec
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css        # Tailwind v4 @theme + global styles
├── index.html
├── vite.config.js
└── README.md
```

---

## Design System

**Brand:** VELOX — Dark Luxury × Modern Minimalism × Automotive Editorial

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

Fonts: **Manrope** (headings) + **Inter** (body)

Full spec: [`src/design-system.md`](src/design-system.md)

---

## Development Phases

| Phase | Description                          | Status       |
|-------|--------------------------------------|--------------|
| 0     | Project Setup & Architecture         | ✅ Complete  |
| 1     | UI/UX Planning & Design System       | ✅ Complete  |
| 2     | Navbar & Hero Section                | ⬜ Pending   |
| 3     | Vehicle Categories & Fleet Showcase  | ⬜ Pending   |
| 4     | Booking Process & Rental Requirements| ⬜ Pending   |
| 5     | Contact, Enquiry Form & FAQ          | ⬜ Pending   |
| 6     | Animations & Smooth Scrolling        | ⬜ Pending   |
| 7     | Responsive Design & Optimisation     | ⬜ Pending   |
| 8     | Deployment & Client Presentation     | ⬜ Pending   |
