import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Fleet from './components/Fleet'
import BookingProcess from './components/BookingProcess'
import Requirements from './components/Requirements'
import RentalInformation from './components/RentalInformation'
import { Car, CheckCircle2, ArrowRight } from 'lucide-react'
import { formatINR } from './data/cars'

export default function App() {
  // Shared state: active category filter in Fleet
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Shared state: vehicle selected via 'Enquire Now'
  const [enquiryVehicle, setEnquiryVehicle] = useState(null)

  // Handler when user selects a category from Categories section
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  // Handler when user clicks 'Enquire Now' on a vehicle card
  const handleEnquireVehicle = (vehicle) => {
    setEnquiryVehicle(vehicle)
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary text-offwhite-50 selection:bg-gold selection:text-charcoal-950">
      {/* ── 1. Navbar ────────────────────────────────────────── */}
      <Navbar />

      <main id="main-content">
        {/* ── 2. Hero Section ─────────────────────────────────── */}
        <Hero />

        {/* ── 3. Vehicle Categories ───────────────────────────── */}
        <Categories onSelectCategory={handleSelectCategory} />

        {/* ── 4. Available Fleet ──────────────────────────────── */}
        <Fleet
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onEnquire={handleEnquireVehicle}
        />

        {/* ── 5. How It Works ─────────────────────────────────── */}
        <BookingProcess />

        {/* ── 6. Rental Requirements ──────────────────────────── */}
        <Requirements />

        {/* ── 7. Rental Information ───────────────────────────── */}
        <RentalInformation />

        {/* ── Temporary Phase 4 Contact Anchor / Placeholder ─── */}
        <section
          id="contact"
          className="section-py-md bg-bg-primary border-t border-border"
          aria-label="Enquiry Destination Placeholder"
        >
          <div className="container-velox">
            <div className="max-w-2xl mx-auto p-8 rounded-lg border border-border bg-bg-card shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-gold">Phase 4 Integration</span>
                <span className="text-meta text-text-muted">Enquiry Staging Desk</span>
              </div>

              <h2 className="text-title font-heading font-bold text-white mb-2">
                Booking &amp; Enquiry Desk
              </h2>

              {enquiryVehicle ? (
                <div className="p-4 my-4 rounded-md bg-bg-primary border border-gold/40 flex items-start gap-4">
                  <div className="p-2 rounded-full bg-gold/15 text-gold shrink-0 mt-0.5">
                    <CheckCircle2 size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold block mb-0.5">
                      Vehicle Selected for Enquiry
                    </span>
                    <h3 className="text-subtitle font-heading font-bold text-white">
                      {enquiryVehicle.fullName}
                    </h3>
                    <p className="text-body-sm text-text-secondary mt-1">
                      Category: {enquiryVehicle.categoryLabel} · Daily Rate: {formatINR(enquiryVehicle.pricePerDay)} (Illustrative demo price)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 my-4 rounded-md bg-bg-primary border border-border flex items-center gap-3 text-text-secondary">
                  <Car size={20} className="text-gold shrink-0" aria-hidden="true" />
                  <span className="text-body-sm">
                    No vehicle currently selected. Click &ldquo;Enquire&rdquo; on any vehicle card above to prepare your enquiry.
                  </span>
                </div>
              )}

              <p className="text-body-sm text-text-muted mt-4">
                Note: This is a frontend demonstration. The complete client-side validated
                booking and enquiry form with custom inputs and feedback will be connected in{' '}
                <strong className="text-text-secondary">Phase 5 (Contact, Enquiry Form &amp; FAQ)</strong>.
              </p>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <a
                  href="#fleet"
                  className="text-label text-gold hover:text-gold-light inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Return to Fleet Showcase</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer Anchor / Placeholder ─────────────────────── */}
      <footer className="py-8 bg-bg-secondary border-t border-border text-center text-meta text-text-muted">
        <div className="container-velox flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-gold block" aria-hidden="true" />
            <span className="font-heading font-extrabold text-sm text-white tracking-wider">
              VELOX
            </span>
            <span className="text-[11px] text-text-muted">
              · Premium Car Rental Demo
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            Phase 4: Booking Process, Requirements &amp; Information complete.
          </p>
        </div>
      </footer>
    </div>
  )
}
