import { Globe, Zap, Cpu, Server, RefreshCw, Sparkles } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const services = [
  {
    icon: Globe,
    title: 'AI-Powered Websites',
    desc: 'Your website becomes an AI employee — with a trained chatbot, smart lead forms, automated scheduling, and 24/7 customer support.',
    tag: 'Core Product',
    tagStyle: 'accent',
  },
  {
    icon: Zap,
    title: 'Lead Automation Systems',
    desc: 'Never lose a lead again. AI chat intake, SMS follow-ups, email sequences, CRM sync, and booking bots that convert visitors while you sleep.',
    tag: null,
  },
  {
    icon: Cpu,
    title: 'Custom AI Integrations',
    desc: 'Internal AI assistants, document automation, knowledge base AI, and workflow tools tailored to how your business actually operates.',
    tag: 'Advanced',
    tagStyle: 'accent',
  },
  {
    icon: Server,
    title: 'Cloud Infrastructure',
    desc: 'Secure, fast, always-on. We manage hosting, AI infrastructure, API pipelines, and uptime so you never have to think about it.',
    tag: null,
  },
  {
    icon: RefreshCw,
    title: 'Ongoing AI Maintenance',
    desc: 'Monthly plans that keep your AI sharp. Includes updates, automation monitoring, analytics dashboards, and feature upgrades.',
    tag: null,
  },
  {
    icon: Sparkles,
    title: 'Smart Sites',
    desc: 'Websites that update themselves, generate content, adapt to each visitor, and optimize conversions automatically using AI.',
    tag: 'Coming Soon',
    tagStyle: 'muted',
    comingSoon: true,
  },
]

function ServiceCard({ service, delay, isVisible }) {
  const Icon = service.icon

  return (
    <div
      className="group relative rounded-2xl p-6 transition-all duration-300 cursor-default"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: service.comingSoon
          ? '1px dashed rgba(0,200,240,0.12)'
          : '1px solid rgba(0,200,240,0.10)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
      onMouseEnter={e => {
        if (!service.comingSoon) {
          e.currentTarget.style.boxShadow = '0 0 40px rgba(0,200,240,0.10)'
          e.currentTarget.style.transform = `translateY(-4px)`
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{
          backgroundColor: 'rgba(0,200,240,0.10)',
          border: '1px solid rgba(0,200,240,0.15)',
        }}
      >
        <Icon
          size={18}
          color={service.comingSoon ? 'rgba(0,200,240,0.45)' : '#00C8F0'}
        />
      </div>

      {/* Tag */}
      {service.tag && (
        <span
          className="inline-block font-dm text-xs mb-3 px-2.5 py-0.5 rounded-full"
          style={
            service.tagStyle === 'accent'
              ? {
                  color: '#00C8F0',
                  backgroundColor: 'rgba(0,200,240,0.10)',
                  border: '1px solid rgba(0,200,240,0.20)',
                }
              : {
                  color: 'var(--text-muted)',
                  backgroundColor: 'rgba(136,150,168,0.08)',
                  border: '1px solid rgba(136,150,168,0.18)',
                }
          }
        >
          {service.tag}
        </span>
      )}

      <h3
        className="font-syne font-bold text-ao-primary mb-2.5"
        style={{
          fontSize: '17px',
          letterSpacing: '-0.02em',
          color: service.comingSoon ? 'var(--text-muted)' : 'var(--text-primary)',
        }}
      >
        {service.title}
      </h3>
      <p
        className="font-dm font-light leading-relaxed"
        style={{ fontSize: '14px', color: 'var(--text-muted)' }}
      >
        {service.desc}
      </p>
    </div>
  )
}

export default function Services() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef,   gridVisible]   = useScrollReveal()

  return (
    <section id="services" className="section-pad" style={{ backgroundColor: 'var(--bg-deep)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible),
            }}
          >
            Everything Your Business Needs<br className="hidden sm:block" /> to Run on AI
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 120) }}
          >
            One system. Five layers. Built to work while you sleep.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              delay={i * 80}
              isVisible={gridVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
