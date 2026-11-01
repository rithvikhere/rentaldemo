import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Sparkles, Car } from 'lucide-react'
import { fleetVehicles } from '../data/cars'
import VehicleCard from './VehicleCard'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

const filterCategories = [
  { id: 'all', label: 'All Fleet' },
  { id: 'supercar', label: 'Supercar' },
  { id: 'prestige', label: 'Prestige' },
  { id: 'suv', label: 'SUV' },
  { id: 'sports', label: 'Sports' },
  { id: 'executive', label: 'Executive' },
]

export default function Fleet({ activeCategory = 'all', onSelectCategory, onEnquire }) {
  const shouldReduceMotion = useReducedMotion()

  // Filter fleet based on active category
  const filteredVehicles = useMemo(() => {
    if (!activeCategory || activeCategory === 'all') {
      return fleetVehicles
    }
    return fleetVehicles.filter(
      (vehicle) => vehicle.category.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [activeCategory])

  return (
    <section
      id="fleet"
      className="section-py bg-bg-primary relative border-t border-border-subtle"
      aria-label="Available Fleet"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          <div className="section-heading">
            <span className="eyebrow flex items-center gap-2">
              <Car size={14} className="text-gold" aria-hidden="true" />
              <span>Available Fleet</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Precision-Engineered Luxury
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              Browse our complete lineup of ten distinguished vehicles. Every machine is
              maintained to exacting technical specifications for pure performance.
            </p>
          </div>

          {/* Fleet count badge */}
          <div className="flex items-center gap-2 text-sm text-text-secondary bg-bg-secondary px-4 py-2.5 rounded-md border border-border shrink-0 self-start lg:self-end">
            <Sparkles size={16} className="text-gold" aria-hidden="true" />
            <span className="font-medium text-white">{filteredVehicles.length}</span>
            <span>of {fleetVehicles.length} Vehicles Displayed</span>
          </div>
        </motion.div>

        {/* ── Filter Bar ───────────────────────────────────────── */}
        <div className="mb-12">
          {/* Mobile Filter: horizontal scroll container */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap no-scrollbar" role="tablist" aria-label="Fleet Categories">
            {filterCategories.map((cat) => {
              const isActive = activeCategory === cat.id

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="fleet-grid"
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`text-label font-medium px-5 py-2.5 rounded-md transition-all duration-200 whitespace-nowrap cursor-pointer border focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                    isActive
                      ? 'bg-gold text-charcoal-950 border-gold font-semibold shadow-lg shadow-gold/15'
                      : 'bg-bg-card text-text-secondary border-border hover:border-gold/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                  {/* Subtle vehicle count badge within active tab */}
                  {isActive && (
                    <span className="ml-2 text-meta px-1.5 py-0.5 rounded-[2px] bg-charcoal-950/20 text-charcoal-950 font-mono font-bold">
                      {filteredVehicles.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Vehicle Cards Grid ──────────────────────────────── */}
        <div
          id="fleet-grid"
          role="region"
          aria-live="polite"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.3),
                  ease: luxuryEase,
                }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  onEnquire={onEnquire}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state safeguard */}
        {filteredVehicles.length === 0 && (
          <div className="py-20 text-center border border-dashed border-border rounded-lg bg-bg-card">
            <p className="text-body text-text-muted mb-4">No vehicles currently match this category.</p>
            <button
              type="button"
              onClick={() => onSelectCategory && onSelectCategory('all')}
              className="btn btn-secondary text-label"
            >
              View Full Fleet
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
