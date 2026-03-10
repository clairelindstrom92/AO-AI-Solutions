// ============================================================
// FILE: Footer.jsx
// PURPOSE: Site footer — logo, navigation links, CTA, acronym watermark
// SECTION: Public marketing site — bottom of every page
// DATA: Update footerLinks array to add/remove nav items
// MANUAL EDITS: Safe to update links, copyright year, tagline
// SEO: Footer links support internal linking strategy
// CLAUDE AUTOMATION: Can add new sections/links as site grows
// ============================================================

// ── FOOTER NAVIGATION LINKS ───────────────────────────────────────────────────
// MANUAL EDIT: Add new links here as new sections are added to the site
const footerLinks = [
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Results',      href: '#results' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contact',      href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-deep)',
        borderTop: '1px solid rgba(0,200,240,0.10)',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,240,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,240,1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Acronym watermark — centered, blend-screen so black bg disappears */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{ opacity: 0.07 }}
      >
        <img
          src="/logo-acronym.jpeg"
          alt=""
          aria-hidden="true"
          className="blend-screen"
          style={{
            height: '120px',
            width: 'auto',
            filter: 'brightness(2) contrast(1.2)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Left — Logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/logo-transparent.png"
                alt="AO AI Solutions logo"
                className="h-7 w-auto"
                style={{ filter: 'brightness(1.1)' }}
              />
              <span className="font-syne font-bold text-base text-ao-primary" style={{ letterSpacing: '-0.02em' }}>
                AO AI Solutions
              </span>
            </div>
            <p
              className="font-dm font-light text-ao-muted leading-relaxed mb-5"
              style={{ fontSize: '13px', maxWidth: '240px' }}
            >
              We turn normal websites into intelligent AI-powered business systems.
            </p>
            <p className="font-dm text-xs text-ao-muted" style={{ opacity: 0.5 }}>
              © {new Date().getFullYear()} AO AI Solutions. All rights reserved.
            </p>
            <div className="flex flex-col gap-1 mt-4">
              <a
                href="mailto:claire.lindstrom@aoaisolutions.dev"
                className="font-dm text-xs text-ao-muted hover:text-ao-primary transition-colors duration-200"
              >
                claire.lindstrom@aoaisolutions.dev
              </a>
              <a
                href="mailto:michael.smith@aoaisolutions.dev"
                className="font-dm text-xs text-ao-muted hover:text-ao-primary transition-colors duration-200"
              >
                michael.smith@aoaisolutions.dev
              </a>
            </div>
          </div>

          {/* Center — Nav links */}
          <div className="flex flex-col gap-3 md:items-center">
            <div className="font-syne font-bold text-ao-primary text-sm mb-1" style={{ letterSpacing: '-0.02em' }}>
              Navigation
            </div>
            {footerLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="font-dm text-sm text-ao-muted hover:text-ao-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div
              className="font-dm font-light text-ao-muted text-sm leading-relaxed md:text-right"
              style={{ maxWidth: '220px' }}
            >
              Ready to turn your website into an AI system?
            </div>
            <a
              href="#contact"
              className="font-dm font-medium text-ao-deep bg-ao-accent px-6 py-3 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              style={{ boxShadow: '0 0 0 rgba(0,200,240,0)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(0,200,240,0.45)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'}
            >
              Book a Free Demo
            </a>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ boxShadow: '0 0 6px rgba(74,222,128,0.9)' }}
              />
              <span className="font-dm text-xs text-ao-muted">Accepting new clients</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
