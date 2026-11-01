import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Fleet from './components/Fleet'
import BookingProcess from './components/BookingProcess'
import Requirements from './components/Requirements'
import RentalInformation from './components/RentalInformation'
import FAQ from './components/FAQ'
import Contact from './components/Contact'

export default function App() {
  // Global Lenis smooth scrolling instance
  const { scrollTo } = useLenis()

  // Shared state: active category filter in Fleet
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Shared state: vehicle selected via 'Enquire Now' for EnquiryForm prefill
  const [enquiryVehicle, setEnquiryVehicle] = useState(null)

  // Handler when user selects a category from Categories section
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  // Handler when user clicks 'Enquire Now' on a vehicle card
  const handleEnquireVehicle = (vehicle) => {
    setEnquiryVehicle(vehicle)
    scrollTo('#contact')
  }

  // Handler to clear preselected vehicle after form reset
  const handleResetVehicle = () => {
    setEnquiryVehicle(null)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-offwhite-50 selection:bg-gold selection:text-charcoal-950">
      {/* ── Accessible skip to main content ─────────────────── */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

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

        {/* ── 8. Frequently Asked Questions ───────────────────── */}
        <FAQ />

        {/* ── 9. Contact & Enquiry Form ───────────────────────── */}
        <Contact
          preselectedVehicle={enquiryVehicle}
          onResetVehicle={handleResetVehicle}
        />
      </main>

      {/* ── Footer Anchor / Placeholder ─────────────────────── */}
      <footer className="py-8 bg-bg-primary border-t border-border-subtle text-center text-meta text-text-muted">
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
            VELOX Premium Car Rental Demo · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
