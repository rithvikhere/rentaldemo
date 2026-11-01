# VELOX Design System
**Phase 1 — UI/UX Planning & Design System**

> This document is the single source of truth for all visual design decisions on the VELOX premium car rental website. Every implementation in later phases must reference and conform to these specifications.

---

## 1. Brand Identity

| Property       | Value |
|----------------|-------|
| Brand name     | VELOX |
| Brand type     | Fictional premium car rental (demo only) |
| Visual tone    | Dark Luxury × Modern Minimalism × Automotive Editorial |
| Wordmark       | `VELOX` — Manrope ExtraBold 800, all-caps, tight letter-spacing (`-0.02em`), white on dark |
| Wordmark detail| A short 1.5rem × 2px champagne-gold rule to the left of the wordmark |

**Personality pillars:** Sophisticated · Trustworthy · Modern · Minimal · Performance-oriented

---

## 2. Color System

### Semantic Palette

| Token              | CSS Var               | Hex       | Usage |
|--------------------|-----------------------|-----------|-------|
| Background Primary | `--v-bg-primary`      | `#101010` | Main dark sections, hero background |
| Background Secondary| `--v-bg-secondary`   | `#181818` | Alternating sections for rhythm |
| Background Card    | `--v-bg-card`         | `#202020` | Cards, raised surfaces, inputs |
| Background Light   | `--v-bg-light`        | `#F4F3F0` | **Use sparingly** — Trust Indicators or Why Choose Us for contrast |
| Text Primary       | `--v-text-primary`    | `#FFFFFF` | Headings, key data |
| Text Secondary     | `--v-text-secondary`  | `#A3A3A3` | Body copy, descriptions |
| Text Muted         | `--v-text-muted`      | `#6B6B6B` | Metadata, placeholders, specs |
| Text Dark          | `--v-text-dark`       | `#171717` | Content on `--v-bg-light` sections |
| Accent Gold        | `--v-gold`            | `#C6A875` | Primary CTAs, accent rules, hover states, icons |
| Gold Light         | `--v-gold-light`      | `#D9BF96` | Hover state of gold elements |
| Gold Dark          | `--v-gold-dark`       | `#A8894E` | Active/pressed gold states |
| Gold Subtle        | `--v-gold-subtle`     | `rgba(198,168,117,0.12)` | Focus rings, ghost tints |
| Border             | `--v-border`          | `#303030` | Card borders, dividers, input borders |
| Border Subtle      | `--v-border-subtle`   | `#222222` | Very light separators |
| Border Focus       | `--v-border-focus`    | `#C6A875` | Keyboard focus rings (accessibility) |
| Success            | `--v-success`         | `#4CAF7D` | Form validation success |
| Error              | `--v-error`           | `#E05C5C` | Form validation errors |
| Warning            | `--v-warning`         | `#E0A94A` | Informational warnings |

### Usage Rules
- **Gold is an accent only.** Never use it for large background areas or body text.
- **Section alternation pattern:** Primary → Secondary → Primary (repeat). Use Light sparingly for maximum contrast impact.
- **Light sections:** "Trust Indicators" and "Why Choose Us" are candidates for `--v-bg-light`. Text must switch to `--v-text-dark`.
- **Overlays:** `--v-bg-overlay` (`rgba(16,16,16,0.72)`) is used for image overlays to maintain text legibility.

---

## 3. Typography System

### Font Families

| Role     | Family       | Fallback              | Weights loaded |
|----------|--------------|-----------------------|----------------|
| Headings | Manrope      | system-ui, sans-serif | 300 400 500 600 700 800 |
| Body/UI  | Inter        | system-ui, sans-serif | 300 400 500 600 |

Font loading: Google Fonts, preconnect optimised, `display=swap`.

### Type Scale

