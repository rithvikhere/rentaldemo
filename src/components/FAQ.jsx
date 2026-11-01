import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { faqItems } from '../data/faqData'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion()

  // Track the single open FAQ item by id (default: first item is open)
  const [openId, setOpenId] = useState(faqItems[0]?.id || null)

  const handleToggle = (id) => {
    // If user clicks the currently open item, collapse it; otherwise open the clicked one
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="section-py bg-bg-primary relative border-t border-border-subtle"
      aria-label="Frequently Asked Questions"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20"
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          <div className="section-heading">
            <span className="eyebrow flex items-center gap-2">
              <HelpCircle size={14} className="text-gold" aria-hidden="true" />
              <span>Questions & Answers</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Frequently Asked Questions.
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              Everything you need to know about reserving, driving, and returning your luxury
              vehicle. Can&apos;t find your answer here? Our concierge team is available 24/7.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              {faqItems.length} Key Clarifications
            </span>
          </div>
        </motion.div>

        {/* ── FAQ Accordion Container ─────────────────────────── */}
        <div className="max-w-4xl mx-auto divide-y divide-border border-y border-border">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id

            return (
              <motion.div
                key={item.id}
                className="faq-item"
                data-open={isOpen}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  ease: luxuryEase,
                }}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  onClick={() => handleToggle(item.id)}
                  className="faq-trigger group flex items-center justify-between w-full py-6 text-left transition-colors cursor-pointer select-none"
                >
                  <span className="text-title font-heading font-semibold text-white group-hover:text-gold transition-colors pr-6">
                    {item.question}
                  </span>

                  <span
                    className={`faq-chevron p-2 rounded-full border transition-all duration-200 shrink-0 ${
                      isOpen
                        ? 'border-gold bg-gold/10 text-gold rotate-180'
                        : 'border-border text-text-muted group-hover:border-gold/60 group-hover:text-gold'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                {/* Accordion Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      initial={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? {} : { height: 'auto', opacity: 1 }}
                      exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: luxuryEase }}
                      className="overflow-hidden"
                    >
                      <div className="faq-body pb-8 text-body text-text-secondary leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ── Assistance footer prompt ───────────────────────── */}
        <div className="mt-12 text-center">
          <p className="text-body-sm text-text-muted">
            Have a unique requirement or bespoke itinerary?{' '}
            <a
              href="#contact"
              className="text-gold font-medium hover:text-gold-light underline underline-offset-4 transition-colors"
            >
              Reach out to our concierge specialists
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
