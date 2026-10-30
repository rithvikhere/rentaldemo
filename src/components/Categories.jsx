import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Compass } from 'lucide-react'
import { vehicleCategories } from '../data/cars'
import { fadeUpVariant, viewportOnce } from '../animations/variants'

export default function Categories({ onSelectCategory }) {
  const shouldReduceMotion = useReducedMotion()

  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId)
    }
    const fleetSection = document.getElementById('fleet')
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="categories"
      className="section-py bg-bg-secondary relative border-t border-border"
      aria-label="Vehicle Categories"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16"
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          <div className="section-heading">
            <span className="eyebrow flex items-center gap-2">
              <Compass size={14} className="text-gold" aria-hidden="true" />
              <span>Curated Fleet</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Vehicle Categories
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              Choose from five meticulously selected automotive classes tailored for business
              itineraries, coastal touring, weekend escapes, and private executive travel.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              5 Distinct Classes · 10 Vehicles
            </span>
          </div>
        </motion.div>

        {/* ── Editorial Category Grid ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {vehicleCategories.map((category, index) => {
            // Asymmetrical editorial spans: top 2 cards are large (7 col & 5 col), bottom 3 are 4 cols each
            const colSpan =
              index === 0
                ? 'md:col-span-7'
                : index === 1
                ? 'md:col-span-5'
                : 'md:col-span-4'

            return (
              <motion.article
                key={category.id}
                className={`group relative rounded-lg overflow-hidden border border-border bg-bg-card flex flex-col justify-end min-h-[340px] md:min-h-[380px] p-6 lg:p-8 transition-all duration-300 hover:border-gold/60 hover:shadow-2xl ${colSpan}`}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Background Image with restrained hover zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Multi-stop dark gradient overlay for text readability */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/75 to-bg-primary/30 group-hover:from-bg-primary/95 group-hover:via-bg-primary/80 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Top Badge & Count */}
                <div className="relative z-10 mb-auto flex items-center justify-between">
                  <span className="badge badge-gold backdrop-blur-md">
                    {category.badge}
                  </span>
                  <span className="text-meta text-offwhite-200/90 font-mono bg-bg-primary/70 px-2.5 py-1 rounded-[2px] border border-border/80 backdrop-blur-md">
                    {category.count} Vehicles
                  </span>
                </div>

                {/* Content Details */}
                <div className="relative z-10 mt-6">
                  <h3 className="text-title font-heading font-bold text-white mb-2 group-hover:text-gold transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-body-sm text-text-secondary mb-6 max-w-md line-clamp-2">
                    {category.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category.id)}
                    className="inline-flex items-center gap-2 text-label font-semibold text-white group-hover:text-gold transition-colors duration-200 cursor-pointer"
                    aria-label={`Explore ${category.name} vehicles in fleet`}
                  >
                    <span>Explore Vehicles</span>
                    <ArrowRight
                      size={16}
                      className="text-gold transition-transform duration-200 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
