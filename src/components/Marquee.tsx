export default function Marquee() {
  return (
    <div id="marquee" style={{
      borderTop: '1px solid var(--color-line-strong)',
      borderBottom: '1px solid var(--color-line)',
      padding: '16px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      position: 'relative',
      zIndex: 2,
      background: 'var(--color-warm-ivory)',
    }}>
      {/* Light sweep */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(167,100,54,0.02) 50%, transparent 100%)',
        animation: 'light-sweep 6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'inline-flex', gap: 60, animation: 'scroll-left 40s linear infinite' }}>
        {['Wild roots', 'One continent', 'True craft', 'Available in Goa'].map((text, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--color-copper-dim)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 60 }}>
            {text}
            <em style={{ fontStyle: 'normal', color: 'var(--color-stone-dim)', opacity: 0.25 }}>·</em>
          </span>
        ))}
        {['Wild roots', 'One continent', 'True craft', 'Available in Goa'].map((text, i) => (
          <span key={`dup-${i}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--color-copper-dim)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 60 }}>
            {text}
            <em style={{ fontStyle: 'normal', color: 'var(--color-stone-dim)', opacity: 0.25 }}>·</em>
          </span>
        ))}
      </div>
    </div>
  )
}
