import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
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
      className="section-py bg-transparent relative"
      aria-label="Vehicle Categories"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="section-heading"
          style={{ marginBottom: 'clamp(4rem, 7vw, 6.5rem)' }}
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          <span className="eyebrow block mb-3">Curated Fleet</span>
          <h2 className="text-headline font-heading font-extrabold text-white mt-2 mb-5 sm:mb-6">
            Vehicle Categories
          </h2>
          <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
            Five distinguished automotive classes tailored for business itineraries, weekend escapes, and private executive travel.
          </p>
        </motion.div>

        {/* ── Editorial Category Grid ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
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
                className={`group relative rounded-xl overflow-hidden border border-border bg-bg-card flex flex-col justify-end min-h-[380px] md:min-h-[440px] lg:min-h-[480px] p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-gold/60 hover:shadow-2xl ${colSpan}`}
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
                <div className="absolute inset-0 z-0 overflow-hidden bg-bg-card">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    width="900"
                    height="600"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.style.backgroundColor = 'var(--v-bg-card)'
                    }}
                  />
                  {/* Multi-stop dark gradient overlay for text readability */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/75 to-bg-primary/30 group-hover:from-bg-primary/95 group-hover:via-bg-primary/80 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 mb-auto flex items-center justify-between">
                  <span className="badge badge-gold backdrop-blur-md">
                    {category.badge}
                  </span>
                </div>

                {/* Content Details */}
                <div className="relative z-10 mt-8">
                  <h3 className="text-title font-heading font-bold text-white mb-3 group-hover:text-gold transition-colors duration-200 tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-body text-text-secondary mb-7 max-w-lg leading-relaxed">
                    {category.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category.id)}
                    className="inline-flex items-center gap-2 text-label font-semibold text-white group-hover:text-gold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-sm"
                    aria-label={`Explore ${category.name} vehicles in fleet`}
                  >
                    <span>Explore Class</span>
                    <ArrowRight
                      size={15}
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
