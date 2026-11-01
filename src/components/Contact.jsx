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
      style={{ backgroundColor: '#101010' }}
      aria-label="Contact and Enquiry"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="section-heading"
          style={{ marginBottom: 'clamp(3.5rem, 6vw, 5rem)' }}
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          <span className="eyebrow flex items-center gap-2 mb-3">
            <Mail size={15} className="text-gold" aria-hidden="true" />
            <span>Get in Touch</span>
          </span>
          <h2 className="text-headline font-heading font-extrabold text-white mt-2 mb-5 sm:mb-6">
            Let&apos;s Get You Moving.
          </h2>
          <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
            Have a destination in mind? Connect with our concierge or submit your itinerary preferences below.
          </p>
        </motion.div>

        {/* ── 2-Column Layout: Contact Details & Form ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Contact Information */}
          <motion.div
            className="lg:col-span-4 order-1"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: 0.1, ease: luxuryEase }}
          >
            <ContactInfo />
          </motion.div>

          {/* Right Column: Enquiry Form (Wider Outside Box) */}
          <motion.div
            className="lg:col-span-8 order-2"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: 0.18, ease: luxuryEase }}
          >
            <EnquiryForm
              preselectedVehicle={preselectedVehicle}
              onResetVehicle={onResetVehicle}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
