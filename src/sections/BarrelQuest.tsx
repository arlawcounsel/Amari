'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useCinematicReveal } from '@/lib/useCinematicReveal'

const stages = [
  { id: 'grain', label: 'Grain', description: 'Select African heirloom grains are harvested from the Kenyan highlands — the foundation of AMARI\'s character.' },
  { id: 'distill', label: 'Distillation', description: 'Triple distilled in hand-beaten copper pot stills, each run refined to capture only the finest hearts.' },
  { id: 'cask', label: 'Oak cask', description: 'The spirit enters French Limousin oak casks, sherry-seasoned, ready to absorb years of complexity.' },
  { id: 'mature', label: 'Maturation', description: 'Eight years of patience. The cask breathes with the seasons, deepening the amber and rounding every edge.' },
  { id: 'blend', label: 'Blending', description: 'Our master blender selects and marries casks — each one chosen for its contribution to the final character.' },
  { id: 'bottle', label: 'Bottle', description: 'Filled, corked, and sealed by hand. Each bottle carries the story of its journey from grain to glass.' },
]

export default function BarrelQuest() {
  const [current, setCurrent] = useState(0)
  const [completed, setCompleted] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const sectionRef = useCinematicReveal<HTMLElement>('scale', { duration: 1 })

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < stages.length) setCurrent(idx)
    if (idx >= stages.length) { setCompleted(true); setCurrent(stages.length - 1) }
  }, [])

  const onPointerUp = useCallback((x: number) => {
    const dx = x - startX.current
    if (Math.abs(dx) > 50) {
      if (dx > 0) goTo(current - 1); else goTo(current + 1)
    }
  }, [current, goTo])

  useEffect(() => {
    const hm = (e: MouseEvent) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const pct = (e.clientX - rect.left) / rect.width
      const idx = Math.round(pct * (stages.length - 1))
      if (idx !== current) setCurrent(idx)
    }
    const hu = (e: MouseEvent) => onPointerUp(e.clientX)
    window.addEventListener('mousemove', hm); window.addEventListener('mouseup', hu)
    return () => { window.removeEventListener('mousemove', hm); window.removeEventListener('mouseup', hu) }
  }, [current, onPointerUp])

  const progress = ((current) / (stages.length - 1)) * 100

  return (
    <section ref={sectionRef} className="py-section" style={{ position: 'relative', zIndex: 2 }}>
      {/* Warm bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(0deg, rgba(167,100,54,0.02), transparent)', pointerEvents: 'none' }} />
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <div className="eyebrow" data-reveal>The journey</div>
          <h2 style={{ marginBottom: 20 }} data-reveal>
            From grain to bottle
          </h2>
          <p style={{ lineHeight: 1.75, fontSize: '0.95rem' }} data-reveal>
            Guide the barrel through each stage of AMARI&apos;s creation. Drag or tap to explore the journey.
          </p>
        </div>

        {!completed ? (
          <>
            <div ref={trackRef} style={{ position: 'relative', marginBottom: 56, cursor: 'grab' }} data-reveal>
              <div style={{ height: 2, background: 'var(--color-line-strong)', position: 'relative' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-copper)', transition: 'width 0.4s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -7 }}>
                {stages.map((stage, i) => (
                  <button key={stage.id} onClick={() => goTo(i)} style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: i <= current ? 'var(--color-copper)' : i === current + 1 ? 'var(--color-warm-ivory)' : 'var(--color-stone)',
                    border: `2px solid ${i <= current ? 'var(--color-copper)' : 'var(--color-line-strong)'}`,
                    cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', zIndex: 2,
                    boxShadow: i <= current ? '0 0 10px rgba(167,100,54,0.2)' : 'none',
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                {stages.map((stage, i) => (
                  <span key={stage.id} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em',
                    color: i === current ? 'var(--color-copper)' : 'var(--color-espresso-dim)',
                    opacity: i === current ? 1 : 0.45, transition: 'all 0.25s',
                    textAlign: 'center', width: `${100 / stages.length}%`,
                  }}>
                    {stage.label}
                  </span>
                ))}
              </div>
            </div>

            <div data-reveal>
              <div className="card card-lg" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-copper)', letterSpacing: '0.08em', marginBottom: 12, fontWeight: 500 }}>
                    Stage {String(current + 1).padStart(2, '0')} of {String(stages.length).padStart(2, '0')}
                  </div>
                  <h3>{stages[current].label}</h3>
                  <p style={{ lineHeight: 1.8, fontSize: '0.92rem', color: 'var(--color-espresso-dim)' }}>{stages[current].description}</p>
                </div>
                <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid var(--color-line-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 40 40" width="32" height="32">
                    <rect x="12" y="8" width="16" height="24" rx="4" fill="none" stroke="var(--color-copper-dim)" strokeWidth="1.2" />
                    <line x1="12" y1="14" x2="28" y2="14" stroke="var(--color-copper-dim)" strokeWidth="0.8" opacity="0.4" />
                    <line x1="12" y1="20" x2="28" y2="20" stroke="var(--color-copper-dim)" strokeWidth="0.8" opacity="0.4" />
                    <line x1="12" y1="26" x2="28" y2="26" stroke="var(--color-copper-dim)" strokeWidth="0.8" opacity="0.4" />
                  </svg>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }} data-reveal>
              <button onClick={() => goTo(current - 1)} disabled={current === 0} className="btn btn-secondary" style={{ opacity: current === 0 ? 0.35 : 1 }}>
                ← Previous
              </button>
              <button onClick={() => goTo(current + 1)} className="btn btn-primary">
                {current === stages.length - 1 ? 'Complete journey' : 'Next stage →'}
              </button>
            </div>
          </>
        ) : (
          <div data-reveal>
            <div className="card card-lg" style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid var(--color-copper-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', opacity: 0.7 }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-copper)" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3>Crafted with patience</h3>
              <p style={{ lineHeight: 1.8, maxWidth: 460, margin: '0 auto', fontSize: '0.92rem', color: 'var(--color-espresso-dim)' }}>
                Every bottle of AMARI carries the story of its journey — from African grain to French oak, from copper still to hand-sealed bottle. Eight years of quiet discipline in every glass.
              </p>
            </div>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <button onClick={() => { setCompleted(false); setCurrent(0) }} className="btn btn-secondary">Start over</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
