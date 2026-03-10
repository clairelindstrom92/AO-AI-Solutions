// ============================================================
// FILE: Results.jsx
// PURPOSE: Case study cards — real-world AI results by industry
// SECTION: Public marketing site — after HowItWorks, before Testimonials
// DATA: Update caseStudies array to add/edit client results
// MANUAL EDITS: Safe to update industry, headline, metric, description
// SEO: Targets "AI website results", "AI automation ROI" intent
// CLAUDE AUTOMATION: Can add new case studies as client base grows
// ============================================================

import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

// ── CASE STUDIES ──────────────────────────────────────────────────────────────
// MANUAL EDIT: Add or update result cards here
const caseStudies = [
  {
    industry:    'Law Firm',
    badge:       '⚖️ Legal',
    client:      'Hendricks & Associates',
    headline:    '312% increase in qualified consultations',
    metric:      '312%',
    metricLabel: 'More Consultations',
    desc:        'Their AI assistant pre-qualifies every inquiry, answers common legal questions 24/7, and routes serious cases directly to attorneys — all before a human ever picks up the phone.',
  },
  {
    industry:    'Med Spa',
    badge:       '✨ Aesthetics',
    client:      'Glow Medical Aesthetics',
    headline:    '40+ appointments booked per week — zero staff involvement',
    metric:      '40+',
    metricLabel: 'Weekly Bookings',
    desc:        'Their AI books consultations, sends pre-appointment prep info, and follows up automatically with post-visit care instructions and rebooking prompts.',
  },
  {
    industry:    'HVAC',
    badge:       '🔧 Home Services',
    client:      'Premier Air Systems',
    headline:    'After-hours AI captured $280K in new annual revenue',
    metric:      '$280K',
    metricLabel: 'Revenue Recovered',
    desc:        "72% of their calls came after business hours. Their AI now captures every after-hours lead, schedules service visits, and sends instant quotes — turning missed calls into booked jobs.",
  },
]

export default function Results() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef,  cardsVisible]  = useScrollReveal()

  return (
    <section
      id="results"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p
            className="font-dm text-sm text-ao-accent mb-3 uppercase tracking-widest"
            style={{ ...revealStyle(headerVisible), letterSpacing: '0.12em' }}
          >
            Client Results
          </p>
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Real Businesses.<br className="hidden sm:block" /> Real Revenue.
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-xl mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 120) }}
          >
            These aren't demos. These are outcomes from systems we built and deployed.
          </p>
        </div>

        {/* Case study cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((cs, i) => (
            <div
              key={cs.client}
              className="relative flex flex-col rounded-2xl p-7"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid rgba(0,200,240,0.10)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
                willChange: 'opacity, transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(0,200,240,0.08)'
                e.currentTarget.style.borderColor = 'rgba(0,200,240,0.22)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(0,200,240,0.10)'
              }}
            >
              {/* Industry badge */}
              <span
                className="inline-flex items-center gap-1.5 font-dm text-xs px-3 py-1.5 rounded-full mb-5 self-start"
                style={{
                  backgroundColor: 'rgba(0,200,240,0.08)',
                  border: '1px solid rgba(0,200,240,0.16)',
                  color: '#9BB0BA',
                }}
              >
                {cs.badge}
              </span>

              {/* Big metric */}
              <div
                className="font-syne font-bold text-ao-accent mb-1"
                style={{ fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 1 }}
              >
                {cs.metric}
              </div>
              <div className="font-dm text-sm text-ao-muted mb-5">
                {cs.metricLabel}
              </div>

              {/* Divider */}
              <div
                className="mb-5"
                style={{ height: '1px', backgroundColor: 'rgba(0,200,240,0.08)' }}
              />

              {/* Client name */}
              <div
                className="font-syne font-bold text-ao-primary mb-2"
                style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
              >
                {cs.client}
              </div>

              {/* Description */}
              <p
                className="font-dm font-light text-ao-muted leading-relaxed flex-1"
                style={{ fontSize: '14px' }}
              >
                {cs.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
