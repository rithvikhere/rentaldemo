import { motion, useReducedMotion } from 'motion/react'
import { Mail } from 'lucide-react'
import ContactInfo from './ContactInfo'
import EnquiryForm from './EnquiryForm'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

export default function Contact({ preselectedVehicle, onResetVehicle }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="contact"
      className="section-py bg-bg-primary relative border-t border-border-subtle"
      aria-label="Contact and Enquiry"
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
              <Mail size={14} className="text-gold" aria-hidden="true" />
              <span>Get in Touch</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Let&apos;s Get You Moving.
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              Have a destination in mind? Get in touch with our team and we&apos;ll help you
              find the right vehicle tailored for your journey and schedule.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              Direct Concierge Support
            </span>
          </div>
        </motion.div>

        {/* ── Content Grid: Contact Cards (Left) + Enquiry Form (Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Cards & Operational Info (5 cols) */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>

          {/* Right Column: Interactive Reservation Form (7 cols) */}
          <div className="lg:col-span-7">
            <EnquiryForm
              preselectedVehicle={preselectedVehicle}
              onResetVehicle={onResetVehicle}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
