import { motion, useReducedMotion } from 'motion/react'
import { Fuel, MapPin, Clock, RotateCcw, Wallet, Route, Info } from 'lucide-react'
import { rentalPolicies } from '../data/rentalInfo'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

const iconMap = {
  Fuel,
  MapPin,
  Clock,
  RotateCcw,
  Wallet,
  Route,
}

export default function RentalInformation() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="rental-information"
      className="section-py bg-bg-secondary relative border-t border-border"
      aria-label="Rental Information and Policies"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20"
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          <div className="section-heading">
            <span className="eyebrow flex items-center gap-2">
              <Info size={14} className="text-gold" aria-hidden="true" />
              <span>Rental Information</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              The Details That Matter.
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              A few important things to understand before you begin your journey.
              Review key terms regarding fuel, durations, cancellations, and travel boundaries.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              Operational Policies &amp; Guidance
            </span>
          </div>
        </motion.div>

        {/* ── 2-Column Policy Information Grid ───────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {rentalPolicies.map((policy, index) => {
            const IconComponent = iconMap[policy.iconName] || Info

            return (
              <motion.article
                key={policy.id}
                className="group relative bg-bg-card border border-border rounded-lg p-7 transition-all duration-300 hover:border-gold/50 hover:bg-bg-card/90"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                  ease: luxuryEase,
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Left Number / Icon Column */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-md bg-bg-secondary border border-border flex items-center justify-center text-gold group-hover:border-gold/60 group-hover:bg-gold/10 transition-colors duration-200">
                      <IconComponent size={22} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <span className="text-meta font-mono font-bold text-text-muted text-center block mt-2">
                      {policy.id}
                    </span>
                  </div>

                  {/* Right Content Column */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-title font-heading font-bold text-white mb-2 group-hover:text-gold transition-colors duration-200">
                      {policy.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed mb-4">
                      {policy.description}
                    </p>

                    {/* Operational key point */}
                    <div className="p-3 rounded bg-bg-secondary/60 border border-border-subtle flex items-start gap-2.5 text-[12px] text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1" aria-hidden="true" />
                      <span className="leading-snug">{policy.keyPoint}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* ── General Informational Disclaimer ───────────────── */}
        <motion.div
          className="mt-12 p-6 rounded-lg bg-bg-card border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.25, ease: luxuryEase }}
        >
          <p className="text-body-sm text-text-muted leading-relaxed">
            <strong className="text-text-secondary font-medium">Policy Disclaimer:</strong> All policy descriptions above represent general operational parameters. Specific terms, fuel agreements, security deposit rates, and state entry fees must be finalized with your rental concierge prior to booking confirmation.
          </p>
          <a
            href="#contact"
            className="btn btn-secondary !h-10 !px-4 !text-xs font-semibold shrink-0"
          >
            Review Terms With Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
