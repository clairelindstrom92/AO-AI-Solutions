import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const team = [
  {
    name:  'Claire Lindstrom',
    title: 'AI Engineer & Co-Founder',
    bio:   'Specializes in conversational AI systems, LLM fine-tuning, and building chatbots that actually convert.',
    initials: 'CL',
  },
  {
    name:  'Michael Smith',
    title: 'AI Systems Architect & Co-Founder',
    bio:   'Designs full-stack AI infrastructure, automation pipelines, and the backend intelligence behind every Smart Site.',
    initials: 'MS',
  },
]

export default function Team() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [biosRef,   biosVisible]   = useScrollReveal()

  return (
    <section
      id="team"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <div className="max-w-5xl mx-auto">

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
            Built by AI Engineers,<br className="hidden sm:block" /> Not Web Designers
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            We don't just build websites. We engineer intelligent business systems.
          </p>
        </div>

        {/* Individual bio cards */}
        <div
          ref={biosRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {team.map((person, i) => (
            <div
              key={person.name}
              className="rounded-xl p-6"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid rgba(0,200,240,0.10)',
                opacity: biosVisible ? 1 : 0,
                transform: biosVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                willChange: 'opacity, transform',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,200,240,0.18) 0%, rgba(0,200,240,0.06) 100%)',
                    border: '1px solid rgba(0,200,240,0.25)',
                  }}
                >
                  <span className="font-syne font-bold text-ao-accent" style={{ fontSize: '13px' }}>
                    {person.initials}
                  </span>
                </div>
                <div>
                  <div
                    className="font-syne font-bold text-ao-primary"
                    style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
                  >
                    {person.name}
                  </div>
                  <div className="font-dm text-xs text-ao-accent mt-0.5">{person.title}</div>
                </div>
              </div>
              <p className="font-dm font-light text-ao-muted leading-relaxed" style={{ fontSize: '14px' }}>
                {person.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
