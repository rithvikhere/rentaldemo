import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

/* ─── Navigation items ────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',        href: '#home'       },
  { label: 'Our Fleet',   href: '#fleet'      },
  { label: 'Categories',  href: '#categories' },
  { label: 'How It Works',href: '#how-it-works'},
  { label: 'Contact',     href: '#contact'    },
]

/* ─── Reduced-motion helper ───────────────────────────────────── */
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

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
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)

  /* Scroll state — single passive listener, cleaned up on unmount */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll() // initialise on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on Escape */
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    closeMenu()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [closeMenu])

  const reduced = prefersReducedMotion()

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
            className="velox-nav__wordmark"
            aria-label="VELOX — go to top"
          >
            <span className="velox-nav__wordmark-rule" aria-hidden="true" />
            <span className="velox-nav__wordmark-text">VELOX</span>
          </a>

          {/* Desktop nav links */}
          <nav
            aria-label="Main navigation"
            className="velox-nav__links"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="velox-nav__link"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn btn-primary velox-nav__cta"
          >
            Book Now
          </a>

          {/* Mobile menu toggle */}
          <button
            className="velox-nav__toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen
              ? <X size={22} strokeWidth={1.75} aria-hidden="true" />
              : <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
            }
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
              transition={{ duration: reduced ? 0 : 0.2 }}
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
              variants={reduced ? {} : drawerVariants}
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
                  className="velox-nav__toggle"
                >
                  <X size={22} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>

              {/* Drawer links */}
              <nav aria-label="Mobile navigation" className="velox-nav__drawer-links">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="velox-nav__drawer-link"
                    initial={reduced ? {} : { opacity: 0, x: -12 }}
                    animate={reduced ? {} : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="velox-nav__drawer-footer">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
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
