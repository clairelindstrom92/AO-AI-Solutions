// ============================================================
// FILE: Nav.jsx
// PURPOSE: Top navigation bar — logo, links, CTA buttons
// SECTION: Public marketing site — fixed header
// DATA: Update links array to add/remove nav items
// MANUAL EDITS: Safe to update link labels and hrefs in links[]
// SEO: Nav links support internal linking and crawlability
// CLAUDE AUTOMATION: Can add Client Login button, portal routes
// ============================================================

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import AOLogo from './AOLogo'
import { trackBookDemoClick, trackGetWebsiteClick } from '../lib/analytics'

// ── NAV LINKS ─────────────────────────────────────────────────────────────────
// MANUAL EDIT: Add or remove navigation items here
const links = [
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Smart Sites',  href: '#smart-sites' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Contact',      href: '#contact' },
]

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = () => setMobileOpen(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(6,10,18,0.75)',
        borderBottom: scrolled ? '1px solid rgba(0,200,240,0.10)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <AOLogo className="h-7 w-auto" />
          <span className="font-syne font-bold text-base text-ao-primary tracking-tight2 hidden sm:block">
            Ai Solutions
          </span>
        </a>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-dm text-sm text-ao-muted hover:text-ao-primary transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            aria-label="Book a free strategy demo call"
            className="font-dm text-sm text-ao-primary px-5 py-2 rounded-full transition-all duration-200 hover:-translate-y-px"
            style={{ border: '1px solid rgba(0,200,240,0.30)' }}
            onClick={() => trackBookDemoClick('nav')}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,200,240,0.70)'
              e.currentTarget.style.boxShadow   = '0 0 18px rgba(0,200,240,0.14)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,200,240,0.30)'
              e.currentTarget.style.boxShadow   = 'none'
            }}
          >
            Book a Demo
          </a>
          <a
            href="#contact"
            aria-label="Get started with an AI website"
            className="font-dm text-sm font-medium text-ao-deep bg-ao-accent px-5 py-2 rounded-full transition-all duration-200 hover:-translate-y-px"
            style={{ boxShadow: '0 0 0 rgba(0,200,240,0)' }}
            onClick={() => trackGetWebsiteClick('nav')}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(0,200,240,0.45)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'}
          >
            Get AI Website
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-ao-primary p-1.5"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileOpen ? '400px' : '0' }}
      >
        <div
          className="px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ borderTop: '1px solid rgba(0,200,240,0.10)' }}
        >
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleLink}
              className="font-dm text-sm text-ao-muted hover:text-ao-primary transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="#contact"
              aria-label="Book a free strategy demo call"
              onClick={() => { handleLink(); trackBookDemoClick('nav-mobile') }}
              className="font-dm text-sm text-ao-primary text-center px-5 py-2.5 rounded-full"
              style={{ border: '1px solid rgba(0,200,240,0.30)' }}
            >
              Book a Demo
            </a>
            <a
              href="#contact"
              aria-label="Get started with an AI website"
              onClick={() => { handleLink(); trackGetWebsiteClick('nav-mobile') }}
              className="font-dm text-sm font-medium text-ao-deep bg-ao-accent text-center px-5 py-2.5 rounded-full"
            >
              Get AI Website
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
