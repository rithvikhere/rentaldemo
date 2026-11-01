import { motion, useReducedMotion } from 'motion/react'
import { Compass, FileText, PhoneCall, KeyRound, Workflow, ArrowRight } from 'lucide-react'
import { bookingSteps } from '../data/rentalInfo'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

const iconMap = {
  Compass,
  FileText,
  PhoneCall,
  KeyRound,
}

export default function BookingProcess() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="how-it-works"
      className="section-py bg-bg-primary relative border-t border-border-subtle"
      aria-label="How Booking Works"
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
              <Workflow size={14} className="text-gold" aria-hidden="true" />
              <span>How It Works</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Your Journey Starts Here.
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              Getting behind the wheel is simple. Follow a few easy steps and get ready
              for your next journey with prompt confirmation and transparent guidance.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              4 Streamlined Steps
            </span>
          </div>
        </motion.div>

        {/* ── Desktop & Tablet Process Grid ──────────────────── */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line (Desktop xl only) */}
          <motion.div
            className="hidden xl:block absolute top-[52px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent z-0 origin-left"
            aria-hidden="true"
            initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
            whileInView={shouldReduceMotion ? {} : { scaleX: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
            {bookingSteps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Compass

              return (
                <motion.div
                  key={step.step}
                  className="card-info group hover:border-gold/50 transition-all duration-300 relative flex flex-col justify-between"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : index * 0.12,
                    ease: luxuryEase,
                  }}
                >
                  {/* Top Step Number & Icon Row */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      {/* Step Number pill */}
                      <span className="text-meta font-mono font-bold text-gold tracking-widest px-2.5 py-1 rounded-[2px] bg-gold/10 border border-gold/25 transition-colors duration-200 group-hover:border-gold/50">
                        STEP {step.step}
                      </span>

                      {/* Icon Circle */}
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-bg-primary border border-border text-gold group-hover:border-gold/60 group-hover:bg-gold/10 transition-colors duration-200">
                        <IconComponent size={20} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-title font-heading font-bold text-white mb-3 group-hover:text-gold transition-colors duration-200">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-body-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="pt-6 mt-6 border-t border-border-subtle flex items-center justify-between text-meta text-text-muted">
                    <span>Phase 0{index + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-gold transition-colors duration-200" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Bottom Callout: Need custom arrangements? ──────── */}
        <motion.div
          className="mt-14 p-6 sm:p-8 rounded-lg bg-bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.3, ease: luxuryEase }}
        >
          <div>
            <h4 className="text-subtitle font-heading font-semibold text-white mb-1">
              Need personalized or long-term arrangements?
            </h4>
            <p className="text-body-sm text-text-secondary">
              Our reservation team can assist with private transfers, extended fleet hire, and bespoke delivery requests.
            </p>
          </div>
          <a
            href="#contact"
            className="btn btn-secondary text-label shrink-0 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-sm"
          >
            <span>Speak with a Specialist</span>
            <ArrowRight size={16} className="text-gold" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
