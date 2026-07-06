'use client'

import { useRef, useEffect } from 'react'
import { useCinematicReveal } from '@/lib/useCinematicReveal'

export default function Story() {
  const visualRef = useRef<HTMLDivElement>(null)
  const sectionRef = useCinematicReveal<HTMLElement>('clipLeft', { duration: 1.1 })

  // Mouse parallax on visual
  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `translate(${px * 6}px, ${py * 4}px)`
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="story" ref={sectionRef} className="py-section" style={{ position: 'relative', zIndex: 2 }}>
      {/* Warm top glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg, rgba(167,100,54,0.02), transparent)', pointerEvents: 'none' }} />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
          {/* Copy */}
          <div>
            <div className="eyebrow" data-reveal>The story</div>

            <h2 style={{ marginBottom: 28 }} data-reveal>
              Crafted from finest grains.<br />Aged to perfection.
            </h2>

            <div data-reveal>
              <p style={{ lineHeight: 1.8, marginBottom: 20, fontSize: '0.95rem' }}>
                AMARI takes its name and nerve from the wide-open spirit of the African savanna — the leap of the springbok at first light, a horizon that never quite ends. It&apos;s a story we&apos;ve carried into a whiskey built for people who like their evenings the same way: unhurried, warm, a little untamed.
              </p>
              <p style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
                Every batch is put through the same quiet discipline — select grains, careful distillation, and patient aging — before it lands, one bottle at a time, on Goa&apos;s shelves and bar tops.
              </p>
            </div>

            <p style={{ fontSize: '0.7rem', marginTop: 28, lineHeight: 1.6, opacity: 0.4 }} data-reveal>
              Manufactured and bottled in India. Full manufacturing, sourcing and licensing details are available on the product label as required by Indian law.
            </p>
          </div>

          {/* Visual */}
          <div style={{
            position: 'relative',
            aspectRatio: '1/1',
            border: '1px solid var(--color-line-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-cream)',
            overflow: 'hidden',
          }} data-reveal>
            <div ref={visualRef} style={{ transition: 'transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)', width: '80%', height: '80%' }}>
              <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%' }}>
                <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(167, 100, 54, 0.08)" strokeWidth="0.5" />
                <circle cx="150" cy="150" r="90" fill="none" stroke="rgba(167, 100, 54, 0.06)" strokeWidth="0.5" strokeDasharray="2 8" />
                <circle cx="150" cy="150" r="60" fill="none" stroke="rgba(196, 122, 44, 0.04)" strokeWidth="0.5" />
                <path d="M85 195 Q120 140 150 130 Q180 120 215 145" fill="none" stroke="var(--color-copper-dim)" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
                <circle cx="85" cy="195" r="4" fill="var(--color-copper)" opacity="0.7" />
                <circle cx="215" cy="145" r="4" fill="var(--color-copper)" opacity="0.7" />
                <text x="60" y="220" fill="var(--color-stone-dim)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.5" opacity="0.5">Spirit</text>
                <text x="195" y="135" fill="var(--color-copper)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.5" opacity="0.6">Goa, IN</text>
              </svg>
            </div>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 32, height: 32, borderTop: '1px solid var(--color-copper-dim)', borderRight: '1px solid var(--color-copper-dim)', opacity: 0.25 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 32, height: 32, borderBottom: '1px solid var(--color-copper-dim)', borderLeft: '1px solid var(--color-copper-dim)', opacity: 0.25 }} />
          </div>
        </div>
      </div>
    </section>
  )
}
