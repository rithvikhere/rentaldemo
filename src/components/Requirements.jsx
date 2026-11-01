import { motion, useReducedMotion } from 'motion/react'
import { UserCheck, CreditCard, ShieldCheck, FileCheck, ClipboardList, CheckCircle2 } from 'lucide-react'
import { rentalRequirements } from '../data/rentalInfo'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

const iconMap = {
  UserCheck,
  FileCheck,
  CreditCard,
  ShieldCheck,
}

export default function Requirements() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="rental-requirements"
      className="section-py bg-bg-primary relative border-t border-border-subtle"
      aria-label="Rental Requirements"
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
              <ClipboardList size={14} className="text-gold" aria-hidden="true" />
              <span>Prerequisites</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Rental Requirements
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              To ensure an exceptional driving experience and complete vehicle protection,
              all hirers must meet the following baseline requirements prior to key handover.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              Eligibility & Verification
            </span>
          </div>
        </motion.div>

        {/* ── Requirements Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rentalRequirements.map((item, index) => {
            const IconComponent = iconMap[item.icon] || UserCheck

            return (
              <motion.article
                key={item.id}
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
                  {/* Icon & Title Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-md flex items-center justify-center bg-bg-secondary border border-border text-gold group-hover:border-gold/60 group-hover:bg-gold/10 transition-colors duration-200">
                      <IconComponent size={20} strokeWidth={1.75} aria-hidden="true" />
                    </div>

                    {/* Standard Requirement Tag */}
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-bg-secondary text-text-muted border border-border-subtle">
                      Mandatory
                    </span>
                  </div>

                  <h3 className="text-title font-heading font-bold text-white mb-3 group-hover:text-gold transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="text-body-sm text-text-secondary leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Additional criteria note */}
                <div className="pt-4 border-t border-border-subtle">
                  <span className="text-[12px] text-text-muted flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    <span>Verified prior to handover</span>
                  </span>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* ── Document Checklist Note ─────────────────────────── */}
        <motion.div
          className="mt-12 p-6 rounded-lg bg-bg-secondary border border-border/80 flex items-start gap-4"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.35, ease: luxuryEase }}
        >
          <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0 mt-0.5">
            <CheckCircle2 size={18} aria-hidden="true" />
          </div>
          <div className="text-body-sm text-text-secondary">
            <strong className="text-white font-semibold">International Driving Permits:</strong>{' '}
            Hirers holding licenses not printed in the Roman alphabet must provide an International
            Driving Permit (IDP) alongside their valid national driver&apos;s license and original passport.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
