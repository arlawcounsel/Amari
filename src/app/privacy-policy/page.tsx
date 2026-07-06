import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-espresso)' }}>
      <div className="container" style={{ maxWidth: 800, paddingTop: 160, paddingBottom: 100 }}>
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: 48, fontSize: '0.68rem', padding: 0 }}>
          ← Back to AMARI
        </Link>

        <div className="eyebrow">Legal</div>
        <h1 style={{ marginBottom: 16 }}>Privacy Policy</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-stone-dim)', letterSpacing: '0.06em', marginBottom: 48 }}>
          Effective date: January 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, color: 'var(--color-cream-dim)', fontSize: '0.95rem', lineHeight: 1.8 }}>
          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Information we collect</h3>
            <p>When you visit AMARI&apos;s website, we may collect certain information automatically, including your IP address, browser type, operating system, referring URLs, and pages visited. This information is used to operate and improve our website.</p>
            <p style={{ marginTop: 12 }}>If you choose to subscribe to availability notifications, we will collect your email address and state preference. This information is used solely to notify you when AMARI becomes available in your area.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>How we use your information</h3>
            <p>We use the information we collect to operate and maintain our website, to respond to your inquiries, to send you availability notifications (if you opt in), and to comply with legal obligations.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Cookies and tracking</h3>
            <p>We use essential cookies to maintain your age verification status and session preferences. We do not use advertising cookies or third-party tracking technologies for targeted advertising purposes.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Data sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information only when required by law or to protect our legal rights.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Data security</h3>
            <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Your rights</h3>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hello@amariwhiskey.in.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Children&apos;s privacy</h3>
            <p>This website is not intended for individuals under the legal drinking age in their Indian state. We do not knowingly collect information from minors.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Changes to this policy</h3>
            <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Contact</h3>
            <p>If you have questions about this privacy policy, please contact us at <a href="mailto:hello@amariwhiskey.in" style={{ color: 'var(--color-copper)' }}>hello@amariwhiskey.in</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
