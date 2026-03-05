import { useState } from 'react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'What if the AI says something wrong to a customer?',
    a: 'This is the #1 question we get. Our AI is trained only on information you approve — your services, pricing, hours, and FAQs. It does not make up information. For anything outside its training, it says "Let me have a team member follow up with you on that" and logs the inquiry. You always have override control.',
  },
  {
    q: 'How is this different from a basic chatbot?',
    a: 'A basic chatbot follows rigid scripts and breaks the moment someone asks something unexpected. Our systems use large language models (the same technology behind ChatGPT) that understand natural conversation, handle nuance, and respond in your brand voice. They also connect to your CRM, calendar, and SMS — basic chatbots don\'t do any of that.',
  },
  {
    q: 'Who owns the AI and the data?',
    a: 'You do. All training data, conversation logs, and lead records belong entirely to your business. We never use your client data to train models for other clients. Everything runs on secure, SOC 2-compliant infrastructure.',
  },
  {
    q: 'How long does setup take?',
    a: 'The AI Starter package is live within 5–7 business days. The AI Growth Engine with full CRM, SMS, and booking integrations typically takes 10–14 days. We do the build entirely — you just review and approve the final system before it goes live.',
  },
  {
    q: 'Can I make changes after launch?',
    a: 'Yes, any time. Your monthly maintenance plan includes unlimited content updates — new services, changed pricing, updated hours, new FAQs. For deeper workflow changes, we handle those as part of your ongoing plan with no extra charges.',
  },
  {
    q: 'What happens if I want to cancel?',
    a: 'No long-term contracts. Cancel your monthly plan with 30 days notice. Your website stays online — you just won\'t receive ongoing AI updates, retraining, or support. We believe in earning your business every month, not locking you in.',
  },
  {
    q: 'Do you work with businesses outside DC/NoVA?',
    a: 'Yes. We work with service businesses across the US. The DC/Maryland/Virginia metro is our home market, but the AI systems we build work for any location. We\'ve built systems for practices and firms from coast to coast.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [headerRef, headerVisible] = useScrollReveal()
  const [listRef,   listVisible]   = useScrollReveal()

  return (
    <section
      id="faq"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 50px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible),
            }}
          >
            Questions We Always Get
          </h2>
          <p
            className="font-dm font-light text-ao-muted"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            Real answers. No fluff.
          </p>
        </div>

        {/* Accordion */}
        <div
          ref={listRef}
          className="flex flex-col gap-3"
          style={revealStyle(listVisible)}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: open === i
                  ? '1px solid rgba(0,200,240,0.28)'
                  : '1px solid rgba(0,200,240,0.10)',
              }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-dm font-medium text-ao-primary"
                  style={{ fontSize: '15px' }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                  style={{
                    backgroundColor: 'rgba(0,200,240,0.10)',
                    border: '1px solid rgba(0,200,240,0.20)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 2V8M2 5H8" stroke="#00C8F0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '300px' : '0' }}
              >
                <p
                  className="font-dm font-light text-ao-muted px-6 pb-5 leading-relaxed"
                  style={{ fontSize: '14px' }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-10"
          style={revealStyle(listVisible, 200)}
        >
          <p className="font-dm text-ao-muted mb-4" style={{ fontSize: '15px' }}>
            Still have questions? We answer everything on a free 15-minute call.
          </p>
          <a
            href="#contact"
            className="inline-block font-dm font-medium text-ao-primary px-7 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ border: '1px solid rgba(0,200,240,0.30)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,200,240,0.65)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,200,240,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,200,240,0.30)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Book a Free Call →
          </a>
        </div>
      </div>
    </section>
  )
}
