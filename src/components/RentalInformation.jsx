import { motion, useReducedMotion } from 'motion/react'
import { rentalPolicies } from '../data/rentalInfo'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

export default function RentalInformation() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="rental-information"
      className="min-h-screen py-36 md:py-48 lg:py-60 flex flex-col justify-center bg-transparent relative"
      aria-label="Rental Information and Policies"
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
            The Details That Matter.
          </h2>

          {/* 2. Text below it (with 3-4 lines space above and massive space before the boxes) */}
          <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-3xl">
            Essential policies regarding fuel arrangements, extensions, cancellation terms, and operational boundaries.
          </p>
        </motion.div>

        {/* ── 3. Dialogue Boxes (comfortably sized to text, spatially placed) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
          {rentalPolicies.map((policy, index) => (
            <motion.article
              key={policy.id}
              className="bg-bg-card border border-border-subtle rounded-2xl p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-gold/40 flex flex-col justify-start shadow-xl shadow-black/25"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.07,
                ease: luxuryEase,
              }}
            >
              <h3 className="text-2xl sm:text-[1.65rem] font-heading font-bold text-white mb-4 tracking-tight leading-snug">
                {policy.title}
              </h3>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
                {policy.description}
              </p>

              <div className="border-t border-border-subtle pt-5 mt-auto">
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {policy.keyPoint}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
