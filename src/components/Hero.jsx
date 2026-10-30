import { motion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'

/* ─── Hero image ──────────────────────────────────────────────────
   Unsplash — cinematic dark Lamborghini / luxury sports car
   photo-1544636331-e26879cd4d9b (tested, loads reliably)
   Fallback colour matches --v-bg-secondary (#181818)
────────────────────────────────────────────────────────────────── */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85&auto=format&fit=crop'

const HERO_IMAGE_FALLBACK = '#181818'

/* ─── Reduced-motion helper ───────────────────────────────────── */
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ─── Entrance animation helpers ────────────────────────────────── */
function fadeUp(delay = 0, reduced = false) {
  if (reduced) return { initial: {}, animate: {}, transition: {} }
  return {
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0  },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }
}

function fadeIn(delay = 0, reduced = false) {
  if (reduced) return { initial: {}, animate: {}, transition: {} }
  return {
    initial:    { opacity: 0 },
    animate:    { opacity: 1 },
    transition: { delay, duration: 0.9, ease: 'easeOut' },
  }
}

/* ================================================================
   Hero
   ================================================================ */
export default function Hero() {
  const reduced = prefersReducedMotion()

  const handleNav = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="home"
      className="velox-hero"
      aria-label="VELOX — Premium Car Rental"
    >
      {/* ── Background image ────────────────────────────────── */}
      <motion.div
        className="velox-hero__bg"
        aria-hidden="true"
        {...(reduced
          ? {}
          : {
              initial:    { opacity: 0, scale: 1.06 },
              animate:    { opacity: 1, scale: 1    },
              transition: { duration: 1.4, ease: 'easeOut' },
            }
        )}
      >
        <img
          src={HERO_IMAGE}
          alt=""
          loading="eager"
          fetchpriority="high"
          draggable="false"
          style={{ background: HERO_IMAGE_FALLBACK }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background = HERO_IMAGE_FALLBACK
          }}
        />
        {/* Multi-stop gradient overlay — dark on bottom for text, subtle top fade */}
        <div className="velox-hero__overlay" aria-hidden="true" />
      </motion.div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="velox-hero__content container-velox">
        <div className="velox-hero__text">

          {/* Eyebrow */}
          <motion.span
            className="velox-hero__eyebrow"
            {...fadeUp(0.2, reduced)}
          >
            Premium Car Rentals
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="velox-hero__headline"
            {...fadeUp(0.38, reduced)}
          >
            <span className="velox-hero__headline-line">Your Journey.</span>
            <span className="velox-hero__headline-line velox-hero__headline-line--accent">
              Your Choice.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="velox-hero__description"
            {...fadeUp(0.56, reduced)}
          >
            Discover a better way to travel with a curated collection of&nbsp;vehicles
            designed for every journey — from city driving to open-road escapes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="velox-hero__ctas"
            {...fadeUp(0.7, reduced)}
          >
            <a
              href="#fleet"
              onClick={(e) => handleNav(e, '#fleet')}
              className="btn btn-primary velox-hero__cta-primary"
            >
              Explore Fleet
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="btn btn-secondary velox-hero__cta-secondary"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <motion.a
        href="#fleet"
        onClick={(e) => handleNav(e, '#fleet')}
        className="velox-hero__scroll"
        aria-label="Scroll down to explore the fleet"
        {...fadeIn(1.1, reduced)}
      >
        <span className="velox-hero__scroll-label">Scroll to Explore</span>
        <span className="velox-hero__scroll-icon" aria-hidden="true">
          <ChevronDown size={18} strokeWidth={1.5} />
        </span>
      </motion.a>
    </section>
  )
}
