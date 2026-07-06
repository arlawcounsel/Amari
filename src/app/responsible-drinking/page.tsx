import Link from 'next/link'

export default function ResponsibleDrinkingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-espresso)' }}>
      <div className="container" style={{ maxWidth: 800, paddingTop: 160, paddingBottom: 100 }}>
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: 48, fontSize: '0.68rem', padding: 0 }}>
          ← Back to AMARI
        </Link>

        <div className="eyebrow">Responsibility</div>
        <h1 style={{ marginBottom: 40 }}>Drink responsibly</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, color: 'var(--color-cream-dim)', fontSize: '0.95rem', lineHeight: 1.8 }}>
          <p>
            At AMARI, we believe that great whiskey is meant to be savored, not overindulged. We are committed to promoting responsible drinking and the health and well-being of our consumers.
          </p>

          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 16, fontWeight: 500 }}>Key messages</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>Alcohol consumption is injurious to health</li>
              <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>Do not drink and drive</li>
              <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>Not for sale to minors</li>
              <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>Keep out of reach of children</li>
              <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>If you are pregnant or breastfeeding, do not consume alcohol</li>
              <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>Consumption of alcohol may cause health problems</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '1.05rem', marginTop: 8, fontWeight: 500 }}>Know your limits</h3>
          <p>
            Everyone responds differently to alcohol. Factors such as body weight, food intake, medications, and individual tolerance all affect how alcohol impacts you. Know your limits and drink within them.
          </p>

          <h3 style={{ fontSize: '1.05rem', marginTop: 8, fontWeight: 500 }}>Driving and alcohol</h3>
          <p>
            Never drink and drive. Even small amounts of alcohol impair judgment, reaction time, and coordination. If you plan to drink, arrange a designated driver, use ride-sharing services, or stay where you are.
          </p>

          <h3 style={{ fontSize: '1.05rem', marginTop: 8, fontWeight: 500 }}>Alcohol dependence</h3>
          <p>
            If you or someone you know is struggling with alcohol dependence, please reach out for help. Speak with a healthcare professional, or contact a local de-addiction centre or mental health helpline in your city.
          </p>
          <p>In India, you can reach out to:</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>Vandrevala Foundation: 1860-2662-345 (24/7)</li>
            <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>iCall: 9152987821</li>
            <li style={{ paddingLeft: 16, borderLeft: '2px solid var(--color-copper-dim)' }}>AASRA: 9820466726</li>
          </ul>

          <h3 style={{ fontSize: '1.05rem', marginTop: 8, fontWeight: 500 }}>Our commitment</h3>
          <p>
            AMARI is committed to marketing our products responsibly. We do not target individuals under the legal drinking age, and we do not make claims that encourage excessive consumption. We believe in enjoying whiskey as part of a balanced, mindful lifestyle.
          </p>
        </div>
      </div>
    </div>
  )
}
