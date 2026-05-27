// ============================================================
// FILE: src/pages/LandingPage.jsx
// PURPOSE: Pre-launch authority landing page — PUBLIC FACING
// BRANCH: landing (DO NOT merge to main)
// PRESERVE: All unfinished production work stays on main
// ============================================================

import { useState, useEffect } from 'react'
import AOLogo from '../components/AOLogo'

// ─── TODO: Replace with your real Formspree endpoint ─────────────────────────
// 1. Go to https://formspree.io → New Form → copy the endpoint ID
// 2. Replace 'YOUR_FORMSPREE_ID' below with your actual ID (e.g. 'xkgbndjp')
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID'
// ─────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: '🤖', title: 'AI Automation', desc: 'Intelligent workflow automation that eliminates repetitive tasks, reduces overhead, and drives measurable operational efficiency.' },
  { icon: '⚡', title: 'Full Stack Development', desc: 'End-to-end web and mobile applications built for performance, business ownership, and long-term scale.' },
  { icon: '☁️', title: 'Cloud Systems', desc: 'Enterprise cloud infrastructure design, deployment, and optimization — AWS, GCP, Azure.' },
  { icon: '🔗', title: 'AI Integrations', desc: 'Seamlessly integrate Claude, GPT-4, Gemini, and custom AI models into your existing business systems.' },
  { icon: '📊', title: 'Lead Capture & CRM', desc: 'High-converting lead capture systems with full CRM integration, automated follow-up, and pipeline management.' },
  { icon: '📣', title: 'Meta Pixel & Facebook Ads', desc: 'Precision ad targeting, conversion tracking, retargeting campaigns, and ROAS-optimized ad systems.' },
  { icon: '📈', title: 'Analytics & Conversion', desc: 'Data-driven insights that identify growth opportunities and systematically optimize customer conversion paths.' },
  { icon: '🎯', title: 'Branding Systems', desc: 'Cohesive brand identity and digital presence systems that communicate authority and establish lasting market trust.' },
]

const TRUST_POINTS = [
  { icon: '⚡', label: '48hr Average Launch' },
  { icon: '🤖', label: '24/7 AI Response Rate' },
  { icon: '📍', label: 'DC Metro Area' },
  { icon: '🔒', label: 'Enterprise Security' },
]

