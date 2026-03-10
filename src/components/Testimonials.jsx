// ============================================================
// FILE: Testimonials.jsx
// PURPOSE: Client testimonials — social proof quote cards
// SECTION: Public marketing site — after Results, before ChatDemo
// DATA: Update testimonials array to add/edit client quotes
// MANUAL EDITS: Safe to update quote, name, role, company
// SEO: Targets "AI website reviews", "AI automation testimonials"
// CLAUDE AUTOMATION: Can add new testimonials as client base grows
// ============================================================

import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
// MANUAL EDIT: Update client quotes here
const testimonials = [
  {
    quote:   "Within 30 days of launching our AI website, we were booking 3x more consultations. The system follows up with every lead automatically — it's like having a full-time receptionist that never sleeps.",
    name:    'Marcus T.',
    role:    'Managing Partner',
    company: 'Hendricks & Associates',
    initials:'MT',
  },
  {
    quote:   "I was skeptical at first, but our AI chatbot now handles 80% of our booking inquiries without any staff involvement. Revenue is up and my team can focus on actual patient care instead of answering the same questions all day.",
    name:    'Dr. Sarah L.',
    role:    'Owner & Lead Injector',
    company: 'Glow Medical Aesthetics',
    initials:'SL',
  },
  {
    quote:   "The after-hours lead capture alone paid for the entire system in the first month. We used to lose so many jobs because nobody could answer at 9pm. Now the AI books the appointment and sends a quote instantly.",
    name:    'Ryan P.',
    role:    'Operations Director',
    company: 'Premier Air Systems',
    initials:'RP',
  },
]

function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
      <path
        d="M0 24V14.4C0 10.56 0.853333 7.28 2.56 4.56C4.26667 1.84 6.72 0.16 9.92 0L11.52 2.88C9.49333 3.36 7.89333 4.56 6.72 6.48C5.54667 8.4 4.96 10.4 4.96 12.48H9.28V24H0ZM20.48 24V14.4C20.48 10.56 21.3333 7.28 23.04 4.56C24.7467 1.84 27.2 0.16 30.4 0L32 2.88C29.9733 3.36 28.3733 4.56 27.2 6.48C26.0267 8.4 25.44 10.4 25.44 12.48H29.76V24H20.48Z"
        fill="#00C8F0"
        opacity="0.25"
      />
    </svg>
  )
}

export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef,  cardsVisible]  = useScrollReveal()

  return (
    <section
      id="testimonials"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p
            className="font-dm text-sm text-ao-accent mb-3 uppercase"
            style={{ ...revealStyle(headerVisible), letterSpacing: '0.12em' }}
          >
            What Clients Say
          </p>
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Built on Trust.<br className="hidden sm:block" /> Proven by Results.
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 120) }}
          >
            Hear from the business owners whose operations we've transformed with AI.
          </p>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl p-7"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid rgba(0,200,240,0.10)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s ease ${i * 110}ms, box-shadow 0.3s ease`,
                willChange: 'opacity, transform',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(0,200,240,0.07)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Quote icon */}
              <div className="mb-5">
                <QuoteIcon />
              </div>

              {/* Quote text */}
              <p
                className="font-dm font-light text-ao-muted leading-relaxed flex-1 mb-7"
                style={{ fontSize: '15px' }}
              >
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-syne font-bold text-sm"
                  style={{
                    backgroundColor: 'rgba(0,200,240,0.12)',
                    border: '1px solid rgba(0,200,240,0.25)',
                    color: '#00C8F0',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="font-syne font-bold text-ao-primary"
                    style={{ fontSize: '14px', letterSpacing: '-0.02em' }}
                  >
                    {t.name}
                  </div>
                  <div className="font-dm text-xs text-ao-muted">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
