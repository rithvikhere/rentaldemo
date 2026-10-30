import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqList } from '../data/faqData'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function FAQ() {
  const [openId, setOpenId] = useState(faqList[0]?.id || null) // First item open by default
  const reduced = prefersReducedMotion()

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="section-py bg-bg-primary relative border-t border-border"
      aria-label="Frequently Asked Questions"
    >
      <div className="container-velox">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div className="section-heading">
            <span className="eyebrow flex items-center gap-2">
              <HelpCircle size={14} className="text-gold" aria-hidden="true" />
              <span>Assistance &amp; Clarity</span>
            </span>
            <span className="accent-rule" />
            <h2 className="text-headline font-heading font-extrabold text-white mt-1">
              Got Questions? We&apos;ve Got Answers.
            </h2>
            <p className="text-body text-text-secondary mt-3 max-w-xl">
              Everything you need to know before starting your journey. Review common questions
              regarding reservations, documentation, deposits, and cancellation terms.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-meta text-text-muted uppercase tracking-widest block text-left md:text-right">
              Frequently Asked Questions
            </span>
          </div>
        </div>

        {/* ── FAQ Accordion Container ─────────────────────────── */}
        <div className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
          {faqList.map((item) => {
            const isOpen = openId === item.id
            const triggerId = `faq-trigger-${item.id}`
            const panelId = `faq-panel-${item.id}`

            return (
              <div key={item.id} className="transition-colors duration-200">
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={`w-full py-6 flex items-start justify-between gap-6 text-left cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-sm ${
                      isOpen ? 'text-gold' : 'text-white hover:text-gold'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-meta font-mono font-bold text-text-muted pt-1 shrink-0">
                        {item.num}.
                      </span>
                      <span className="font-heading font-bold text-lg md:text-xl tracking-tight leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-gold/10 border-gold/50 text-gold' : 'text-text-muted'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown size={18} strokeWidth={2} />
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-9 pr-4 text-body text-text-secondary leading-relaxed border-l-2 border-gold/40 ml-2 mb-2">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* ── Subtitle Footnote ──────────────────────────────── */}
        <p className="text-center text-meta text-text-muted mt-10">
          Note: Answers are illustrative and reflect common operational parameters. Individual terms are confirmed upon enquiry.
        </p>
      </div>
    </section>
  )
}
