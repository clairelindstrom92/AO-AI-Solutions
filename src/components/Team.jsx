// ============================================================
// FILE: Team.jsx
// PURPOSE: Founders section — photo, bios, and titles
// SECTION: Public marketing site — "Built by AI Engineers" block
// DATA: Update founder names, titles, and bios in the `team` array below
// MANUAL EDITS: Safe to update name, title, bio, initials in team[]
// SEO: team.jpg alt text is set on the <img> below — keep it descriptive
// CLAUDE AUTOMATION: Can update bios, add new team members to team[]
// ============================================================

import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

// ── TEAM DATA ─────────────────────────────────────────────────────────────────
// MANUAL EDIT: Update names, titles, and bios here. Order = display order.
const team = [
  {
    name:     'Michael Smith',
    title:    'AI Systems Engineer · Founder',
    bio:      'Designs full-stack AI infrastructure, automation pipelines, and the backend intelligence behind every Smart Site.',
    initials: 'MS',
    email:    'michael.smith@aoaisolutions.dev',
  },
  {
    name:     'Claire Lindstrom',
    title:    'AI Systems Engineer · Co-Founder',
    bio:      'Specializes in conversational AI systems, LLM fine-tuning, and building chatbots that actually convert.',
    initials: 'CL',
    email:    'claire.lindstrom@aoaisolutions.dev',
  },
]

export default function Team() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [photoRef,  photoVisible]  = useScrollReveal()
  const [biosRef,   biosVisible]   = useScrollReveal()

  return (
    <section
      id="team"
      aria-label="Meet the founders of AO AI Solutions"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── SECTION HEADER ──────────────────────────────────────── */}
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

        {/* ── FOUNDERS PHOTO ──────────────────────────────────────── */}
        {/* SEO: alt text is descriptive and includes full names + company */}
        {/* MANUAL EDIT: Replace /team.jpg in /public to update the photo */}
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
            <img
              src="/team.jpg"
              alt="Michael Smith and Claire Lindstrom, AI Systems Engineers and Co-Founders of AO AI Solutions"
              className="w-full"
              width="600"
              loading="lazy"
            />

            {/* Bottom gradient overlay for caption legibility */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(6,10,18,0.80) 0%, transparent 100%)',
              }}
            />

            {/* ── PHOTO CAPTION ─────────────────────────────────── */}
            <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
              <div>
                <div className="font-dm text-xs text-ao-muted">Michael Smith · Claire Lindstrom</div>
                <div className="font-dm text-xs text-ao-accent mt-0.5">Founders, AO AI Solutions</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOUNDER BIO CARDS ───────────────────────────────────── */}
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
                  aria-hidden="true"
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
              <a
                href={`mailto:${person.email}`}
                className="font-dm text-xs text-ao-accent hover:text-ao-primary transition-colors duration-200 mt-3 inline-block"
              >
                {person.email}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
