import { motion, useReducedMotion } from 'motion/react'
import { fadeUpVariant, viewportOnce, luxuryEase } from '../animations/variants'

const steps = [
  {
    num: '01',
    title: 'Choose a Car',
    description: 'Explore the vehicle that suits your journey and preferences.',
  },
  {
    num: '02',
    title: 'Send an Enquiry',
    description: 'Share your preferred dates, duration, and pickup requirements.',
  },
  {
    num: '03',
    title: 'Confirm Details',
    description: 'Review availability, security terms, and delivery options.',
  },
  {
    num: '04',
    title: 'Start Your Journey',
    description: 'Complete the formalities and take delivery with confidence.',
  },
]

export default function BookingProcess() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="how-it-works"
      className="min-h-screen py-32 md:py-44 lg:py-52 flex flex-col justify-center bg-bg-secondary relative"
      aria-label="How Booking Works"
    >
      <div className="container-velox w-full">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="section-heading mb-20 md:mb-28 lg:mb-36"
          initial={shouldReduceMotion ? {} : 'hidden'}
          whileInView={shouldReduceMotion ? {} : 'visible'}
          viewport={viewportOnce}
          variants={fadeUpVariant}
        >
          {/* 1. Header (with generous vertical space below) */}
          <h2 className="text-display sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-10 md:mb-14 lg:mb-16 tracking-tight">
            Your Journey Starts Here.
          </h2>

          {/* 2. Text below it (with 3-4 lines space above and massive space before the boxes) */}
          <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-3xl">
            Simple, transparent, and refined. Four easy steps from initial selection to the open road.
          </p>
        </motion.div>

        {/* ── 3. Dialogue Boxes (spacious, comfortably proportioned) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              className="bg-bg-card border border-border-subtle rounded-2xl p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-gold/40 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] shadow-xl shadow-black/25"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 22 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: luxuryEase,
              }}
            >
              <div>
                <span className="font-heading font-light text-4xl sm:text-5xl text-gold block mb-6 tracking-tight group-hover:text-gold-light transition-colors duration-200">
                  {step.num}
                </span>
                <h3 className="text-2xl sm:text-[1.75rem] font-heading font-bold text-white mb-4 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
