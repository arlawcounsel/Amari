import Link from 'next/link'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-espresso)' }}>
      <div className="container" style={{ maxWidth: 800, paddingTop: 160, paddingBottom: 100 }}>
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: 48, fontSize: '0.68rem', padding: 0 }}>
          ← Back to AMARI
        </Link>

        <div className="eyebrow">About AMARI</div>
        <h1 style={{ marginBottom: 40 }}>
          Wild Roots.<br />One Continent.<br />True Craft.
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: 'var(--color-cream-dim)', fontSize: '0.95rem', lineHeight: 1.8 }}>
          <p>
            AMARI is an African-inspired whiskey brand born from the spirit of the savanna — the wide-open landscapes, the restless energy, the sense that the horizon never quite ends. We carry that spirit into every bottle.
          </p>
          <p>
            Our name draws from the Swahili word for &ldquo;bitter,&rdquo; a nod to the honest, unvarnished character of a whiskey that doesn&apos;t try to be something it isn&apos;t. It&apos;s grain-forward, warm, and built for people who like their evenings unhurried.
          </p>
          <p>
            Every batch is crafted through a process of select grain sourcing, careful triple distillation in copper pot stills, and patient aging in French Limousin oak casks. The result is a whiskey that&apos;s smooth enough for a first pour, rich enough for a second, and distinctive enough that you&apos;ll remember it.
          </p>
          <p>
            AMARI is currently available in Goa, India, at select licensed retailers, bars, and restaurants. We&apos;re rolling out state by state as licensing allows.
          </p>
        </div>

        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--color-line)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 24, fontWeight: 500 }}>Our values</h2>
          <div className="grid grid-2" style={{ gap: 40 }}>
            {[
              { title: 'Origin', text: 'Rooted in African heritage, crafted in India. Every bottle carries the spirit of the savanna.' },
              { title: 'Craft', text: 'Triple distilled, French oak aged, hand-sealed. No shortcuts, no compromises.' },
              { title: 'Character', text: 'Smooth, rich, distinctive — three words that define every pour.' },
              { title: 'Patience', text: 'Eight years of maturation. We don&apos;t rush the process, and neither should you.' },
            ].map((item) => (
              <div key={item.title}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--color-copper)', marginBottom: 10, fontWeight: 500 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-cream-dim)', fontSize: '0.9rem', lineHeight: 1.75 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--color-line)', fontSize: '0.72rem', color: 'var(--color-cream-dim)', opacity: 0.5, lineHeight: 1.7 }}>
          <p>Manufactured and bottled in India. Full manufacturing, sourcing and licensing details are available on the product label as required by Indian law.</p>
        </div>
      </div>
    </div>
  )
}
