import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const plans = [
  {
    tier:     'Starter',
    label:    'Launch',
    setup:    '$2,000',
    monthly:  '$250/mo',
    features: [
      'AI-powered website',
      'Trained AI chatbot',
      'Lead capture automation',
      'Hosting & deployment',
      'Basic analytics',
    ],
    cta:        'Get Started',
    ctaHref:    '#contact',
    highlight:  false,
  },
  {
    tier:     'Growth',
    label:    'Scale',
    badge:    'Most Popular',
    setup:    '$4,000',
    monthly:  '$500/mo',
    features: [
      'Everything in Starter',
      'CRM integration',
      'SMS + email automation',
      'Booking system',
      'Monthly AI updates',
      'Priority support',
    ],
    cta:        'Get Started',
    ctaHref:    '#contact',
    highlight:  true,
  },
  {
    tier:     'Enterprise',
    label:    'Custom',
    setup:    'Custom quote',
    monthly:  'Starting at $1,000/mo',
    features: [
      'Full custom AI systems',
      'Internal AI assistants',
      'White-glove onboarding',
      'Dedicated AI engineer',
      'SLA guarantee',
    ],
    cta:        'Book a Call',
    ctaHref:    '#contact',
    highlight:  false,
  },
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M2 7L5.5 10.5L12 3" stroke="#00C8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Pricing() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef,  cardsVisible]  = useScrollReveal()

  return (
    <section
      id="pricing"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-surface)' }}
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
            AI Agency Pricing.<br className="hidden sm:block" /> Real Business Results.
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            No web designer rates. This is AI infrastructure.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch"
        >
          {plans.map((plan, i) => (
            <div
              key={plan.tier}
              className="relative flex flex-col rounded-2xl p-7 transition-all duration-300"
              style={{
                backgroundColor: plan.highlight ? 'rgba(0,200,240,0.06)' : 'var(--bg-elevated)',
                border: plan.highlight
                  ? '1px solid rgba(0,200,240,0.35)'
                  : '1px solid rgba(0,200,240,0.10)',
                boxShadow: plan.highlight ? '0 0 50px rgba(0,200,240,0.10)' : 'none',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.3s ease`,
              }}
              onMouseEnter={e => {
                if (!plan.highlight) {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0,200,240,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(0,200,240,0.22)'
                }
              }}
              onMouseLeave={e => {
                if (!plan.highlight) {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(0,200,240,0.10)'
                }
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="font-dm text-xs font-medium text-ao-deep px-3.5 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: '#00C8F0' }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Tier */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span
                    className="font-syne font-bold text-ao-primary"
                    style={{ fontSize: '22px', letterSpacing: '-0.03em' }}
                  >
                    {plan.tier}
                  </span>
                  <span
                    className="font-dm text-xs px-2 py-0.5 rounded-full text-ao-muted"
                    style={{ backgroundColor: 'rgba(136,150,168,0.10)', border: '1px solid rgba(136,150,168,0.15)' }}
                  >
                    {plan.label}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(0,200,240,0.08)' }}>
                <div
                  className="font-syne font-bold text-ao-primary"
                  style={{ fontSize: '36px', letterSpacing: '-0.04em' }}
                >
                  {plan.setup}
                </div>
                <div className="font-dm text-sm text-ao-muted mt-0.5">one-time setup</div>
                <div
                  className="font-dm font-medium text-ao-accent mt-3"
                  style={{ fontSize: '18px' }}
                >
                  + {plan.monthly}
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="font-dm font-light text-ao-muted" style={{ fontSize: '14px' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                className="block text-center font-dm font-medium py-3 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={
                  plan.highlight
                    ? {
                        backgroundColor: '#00C8F0',
                        color: '#060A12',
                        boxShadow: '0 0 0 rgba(0,200,240,0)',
                      }
                    : {
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(0,200,240,0.28)',
                      }
                }
                onMouseEnter={e => {
                  if (plan.highlight) e.currentTarget.style.boxShadow = '0 0 28px rgba(0,200,240,0.45)'
                }}
                onMouseLeave={e => {
                  if (plan.highlight) e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
