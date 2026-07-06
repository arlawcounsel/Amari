'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AgeGatePage() {
  const router = useRouter()
  const [exiting, setExiting] = useState(false)
  const [entering, setEntering] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('amari_age_verified')
      if (stored) {
        try {
          const data = JSON.parse(stored)
          if (Date.now() - data.timestamp < 30 * 24 * 60 * 60 * 1000) {
            router.replace('/')
            return
          }
        } catch {}
      }
    }
  }, [router])

  const handleEnter = () => {
    setEntering(true)
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('amari_age_verified', JSON.stringify({
          verified: true,
          timestamp: Date.now(),
        }))
      }
      router.push('/')
    }, 500)
  }

  const handleExit = () => {
    setExiting(true)
    setTimeout(() => router.push('/exited'), 400)
  }

  if (!mounted) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'linear-gradient(135deg, #1A1510 0%, #2A221C 30%, #1A1510 60%, #14100C 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: entering ? 0 : exiting ? 0 : 1,
      transition: 'opacity 0.5s ease',
      overflow: 'hidden',
    }}>
      {/* Bottle background — subtle */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0.04,
        pointerEvents: 'none',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/bottle.png"
            alt=""
            fill
            sizes="400px"
            style={{ objectFit: 'contain', objectPosition: 'center', transform: 'translateX(15%)', maxWidth: 400, margin: '0 auto' }}
            priority
          />
        </div>
      </div>

      {/* Cinematic warm glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200, 148, 58, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '40%',
        background: 'linear-gradient(180deg, rgba(200, 148, 58, 0.02), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(0deg, rgba(20, 16, 12, 0.6), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -200, right: -200, width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(167, 100, 54, 0.02) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '48px 32px 40px',
        maxWidth: 480,
        width: '100%',
      }}>
        <div style={{ marginBottom: 36 }}>
          <Image
            src="/logo.png"
            alt="AMARI"
            width={120}
            height={120}
            style={{ margin: '0 auto', opacity: 0.9 }}
            priority
          />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          letterSpacing: '-0.02em',
          color: '#F4EFE7',
          marginBottom: 16,
          lineHeight: 1.1,
        }}>
          WELCOME TO AMARI
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
          letterSpacing: '0.06em',
          color: '#C8943A',
          marginBottom: 32,
          fontWeight: 400,
        }}>
          An African Craft Whiskey.
          <br />
          Now Available Exclusively in Goa.
        </p>

        <p style={{
          fontSize: '0.88rem',
          lineHeight: 1.75,
          color: '#B8AA98',
          marginBottom: 12,
          maxWidth: 400,
          margin: '0 auto 12px',
        }}>
          Please confirm that you are 21 years of age or older before entering this website.
        </p>

        <p style={{
          fontSize: '0.75rem',
          lineHeight: 1.7,
          color: 'rgba(184, 170, 152, 0.5)',
          marginBottom: 40,
          maxWidth: 400,
          margin: '0 auto 40px',
        }}>
          By entering, you confirm that you are of legal drinking age in your jurisdiction and agree to consume alcohol responsibly.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <button
            onClick={handleEnter}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              fontWeight: 500,
              padding: '14px 36px',
              background: '#A76436',
              color: '#F4EFE7',
              border: '1px solid #A76436',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              minWidth: 140,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#C07E4A'; e.currentTarget.style.borderColor = '#C07E4A' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#A76436'; e.currentTarget.style.borderColor = '#A76436' }}
          >
            ENTER
          </button>
          <button
            onClick={handleExit}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              fontWeight: 500,
              padding: '14px 36px',
              background: 'transparent',
              color: '#B8AA98',
              border: '1px solid rgba(184, 170, 152, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              minWidth: 140,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A76436'; e.currentTarget.style.color = '#F4EFE7' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(184, 170, 152, 0.2)'; e.currentTarget.style.color = '#B8AA98' }}
          >
            EXIT
          </button>
        </div>

        <p style={{
          fontSize: '0.6rem',
          lineHeight: 1.6,
          color: 'rgba(184, 170, 152, 0.3)',
          maxWidth: 380,
          margin: '0 auto 32px',
        }}>
          Alcohol consumption is injurious to health. Do not drink and drive. Not for sale to minors. Keep out of reach of children.
        </p>

        {/* Legal links + copyright */}
        <div style={{
          borderTop: '1px solid rgba(245, 239, 231, 0.06)',
          paddingTop: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
          fontSize: '0.6rem',
        }}>
          <Link href="/privacy-policy" style={{ color: 'rgba(184, 170, 152, 0.3)', transition: 'color 0.25s' }}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" style={{ color: 'rgba(184, 170, 152, 0.3)', transition: 'color 0.25s' }}>
            Terms of Use
          </Link>
          <Link href="/responsible-drinking" style={{ color: 'rgba(184, 170, 152, 0.3)', transition: 'color 0.25s' }}>
            Responsible Drinking
          </Link>
        </div>
        <p style={{
          fontSize: '0.55rem',
          color: 'rgba(184, 170, 152, 0.2)',
          marginTop: 12,
        }}>
          &copy; 2026 AMARI. All rights reserved.
        </p>
      </div>
    </div>
  )
}
