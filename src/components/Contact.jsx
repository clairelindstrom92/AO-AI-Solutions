import { useForm } from 'react-hook-form'
import { Clock, Phone, Shield } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'
import AOLogo from './AOLogo'

const valueProps = [
  {
    icon: Clock,
    title: 'Response within 24 hours',
    desc:  'We review every submission personally and follow up fast.',
  },
  {
    icon: Phone,
    title: 'Free strategy call included',
    desc:  "A 30-minute call where we map out exactly what we'd build for you.",
  },
  {
    icon: Shield,
    title: 'No commitment required',
    desc:  'Explore your options with zero pressure. We earn your business.',
  },
]

export default function Contact() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [contentRef, contentVisible] = useScrollReveal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    // Simulate API call — replace with real endpoint in production
    await new Promise(resolve => setTimeout(resolve, 1200))
    console.log('Form submission:', data)
  }

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-deep)' }}
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
            Ready to Build Your<br className="hidden sm:block" /> AI Business System?
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-xl mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            Tell us about your business. We'll show you exactly what we'd build.
          </p>
        </div>

        {/* Split layout */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >

          {/* Left — Form */}
          <div style={revealStyle(contentVisible)}>
            {isSubmitSuccessful ? (
              <div
                className="flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid rgba(0,200,240,0.20)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: 'rgba(0,200,240,0.12)',
                    border: '1px solid rgba(0,200,240,0.30)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 11L8 16L19 5" stroke="#00C8F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  className="font-syne font-bold text-ao-primary mb-2"
                  style={{ fontSize: '22px', letterSpacing: '-0.03em' }}
                >
                  Message Received
                </h3>
                <p className="font-dm font-light text-ao-muted mb-6" style={{ fontSize: '15px' }}>
                  We'll be in touch within 24 hours to schedule your free strategy call.
                </p>
                <button
                  onClick={() => reset()}
                  className="font-dm text-sm text-ao-accent underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid rgba(0,200,240,0.10)',
                }}
              >
                {/* Row: Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm text-xs text-ao-muted mb-1.5 block">Full Name *</label>
                    <input
                      {...register('fullName', { required: 'Required' })}
                      placeholder="Jane Smith"
                      className="w-full font-dm text-sm text-ao-primary rounded-lg px-4 py-3 outline-none transition-all duration-200 placeholder:text-ao-muted/40"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: errors.fullName ? '1px solid rgba(255,80,80,0.5)' : '1px solid rgba(0,200,240,0.12)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
                      onBlur={e  => e.target.style.borderColor = errors.fullName ? 'rgba(255,80,80,0.5)' : 'rgba(0,200,240,0.12)'}
                    />
                    {errors.fullName && (
                      <span className="font-dm text-xs text-red-400 mt-1 block">{errors.fullName.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="font-dm text-xs text-ao-muted mb-1.5 block">Company Name *</label>
                    <input
                      {...register('company', { required: 'Required' })}
                      placeholder="Riverside Dental"
                      className="w-full font-dm text-sm text-ao-primary rounded-lg px-4 py-3 outline-none transition-all duration-200 placeholder:text-ao-muted/40"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: errors.company ? '1px solid rgba(255,80,80,0.5)' : '1px solid rgba(0,200,240,0.12)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
                      onBlur={e  => e.target.style.borderColor = errors.company ? 'rgba(255,80,80,0.5)' : 'rgba(0,200,240,0.12)'}
                    />
                    {errors.company && (
                      <span className="font-dm text-xs text-red-400 mt-1 block">{errors.company.message}</span>
                    )}
                  </div>
                </div>

                {/* Row: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm text-xs text-ao-muted mb-1.5 block">Email *</label>
                    <input
                      {...register('email', {
                        required: 'Required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                      })}
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full font-dm text-sm text-ao-primary rounded-lg px-4 py-3 outline-none transition-all duration-200 placeholder:text-ao-muted/40"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: errors.email ? '1px solid rgba(255,80,80,0.5)' : '1px solid rgba(0,200,240,0.12)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
                      onBlur={e  => e.target.style.borderColor = errors.email ? 'rgba(255,80,80,0.5)' : 'rgba(0,200,240,0.12)'}
                    />
                    {errors.email && (
                      <span className="font-dm text-xs text-red-400 mt-1 block">{errors.email.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="font-dm text-xs text-ao-muted mb-1.5 block">Phone <span className="opacity-50">(optional)</span></label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="w-full font-dm text-sm text-ao-primary rounded-lg px-4 py-3 outline-none transition-all duration-200 placeholder:text-ao-muted/40"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(0,200,240,0.12)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(0,200,240,0.12)'}
                    />
                  </div>
                </div>

                {/* Service Interest */}
                <div>
                  <label className="font-dm text-xs text-ao-muted mb-1.5 block">Service Interest *</label>
                  <select
                    {...register('service', { required: 'Please select an option' })}
                    className="w-full font-dm text-sm text-ao-primary rounded-lg px-4 py-3 outline-none transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: '#0C1220',
                      border: errors.service ? '1px solid rgba(255,80,80,0.5)' : '1px solid rgba(0,200,240,0.12)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
                    onBlur={e  => e.target.style.borderColor = errors.service ? 'rgba(255,80,80,0.5)' : 'rgba(0,200,240,0.12)'}
                  >
                    <option value="" style={{ backgroundColor: '#0C1220' }}>Select a service...</option>
                    <option value="ai-website"        style={{ backgroundColor: '#0C1220' }}>AI Website</option>
                    <option value="lead-automation"   style={{ backgroundColor: '#0C1220' }}>Lead Automation</option>
                    <option value="custom-ai"         style={{ backgroundColor: '#0C1220' }}>Custom AI</option>
                    <option value="not-sure"          style={{ backgroundColor: '#0C1220' }}>Not sure yet</option>
                  </select>
                  {errors.service && (
                    <span className="font-dm text-xs text-red-400 mt-1 block">{errors.service.message}</span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="font-dm text-xs text-ao-muted mb-1.5 block">Tell us about your business</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="What does your business do? What problems are you trying to solve with AI?"
                    className="w-full font-dm text-sm text-ao-primary rounded-lg px-4 py-3 outline-none transition-all duration-200 resize-none placeholder:text-ao-muted/40"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(0,200,240,0.12)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
                    onBlur={e  => e.target.style.borderColor = 'rgba(0,200,240,0.12)'}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-dm font-medium text-ao-deep bg-ao-accent py-3.5 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 0 0 rgba(0,200,240,0)' }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.boxShadow = '0 0 30px rgba(0,200,240,0.40)' }}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'}
                >
                  {isSubmitting ? 'Sending...' : 'Start My AI Website →'}
                </button>
              </form>
            )}
          </div>

          {/* Right — value props + logo */}
          <div
            className="flex flex-col gap-6 lg:pt-4"
            style={revealStyle(contentVisible, 180)}
          >
            {valueProps.map((vp, i) => {
              const Icon = vp.icon
              return (
                <div
                  key={vp.title}
                  className="flex gap-4 items-start"
                  style={{
                    opacity: contentVisible ? 1 : 0,
                    transform: contentVisible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `opacity 0.6s ease ${200 + i * 100}ms, transform 0.6s ease ${200 + i * 100}ms`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: 'rgba(0,200,240,0.10)',
                      border: '1px solid rgba(0,200,240,0.18)',
                    }}
                  >
                    <Icon size={16} color="#00C8F0" />
                  </div>
                  <div>
                    <div
                      className="font-syne font-bold text-ao-primary mb-1"
                      style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
                    >
                      {vp.title}
                    </div>
                    <div className="font-dm font-light text-ao-muted leading-relaxed" style={{ fontSize: '14px' }}>
                      {vp.desc}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Muted logo watermark */}
            <div
              className="flex justify-center mt-8 opacity-10"
              style={{
                opacity: contentVisible ? 0.12 : 0,
                transition: 'opacity 0.8s ease 600ms',
              }}
            >
              <AOLogo className="h-20 w-auto" color="#00C8F0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