| Name      | Class           | Size (fluid/fixed)         | Weight | Line Height | Letter Spacing | Usage |
|-----------|-----------------|----------------------------|--------|-------------|----------------|-------|
| Display   | `.text-display` | `clamp(3rem, 7vw, 6rem)`   | 800    | 1.1         | -0.03em        | Hero headline (one per page) |
| Headline  | `.text-headline`| `clamp(2rem, 4vw, 3.25rem)`| 700    | 1.25        | -0.03em        | Section titles |
| Title     | `.text-title`   | `clamp(1.5rem, 2.5vw, 2rem)`| 600   | 1.25        | 0              | Subsection headings |
| Subtitle  | `.text-subtitle`| `clamp(1.125rem, 1.5vw, 1.375rem)`| 600 | 1.25   | 0              | Card headings |
| Body      | `.text-body`    | `1rem` (16px)              | 400    | 1.65        | 0              | Paragraphs |
| Body SM   | `.text-body-sm` | `0.9375rem` (15px)         | 400    | 1.5         | 0              | Supporting copy, captions |
| Label     | `.text-label`   | `0.875rem` (14px)          | 500    | 1           | 0.04em         | Buttons, nav links |
| Meta      | `.text-meta`    | `0.75rem` (12px)           | 600    | 1           | 0.14em UPPER   | Specs, badges, category labels |

### Eyebrow Label
- Class: `.eyebrow`
- 12px · Semibold · `0.14em` letter-spacing · Uppercase · Gold (`--v-gold`)
- Placed above section headlines; one per section

---

## 4. Spacing System

Base unit: **4px (0.25rem)**. All spacing values are multiples of 4.

| Token      | Value    | Pixels | Common use |
|------------|----------|--------|------------|
| `--space-1`| 0.25rem  | 4px    | Icon gaps, tiny nudges |
| `--space-2`| 0.5rem   | 8px    | Between label and input |
| `--space-3`| 0.75rem  | 12px   | Badge padding, tight items |
| `--space-4`| 1rem     | 16px   | Standard paragraph gap |
| `--space-5`| 1.25rem  | 20px   | Below eyebrow labels |
| `--space-6`| 1.5rem   | 24px   | Card padding, FAQ padding |
| `--space-8`| 2rem     | 32px   | Between sections of a card |
| `--space-10`| 2.5rem  | 40px   | Grid gaps on mobile |
| `--space-12`| 3rem    | 48px   | Component separation |
| `--space-16`| 4rem    | 64px   | Section heading-to-content |
| `--space-20`| 5rem    | 80px   | Large section breathing room |
| `--space-24`| 6rem    | 96px   | Tight section vertical padding |

### Section Padding
| Class           | Value                            |
|-----------------|----------------------------------|
| `.section-py`   | `clamp(5rem, 8vw, 7.5rem)` block |
| `.section-py-md`| `clamp(3.5rem, 6vw, 5rem)` block |
| `.section-py-sm`| `clamp(2.5rem, 4vw, 3.5rem)` block |

---

## 5. Layout System

| Property        | Value |
|-----------------|-------|
| Container max   | 1440px |
| Container class | `.container-velox` |
| Horizontal padding | `clamp(1.25rem, 5vw, 5rem)` (responsive) |
| Grid gap        | 1.5rem standard · 2rem large |
| Border radius   | `--radius-sm` 2px · `--radius-md` 4px · `--radius-lg` 8px · `--radius-xl` 12px |
| Border width    | 1px standard · 2px emphasis |

### Responsive Breakpoints
Using Tailwind v4 defaults (mobile-first):

| Breakpoint | Min-width | Layout intent |
|------------|-----------|---------------|
| (default)  | 0px       | Single column, stack layouts |
| `sm`       | 640px     | Two-column grids, nav adapts |
| `md`       | 768px     | Tablet — wider cards, adjusted type |
| `lg`       | 1024px    | Laptop — multi-column, full nav |
| `xl`       | 1280px    | Desktop — editorial widths |
| `2xl`      | 1536px    | Wide desktop, max container applies |

