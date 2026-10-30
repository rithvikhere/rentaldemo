import { Mail } from 'lucide-react'
import ContactInfo from './ContactInfo'
import EnquiryForm from './EnquiryForm'

export default function Contact({ preselectedVehicle, onResetVehicle }) {
  return (
    <section
      id="contact"
      className="section-py bg-bg-secondary relative border-t border-border"
      aria-label="Contact and Enquiry"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20">
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
              Direct Concierge &amp; Enquiries
            </span>
          </div>
        </div>

        {/* ── 2-Column Layout: Contact Details & Form ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 order-1">
            <ContactInfo />
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7 order-2">
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
