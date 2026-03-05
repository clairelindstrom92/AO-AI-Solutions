import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const industries = [
  'Law Firms',
  'Dental Practices',
  'Med Spas',
  'Real Estate',
  'Roofing',
  'HVAC',
  'Contractors',
]

export default function SocialProof() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section
      ref={ref}
      className="py-6 px-6"
      style={{
        borderTop:    '1px solid rgba(0,200,240,0.08)',
        borderBottom: '1px solid rgba(0,200,240,0.08)',
        ...revealStyle(isVisible),
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-center sm:justify-start">
        <span className="font-dm text-sm text-ao-muted whitespace-nowrap mr-2">
          Helping businesses in:
        </span>
        {industries.map((industry, i) => (
          <span
            key={industry}
            className="font-dm text-sm text-ao-muted px-3.5 py-1.5 rounded-full whitespace-nowrap"
            style={{
              border: '1px solid rgba(0,200,240,0.12)',
              backgroundColor: 'rgba(0,200,240,0.04)',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.5s ease ${100 + i * 50}ms`,
              willChange: 'opacity',
            }}
          >
            {industry}
          </span>
        ))}
      </div>
    </section>
  )
}