### Grid Patterns (by section)
| Section            | Mobile      | Tablet (md) | Desktop (xl) |
|--------------------|-------------|-------------|--------------|
| Hero               | 1 col full  | 1 col full  | 1 col full   |
| Trust Indicators   | 2 cols      | 4 cols      | 4 cols       |
| Vehicle Categories | scroll-x    | 3 cols      | 5 cols       |
| Fleet              | 1 col       | 2 cols      | 3 cols       |
| Booking Steps      | 1 col       | 2 cols      | 4 cols       |
| Requirements       | 1 col       | 2 cols      | 2 cols       |
| Why Choose Us      | 1 col       | 2 cols      | 3 cols       |
| FAQ                | 1 col       | 1 col       | 1 col (max 720px) |
| Contact            | 1 col       | 2 cols      | 2 cols       |

---

## 6. Component Specifications

### 6.1 Navbar
- **Background:** Transparent over hero. Transitions to `rgba(16,16,16,0.95)` + `1px` gold-tinted bottom border on scroll.
- **Height:** `5rem` (80px). Navbar content is vertically centred.
- **Logo:** `VELOX` wordmark — Manrope 800 · 1.25rem · white. Short gold rule to left.
- **Nav links:** 4–5 items. Inter Medium 14px · `0.04em` tracking. White at rest, gold on hover.
- **CTA button:** Primary button variant (`btn-primary`) — "Book Now" or "Enquire". Sits at the right end.
- **Mobile:** Hamburger icon (Lucide `Menu`). Fullscreen or slide-in drawer with all nav links stacked. Close on overlay click or Escape key.
- **Scroll behaviour:** `position: fixed`, `z-index: var(--z-sticky)`. Background + blur transition at scroll > 20px.

### 6.2 Buttons

| Variant          | Class            | Height         | Background       | Border         | Text colour |
|------------------|------------------|----------------|------------------|----------------|-------------|
| Primary          | `.btn-primary`   | 52px (btn-h-lg)| `--v-gold`       | `--v-gold`     | `#111`      |
| Secondary/Ghost  | `.btn-secondary` | 44px (btn-h-md)| Transparent      | `--v-border`   | `--v-text-primary` |
| Text             | `.btn-text`      | auto           | None             | None           | `--v-gold`  |
| Small            | add inline style | 36px (btn-h-sm)| Inherits variant | Inherits       | Inherits    |

Focus state: `outline: 2px solid var(--v-gold)`, `outline-offset: 3px`
Disabled state: `opacity: 0.4`, `cursor: not-allowed`
Icons inside buttons: 16px, left of text, `gap: 0.5rem`

### 6.3 Vehicle Cards (`.card-vehicle`)
- Background: `--v-bg-card` (`#202020`)
- Border: `1px solid --v-border` at rest → gold-tinted `rgba(198,168,117,0.4)` on hover
- Radius: `--radius-lg` (8px)
- Image: 16:9, `object-fit: cover`, subtle scale on hover (`scale(1.04)`)
- Card body padding: `--space-6` (1.5rem)
- Layout (top to bottom): image → eyebrow + name + badge → tagline → specs row → price + enquiry button
- Price display: Gold price amount with "Illustrative from" label above in meta style
- Badge: `.badge-gold` — top-right of card header area

### 6.4 Information Cards (`.card-info`)
- Background: `--v-bg-card`
- Border: `1px solid --v-border`
- Padding: `--space-8` (2rem)
- Icon: `.icon-circle` (3rem circle, gold icon, card background, border)
- Heading: `.text-subtitle` (Manrope 600)
- Body: `.text-body-sm` (Inter 400, secondary colour)

### 6.5 Form Elements
- Input height: `--input-h` (48px)
- Background: `--v-bg-card`
- Border: `1px solid --v-border` → gold focus ring
- Focus: `border-color: --v-gold` + `box-shadow: 0 0 0 3px --v-gold-subtle`
- Radius: `--radius-md` (4px)
- Error state: `border-color: --v-error`; error text in red below
- Success state: `border-color: --v-success`; confirmation text in green below
- Labels: persistent above inputs, never placeholder-only

