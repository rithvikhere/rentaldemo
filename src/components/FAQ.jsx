import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { faqList } from '../data/faqData'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

export default function FAQ() {
  const [openId, setOpenId] = useState(faqList[0]?.id || null)
  const shouldReduceMotion = useReducedMotion()

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 lg:py-36 bg-bg-primary relative"
      aria-label="Frequently Asked Questions"
    >
      <div className="container-velox w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* ── Left Column: Editorial Header ── */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-32"
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView={shouldReduceMotion ? {} : 'visible'}
            viewport={viewportOnce}
            variants={fadeUpVariant}
          >
            {/* 1. Header */}
            <h2 className="text-display sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 sm:mb-8 tracking-tight">
              Got Questions?
            </h2>

            {/* 2. Text below it */}
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl">
              Clear answers regarding reservations, documentation, security deposits, and cancellation guidelines.
            </p>
          </motion.div>

          {/* ── Right Column: Spatially Placed Dialogue Boxes ── */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 lg:gap-6"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: luxuryEase }}
          >
            {faqList.map((item) => {
              const isOpen = openId === item.id
              const triggerId = `faq-trigger-${item.id}`
              const panelId = `faq-panel-${item.id}`

              return (
                <div
                  key={item.id}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-bg-card border-gold/50 shadow-xl shadow-black/35'
                      : 'bg-bg-card/40 border-border-subtle hover:border-gold/30 hover:bg-bg-card/70'
                  }`}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full px-6 sm:px-8 lg:px-9 py-6 sm:py-7 lg:py-8 flex items-center justify-between gap-6 text-left cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                    >
                      <span
                        className={`font-heading font-bold text-lg sm:text-xl lg:text-2xl tracking-tight leading-snug transition-colors ${
                          isOpen ? 'text-gold' : 'text-white hover:text-gold'
                        }`}
                      >
                        {item.question}
                      </span>

                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border-subtle flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-gold/10 border-gold/40 text-gold' : 'text-text-muted'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown size={19} strokeWidth={1.75} />
                      </div>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: luxuryEase }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 lg:px-9 pb-7 sm:pb-8 pt-1 text-base sm:text-lg text-text-secondary leading-relaxed border-t border-border-subtle/60">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
