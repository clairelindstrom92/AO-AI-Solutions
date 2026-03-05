import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const deliverables = [
  { label: 'Lead Capture Score', desc: 'How many leads your site loses every week (scored 0–100)' },
  { label: 'AI Response Gap', desc: 'Your response time vs. competitors — where you lose deals after hours' },
  { label: 'AI Search Visibility', desc: 'How your business appears in ChatGPT, Perplexity & Google AI Overviews' },
  { label: 'Automation Potential', desc: 'Which workflows in your business can be fully automated — and their ROI' },
  { label: 'Competitor AI Gap', desc: 'What your top 3 local competitors are doing with AI that you aren\'t' },
  { label: 'Custom Action Plan', desc: 'Specific recommendations with estimated revenue recovery for each fix' },
]

export default function AIAudit() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardRef,   cardVisible]   = useScrollReveal()
  const [listRef,   listVisible]   = useScrollReveal()

  return (
    <section
      id="ai-audit"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full font-dm text-sm"
            style={{
              border: '1px solid rgba(0,200,240,0.22)',
              backgroundColor: 'rgba(0,200,240,0.07)',
              color: '#00C8F0',
              ...revealStyle(headerVisible),
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-ao-accent"
              style={{ boxShadow: '0 0 6px rgba(0,200,240,0.9)' }}
            />
            New: AI Revenue Audit — $149
          </div>

          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 56px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible, 80),
            }}
          >
            See Exactly How Much Revenue<br className="hidden sm:block" />
            <span className="text-ao-accent"> Your Website Is Losing</span>
          </h2>

          <p
            className="font-dm font-light text-ao-muted max-w-xl mx-auto"
            style={{ fontSize: '18px', ...revealStyle(headerVisible, 160) }}
          >
            We analyze your website through an AI lens — lead capture gaps, automation opportunities,
            competitor AI advantages, and AI search visibility. Delivered in 48 hours.
          </p>
        </div>

        {/* Main card + list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* CTA Card */}
          <div
            ref={cardRef}
            className="rounded-2xl p-8 lg:p-10 relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(0,200,240,0.05)',
              border: '1px solid rgba(0,200,240,0.28)',
              boxShadow: '0 0 60px rgba(0,200,240,0.08)',
              ...revealStyle(cardVisible),
            }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 pointer-events-none"
              style={{
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(0,200,240,0.10) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="font-syne font-bold text-ao-accent"
                  style={{ fontSize: '52px', letterSpacing: '-0.04em' }}
                >
                  $149
                </span>
                <span
                  className="font-dm text-ao-muted line-through"
                  style={{ fontSize: '22px' }}
                >
                  $299
                </span>
              </div>

              <p className="font-dm font-light text-ao-muted mb-6" style={{ fontSize: '15px' }}>
                One-time payment. No subscription. Delivered within 48 hours.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {[
                  '10–15 page personalized PDF report',
                  '30-minute strategy call to review findings',
                  'Specific ROI estimates for every recommendation',
                  'Competitor AI gap analysis included',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M2 7L5.5 10.5L12 3" stroke="#00C8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-dm font-light text-ao-muted" style={{ fontSize: '14px' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center font-dm font-medium text-ao-deep bg-ao-accent py-4 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5 mb-4"
                style={{ boxShadow: '0 0 0 rgba(0,200,240,0)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 36px rgba(0,200,240,0.50)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'}
              >
                Get My AI Revenue Audit →
              </a>

              <p
                className="font-dm text-center text-ao-muted"
                style={{ fontSize: '13px' }}
              >
                If we don't find at least $500/mo in recoverable revenue, we'll refund you. No questions asked.
              </p>
            </div>
          </div>

          {/* What's included */}
          <div ref={listRef} className="flex flex-col gap-4">
            <h3
              className="font-syne font-bold text-ao-primary mb-2"
              style={{
                fontSize: '22px',
                letterSpacing: '-0.03em',
                ...revealStyle(listVisible),
              }}
            >
              What you get in your audit
            </h3>

            {deliverables.map((item, i) => (
              <div
                key={item.label}
                className="flex gap-4 p-4 rounded-xl"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid rgba(0,200,240,0.08)',
                  opacity: listVisible ? 1 : 0,
                  transform: listVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: 'rgba(0,200,240,0.10)',
                    border: '1px solid rgba(0,200,240,0.18)',
                  }}
                >
                  <span className="font-syne font-bold text-ao-accent" style={{ fontSize: '12px' }}>
                    {i + 1}
                  </span>
                </div>
                <div>
                  <div
                    className="font-syne font-bold text-ao-primary mb-1"
                    style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
                  >
                    {item.label}
                  </div>
                  <div className="font-dm font-light text-ao-muted" style={{ fontSize: '13px' }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
