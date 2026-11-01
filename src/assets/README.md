# VELOX — Image Asset Requirements
**Phase 1 Art Direction Reference**

> This document defines which images are needed, their specifications, and where they will be used. During development, placeholder images from Unsplash are used. Final images should be sourced or licensed before any client delivery.

---

## Naming Convention

```
[section]-[category]-[variant].[ext]
```

Examples:
- `hero-luxury-sedan-01.webp`
- `fleet-suv-range-rover-01.webp`
- `category-sports-thumb.webp`

Place final assets in: `src/assets/images/`

---

## Hero Section

| Asset              | Dimensions    | Format | Notes |
|--------------------|---------------|--------|-------|
| `hero-main.webp`   | 1920×1080 min | WebP   | Primary hero. Full-bleed, dark lower half for text overlay. Luxury or sports vehicle, dynamic angle. |
| `hero-main-mobile.webp` | 750×1200 | WebP | Portrait crop for mobile hero. Vehicle still visible, text area preserved. |

**Unsplash placeholder (dev):**
`https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85`

---

## Vehicle Category Thumbnails

Used in the Vehicle Categories filter section as visual category indicators.

| Asset                   | Dimensions | Format | Notes |
|-------------------------|------------|--------|-------|
| `cat-luxury-thumb.webp` | 480×320    | WebP   | Luxury sedan, front ¾ angle |
| `cat-suv-thumb.webp`    | 480×320    | WebP   | Premium SUV, elevated view |
| `cat-economy-thumb.webp`| 480×320    | WebP   | Economy hatchback, clean daylight |
| `cat-sports-thumb.webp` | 480×320    | WebP   | Sports car, low dramatic angle |
| `cat-mpv-thumb.webp`    | 480×320    | WebP   | Premium MPV, side/entry view |

---

## Fleet Vehicle Images

Each vehicle card uses a single primary image. 16:9 aspect ratio, minimum 900px wide.

| Vehicle                  | Asset filename                    | Unsplash placeholder |
|--------------------------|-----------------------------------|----------------------|
| Mercedes-Benz S-Class    | `fleet-luxury-sclass.webp`        | `photo-1563720223185` |
| BMW 7 Series             | `fleet-luxury-bmw7.webp`          | `photo-1555215695` |
| Range Rover Autobiography| `fleet-suv-rangerover.webp`       | `photo-1606664515524` |
| Porsche Cayenne S        | `fleet-suv-cayenne.webp`          | `photo-1503376780353` |
| Volkswagen Golf          | `fleet-economy-golf.webp`         | `photo-1541443131876` |
| Toyota Corolla           | `fleet-economy-corolla.webp`      | `photo-1623869675781` |
| Porsche 911 Carrera      | `fleet-sports-911.webp`           | `photo-1618843479313` |
| Audi R8 V10              | `fleet-sports-r8.webp`            | `photo-1614200187524` |
| Mercedes V-Class         | `fleet-mpv-vclass.webp`           | `photo-1585503418537` |
| BMW X7                   | `fleet-mpv-x7.webp`               | `photo-1617788138017` |

---

## Image Technical Requirements

| Requirement      | Value |
|------------------|-------|
| Format           | WebP preferred; JPEG acceptable |
| Min quality      | 80% (WebP), 85% (JPEG) |
| Max file size    | Hero: 300 KB · Fleet cards: 120 KB · Thumbnails: 60 KB |
| object-fit       | `cover` on all containers |
| object-position  | `center` default; `center 30%` for hero |
| Alt text         | Required, descriptive: vehicle name + angle + environment |
| Loading          | `lazy` on all below-fold images; `eager` on hero |
| Fallback         | CSS background-color `--v-bg-card` shown while loading |

---

## Fallback Strategy

```jsx
// Pattern to use in Phase 3+ vehicle cards:
<img
  src={vehicle.image}
  alt={vehicle.imageAlt}
  loading="lazy"
  onError={(e) => {
    e.target.style.display = 'none'
    e.target.parentElement.style.backgroundColor = vehicle.imageFallback
  }}
/>
```

---

## Image Sources (Development)

All development placeholder images are sourced from [Unsplash](https://unsplash.com).
These images are free for use under the Unsplash License during development.

**Before client delivery:** Replace with licensed automotive photography or properly cleared imagery.

---

## Do Not Use

- Images with visible third-party brand logos in prominent positions
- Images with visible licence plates (obscure or avoid)
- Generic stock photos of interiors only (for vehicle cards)
- Low-resolution images (below 800px width)
- Images with heavy Shutterstock / Getty watermarks
- Collage or multi-vehicle compositions for hero or cards

