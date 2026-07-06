'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ExitedPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #1A1510 0%, #2A221C 30%, #1A1510 60%, #14100C 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Warm glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200, 148, 58, 0.02) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '48px 32px 40px', maxWidth: 420 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
          color: '#F4EFE7',
          marginBottom: 16,
          lineHeight: 1.2,
        }}>
          Thank you for visiting AMARI.
        </h1>

        <p style={{
          fontSize: '0.9rem',
          lineHeight: 1.75,
          color: '#B8AA98',
          marginBottom: 36,
        }}>
          Please visit again once you are of legal drinking age.
        </p>

        <Link
          href="/age"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.08em',
            fontWeight: 500,
            padding: '13px 28px',
            background: 'transparent',
            color: '#B8AA98',
            border: '1px solid rgba(184, 170, 152, 0.2)',
            cursor: 'pointer',
            display: 'inline-flex',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A76436'; e.currentTarget.style.color = '#F4EFE7' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(184, 170, 152, 0.2)'; e.currentTarget.style.color = '#B8AA98' }}
        >
          Return to age verification
        </Link>
      </div>
    </div>
  )
}
