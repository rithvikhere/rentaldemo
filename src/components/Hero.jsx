import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { luxuryEase } from '../animations/variants'

/* ─── Hero image ──────────────────────────────────────────────────
   Cinematic dark Lamborghini / luxury sports car
   Fallback colour matches --v-bg-secondary (#181818)
────────────────────────────────────────────────────────────────── */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85&auto=format&fit=crop'

const HERO_IMAGE_FALLBACK = '#181818'

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  // Scroll-linked subtle parallax for hero background image
  const { scrollY } = useScroll()
  // Restrained depth: max 60px over 600px of scroll
  const parallaxY = useTransform(scrollY, [0, 600], [0, 60])

  return (
    <section
      id="home"
      className="velox-hero"
      aria-label="VELOX — Premium Car Rental"
    >
      {/* ── Background image with subtle parallax ───────────── */}
      <motion.div
        className="velox-hero__bg"
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { y: parallaxY }}
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 1.06 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
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
        {/* Multi-stop gradient overlay */}
        <div className="velox-hero__overlay" aria-hidden="true" />
      </motion.div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="velox-hero__content container-velox">
        <div className="velox-hero__text">

          {/* 1. Eyebrow */}
          <motion.span
            className="velox-hero__eyebrow"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: luxuryEase }}
          >
            Premium Car Rentals
          </motion.span>

          {/* 2. Headline */}
          <motion.h1
            className="velox-hero__headline"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7, ease: luxuryEase }}
          >
            <span className="velox-hero__headline-line">Your Journey.</span>
            <span className="velox-hero__headline-line velox-hero__headline-line--accent">
              Your Choice.
            </span>
          </motion.h1>

          {/* 3. Description */}
          <motion.p
            className="velox-hero__description"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.65, ease: luxuryEase }}
          >
            Discover a better way to travel with a curated collection of&nbsp;vehicles
            designed for every journey — from city driving to open-road escapes.
          </motion.p>

          {/* 4. CTAs */}
          <motion.div
            className="velox-hero__ctas"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.65, ease: luxuryEase }}
          >
            <a
              href="#fleet"
              className="btn btn-primary velox-hero__cta-primary group"
            >
              <span>Explore Fleet</span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#contact"
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
        className="velox-hero__scroll"
        aria-label="Scroll down to explore the fleet"
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
      >
        <span className="velox-hero__scroll-label">Scroll to Explore</span>
        <span className="velox-hero__scroll-icon" aria-hidden="true">
          <ChevronDown size={18} strokeWidth={1.5} />
        </span>
      </motion.a>
    </section>
  )
}
