'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  // GSAP entrance
  useEffect(() => {
    if (!loaded) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(bottleRef.current,
      { y: 40, scale: 0.92, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.2 }
    )
    .fromTo('.hero-pill',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    )
    .fromTo('.hero-title',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.3'
    )
    .fromTo('.hero-desc',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    .fromTo('.hero-actions',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.2'
    )
    .fromTo('.hero-meta',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.2'
    )
    .fromTo('.hero-scroll',
      { opacity: 0 },
      { opacity: 0.3, duration: 0.6 },
      '-=0.3'
    )
  }, [loaded])

  // Mouse parallax
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      if (bottleRef.current) {
        bottleRef.current.style.transform = `rotateX(${-py * 5}deg) rotateY(${px * 8}deg) translateZ(20px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${px * 25}px, ${py * 15}px)`
      }
    }
    const onLeave = () => {
      if (bottleRef.current) bottleRef.current.style.transform = ''
    }
    scene.addEventListener('mousemove', onMove)
    scene.addEventListener('mouseleave', onLeave)
    return () => {
      scene.removeEventListener('mousemove', onMove)
      scene.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="hero" className="section-dark" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      zIndex: 1,
      background: 'linear-gradient(180deg, #2A221C 0%, var(--color-glass) 30%, var(--color-glass) 70%, #14100C 100%)',
    }}>
      {/* Fireplace warm glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,122,44,0.06) 0%, rgba(167,100,54,0.03) 40%, transparent 70%)',
        animation: 'amber-shimmer 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '25%', right: '25%', height: '50%',
        background: 'linear-gradient(180deg, rgba(196,122,44,0.02) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Warm corner glow */}
      <div style={{
        position: 'absolute', top: -200, right: -200, width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(167,100,54,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -200, left: -200, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(196,122,44,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'linear-gradient(0deg, var(--color-espresso) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div ref={sceneRef} style={{ position: 'relative', zIndex: 2, textAlign: 'center', perspective: 1000 }}>
        {/* Bottle */}
        <div ref={bottleRef} style={{
          position: 'relative',
          width: 220, height: 912,
          margin: '0 auto 32px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)',
          willChange: 'transform',
        }}>
          <div ref={glowRef} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 500, height: 500,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,122,44,0.08) 0%, rgba(167,100,54,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            transition: 'transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)',
            animation: 'fire-glow 5s ease-in-out infinite',
          }} />
          <Image
            src="/bottle.png"
            alt="AMARI"
            fill
            sizes="220px"
            style={{ objectFit: 'contain', pointerEvents: 'none', userSelect: 'none', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}
            priority
          />
        </div>

        {/* Copy */}
        <div ref={textRef} style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <div className="hero-pill" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <span className="pill" style={{ borderColor: 'rgba(167,100,54,0.2)', color: 'var(--color-copper)' }}>African whiskey</span>
          </div>

          <h1 className="hero-title" style={{ marginBottom: 20, color: 'var(--color-warm-ivory)' }}>
            Wild roots.<br />One continent.<br />True craft.
          </h1>

          <p className="hero-desc" style={{ color: 'var(--color-stone)', fontSize: '1rem', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
            AMARI carries the spirit of the African savanna into every glass — finest grains, patiently aged, bottled with a restless, roaming character.
          </p>

          <div className="hero-actions" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#availability" className="btn btn-primary">Find in Goa</a>
            <a href="#story" className="btn btn-secondary" style={{ color: 'var(--color-stone)', borderColor: 'rgba(180, 160, 140, 0.2)' }}>Our story</a>
          </div>

          <div className="hero-meta" style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 48, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-copper-dim)', letterSpacing: '0.04em', opacity: 0.7 }}>
            <span>750 ml</span>
            <span>43% v/v</span>
            <span>Goa, IN</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--color-stone-dim)', opacity: 0 }}>
        Scroll to explore
      </div>
    </section>
  )
}
