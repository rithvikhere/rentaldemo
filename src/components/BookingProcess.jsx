import { motion } from 'motion/react'
import { Compass, FileText, PhoneCall, KeyRound, Workflow, ArrowRight } from 'lucide-react'
import { bookingSteps } from '../data/rentalInfo'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const iconMap = {
  Compass,
  FileText,
  PhoneCall,
  KeyRound,
}

export default function BookingProcess() {
  const reduced = prefersReducedMotion()

  return (
    <section
      id="how-it-works"
      className="section-py bg-bg-secondary relative border-t border-border"
      aria-label="How Booking Works"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20">
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
        </div>

        {/* ── Desktop & Tablet Process Grid ──────────────────── */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line (Desktop xl only) */}
          <div
            className="hidden xl:block absolute top-[52px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 relative z-10">
            {bookingSteps.map((step, index) => {
              const IconComponent = iconMap[step.iconName] || Compass

              return (
                <motion.article
                  key={step.step}
                  className="card-info group flex flex-col justify-between h-full relative transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:-translate-y-1"
                  initial={reduced ? {} : { opacity: 0, y: 24 }}
                  whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Top Step Number & Icon Row */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      {/* Step Number pill */}
                      <span className="text-meta font-mono font-bold text-gold tracking-widest px-2.5 py-1 rounded-[2px] bg-gold/10 border border-gold/25">
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
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* ── Bottom Callout Banner ──────────────────────────── */}
        <div className="mt-12 p-6 rounded-lg bg-bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" aria-hidden="true" />
            <p className="text-body-sm text-text-secondary">
              Have specific itinerary requests or need corporate fleet booking?
            </p>
          </div>
          <a
            href="#contact"
            className="text-label text-gold hover:text-gold-light inline-flex items-center gap-1.5 font-semibold transition-colors shrink-0"
          >
            <span>Ask an Enquiry Specialist</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
