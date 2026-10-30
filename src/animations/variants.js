/**
 * ================================================================
 * VELOX Motion Design System Tokens & Animation Variants
 * Phase 6 — Restrained, Cinematic, Performance-Conscious Motion
 * ================================================================
 */

// Bespoke luxury easing: snappy response with an elegant, cinematic deceleration
export const luxuryEase = [0.16, 1, 0.3, 1]
export const smoothEase = [0.22, 1, 0.36, 1]

// Shared viewport configuration for scroll-triggered reveals
export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -40px 0px',
}

// Fade Up Variant (standard 20px translation, luxury ease)
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.65,
      delay: custom.delay ?? 0,
      ease: luxuryEase,
    },
  }),
}

// Fade In Variant (pure opacity)
export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? 0.75,
      delay: custom.delay ?? 0,
      ease: 'easeOut',
    },
  }),
}

// Stagger Container
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

// Stagger Item (child element within a staggered container)
export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: luxuryEase,
    },
  },
}

// Subtle Scale Zoom for automotive photography reveals
export const imageZoomVariant = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: luxuryEase,
    },
  },
}
