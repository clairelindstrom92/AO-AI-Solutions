import { useState } from 'react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const industryValues = {
  'Law Firm': 3500,
  'Dental Practice': 1200,
  'Med Spa': 800,
  'HVAC / Contractor': 950,
  'Real Estate': 5000,
  'Other': 1500,
}

export default function ROICalculator() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [calcRef,   calcVisible]   = useScrollReveal()

  const [industry,    setIndustry]    = useState('Dental Practice')
  const [missedLeads, setMissedLeads] = useState(5)
  const [closeRate,   setCloseRate]   = useState(30)

  const avgValue   = industryValues[industry] || 1500
  const monthlyMissed = missedLeads * 4.3
  const monthlyLost   = Math.round(monthlyMissed * (closeRate / 100) * avgValue)
  const yearlyLost    = monthlyLost * 12
  const aiMonthly     = 797
  const roiMultiple   = monthlyLost > 0 ? (monthlyLost / aiMonthly).toFixed(1) : '—'

  return (
    <section
      id="roi-calculator"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible),
            }}
          >
            How Much Is Slow Follow-Up<br className="hidden sm:block" />
            <span className="text-ao-accent">Costing You?</span>
          </h2>
          <p
            className="font-dm font-light text-ao-muted max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            Adjust the sliders to see your real revenue leak — and how fast AI pays for itself.
          </p>
        </div>

        <div
          ref={calcRef}
          className="rounded-2xl p-8 lg:p-12"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid rgba(0,200,240,0.14)',
            ...revealStyle(calcVisible),
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Inputs */}
            <div className="flex flex-col gap-8">

              {/* Industry selector */}
              <div>
                <label className="font-dm text-sm text-ao-muted mb-2 block">Your industry</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(industryValues).map(ind => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className="font-dm text-sm px-3.5 py-1.5 rounded-full transition-all duration-200"
                      style={
                        industry === ind
                          ? {
                              backgroundColor: 'rgba(0,200,240,0.15)',
                              border: '1px solid rgba(0,200,240,0.45)',
                              color: '#00C8F0',
                            }
                          : {
                              backgroundColor: 'rgba(136,150,168,0.06)',
                              border: '1px solid rgba(136,150,168,0.15)',
                              color: 'var(--text-muted)',
                            }
                      }
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Missed leads slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-dm text-sm text-ao-muted">Leads you miss per week</label>
                  <span className="font-syne font-bold text-ao-accent">{missedLeads}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={missedLeads}
                  onChange={e => setMissedLeads(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00C8F0 0%, #00C8F0 ${((missedLeads - 1) / 29) * 100}%, rgba(136,150,168,0.20) ${((missedLeads - 1) / 29) * 100}%, rgba(136,150,168,0.20) 100%)`,
                    accentColor: '#00C8F0',
                  }}
                />
                <div className="flex justify-between mt-1 font-dm text-xs text-ao-muted">
                  <span>1</span><span>30/week</span>
                </div>
              </div>

              {/* Close rate slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-dm text-sm text-ao-muted">Your close rate</label>
                  <span className="font-syne font-bold text-ao-accent">{closeRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="70"
                  value={closeRate}
                  onChange={e => setCloseRate(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00C8F0 0%, #00C8F0 ${((closeRate - 5) / 65) * 100}%, rgba(136,150,168,0.20) ${((closeRate - 5) / 65) * 100}%, rgba(136,150,168,0.20) 100%)`,
                    accentColor: '#00C8F0',
                  }}
                />
                <div className="flex justify-between mt-1 font-dm text-xs text-ao-muted">
                  <span>5%</span><span>70%</span>
                </div>
              </div>

              <div
                className="rounded-xl p-4 font-dm text-sm text-ao-muted"
                style={{
                  backgroundColor: 'rgba(0,200,240,0.04)',
                  border: '1px solid rgba(0,200,240,0.10)',
                }}
              >
                Using avg {industry} deal value of{' '}
                <span style={{ color: '#00C8F0' }}>${avgValue.toLocaleString()}</span>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-5">
              <h3
                className="font-syne font-bold text-ao-primary"
                style={{ fontSize: '20px', letterSpacing: '-0.03em' }}
              >
                Your revenue leak
              </h3>

              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  backgroundColor: 'rgba(0,200,240,0.05)',
                  border: '1px solid rgba(0,200,240,0.20)',
                }}
              >
                <div className="font-dm text-sm text-ao-muted mb-1">Lost per month from missed leads</div>
                <div
                  className="font-syne font-bold"
                  style={{ fontSize: '48px', letterSpacing: '-0.04em', color: '#ff6b6b' }}
                >
                  ${monthlyLost.toLocaleString()}
                </div>
                <div className="font-dm text-xs text-ao-muted mt-1">
                  ${yearlyLost.toLocaleString()} / year
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid rgba(0,200,240,0.10)',
                  }}
                >
                  <div className="font-dm text-xs text-ao-muted mb-1">AI starts at</div>
                  <div
                    className="font-syne font-bold text-ao-accent"
                    style={{ fontSize: '24px', letterSpacing: '-0.03em' }}
                  >
                    $797/mo
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid rgba(0,200,240,0.10)',
                  }}
                >
                  <div className="font-dm text-xs text-ao-muted mb-1">Your ROI multiple</div>
                  <div
                    className="font-syne font-bold text-ao-accent"
                    style={{ fontSize: '24px', letterSpacing: '-0.03em' }}
                  >
                    {roiMultiple}x
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="block text-center font-dm font-medium text-ao-deep bg-ao-accent py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 0 0 rgba(0,200,240,0)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 36px rgba(0,200,240,0.50)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'}
              >
                Stop Losing ${monthlyLost.toLocaleString()}/mo →
              </a>

              <p className="font-dm text-center text-ao-muted" style={{ fontSize: '12px' }}>
                Or get a $149 AI Audit to see your exact numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