export default function LandingPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          _subject: `[AOAI] New Consultation Request — ${form.name}`,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setFormError('Something went wrong. Please email us directly at Michael.smith@aoaisolutions.dev')
      }
    } catch {
      setFormError('Network error. Please email us directly at Michael.smith@aoaisolutions.dev')
    }
    setSubmitting(false)
  }

  return (
    <div style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", background: '#fff', color: '#0F1115', overflowX: 'hidden' }}>

      {/* ── Announcement Banner ─────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(90deg, #B8941F 0%, #D4AF37 40%, #E8C84A 60%, #D4AF37 80%, #B8941F 100%)',
        padding: '9px 24px',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: '#0F1115',
        textTransform: 'uppercase',
      }}>
        ✦ &nbsp; Launching 2025 — Pre-Launch Consultations Now Booking &nbsp; ✦
      </div>

      {/* ── Sticky Nav ──────────────────────────────────────────────────────── */}
      <nav style={{
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AOLogo color="#D4AF37" style={{ height: '44px', width: 'auto' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#B8941F', textTransform: 'uppercase' }}>
            AI SOLUTIONS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="tel:2024253161" style={{ fontSize: '13px', color: '#4A5568', textDecoration: 'none', fontWeight: 500, display: 'none' }}>
            202.425.3161
          </a>
          <a
            href="#contact"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              color: '#0F1115',
              padding: '10px 22px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            Book Consultation →
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(145deg, #D8E6FF 0%, #C2D5FF 35%, #8AACFF 70%, #7A9CFF 100%)',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow layers */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '1000px', height: '800px',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', top: '-200px', right: '-200px',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute', bottom: '-100px', left: '-100px',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(122,156,255,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
        </div>

        {/* Launching badge */}
        <div style={{
          position: 'absolute', top: '28px', right: '32px',
          background: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(212,175,55,0.5)',
          backdropFilter: 'blur(8px)',
          borderRadius: '50px',
          padding: '6px 16px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#B8941F',
          textTransform: 'uppercase',
        }}>
          🚀 Launching 2025
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', animation: 'fadeIn 0.8s ease both' }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', animation: 'fadeIn 0.7s ease 0.1s both' }}>
            <AOLogo
              color="#D4AF37"
              style={{
                height: '110px',
                width: 'auto',
                filter: 'drop-shadow(0 8px 32px rgba(212,175,55,0.45))',
              }}
            />
          </div>

          {/* Eyebrow */}
          <p style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.32em',
            color: '#8A6B1A',
            textTransform: 'uppercase',
            marginBottom: '18px',
            animation: 'fadeUp 0.7s ease 0.2s both',
          }}>
            AI SOLUTIONS
          </p>

          {/* H1 */}
          <h1 style={{
            fontSize: 'clamp(38px, 6.5vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#0F1115',
            marginBottom: '22px',
            letterSpacing: '-0.02em',
            animation: 'fadeUp 0.7s ease 0.3s both',
          }}>
            Alpha Omega<br />Artificial Intelligence
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: 'clamp(16px, 2.2vw, 21px)',
            color: '#1A2332',
            marginBottom: '8px',
            fontWeight: 400,
            lineHeight: 1.5,
            animation: 'fadeUp 0.7s ease 0.4s both',
          }}>
            End-to-end AI systems, automation, lead capture,
          </p>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: '#2D3748',
            marginBottom: '52px',
            fontWeight: 300,
            animation: 'fadeUp 0.7s ease 0.5s both',
          }}>
            and digital infrastructure for modern businesses.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '56px',
            animation: 'fadeUp 0.7s ease 0.6s both',
          }}>
            <a
              href="#contact"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                color: '#0F1115',
                padding: '15px 34px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(212,175,55,0.4)',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
            >
              Book Consultation →
            </a>
            <a
              href="#contact"
              style={{
                border: '2px solid rgba(15,17,21,0.35)',
                color: '#0F1115',
                padding: '15px 34px',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(4px)',
              }}
            >
              Request Proposal
            </a>
            <a
              href="tel:2024253161"
              style={{
                border: '2px solid rgba(212,175,55,0.5)',
                color: '#8A6B1A',
                padding: '15px 34px',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(4px)',
              }}
            >
              📞 Contact Directly
            </a>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.7s ease 0.75s both',
          }}>
            {TRUST_POINTS.map(t => (
              <div key={t.label} style={{
                background: 'rgba(255,255,255,0.68)',
                border: '1px solid rgba(212,175,55,0.3)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#0F1115',
              }}>
                {t.icon} &nbsp; {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Authority ───────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' }}>
            About AOAI Solutions
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 800, lineHeight: 1.12, color: '#0F1115', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            The AI Agency Built for<br />Business Ownership
          </h2>
          <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '0 auto 36px' }} />
          <p style={{ fontSize: '17px', color: '#4A5568', lineHeight: 1.8, fontWeight: 300, marginBottom: '20px' }}>
            AOAI Solutions is a premium AI systems engineering agency based in the DC Metro Area. We design and build intelligent automation, full-stack applications, and conversion-optimized digital infrastructure for modern businesses that demand results.
          </p>
          <p style={{ fontSize: '17px', color: '#4A5568', lineHeight: 1.8, fontWeight: 300 }}>
            From AI-powered lead capture to enterprise cloud platforms, every system we build is designed for performance, ownership, and long-term scale — so your business runs smarter from day one.
          </p>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 100px', background: 'linear-gradient(180deg, #F0F5FF 0%, #E8EFFF 100%)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '14px' }}>
              What We Build
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 800, color: '#0F1115', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Full-Spectrum AI Services
            </h2>
            <p style={{ fontSize: '16px', color: '#4A5568', fontWeight: 300, maxWidth: '540px', margin: '0 auto' }}>
              Everything your business needs to compete, automate, and grow in the AI era.
            </p>
            <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '20px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(248px, 1fr))', gap: '22px' }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(122,156,255,0.18)',
                  borderRadius: '18px',
                  padding: '34px 26px',
                  transition: 'all 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(122,156,255,0.18)'
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(122,156,255,0.18)'
                }}
              >
                <div style={{ fontSize: '34px', marginBottom: '14px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F1115', marginBottom: '10px', letterSpacing: '0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#718096', lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture / Consultation Form ────────────────────────────────── */}
      <section id="contact" style={{ padding: '96px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '14px' }}>
              Let's Build Together
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 800, color: '#0F1115', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Book a Free Consultation
            </h2>
            <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '0 auto 22px' }} />
            <p style={{ fontSize: '16px', color: '#4A5568', fontWeight: 300, lineHeight: 1.65 }}>
              Tell us about your business and goals. We'll reach out within 24 hours to schedule a free strategy call.
            </p>
          </div>

          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '56px 32px',
              background: 'linear-gradient(145deg, #D8E6FF, #EEF3FF)',
              borderRadius: '24px',
              border: '1px solid rgba(212,175,55,0.3)',
            }}>
              <div style={{ fontSize: '54px', marginBottom: '20px' }}>✅</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F1115', marginBottom: '10px' }}>Message Received!</h3>
              <p style={{ color: '#4A5568', fontWeight: 300, fontSize: '16px', lineHeight: 1.6 }}>
                We'll be in touch within 24 hours to schedule your free strategy call.<br />We look forward to building with you.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                background: '#fff',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid rgba(122,156,255,0.15)',
                boxShadow: '0 8px 40px rgba(122,156,255,0.12)',
              }}
            >
              {/* Row: Name + Company */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { key: 'name', label: 'Full Name *', placeholder: 'Jane Smith', type: 'text', required: true },
                  { key: 'company', label: 'Company Name *', placeholder: 'Acme Corp', type: 'text', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: '10px',
                        border: '1.5px solid #E2E8F0', fontSize: '14px', color: '#0F1115',
                        outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={e => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)' }}
                      onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                ))}
              </div>

              {/* Row: Email + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { key: 'email', label: 'Email *', placeholder: 'jane@company.com', type: 'email', required: true },
                  { key: 'phone', label: 'Phone (Optional)', placeholder: '202-000-0000', type: 'tel', required: false },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: '10px',
                        border: '1.5px solid #E2E8F0', fontSize: '14px', color: '#0F1115',
                        outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={e => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)' }}
                      onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                ))}
              </div>

              {/* Service Interest */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Service Interest
                </label>
                <select
                  value={form.service}
                  onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: '10px',
                    border: '1.5px solid #E2E8F0', fontSize: '14px', color: '#0F1115',
                    outline: 'none', fontFamily: 'inherit', background: '#fff',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                >
                  <option value="">Select a service...</option>
                  <option value="ai-automation">AI Automation</option>
                  <option value="full-stack-development">Full Stack Development</option>
                  <option value="cloud-systems">Cloud Systems</option>
                  <option value="ai-integrations">AI Integrations</option>
                  <option value="lead-capture-crm">Lead Capture & CRM</option>
                  <option value="meta-pixel-facebook-ads">Meta Pixel & Facebook Ads</option>
                  <option value="analytics-conversion">Analytics & Conversion</option>
                  <option value="branding-systems">Branding Systems</option>
                  <option value="full-service">Full Service Package</option>
                  <option value="not-sure">Not Sure Yet — Let's Talk</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F1115', marginBottom: '7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Tell Us About Your Project
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your business goals and what you'd like to build..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: '10px',
                    border: '1.5px solid #E2E8F0', fontSize: '14px', color: '#0F1115',
                    outline: 'none', fontFamily: 'inherit', resize: 'vertical',
                    transition: 'border-color 0.2s, box-shadow 0.2s', lineHeight: 1.6,
                  }}
                  onFocus={e => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              {formError && (
                <p style={{ color: '#e53e3e', fontSize: '13px', textAlign: 'center' }}>{formError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? 'rgba(212,175,55,0.6)' : 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                  color: '#0F1115',
                  padding: '16px 36px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '15px',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.04em',
                  boxShadow: '0 6px 24px rgba(212,175,55,0.35)',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  width: '100%',
                }}
              >
                {submitting ? 'Sending...' : 'Submit Consultation Request →'}
              </button>

              {/* Direct contact fallback */}
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#718096', fontWeight: 300 }}>
                Or reach us directly: &nbsp;
                <a href="tel:2024253161" style={{ color: '#D4AF37', fontWeight: 600, textDecoration: 'none' }}>202.425.3161</a>
                &nbsp;|&nbsp;
                <a href="mailto:Michael.smith@aoaisolutions.dev" style={{ color: '#D4AF37', fontWeight: 600, textDecoration: 'none' }}>Michael.smith@aoaisolutions.dev</a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Contact Card + QR ───────────────────────────────────────────────── */}
      <section style={{
        padding: '80px 24px 96px',
        background: 'linear-gradient(145deg, #C9D9FF 0%, #8AACFF 50%, #7A9CFF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 65%)',
        }} />
        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#7A5C12', textTransform: 'uppercase', marginBottom: '12px' }}>
              Connect Directly
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, color: '#0F1115', letterSpacing: '-0.02em' }}>
              Ready to Connect?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>

            {/* Digital Contact Card */}
            <div style={{
              background: 'rgba(255,255,255,0.94)',
              borderRadius: '28px',
              padding: '44px 36px',
              boxShadow: '0 24px 72px rgba(0,0,0,0.12)',
              border: '1px solid rgba(212,175,55,0.3)',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ marginBottom: '24px' }}>
                <AOLogo color="#D4AF37" style={{ height: '50px', width: 'auto', filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.3))' }} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F1115', marginBottom: '4px' }}>Michael Smith</h3>
              <p style={{ fontSize: '12px', color: '#718096', marginBottom: '28px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                Founder & AI Systems Engineer
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="tel:2024253161" style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  color: '#0F1115', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                    borderRadius: '12px', width: '44px', height: '44px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0, boxShadow: '0 4px 12px rgba(212,175,55,0.3)',
                  }}>📞</span>
                  202.425.3161
                </a>
                <a href="mailto:Michael.smith@aoaisolutions.dev" style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  color: '#0F1115', textDecoration: 'none', fontSize: '14px', fontWeight: 500, wordBreak: 'break-all',
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                    borderRadius: '12px', width: '44px', height: '44px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0, boxShadow: '0 4px 12px rgba(212,175,55,0.3)',
                  }}>✉️</span>
                  Michael.smith@aoaisolutions.dev
                </a>
                <a href="https://aoaisolutions.dev" style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  color: '#0F1115', textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                    borderRadius: '12px', width: '44px', height: '44px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0, boxShadow: '0 4px 12px rgba(212,175,55,0.3)',
                  }}>🌐</span>
                  aoaisolutions.dev
                </a>
              </div>

              {/* Save Contact Button */}
              <a
                href="#contact"
                style={{
                  display: 'block',
                  marginTop: '28px',
                  background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                  color: '#0F1115',
                  padding: '13px 24px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(212,175,55,0.35)',
                  letterSpacing: '0.04em',
                }}
              >
                Book a Consultation →
              </a>
            </div>

            {/* QR Code */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: '#7A5C12', textTransform: 'uppercase', marginBottom: '20px' }}>
                📱 Scan to Connect
              </p>
              <div style={{
                display: 'inline-block',
                background: '#fff',
                borderRadius: '24px',
                padding: '22px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
                border: '3px solid rgba(212,175,55,0.45)',
              }}>
                {/* Real QR Code via qrserver.com API */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Faoaisolutions.dev%23contact&size=240x240&format=png&margin=8&qzone=1&color=0F1115&bgcolor=FFFFFF"
                  alt="AOAI Solutions QR Code — Scan to book a consultation"
                  width={240}
                  height={240}
                  style={{ display: 'block', borderRadius: '10px' }}
                  loading="eager"
                />
              </div>
              <p style={{ fontSize: '13px', color: '#1A2332', marginTop: '16px', fontWeight: 500, lineHeight: 1.6 }}>
                Scan to book a consultation,<br />view services, or save contact info
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                <a href="tel:2024253161" style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '50px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#0F1115', textDecoration: 'none' }}>
                  📞 Call Now
                </a>
                <a href="mailto:Michael.smith@aoaisolutions.dev" style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '50px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#0F1115', textDecoration: 'none' }}>
                  ✉️ Email
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#0F1115', color: '#fff', padding: '64px 24px 36px', textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <AOLogo color="#D4AF37" style={{ height: '60px', width: 'auto', filter: 'drop-shadow(0 4px 16px rgba(212,175,55,0.3))' }} />
        </div>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(212,175,55,0.8)', textTransform: 'uppercase', marginBottom: '10px' }}>
          AI SOLUTIONS
        </p>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', fontWeight: 300, maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.65 }}>
          End-to-end AI systems, automation, and digital infrastructure for modern businesses.
        </p>
        <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #D4AF37, #E8C84A)', borderRadius: '4px', margin: '0 auto 36px' }} />
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[
            { label: 'Book Consultation', href: '#contact' },
            { label: 'Request Proposal', href: '#contact' },
            { label: '202.425.3161', href: 'tel:2024253161' },
            { label: 'Email Us', href: 'mailto:Michael.smith@aoaisolutions.dev' },
          ].map(l => (
            <a key={l.label} href={l.href} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#D4AF37'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            © 2025 AOAI Solutions. All rights reserved. | aoaisolutions.dev
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', marginTop: '6px' }}>
            🚀 Launching 2025 — Pre-launch authority landing page
          </p>
        </div>
      </footer>

    </div>
  )
}