### 6.6 FAQ Accordion
- Trigger: full-width button, Manrope Medium 16px
- Icon: Lucide `ChevronDown`, rotates 180° when open
- Animation: smooth max-height or Motion `AnimatePresence` (Phase 6)
- Separator: `1px solid --v-border` between items
- Answer: Inter Regular 15px, `--v-text-secondary`

### 6.7 Shared Rules

| Element     | Rule |
|-------------|------|
| Icons       | Lucide React only. Stroke width 1.5px. Sizes: 16 / 20 / 24 / 32px |
| Badges      | `.badge-gold` for featured vehicles. Never more than one per card |
| Dividers    | `.divider` (1px, `--v-border`) or `.accent-rule` (gold bar) |
| Section heading | `.section-heading` block: eyebrow → headline → optional subtext. Max-width 42rem |
| Image containers | Always `overflow: hidden`. Use defined aspect-ratio classes |
| Links       | Gold on hover, underline offset 3px, no underline at rest |

---

## 7. Section-by-Section Layout Plan

### 1. Navbar
- Fixed top, full width
- `z-index: var(--z-sticky)`
- Logo left, nav centre/right, CTA far right
- Transparent → dark on scroll

### 2. Hero
- Full viewport height (`100svh`), min 600px
- Full-bleed cinematic vehicle image with dark gradient overlay (bottom-up)
- Content positioned left-centre or lower-left
- Eyebrow → Display headline (two lines) → subtext (15px, muted) → two CTAs (primary + secondary)
- Background: dark semi-transparent overlay over image

### 3. Trust Indicators
- Background: `--v-bg-light` (light section for contrast contrast)
- 4-column grid on desktop; 2-column on mobile
- Each item: large stat or icon + label + short description
- Bold numerals in Manrope, gold highlight on the number
- Clearly labelled as illustrative where numbers are used

### 4. Vehicle Categories
- Background: `--v-bg-secondary`
- Horizontally scrollable pill/tab filter on mobile; row on desktop
- Active state: gold background, dark text
- Inactive: ghost border, muted text
- Below filter: vehicle count indicator e.g. "Showing 10 vehicles"

### 5. Available Fleet
- Background: `--v-bg-primary`
- 3-column grid (xl), 2-column (md), 1-column (mobile)
- Filterable by category (client-side)
- Vehicle cards with full spec, price (illustrative), enquiry button
- "Load more" or show-all toggle if > 6 vehicles initially

### 6. Booking Process
- Background: `--v-bg-secondary`
- 4 connected steps in a horizontal flow (desktop) / vertical stack (mobile)
- Steps: Choose Vehicle → Select Dates → Submit Enquiry → Confirmation
- Connector line between steps, gold active step

### 7. Rental Requirements
- Background: `--v-bg-primary`
- Two-column layout: eligibility checklist left, required documents right
- Icon + text items. Clear, scannable
- Callout box (subtle border, gold accent) for minimum age requirement

### 8. Why Choose Us
- Background: `--v-bg-light` (second light section)
- 3-column benefit grid
- Each: icon circle → heading → short copy
- No numbers; focus on benefit statements

### 9. FAQ
- Background: `--v-bg-secondary`
- Single column, max-width 720px, centred
- Accordion items with chevron icons
- 6–8 questions covering booking, documents, insurance, cancellation

### 10. Contact / Enquiry Form
- Background: `--v-bg-primary`
- Two-column: form left, contact info right (on desktop)
- Form: Name, Email, Phone, Vehicle Interest, Message, Submit
- Contact info: clearly marked placeholder details
- Demo notice: subtle banner stating form is not connected to a live service

### 11. Footer
- Background: `--v-bg-secondary`
- Four columns: Logo + tagline | Quick links | Fleet links | Contact placeholders
- Bottom bar: copyright · demo disclaimer · Tailwind/React credits
- Thin gold rule above footer content

