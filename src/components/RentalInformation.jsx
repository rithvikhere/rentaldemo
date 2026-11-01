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
      className="section-py bg-bg-primary relative border-t border-border-subtle"
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
              Transparent, straightforward rental terms designed for an effortless luxury
              experience. Review essential information before completing your reservation.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              Fair & Transparent Terms
            </span>
          </div>
        </motion.div>

        {/* ── Policy Cards Grid ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalPolicies.map((policy, index) => {
            const IconComponent = iconMap[policy.icon] || Fuel

            return (
              <motion.article
                key={policy.id}
                className="card-info group hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: luxuryEase,
                }}
              >
                <div>
                  {/* Icon & Policy Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-12 h-12 rounded-md bg-bg-secondary border border-border flex items-center justify-center text-gold group-hover:border-gold/60 group-hover:bg-gold/10 transition-colors duration-200">
                      <IconComponent size={22} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-title font-heading font-bold text-white group-hover:text-gold transition-colors duration-200">
                        {policy.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-body-sm text-text-secondary leading-relaxed mb-6">
                    {policy.description}
                  </p>
                </div>

                {/* Key Point Box */}
                <div className="p-3 rounded bg-bg-secondary/60 border border-border-subtle flex items-start gap-2.5 text-[12px] text-text-secondary">
                  <span className="font-semibold text-gold shrink-0">Key:</span>
                  <span className="leading-snug">{policy.keyPoint}</span>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* ── Additional Coverage Note ───────────────────────── */}
        <motion.div
          className="mt-14 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-body-sm text-text-secondary"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            Questions about bespoke itineraries, airport VIP delivery, or customized insurance coverage?
          </p>
          <a
            href="#contact"
            className="text-label font-semibold text-gold hover:text-gold-light transition-colors whitespace-nowrap"
          >
            Contact Concierge Desk →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
