import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const stats = [
  {
    value: '3x',
    label: 'More leads captured after hours',
    source: 'vs. standard contact forms',
  },
  {
    value: '78%',
    label: 'Of leads go with the first responder',
    source: 'MIT Lead Response Study',
  },
  {
    value: '67%',
    label: 'Of customers prefer messaging over calling',
    source: 'Meta Business Survey',
  },
  {
    value: '35%',
    label: 'Higher close rate with AI follow-up',
    source: 'Salesforce State of Sales',
  },
]

const industries = [
  {
    name: 'Law Firms',
    problem: 'Clients call after hours, get voicemail, and hire your competitor by morning.',
    solution: 'AI intake bot qualifies leads 24/7, captures case details, and books consultations automatically.',
    result: 'No missed evening or weekend consult requests',
  },
  {
    name: 'Dental Practices',
    problem: 'New patient inquiries go cold waiting for a callback during busy chair time.',
    solution: 'AI answers FAQs, checks insurance eligibility questions, and schedules the first appointment on the spot.',
    result: 'New patient bookings without staff lifting a finger',
  },
  {
    name: 'Med Spas',
    problem: 'Instagram DMs and website inquiries pile up while staff is busy with clients.',
    solution: 'AI responds instantly to treatment questions, handles deposits, and books consultations.',
    result: 'Every inquiry becomes a booked appointment',
  },
  {
    name: 'HVAC & Contractors',
    problem: 'Emergency calls at 11pm go to a voicemail. Homeowner books whoever answers.',
    solution: 'AI triages emergency vs. scheduled jobs, captures contact info, and dispatches or books.',
    result: 'Never lose an emergency job to a competitor again',
  },
]

export default function ByTheNumbers() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [statsRef,  statsVisible]  = useScrollReveal()
  const [indRef,    indVisible]    = useScrollReveal()

  return (
    <section
      id="by-the-numbers"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible),
            }}
          >
            The Business Case for AI.<br className="hidden sm:block" />
            <span className="text-ao-accent">By the Numbers.</span>
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            This isn't hype. These are the industry benchmarks behind every system we build.
          </p>
        </div>

        {/* Stats grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((s, i) => (
            <div
              key={s.value}
              className="rounded-2xl p-6 text-center"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid rgba(0,200,240,0.10)',
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms`,
              }}
            >
              <div
                className="font-syne font-bold text-ao-accent mb-2"
                style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '-0.04em' }}
              >
                {s.value}
              </div>
              <div
                className="font-dm text-ao-primary mb-1"
                style={{ fontSize: '14px', lineHeight: 1.4 }}
              >
                {s.label}
              </div>
              <div
                className="font-dm text-ao-muted"
                style={{ fontSize: '12px' }}
              >
                {s.source}
              </div>
            </div>
          ))}
        </div>

        {/* Industry use cases */}
        <div ref={indRef} className="mb-4">
          <h3
            className="font-syne font-bold text-ao-primary text-center mb-10"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '-0.03em',
              ...revealStyle(indVisible),
            }}
          >
            Built for Your Industry
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industries.map((ind, i) => (
              <div
                key={ind.name}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid rgba(0,200,240,0.10)',
                  opacity: indVisible ? 1 : 0,
                  transform: indVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.55s ease ${i * 90}ms, transform 0.55s ease ${i * 90}ms`,
                }}
              >
                <div
                  className="inline-block font-dm text-xs font-medium px-2.5 py-1 rounded-full mb-4"
                  style={{
                    color: '#00C8F0',
                    backgroundColor: 'rgba(0,200,240,0.10)',
                    border: '1px solid rgba(0,200,240,0.20)',
                  }}
                >
                  {ind.name}
                </div>

                <div className="mb-3">
                  <div className="font-dm text-xs text-ao-muted uppercase tracking-wider mb-1">The Problem</div>
                  <p className="font-dm font-light text-ao-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                    {ind.problem}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="font-dm text-xs text-ao-muted uppercase tracking-wider mb-1">Our AI Fix</div>
                  <p className="font-dm font-light text-ao-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                    {ind.solution}
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 pt-3"
                  style={{ borderTop: '1px solid rgba(0,200,240,0.08)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                    <path d="M2 7L5.5 10.5L12 3" stroke="#00C8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-dm font-medium" style={{ fontSize: '13px', color: '#00C8F0' }}>
                    {ind.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
