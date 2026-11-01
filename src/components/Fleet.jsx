import { useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Car, Layers, SlidersHorizontal, RefreshCw } from 'lucide-react'
import { vehicles, filterTabs } from '../data/cars'
import VehicleCard from './VehicleCard'
import { fadeUpVariant, viewportOnce } from '../animations/variants'

export default function Fleet({ activeCategory = 'all', onSelectCategory, onEnquire }) {
  const shouldReduceMotion = useReducedMotion()

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    if (activeCategory === 'all') return vehicles
    return vehicles.filter((v) => v.category === activeCategory)
  }, [activeCategory])

  // Active category display label
  const activeLabel = useMemo(() => {
    const tab = filterTabs.find((t) => t.id === activeCategory)
    return tab ? tab.label : 'Vehicles'
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
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-24"
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
            <span className="accent-rule mb-6" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1 mb-6 md:mb-8">
              Precision-Engineered Luxury
            </h2>
            <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
              Browse our complete lineup of ten distinguished vehicles. Every machine is
              prepared to immaculate standards, verified across mechanical safety protocols,
              and provided with comprehensive insurance.
            </p>
          </div>

          {/* Quick status counter */}
          <div className="flex items-center gap-2.5 text-sm text-text-secondary bg-bg-card px-5 py-3 rounded-lg border border-border shrink-0 self-start lg:self-end shadow-sm">
            <Layers size={16} className="text-gold" aria-hidden="true" />
            <span>
              Showing <strong className="text-white font-semibold">{filteredVehicles.length}</strong> of {vehicles.length} vehicles
            </span>
          </div>
        </motion.div>

        {/* ── Category Filter Tabs ───────────────────────────── */}
        <div className="mb-20 lg:mb-24">
          <div className="flex items-center gap-2 mb-5 text-meta text-text-muted">
            <SlidersHorizontal size={13} className="text-gold" aria-hidden="true" />
            <span>Filter By Class</span>
          </div>

          <div
            className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none no-scrollbar"
            role="tablist"
            aria-label="Filter fleet by vehicle category"
          >
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id
              const count =
                tab.id === 'all'
                  ? vehicles.length
                  : vehicles.filter((v) => v.category === tab.id).length

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="fleet-grid"
                  onClick={() => onSelectCategory && onSelectCategory(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-label font-medium transition-all duration-200 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                    isActive
                      ? 'bg-gold text-charcoal-950 font-semibold shadow-md shadow-gold/20 scale-[1.02]'
                      : 'bg-bg-card text-text-secondary border border-border hover:border-gold/50 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-charcoal-950/20 text-charcoal-950 font-bold'
                        : 'bg-bg-secondary text-text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Vehicles Grid ──────────────────────────────────── */}
        <div id="fleet-grid" role="region" aria-live="polite">
          {filteredVehicles.length > 0 ? (
            <motion.div
              layout={!shouldReduceMotion}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-14 lg:gap-y-16"
            >
              <AnimatePresence mode="popLayout">
                {filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    layout={!shouldReduceMotion}
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <VehicleCard vehicle={vehicle} onEnquire={onEnquire} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* ── Empty State ────────────────────────────────── */
            <div className="text-center py-20 px-6 rounded-lg border border-border bg-bg-card max-w-lg mx-auto">
              <Car size={40} className="text-gold mx-auto mb-4 opacity-70" aria-hidden="true" />
              <h3 className="text-title font-heading font-bold text-white mb-2">
                No Vehicles Found
              </h3>
              <p className="text-body-sm text-text-secondary mb-6">
                There are no vehicles currently listed under the &ldquo;{activeLabel}&rdquo; category.
              </p>
              <button
                type="button"
                onClick={() => onSelectCategory && onSelectCategory('all')}
                className="btn btn-secondary inline-flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw size={15} aria-hidden="true" />
                <span>Show All Vehicles</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
