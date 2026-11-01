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
import Grainient from './components/Grainient'
import PillNav from './components/PillNav'

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

      <main id="main-content" className="relative">
        {/* ── Fixed Grainient Canvas across viewport ─────────────── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="w-full h-full">
            <Grainient
              colors={["#000000","#0a0908","#121212","#1c1b1b","#000000"]}
              angle={46}
              flow={1.5}
              silk={0}
              grainAmount={0.05}
              scale={1.2}
              speed={0}
              grainAnimated={false}
              grainSize={0.8}
              contrast={0.98}
              saturation={0}
              stir={0}
              interactive={false}
              dpr={1}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* ── 2. Hero Section (Retains original car photo background) ── */}
        <div className="relative z-10">
          <Hero />
        </div>

        {/* Foreground Sections & Footer */}
        <div className="relative z-10">
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

            {/* ── Footer / Navigation ────────────────────────────── */}
            <footer
              className="bg-transparent flex flex-col items-center justify-center"
              style={{
                paddingTop: '1.5rem',
                paddingBottom: 'clamp(2.75rem, 5vh, 4rem)'
              }}
            >
              <div className="flex justify-center items-center w-full px-4">
                <PillNav
                  logo={
                    <span className="font-heading font-black text-xs text-gold tracking-widest flex items-center justify-center">
                      V
                    </span>
                  }
                  logoAlt="VELOX"
                  logoHref="#"
                  items={[
                    { label: 'Fleet', href: '#fleet' },
                    { label: 'Categories', href: '#categories' },
                    { label: 'How It Works', href: '#how-it-works' },
                    { label: 'Requirements', href: '#rental-requirements' },
                    { label: 'Policies', href: '#rental-information' },
                    { label: 'FAQ', href: '#faq' },
                    { label: 'Contact', href: '#contact' },
                  ]}
                  onItemClick={(item) => {
                    if (item.href?.startsWith('#')) {
                      scrollTo(item.href)
                    }
                  }}
                  itemStyle="pill"
                  hoverEffect="fill"
                  indicator="dot"
                  theme="dark"
                  surface="glass"
                  highlightColor="#C6A875"
                  style={{
                    '--pn-x': '24px',
                    '--pn-gap': '14px',
                    '--pn-item-gap': '4px',
                  }}
                />
              </div>
            </footer>
          </div>
      </main>
    </div>
  )
}
