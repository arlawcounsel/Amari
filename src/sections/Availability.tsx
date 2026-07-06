'use client'

import { useState, type FormEvent } from 'react'
import { useCinematicReveal } from '@/lib/useCinematicReveal'

const stores = [
  { name: 'Panjim & Old Goa retail partners', region: 'North Goa' },
  { name: 'Candolim / Calangute bars & lounges', region: 'North Goa' },
  { name: 'Margao & Colva retail partners', region: 'South Goa' },
  { name: 'Selected 5-star hotel bars', region: 'Pan-Goa' },
]

export default function Availability() {
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useCinematicReveal<HTMLElement>('fadeUp', { duration: 0.9 })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="availability" ref={sectionRef} className="py-section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--color-line-strong)', padding: '8px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--color-copper)', marginBottom: 24 }} data-reveal>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ab06a', boxShadow: '0 0 6px #6ab06a' }} />
            Now available in Goa
          </div>
          <h2 style={{ marginBottom: 20 }} data-reveal>
            Find AMARI
          </h2>
          <p style={{ lineHeight: 1.8, fontSize: '0.95rem' }} data-reveal>
            AMARI is currently available at select licensed retailers, bars and restaurants across Goa. We&apos;re rolling out to the rest of India state by state, as licensing allows.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div data-reveal>
            <div style={{ borderTop: '1px solid var(--color-line-strong)' }}>
              {stores.map((store) => (
                <div key={store.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--color-line)' }}>
                  <span style={{ fontSize: '0.92rem' }}>{store.name}</span>
                  <small style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--color-copper)', marginLeft: 16 }}>{store.region}</small>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.7rem', marginTop: 20, lineHeight: 1.6, opacity: 0.4 }}>
              Listings are indicative regions, not confirmed outlets. AMARI is not sold directly to consumers online.
            </p>
          </div>

          <div className="card card-lg" data-reveal>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 800 }}>Get notified</h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 28, color: 'var(--color-espresso-dim)' }}>
              Leave your email and we&apos;ll let you know the moment AMARI lands on a shelf close to you.
            </p>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--color-copper-dim)', paddingBottom: 14, marginBottom: 16 }}>
                <input type="email" placeholder="you@email.com" className="input" style={{ border: 'none', padding: 0, flex: 1 }} />
                <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-copper)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', fontWeight: 500 }}>
                  {submitted ? 'Thanks!' : 'Notify me →'}
                </button>
              </div>
              <select className="select">
                <option>Goa</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
