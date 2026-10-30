import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'

/* ─── Navigation items ────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',         href: '#home'        },
  { label: 'Our Fleet',    href: '#fleet'       },
  { label: 'Categories',   href: '#categories'  },
  { label: 'How It Works', href: '#how-it-works'},
  { label: 'Contact',      href: '#contact'     },
]

/* ─── Mobile menu overlay animation variants ─────────────────── */
const drawerVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.18, ease: [0.45, 0, 0.55, 1] } },
}

/* ================================================================
   Navbar
   ================================================================ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const shouldReduceMotion = useReducedMotion()

  /* Scroll state — single passive listener, cleaned up on unmount */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scrollspy: track currently visible section */
  useEffect(() => {
    const sectionEls = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean)
    if (!sectionEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1,
      }
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Close mobile menu on Escape */
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleNavClick = useCallback((e, href) => {
    closeMenu()
    setActiveSection(href)
  }, [closeMenu])

  return (
    <>
      {/* ── Fixed navbar bar ────────────────────────────────── */}
      <header
        role="banner"
        className={[
          'velox-nav',
          scrolled ? 'velox-nav--scrolled' : 'velox-nav--top',
        ].join(' ')}
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <div className="velox-nav__inner container-velox">
          {/* Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="velox-nav__wordmark group"
            aria-label="VELOX — go to top"
          >
            <span
              className="velox-nav__wordmark-rule transition-transform duration-300 group-hover:scale-x-125 origin-left"
              aria-hidden="true"
            />
            <span className="velox-nav__wordmark-text">VELOX</span>
          </a>

          {/* Desktop nav links with active indicator */}
          <nav aria-label="Main navigation" className="velox-nav__links">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`velox-nav__link relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-gold font-semibold' : 'text-text-secondary hover:text-gold'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{label}</span>
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA with micro-interaction */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn btn-primary velox-nav__cta group"
          >
            <span>Book Now</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            className="velox-nav__toggle cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="velox-nav__backdrop"
              style={{ zIndex: 'calc(var(--z-sticky) - 1)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-label="Navigation menu"
              className="velox-nav__drawer"
              style={{ zIndex: 'var(--z-overlay)' }}
              variants={shouldReduceMotion ? {} : drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Drawer header */}
              <div className="velox-nav__drawer-header">
                <span className="velox-nav__wordmark">
                  <span className="velox-nav__wordmark-rule" aria-hidden="true" />
                  <span className="velox-nav__wordmark-text">VELOX</span>
                </span>
                <button
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="velox-nav__toggle cursor-pointer"
                >
                  <X size={22} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>

              {/* Drawer links */}
              <nav aria-label="Mobile navigation" className="velox-nav__drawer-links">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const isActive = activeSection === href
                  return (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={`velox-nav__drawer-link transition-colors duration-200 ${
                        isActive
                          ? 'text-gold font-bold pl-2 border-l-2 border-gold'
                          : 'text-text-primary hover:text-gold'
                      }`}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 + i * 0.04,
                        duration: 0.24,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </motion.a>
                  )
                })}
              </nav>

              {/* Drawer CTA */}
              <div className="velox-nav__drawer-footer">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn btn-primary w-full justify-center"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
