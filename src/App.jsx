import './index.css'

// Phase 0 — App shell. Sections are implemented phase by phase.
// Import and render each section component as phases are completed.

function App() {
  return (
    <div className="min-h-screen bg-charcoal-900 text-offwhite-50">
      <main>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100svh',
            gap: '1rem',
            fontFamily: 'system-ui, sans-serif',
            color: '#f0ede8',
            background: '#111113',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '3rem',
              height: '2px',
              background: '#c9a84c',
              marginBottom: '1rem',
            }}
          />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0 }}>
            Premium Car Rental
          </h1>
          <p style={{ color: '#78788a', margin: 0, fontSize: '0.95rem' }}>
            Phase 0 — Project scaffold ready. Development begins with Phase 1.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
