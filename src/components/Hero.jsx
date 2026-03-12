// ============================================================
// FILE: Hero.jsx
// PURPOSE: Above-the-fold hero section — GrandSign emblem, headline, CTA, metrics
// SECTION: Public marketing site — first visible section
// DATA: Update metrics array and headline text below
// MANUAL EDITS: Safe to update metrics[], headline, subheadline, CTA labels
// SEO: Contains the page H1 — keep primary keywords in headline
//      "AI-Powered Websites" and "Run Your Business" are key phrases
// CLAUDE AUTOMATION: Can A/B test headline copy, update metrics
// ============================================================

import { useRef, useEffect, useState } from 'react'
import { useParticleCanvas } from '../hooks/useParticleCanvas'
import { trackGetWebsiteClick, trackBookDemoClick } from '../lib/analytics'

// ── METRICS BAR DATA ──────────────────────────────────────────────────────────
// MANUAL EDIT: Update these labels — only use verified, factual claims
const metrics = [
  '24/7 AI Response Rate',
  '48hr Average Launch',
  'DC Metro Area',
]

export default function Hero() {
  const canvasRef = useRef(null)
  const [metricsVisible, setMetricsVisible] = useState(false)

  useParticleCanvas(canvasRef, 200)

  useEffect(() => {
    const t = setTimeout(() => setMetricsVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.65 }}
      />

      {/* Radial glow behind emblem */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:  '900px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(0,200,240,0.09) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-20">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full font-dm text-sm text-ao-muted"
          style={{
            border: '1px solid rgba(0,200,240,0.18)',
            backgroundColor: 'rgba(0,200,240,0.06)',
            animation: 'fadeIn 0.6s ease forwards',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-ao-accent"
            style={{ boxShadow: '0 0 6px rgba(0,200,240,0.9)' }}
          />
          AI Business Infrastructure
        </div>

        {/* GrandSign — anchor emblem */}
        <div
          className="flex justify-center mb-6"
          style={{ animation: 'fadeIn 0.9s ease 0.1s both' }}
        >
          <img
            src="/logo-grand.jpeg"
            alt="AO AI Solutions — anchor emblem"
            className="blend-screen select-none pointer-events-none"
            style={{
              width: 'clamp(200px, 34vw, 400px)',
              height: 'auto',
              filter: 'brightness(1.25) contrast(1.1) saturate(1.15)',
              display: 'block',
            }}
          />
        </div>

        {/* H1 */}
        <h1
          className="font-syne font-bold text-ao-primary leading-none mb-6"
          style={{
            fontSize: 'clamp(38px, 6.5vw, 80px)',
            letterSpacing: '-0.04em',
            animation: 'fadeUp 0.7s ease 0.25s both',
          }}
        >
          AI-Powered Websites<br />
          <span className="text-ao-accent">That Run Your Business</span>
        </h1>

        {/* Subhead */}
        <p
          className="font-dm font-light text-ao-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            animation: 'fadeUp 0.7s ease 0.4s both',
          }}
        >
          We build intelligent websites and automation systems that capture leads, respond to customers, and operate your business around the clock.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
          style={{ animation: 'fadeUp 0.7s ease 0.55s both' }}
        >
          <a
            href="#contact"
            aria-label="Get started with an AI website"
            className="font-dm font-medium text-ao-deep bg-ao-accent px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: '0 0 0 rgba(0,200,240,0)' }}
            onClick={() => trackGetWebsiteClick('hero')}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 36px rgba(0,200,240,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'}
          >
            Get an AI Website
          </a>
          <a
            href="#contact"
            aria-label="Book a free strategy demo call"
            className="font-dm text-ao-primary px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{ border: '1px solid rgba(0,200,240,0.30)' }}
            onClick={() => trackBookDemoClick('hero')}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,200,240,0.65)'
              e.currentTarget.style.boxShadow   = '0 0 20px rgba(0,200,240,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,200,240,0.30)'
              e.currentTarget.style.boxShadow   = 'none'
            }}
          >
            Book a Demo
          </a>
        </div>

        {/* Metric badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {metrics.map((m, i) => (
            <div
              key={m}
              className="font-dm text-sm text-ao-primary px-4 py-2 rounded-full"
              style={{
                border: '1px solid rgba(0,200,240,0.14)',
                backgroundColor: 'rgba(0,200,240,0.06)',
                opacity: metricsVisible ? 1 : 0,
                transform: metricsVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.55s ease ${i * 100}ms, transform 0.55s ease ${i * 100}ms`,
              }}
            >
              <span className="text-ao-accent font-medium">{m.split(' ')[0]}</span>{' '}
              {m.split(' ').slice(1).join(' ')}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-deep))' }}
      />
    </section>
  )
}
