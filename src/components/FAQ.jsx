// ============================================================
// FILE: FAQ.jsx
// PURPOSE: Frequently Asked Questions accordion section
// SECTION: Public marketing site — between Pricing and Contact
// DATA: Add, remove, or edit questions in the `faqs` array below
// MANUAL EDITS: Safe to update question/answer text in faqs[]
// SEO: Questions match FAQPage JSON-LD schema in index.html
//      Keep index.html JSON-LD in sync when adding/removing questions
// CLAUDE AUTOMATION: Can add new FAQ items, reorder, update answers
// ============================================================

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

// ── FAQ DATA ──────────────────────────────────────────────────────────────────
// MANUAL EDIT: Add, remove, or reorder questions here.
// Keep matching entries updated in index.html FAQPage JSON-LD schema.
const faqs = [
  {
    question: 'What is an AI-powered website?',
    answer:
      'An AI-powered website goes beyond a traditional site. It includes a trained AI chatbot, smart lead forms, automated scheduling, and 24/7 customer response — so your website works as an employee even when you\'re not available.',
  },
  {
    question: 'How long does it take to launch an AI website?',
    answer:
      'Most projects launch within 48 to 72 hours after onboarding. Complex custom AI integrations may take 1–2 weeks depending on scope. We\'ll give you a clear timeline on your free strategy call.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We work with law firms, dental practices, med spas, real estate agencies, roofing companies, HVAC contractors, and other local service businesses across the United States.',
  },
  {
    question: 'Do I need technical knowledge to manage my AI website?',
    answer:
      'No. We build and manage everything for you. Your AI system is monitored, updated, and maintained by our team on an ongoing basis — you just run your business.',
  },
  {
    question: 'What is included in the monthly maintenance plan?',
    answer:
      'Monthly plans include AI performance monitoring, automation updates, analytics dashboards, content refreshes, and feature upgrades to keep your system current and effective.',
  },
  {
    question: 'How does the free strategy call work?',
    answer:
      'After you submit the contact form, we schedule a free 30-minute strategy call where we learn about your business and show you exactly what we\'d build for you — with no commitment required.',
  },
  {
    question: 'Can my AI website integrate with my existing tools?',
    answer:
      'Yes. We integrate with CRMs, booking platforms, email marketing tools, SMS providers, and more. If you use it in your business, we can likely connect it to your AI system.',
  },
  {
    question: 'What makes AO AI Solutions different from a regular web agency?',
    answer:
      'We are AI Systems Engineers, not web designers. We build infrastructure that generates leads, qualifies them, follows up automatically, and books appointments — all without you lifting a finger.',
  },
]

// ── FAQ ITEM COMPONENT ────────────────────────────────────────────────────────
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: isOpen
          ? '1px solid rgba(0,200,240,0.25)'
          : '1px solid rgba(0,200,240,0.10)',
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* ── QUESTION (button for accessibility) ── */}
      <button
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 focus-visible:outline-none"
        style={{ cursor: 'pointer' }}
      >
        <span
          className="font-syne font-bold text-ao-primary"
          style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
        >
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          color="#00C8F0"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        />
      </button>

      {/* ── ANSWER (collapsible) ── */}
      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p
          className="font-dm font-light text-ao-muted leading-relaxed px-6 pb-5"
          style={{ fontSize: '14px' }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

// ── MAIN FAQ SECTION ─────────────────────────────────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [headerRef, headerVisible] = useScrollReveal()
  const [listRef,   listVisible]   = useScrollReveal()

  const handleToggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <div className="max-w-3xl mx-auto">

        {/* ── SECTION HEADER ────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center mb-12">
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible),
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="font-dm font-light text-ao-muted"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            Everything you need to know before getting started.
          </p>
        </div>

        {/* ── FAQ ACCORDION LIST ────────────────────────────────────── */}
        <div
          ref={listRef}
          className="flex flex-col gap-3"
          style={revealStyle(listVisible)}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
        <div
          className="text-center mt-10"
          style={{
            opacity: listVisible ? 1 : 0,
            transition: 'opacity 0.5s ease 400ms',
          }}
        >
          <p className="font-dm font-light text-ao-muted text-sm">
            Still have questions?{' '}
            <a
              href="#contact"
              className="text-ao-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              aria-label="Contact AO AI Solutions with your question"
            >
              Send us a message
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