---

## 8. Image Art Direction

### Style Guide
- **Mood:** Cinematic, editorial, aspirational — not stock-photo generic
- **Lighting:** Dramatic golden-hour, studio accent lights, or dusk city environments
- **Backgrounds:** Premium locations — coastal roads, city architecture, mountain passes, clean studio
- **Colour grading:** Cool shadows, slightly warm midtones, consistent saturation
- **Composition:** Subject centred or rule-of-thirds. Leave negative space for text overlays (hero)
- **Aspect ratios:** Hero 16:9 or wider; cards 16:9; category thumbnails 3:2

### Category Image Requirements

| Category       | Composition | Lighting | Environment | Special notes |
|----------------|-------------|----------|-------------|---------------|
| Luxury Sedan   | ¾ front angle or low profile | Golden hour or studio | City waterfront or grand hotel entrance | Polished, dark vehicle colour preferred |
| Premium SUV    | Front ¾ or elevated side | Daylight or dusk | Mountain road or country estate | Show commanding height |
| Economy        | Clean side or front 45° | Neutral daylight | Urban street, clean background | Should still look premium, not budget |
| Sports Car     | Low angle, dramatic | Late dusk / backlit | Coastal road or airfield | Motion blur or wide angle acceptable |
| Premium MPV    | Side or 45° showing interior through windows | Daylight | Airport or luxury hotel | Emphasise space and executive character |

### Hero Image Guidance
- Must support full-bleed 100svh
- Dark or muted tones on lower 60% to allow white text overlay
- One dominant vehicle, not a collage
- No watermarks, brand logos, or visible licence plates

---

## 9. Animation Plan (Phase 6)

> **Not implemented in Phase 1.** Documented for Phase 6 reference.

| Element             | Effect                          | Duration    | Easing              |
|---------------------|---------------------------------|-------------|---------------------|
| Hero headline       | Fade up, word by word or line   | 600–900ms   | `cubic-bezier(0.16,1,0.3,1)` |
| Hero image          | Subtle scale-in from 1.05→1.0   | 1000–1200ms | `ease-out`          |
| Section reveal      | Fade up 24px on scroll enter    | 500–700ms   | `ease-out`          |
| Vehicle card stagger| Stagger 80ms per card           | 400ms each  | `ease-out`          |
| Navbar bg           | Opacity + blur transition       | 250ms       | `ease-out`          |
| Button hover        | Background/border transition    | 150–250ms   | `ease-out`          |
| FAQ expand          | AnimatePresence height animate  | 300ms       | `ease-out`          |
| Mobile menu         | Slide/fade in                   | 300ms       | `ease-out`          |

All animations must respect `prefers-reduced-motion`. When reduced motion is active: remove all transforms and fade; maintain opacity-only or instant transitions.

---

## 10. Z-Index Stack

| Layer     | Value | Assigned to |
|-----------|-------|-------------|
| Below     | -1    | Background decorations |
| Base      | 0     | Normal document flow |
| Raised    | 10    | Cards on hover, active items |
| Dropdown  | 100   | Select dropdowns, tooltips |
| Sticky    | 200   | Fixed navbar |
| Overlay   | 300   | Mobile menu overlay |
| Modal     | 400   | Future modals/dialogs |
| Toast     | 500   | Notification toasts |

---

## 11. Accessibility Requirements

- All interactive elements must have keyboard focus states (`outline`, not `outline: none`)
- Focus ring: `2px solid var(--v-gold)` with `3px offset`
- Minimum touch target: 44×44px
- Text on dark backgrounds: minimum 4.5:1 contrast (WCAG AA)
- Images: meaningful `alt` text on all vehicles; decorative images use `alt=""`
- Forms: labels always visible (not replaced by placeholder)
- Reduced motion: honour `prefers-reduced-motion: reduce`
- Accordion: use `button` elements with `aria-expanded`
- Mobile nav: `aria-label="Main navigation"`, trap focus when open

