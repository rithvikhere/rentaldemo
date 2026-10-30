import { Phone, Mail, MapPin, Clock, MessageSquare, AlertCircle } from 'lucide-react'
import { contactConfig } from '../data/contactInfo'

export default function ContactInfo() {
  const { phone, email, location, operatingHours, whatsapp } = contactConfig

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="mb-8">
          <span className="eyebrow block mb-1">Direct Communication</span>
          <h3 className="text-headline font-heading font-extrabold text-white">
            Concierge Desk
          </h3>
          <p className="text-body text-text-secondary mt-2">
            Speak directly with our automotive specialists for custom itinerary planning,
            outstation guidance, or private fleet arrangements.
          </p>
        </div>

        {/* ── 4 Contact Blocks ──────────────────────────────── */}
        <div className="space-y-6">
          {/* 01 — Phone */}
          <div className="p-5 rounded-lg bg-bg-card border border-border group transition-colors duration-200 hover:border-gold/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-bg-secondary border border-border flex items-center justify-center text-gold shrink-0">
                <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-meta font-mono text-text-muted">01 / PHONE</span>
                  {!phone.isConfigured && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-bg-secondary text-text-muted border border-border-subtle">
                      Demo Placeholder
                    </span>
                  )}
                </div>
                <div className="text-white font-medium text-base mb-1">
                  {phone.display}
                </div>
                {phone.isConfigured && phone.value ? (
                  <a
                    href={`tel:${phone.value}`}
                    className="inline-flex items-center gap-1.5 text-label text-gold hover:text-gold-light font-semibold transition-colors mt-1"
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

          {/* 02 — Email */}
          <div className="p-5 rounded-lg bg-bg-card border border-border group transition-colors duration-200 hover:border-gold/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-bg-secondary border border-border flex items-center justify-center text-gold shrink-0">
                <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-meta font-mono text-text-muted">02 / EMAIL</span>
                  {!email.isConfigured && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-bg-secondary text-text-muted border border-border-subtle">
                      Demo Placeholder
                    </span>
                  )}
                </div>
                <div className="text-white font-medium text-base mb-1 truncate">
                  {email.display}
                </div>
                {email.isConfigured && email.value ? (
                  <a
                    href={`mailto:${email.value}`}
                    className="inline-flex items-center gap-1.5 text-label text-gold hover:text-gold-light font-semibold transition-colors mt-1"
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

          {/* 03 — Location */}
          <div className="p-5 rounded-lg bg-bg-card border border-border group transition-colors duration-200 hover:border-gold/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-bg-secondary border border-border flex items-center justify-center text-gold shrink-0">
                <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-meta font-mono text-text-muted">03 / SHOWROOM &amp; HUB</span>
                  {!location.isConfigured && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-bg-secondary text-text-muted border border-border-subtle">
                      Demo Location
                    </span>
                  )}
                </div>
                <div className="text-white font-medium text-sm leading-relaxed mb-1">
                  {location.display}
                </div>
                {location.isConfigured && location.value ? (
                  <a
                    href={location.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-label text-gold hover:text-gold-light font-semibold transition-colors mt-1"
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

          {/* 04 — Operating Hours */}
          <div className="p-5 rounded-lg bg-bg-card border border-border group transition-colors duration-200 hover:border-gold/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-bg-secondary border border-border flex items-center justify-center text-gold shrink-0">
                <Clock size={18} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-meta font-mono text-text-muted">04 / OPERATING HOURS</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-gold/10 text-gold border border-gold/30">
                    Operational
                  </span>
                </div>
                <div className="text-white font-medium text-sm leading-relaxed">
                  {operatingHours.display}
                </div>
                <p className="text-xs text-text-muted mt-1.5">
                  {operatingHours.support}
                </p>
              </div>
            </div>
          </div>

          {/* Optional WhatsApp Status Card */}
          <div className="p-4 rounded-lg bg-bg-secondary/60 border border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare size={18} className="text-gold shrink-0" aria-hidden="true" />
              <div>
                <span className="text-xs text-white font-medium block">
                  {whatsapp.display}
                </span>
                <span className="text-[11px] text-text-muted">
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

      {/* ── Demo Notice at bottom of contact column ─────────── */}
      <div className="mt-8 pt-6 border-t border-border-subtle flex items-start gap-3 text-xs text-text-muted">
        <AlertCircle size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          All contact details and operating parameters are illustrative placeholders. Real client communication channels will be connected upon production deployment.
        </p>
      </div>
    </div>
  )
}
