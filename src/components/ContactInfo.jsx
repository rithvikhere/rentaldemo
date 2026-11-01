import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import { contactConfig } from '../data/contactInfo'

export default function ContactInfo() {
  const { phone, email, location, operatingHours, whatsapp } = contactConfig

  return (
    <div className="flex flex-col">
      <div>
        <div className="mb-10">
          <span className="eyebrow block mb-3">Direct Channels</span>
          <h3 className="text-title font-heading font-bold text-white mb-3 tracking-tight">
            Concierge Desk
          </h3>
          <p className="text-body text-text-secondary leading-relaxed">
            Direct automotive support for itinerary questions, outstation itineraries, or private fleet arrangements.
          </p>
        </div>

        {/* ── 4 Contact Blocks ──────────────────────────────── */}
        <div className="flex flex-col gap-6 sm:gap-7">
          {/* Phone */}
          <div className="p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle group transition-colors duration-200 hover:border-gold/40 shadow-lg shadow-black/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center text-gold shrink-0">
                <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-wider text-text-muted block mb-1.5 font-medium">
                  Phone
                </span>
                <div className="text-white font-medium text-base sm:text-lg mb-1">
                  {phone.display}
                </div>
                {phone.isConfigured && phone.value ? (
                  <a
                    href={`tel:${phone.value}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light font-semibold transition-colors mt-1"
                  >
                    <span>Call Concierge Desk</span>
                  </a>
                ) : (
                  <span className="text-xs text-text-muted block mt-1">
                    {phone.placeholderNote}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle group transition-colors duration-200 hover:border-gold/40 shadow-lg shadow-black/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center text-gold shrink-0">
                <Mail size={20} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-wider text-text-muted block mb-1.5 font-medium">
                  Email
                </span>
                <div className="text-white font-medium text-base sm:text-lg mb-1 truncate">
                  {email.display}
                </div>
                {email.isConfigured && email.value ? (
                  <a
                    href={`mailto:${email.value}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light font-semibold transition-colors mt-1"
                  >
                    <span>Send Direct Email</span>
                  </a>
                ) : (
                  <span className="text-xs text-text-muted block mt-1">
                    {email.placeholderNote}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle group transition-colors duration-200 hover:border-gold/40 shadow-lg shadow-black/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center text-gold shrink-0">
                <MapPin size={20} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-wider text-text-muted block mb-1.5 font-medium">
                  Showroom &amp; Hub
                </span>
                <div className="text-white font-medium text-sm sm:text-base leading-relaxed mb-1">
                  {location.display}
                </div>
                {location.isConfigured && location.value ? (
                  <a
                    href={location.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light font-semibold transition-colors mt-1"
                  >
                    <span>Get Directions</span>
                  </a>
                ) : (
                  <span className="text-xs text-text-muted block mt-1">
                    {location.placeholderNote}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle group transition-colors duration-200 hover:border-gold/40 shadow-lg shadow-black/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center text-gold shrink-0">
                <Clock size={20} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-wider text-text-muted block mb-1.5 font-medium">
                  Operating Hours
                </span>
                <div className="text-white font-medium text-sm sm:text-base leading-relaxed">
                  {operatingHours.display}
                </div>
                <p className="text-xs text-text-muted mt-1.5">
                  {operatingHours.support}
                </p>
              </div>
            </div>
          </div>

          {/* Optional WhatsApp Status Card */}
          <div className="p-6 rounded-2xl bg-bg-secondary border border-border-subtle flex items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3.5">
              <MessageSquare size={18} className="text-gold shrink-0" aria-hidden="true" />
              <div>
                <span className="text-sm text-white font-medium block">
                  {whatsapp.display}
                </span>
                <span className="text-xs text-text-muted">
                  {whatsapp.placeholderNote}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-text-muted bg-bg-card px-2.5 py-1 rounded border border-border-subtle shrink-0">
              Offline Demo
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

