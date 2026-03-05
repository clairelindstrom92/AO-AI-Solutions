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
    bio:   'Designs full-stack AI infrastructure, multi-agent automation pipelines, and the backend intelligence that powers every client system.',
    initials: 'MS',
  },
]

export default function Team() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [photoRef,  photoVisible]  = useScrollReveal()
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
            The AI Engineering Team<br className="hidden sm:block" /> Behind Your Growth
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-lg mx-auto mb-6"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            We engineer agentic AI systems that generate real revenue — not just tech projects.
          </p>
          {/* Powered-by logos */}
          <div
            className="flex flex-wrap items-center justify-center gap-4"
            style={revealStyle(headerVisible, 180)}
          >
            <span className="font-dm text-xs text-ao-muted uppercase tracking-widest">Powered by</span>
            {['OpenAI', 'Anthropic', 'Twilio', 'HubSpot', 'Make'].map(logo => (
              <span
                key={logo}
                className="font-dm text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  color: 'rgba(0,200,240,0.75)',
                  border: '1px solid rgba(0,200,240,0.18)',
                  backgroundColor: 'rgba(0,200,240,0.05)',
                }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* Team Photo — full together shot */}
        <div
          ref={photoRef}
          className="mb-12 flex justify-center"
          style={revealStyle(photoVisible)}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              maxWidth: '600px',
              width: '100%',
              border: '1px solid rgba(0,200,240,0.14)',
              boxShadow: '0 0 60px rgba(0,200,240,0.08)',
            }}
          >
            {/* Try to load real photo — fallback to placeholder */}
            <img
              src="/team.jpg"
              alt="Claire Lindstrom and Michael Smith — Co-Founders of AO AI Solutions"
              className="w-full object-cover"
              style={{ aspectRatio: '4/3', objectPosition: 'center top' }}
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'flex'
              }}
            />
            {/* Fallback placeholder */}
            <div
              className="w-full items-center justify-center gap-8 py-16 px-8"
              style={{
                display: 'none',
                background: 'linear-gradient(135deg, rgba(0,200,240,0.08) 0%, rgba(0,200,240,0.02) 100%)',
                aspectRatio: '4/3',
              }}
            >
              {team.map(person => (
                <div key={person.name} className="flex flex-col items-center gap-3">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,200,240,0.20) 0%, rgba(0,200,240,0.06) 100%)',
                      border: '2px solid rgba(0,200,240,0.30)',
                    }}
                  >
                    <span
                      className="font-syne font-bold text-ao-accent"
                      style={{ fontSize: '28px' }}
                    >
                      {person.initials}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-syne font-bold text-ao-primary text-sm">{person.name}</div>
                    <div className="font-dm text-ao-muted text-xs mt-1">{person.title}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom gradient overlay for text legibility */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(6,10,18,0.80) 0%, transparent 100%)',
              }}
            />

            {/* Photo caption */}
            <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
              <div>
                <div className="font-dm text-xs text-ao-muted">Claire Lindstrom · Michael Smith</div>
                <div className="font-dm text-xs text-ao-accent mt-0.5">Co-Founders, AO AI Solutions</div>
              </div>
            </div>
          </div>
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
