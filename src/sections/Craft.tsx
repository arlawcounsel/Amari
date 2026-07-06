'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCinematicReveal } from '@/lib/useCinematicReveal'

const tabs = [
  {
    id: 'smooth',
    title: 'Smooth',
    description: 'A gentle entry with no rough edges — grain-forward and easy, built to open a glass any night of the week, neat or on ice.',
  },
  {
    id: 'rich',
    title: 'Rich',
    description: 'Deep amber notes of toasted grain and warm spice, rounded out by patient aging in cask for a full-bodied character.',
  },
  {
    id: 'distinctive',
    title: 'Distinctive',
    description: 'A finish that lingers — a signature of finest grain and African-inspired character you won\'t mistake for anything else on the shelf.',
  },
]

export default function Craft() {
  const [active, setActive] = useState(0)
  const sectionRef = useCinematicReveal<HTMLElement>('perspective', { duration: 1.1 })

  return (
    <section id="craft" ref={sectionRef} className="py-section section-dark" style={{
      background: 'var(--color-glass)',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Warm horizontal line accents */}
      <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(167,100,54,0.08), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(167,100,54,0.06), transparent)', pointerEvents: 'none' }} />
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <div className="eyebrow" data-reveal>The craft</div>
          <h2 style={{ marginBottom: 20 }} data-reveal>
            Smooth. Rich. Distinctive.
          </h2>
          <p style={{ lineHeight: 1.75, fontSize: '0.95rem' }} data-reveal>
            Three words on the label. Three reasons people pour a second glass. Tap through to see what each one means in the bottle.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(245, 239, 231, 0.08)', marginBottom: 48, flexWrap: 'wrap' }} data-reveal>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              style={{
                background: 'none',
                border: 'none',
                color: active === i ? 'var(--color-warm-ivory)' : 'var(--color-stone-dim)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                padding: '16px 36px 16px 0',
                marginRight: 36,
                position: 'relative',
                transition: 'color 0.3s ease',
              }}
            >
              {tab.title}
              <span style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: active === i ? '100%' : 0,
                height: 2,
                background: 'var(--color-copper)',
                transition: 'width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)',
              }} />
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', minHeight: 240 }} key={active}>
          <div>
            <h3 style={{ marginBottom: 16, color: 'var(--color-warm-ivory)' }}>{tabs[active].title}</h3>
            <p style={{ lineHeight: 1.8, fontSize: '0.95rem', color: 'var(--color-stone)' }}>{tabs[active].description}</p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', border: '1px solid rgba(245, 239, 231, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245, 239, 231, 0.03)', overflow: 'hidden' }}>
            <Image
              src="/assets/illustrations/glencairn-whisky-glass-wine-bourbon-whiskey-a-glass-of-whiskey.png"
              alt="Whiskey glass"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '1px solid var(--color-copper-dim)', borderLeft: '1px solid var(--color-copper-dim)', opacity: 0.25 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '1px solid var(--color-copper-dim)', borderRight: '1px solid var(--color-copper-dim)', opacity: 0.25 }} />
          </div>
        </div>
      </div>
    </section>
  )
}
