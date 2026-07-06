'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Craft', href: '#craft' },
  { label: 'Availability', href: '#availability' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lastScroll = useRef(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > lastScroll.current && y > 200)
      lastScroll.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 500,
      padding: scrolled ? '14px 0' : '24px 0',
      transition: 'all 0.35s ease',
      background: scrolled ? 'rgba(244, 239, 231, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-line)' : '1px solid transparent',
      transform: hidden && !open ? 'translateY(-100%)' : 'translateY(0)',
    }}>
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/logo.png" alt="AMARI" width={40} height={40} style={{ filter: scrolled ? 'none' : 'brightness(0) invert(0.85)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.04em', color: scrolled ? 'var(--color-espresso)' : 'var(--color-warm-ivory)' }}>AMARI</span>
          </a>

          <ul style={{ display: 'flex', gap: 40, listStyle: 'none' }} className="hidden lg:flex">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: scrolled ? 'var(--color-espresso-dim)' : 'var(--color-stone)',
                  transition: 'color 0.25s ease',
                }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {scrolled && (
              <a href="#availability" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.68rem' }}>Find in Goa</a>
            )}
            <button onClick={() => setOpen(!open)} className="lg:hidden" style={{ display: 'flex', flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 6 }} aria-label="Menu">
              <span style={{ display: 'block', width: 20, height: 1.5, background: scrolled ? 'var(--color-espresso)' : 'var(--color-stone)', transition: 'all 0.25s', transform: open ? 'rotate(45deg) translateY(3px)' : 'none' }} />
              <span style={{ display: 'block', width: 20, height: 1.5, background: scrolled ? 'var(--color-espresso)' : 'var(--color-stone)', transition: 'all 0.25s', opacity: open ? 0 : 1 }} />
              <span style={{ display: 'block', width: open ? 20 : 14, height: 1.5, background: scrolled ? 'var(--color-espresso)' : 'var(--color-stone)', transition: 'all 0.25s', transform: open ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div style={{ position: 'fixed', inset: 0, top: 60, background: 'rgba(244, 239, 231, 0.98)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 499 }}>
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} style={{
                fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.02em', color: 'var(--color-espresso)',
              }}>
                {link.label}
              </a>
            ))}
            <a href="#availability" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 16, fontSize: '0.7rem' }}>
              Find in Goa
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
