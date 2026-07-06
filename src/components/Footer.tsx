import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="responsibly" className="section-dark" style={{ position: 'relative', zIndex: 2, background: 'var(--color-glass)' }}>
      <div className="container" style={{ paddingTop: 100 }}>
        <div className="card card-lg" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 36, alignItems: 'flex-start', background: 'rgba(245, 239, 231, 0.03)', borderColor: 'rgba(245, 239, 231, 0.06)' }}>
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-copper-dim)" strokeWidth="1.2" style={{ width: 40, flexShrink: 0 }}>
            <circle cx="24" cy="24" r="20" />
            <path d="M24 14v12M24 32h.01" />
          </svg>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 14, fontWeight: 800, color: 'var(--color-warm-ivory)' }}>Please drink responsibly</h3>
            <p style={{ fontSize: '0.88rem', marginBottom: 8, color: 'var(--color-stone)' }}>
              This website and its contents are intended only for adults who are of legal drinking age in their Indian state, and are provided for information purposes only. AMARI does not sell alcohol online or ship product directly to consumers — please buy only from licensed retailers in your state.
            </p>
            <p style={{ fontSize: '0.88rem', marginBottom: 8, color: 'var(--color-stone)' }}>
              Alcohol consumption is injurious to health. Do not drink and drive. Not for sale to minors. Keep out of reach of children.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-stone)' }}>
              If you or someone you know is struggling with alcohol dependence, please speak with a doctor, or reach out to a local de-addiction centre or mental health helpline in your city.
            </p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(245, 239, 231, 0.06)', marginTop: 80, padding: '56px 0 32px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }}>
            <div>
              <Image src="/logo.png" alt="AMARI" width={64} height={64} style={{ marginBottom: 16, opacity: 0.6, filter: 'brightness(0) invert(0.85)' }} />
              <p style={{ fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 260, color: 'var(--color-stone)' }}>
                Wild roots. One continent. True craft. Currently available in Goa, India.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--color-copper)', marginBottom: 20, fontWeight: 500 }}>Explore</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><a href="#story" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>Our story</a></li>
                <li><a href="#craft" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>The craft</a></li>
                <li><a href="#availability" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>Availability</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--color-copper)', marginBottom: 20, fontWeight: 500 }}>Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><Link href="/responsible-drinking" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>Drink responsibly</Link></li>
                <li><Link href="/terms-of-use" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>Terms of use</Link></li>
                <li><Link href="/privacy-policy" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>Privacy policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--color-copper)', marginBottom: 20, fontWeight: 500 }}>Connect</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><Link href="/about" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>About AMARI</Link></li>
                <li><Link href="/find-amari" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>Find AMARI</Link></li>
                <li><Link href="/contact" style={{ fontSize: '0.85rem', transition: 'color 0.25s', color: 'var(--color-stone)' }}>Contact</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(245, 239, 231, 0.06)', padding: '24px 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: '0.68rem', opacity: 0.4 }}>
            <span>&copy; 2026 AMARI. All rights reserved.</span>
            <span>This site is intended solely for adults of legal drinking age in India.</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '16px 0', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--color-copper-dim)', borderTop: '1px solid rgba(245, 239, 231, 0.06)', opacity: 0.6 }}>
        Consumption of alcohol is injurious to health — please drink responsibly
      </div>

      <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
        <Link href="/flight" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'rgba(167, 100, 54, 0.2)', transition: 'color 0.3s' }}>
          ✦ hidden experience
        </Link>
      </div>
    </footer>
  )
}
