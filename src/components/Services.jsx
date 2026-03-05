import { Globe, Zap, Cpu, Server, RefreshCw, Sparkles } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const services = [
  {
    icon: Globe,
    title: 'AI-Powered Websites',
    desc: 'Your website becomes a 24/7 AI employee — trained on your business, qualifying leads, answering questions, and booking appointments while you sleep.',
    tag: 'Core Product',
    tagStyle: 'accent',
  },
  {
    icon: Zap,
    title: 'Lead Automation Systems',
    desc: 'Stop losing revenue to slow follow-up. Our AI qualifies every lead instantly via chat, fires SMS and email sequences, syncs your CRM, and books appointments automatically.',
    tag: null,
  },
  {
    icon: Cpu,
    title: 'Agentic AI Integrations',
    desc: 'Multi-step AI agents that execute entire workflows autonomously — intake, qualification, scheduling, follow-up — without a single human touch.',
    tag: 'Agentic AI',
    tagStyle: 'accent',
  },
  {
    icon: Server,
    title: 'Cloud Infrastructure',
    desc: 'Secure, fast, always-on. We manage hosting, AI infrastructure, API pipelines, and uptime so your system never goes down and you never think about it.',
    tag: null,
  },
  {
    icon: RefreshCw,
    title: 'Ongoing AI Maintenance',
    desc: 'Your AI gets smarter every month. We retrain on new data, monitor performance, push feature upgrades, and send you monthly analytics reports.',
    tag: null,
  },
  {
    icon: Sparkles,
    title: 'AI Search Optimization',
    desc: 'Get found in ChatGPT, Perplexity, and Google AI Overviews — not just traditional search. We optimize your content and structure for the new era of AI-driven discovery.',
    tag: 'New in 2026',
    tagStyle: 'accent',
  },
]

function ServiceCard({ service, delay, isVisible }) {
  const Icon = service.icon

  return (
    <div
      className="group relative rounded-2xl p-6 transition-all duration-300 cursor-default"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid rgba(0,200,240,0.10)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        willChange: 'opacity, transform',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 0 40px rgba(0,200,240,0.10)'
        e.currentTarget.style.transform = `translateY(-4px)`
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
        <Icon size={18} color="#00C8F0" />
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
          color: 'var(--text-primary)',
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
            One platform. Six AI systems. Built to work while you sleep.
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
