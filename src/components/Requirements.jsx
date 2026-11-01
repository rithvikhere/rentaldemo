import { motion, useReducedMotion } from 'motion/react'
import { rentalRequirements } from '../data/rentalInfo'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

export default function Requirements() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="rental-requirements"
      className="min-h-screen py-36 md:py-48 lg:py-60 flex flex-col justify-center bg-transparent relative"
      aria-label="Rental Requirements"
    >
      <div className="container-velox w-full">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="section-heading mb-20 md:mb-28 lg:mb-36"
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          {/* 1. Header (with 2-3 lines space below) */}
          <h2 className="text-display sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-10 md:mb-14 lg:mb-16 tracking-tight">
            Everything You Need Before You Drive.
          </h2>

          {/* 2. Text below it (with 3-4 lines space above and massive space before the boxes) */}
          <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-3xl">
            Essential documentation and verification standards to ensure a seamless handover experience.
          </p>
        </motion.div>

        {/* ── 3. Dialogue Boxes (spacious, comfortably proportioned) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {rentalRequirements.map((req, index) => (
            <motion.article
              key={req.id}
              className="bg-bg-card border border-border-subtle rounded-2xl p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-gold/40 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] shadow-xl shadow-black/25"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.06,
                ease: luxuryEase,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-mono text-gold font-semibold tracking-wider">
                    {req.id}
                  </span>
                  <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-bg-secondary text-text-muted border border-border-subtle font-medium">
                    {req.highlight}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-[1.65rem] font-heading font-bold text-white mb-4 tracking-tight leading-snug">
                  {req.title}
                </h3>

                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                  {req.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
