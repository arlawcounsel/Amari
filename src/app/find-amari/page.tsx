import Link from 'next/link'

const stores = [
  { name: 'Panjim & Old Goa retail partners', region: 'North Goa', type: 'Retail' },
  { name: 'Candolim / Calangute bars & lounges', region: 'North Goa', type: 'HORECA' },
  { name: 'Margao & Colva retail partners', region: 'South Goa', type: 'Retail' },
  { name: 'Selected 5-star hotel bars', region: 'Pan-Goa', type: 'HORECA' },
]

export default function FindAmariPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-espresso)' }}>
      <div className="container" style={{ maxWidth: 800, paddingTop: 160, paddingBottom: 100 }}>
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: 48, fontSize: '0.68rem', padding: 0 }}>
          ← Back to AMARI
        </Link>

        <div className="eyebrow">Availability</div>
        <h1 style={{ marginBottom: 16 }}>Find AMARI</h1>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--color-line)', padding: '8px 16px', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ab06a', boxShadow: '0 0 6px #6ab06a' }} />
          Now available in Goa
        </div>

        <div style={{ color: 'var(--color-cream-dim)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 40 }}>
          <p>
            AMARI is currently available at select licensed retailers, bars, and restaurants across Goa, India. We&apos;re rolling out to the rest of India state by state, as licensing allows.
          </p>
          <p style={{ marginTop: 12 }}>
            AMARI is not sold directly to consumers online. Please purchase only from licensed retailers, and only where permitted by local excise law.
          </p>
        </div>

        <h2 style={{ fontSize: '1.1rem', marginBottom: 20, fontWeight: 500 }}>Current retailers</h2>

        <div style={{ borderTop: '1px solid var(--color-line)' }}>
          {stores.map((store) => (
            <div key={store.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--color-line)' }}>
              <div>
                <div style={{ color: 'var(--color-cream)', fontSize: '0.92rem', marginBottom: 4 }}>{store.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--color-stone-dim)' }}>{store.type}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--color-copper)' }}>{store.region}</span>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: 12, fontWeight: 500 }}>Get notified</h3>
          <p style={{ color: 'var(--color-cream-dim)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 20 }}>
            Leave your email and we&apos;ll let you know when AMARI arrives in your area.
          </p>
          <form style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--color-copper-dim)', paddingBottom: 14 }}>
            <input type="email" placeholder="you@email.com" className="input" style={{ border: 'none', padding: 0, flex: 1 }} />
            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-copper)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', fontWeight: 500, transition: 'color 0.25s' }}>
              Notify me →
            </button>
          </form>
        </div>

        <p style={{ fontSize: '0.7rem', color: 'var(--color-cream-dim)', opacity: 0.4, marginTop: 24, lineHeight: 1.6 }}>
          Listings are indicative regions, not confirmed outlets. Availability subject to state excise regulations and may vary.
        </p>
      </div>
    </div>
  )
}
