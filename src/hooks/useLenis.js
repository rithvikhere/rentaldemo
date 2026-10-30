import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'

/**
 * Custom hook to manage the global Lenis smooth scrolling instance.
 * - Handles rAF loop with clean teardown.
 * - Manages anchor navigation (#fleet, #contact, etc.) with fixed navbar offset (-80px).
 * - Honors prefers-reduced-motion by bypassing smooth lerp for native instant scrolling.
 * - Cleans up reliably in React StrictMode without orphaned instances.
 */
export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Respect reduced motion: do not initialize smooth scroll loop
      return
    }

    // Initialize Lenis with refined, restrained luxury scroll physics
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    })

    lenisRef.current = lenis

    // rAF loop
    let rafId = null
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Handle initial hash navigation if user arrived with #section in URL
    if (window.location.hash) {
      const initialTarget = document.querySelector(window.location.hash)
      if (initialTarget) {
        setTimeout(() => {
          lenis.scrollTo(initialTarget, { offset: -80, immediate: true })
        }, 120)
      }
    }

    // Intercept internal hash anchor clicks smoothly
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -80, duration: 1.15 })
        if (window.history.pushState) {
          window.history.pushState(null, '', href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Programmatic scroll helper with fallback
  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80, duration: 1.15, ...options })
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  const stop = useCallback(() => {
    lenisRef.current?.stop()
  }, [])

  const start = useCallback(() => {
    lenisRef.current?.start()
  }, [])

  const getLenis = useCallback(() => lenisRef.current, [])

  return { scrollTo, stop, start, getLenis }
}
