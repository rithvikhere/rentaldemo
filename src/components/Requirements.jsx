import { motion, useReducedMotion } from 'motion/react'
import { FileText, UserCheck, MapPin, Wallet, Award, ClipboardCheck, ShieldCheck, AlertCircle } from 'lucide-react'
import { rentalRequirements } from '../data/rentalInfo'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

const iconMap = {
  FileText,
  UserCheck,
  MapPin,
  Wallet,
  Award,
  ClipboardCheck,
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 lg:mb-24"
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          <div className="section-heading">
            <span className="eyebrow flex items-center gap-2">
              <ShieldCheck size={14} className="text-gold" aria-hidden="true" />
              <span>Rental Requirements</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Everything You Need Before You Drive.
            </h2>
            <p className="text-body text-text-secondary mt-4 max-w-2xl leading-relaxed">
              Keep the essential documents ready for a smooth rental experience.
              Review the checklist below to ensure hassle-free handovers.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              Standard Onboarding Criteria
            </span>
          </div>
        </motion.div>

        {/* ── 6 Requirements Grid (3 cols desktop, 2 cols tablet, 1 col mobile) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {rentalRequirements.map((req, index) => {
            const IconComponent = iconMap[req.iconName] || FileText

            return (
              <motion.article
                key={req.id}
                className="card-info group flex flex-col justify-between h-full bg-bg-card border border-border rounded-xl p-8 sm:p-9 transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:-translate-y-1"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                  ease: luxuryEase,
                }}
              >
                <div>
                  {/* Top: Icon + Numbered identifier */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-md flex items-center justify-center bg-bg-secondary border border-border text-gold group-hover:border-gold/60 group-hover:bg-gold/10 transition-colors duration-200">
                      <IconComponent size={20} strokeWidth={1.75} aria-hidden="true" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-bg-secondary text-text-muted border border-border-subtle">
                        {req.highlight}
                      </span>
                      <span className="text-meta font-mono font-bold text-text-muted">
                        {req.id}
                      </span>
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-title font-heading font-bold text-white mb-2.5 group-hover:text-gold transition-colors duration-200">
                    {req.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    {req.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="pt-4 mt-6 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
                  <span>Requirement {req.id} of 06</span>
                  <span className="text-gold font-medium">Verified Handover</span>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* ── Transparency & Disclaimer Callout ──────────────── */}
        <motion.div
          className="mt-20 lg:mt-24 p-8 sm:p-9 rounded-xl bg-bg-secondary border border-border/80 flex items-start gap-5 shadow-sm"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.25, ease: luxuryEase }}
        >
          <AlertCircle size={20} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-body-sm text-text-secondary leading-relaxed">
            <strong className="text-white font-semibold block mb-0.5">
              Accuracy &amp; Transparency Notice
            </strong>
            The requirements listed above are illustrative and representative of standard
            automotive rental protocols. Actual acceptable identification types, minimum age
            brackets, driving experience stipulations, and security deposit amounts may vary
            depending on the individual rental provider, vehicle category, and local jurisdiction.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
