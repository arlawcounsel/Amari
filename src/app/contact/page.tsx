import Link from 'next/link'

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-espresso)' }}>
      <div className="container" style={{ maxWidth: 800, paddingTop: 160, paddingBottom: 100 }}>
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: 48, fontSize: '0.68rem', padding: 0 }}>
          ← Back to AMARI
        </Link>

        <div className="eyebrow">Get in touch</div>
        <h1 style={{ marginBottom: 40 }}>Contact us</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, color: 'var(--color-cream-dim)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <p>
              We&apos;d love to hear from you. Whether you have a question about AMARI, need help finding a retailer, or want to partner with us, reach out anytime.
            </p>

            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 500 }}>General inquiries</h3>
              <a href="mailto:experience@amariwhiskey.in" style={{ color: 'var(--color-copper)' }}>experience@amariwhiskey.in</a>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 500 }}>Trade & wholesale</h3>
              <a href="mailto:partners@amariwhiskey.in" style={{ color: 'var(--color-copper)' }}>partners@amariwhiskey.in</a>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 500 }}>Press</h3>
              <a href="mailto:press@amariwhiskey.in" style={{ color: 'var(--color-copper)' }}>press@amariwhiskey.in</a>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 500 }}>Location</h3>
              <p>Goa, India</p>
            </div>
          </div>

          <div className="card card-lg" style={{ alignSelf: 'start' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 24, fontWeight: 500 }}>Send a message</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-copper)', display: 'block', marginBottom: 8, fontWeight: 500 }}>Name</label>
                <input type="text" className="input" />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-copper)', display: 'block', marginBottom: 8, fontWeight: 500 }}>Email</label>
                <input type="email" className="input" />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-copper)', display: 'block', marginBottom: 8, fontWeight: 500 }}>Message</label>
                <textarea rows={4} className="input" style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
