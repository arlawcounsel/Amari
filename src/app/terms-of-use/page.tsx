import Link from 'next/link'

export default function TermsOfUsePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-espresso)' }}>
      <div className="container" style={{ maxWidth: 800, paddingTop: 160, paddingBottom: 100 }}>
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: 48, fontSize: '0.68rem', padding: 0 }}>
          ← Back to AMARI
        </Link>

        <div className="eyebrow">Legal</div>
        <h1 style={{ marginBottom: 16 }}>Terms of Use</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-stone-dim)', letterSpacing: '0.06em', marginBottom: 48 }}>
          Effective date: January 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, color: 'var(--color-cream-dim)', fontSize: '0.95rem', lineHeight: 1.8 }}>
          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Acceptance of terms</h3>
            <p>By accessing and using the AMARI website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Age requirement</h3>
            <p>This website is intended only for adults who are of legal drinking age in their Indian state (18–25 depending on state). By using this website, you confirm that you meet the minimum legal drinking age requirement in your jurisdiction.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>No alcohol sales</h3>
            <p>AMARI does not sell alcohol online or ship product directly to consumers. This website is provided for informational purposes only. Please purchase AMARI only from licensed retailers in your state, and only where permitted by local excise law.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Intellectual property</h3>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of AMARI and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Limitation of liability</h3>
            <p>AMARI shall not be liable for any damages arising from your use of this website. The content is provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Governing law</h3>
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Goa, India.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Changes to terms</h3>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12, fontWeight: 500 }}>Contact</h3>
            <p>If you have questions about these terms, please contact us at <a href="mailto:hello@amariwhiskey.in" style={{ color: 'var(--color-copper)' }}>hello@amariwhiskey.in</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
