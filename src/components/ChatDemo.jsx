import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

// Full chat sequence — CSS keyframes only for individual message animations
const SEQUENCE = [
  { type: 'typing',  delay: 0 },
  { type: 'msg',     delay: 700,  sender: 'ai',   text: "Hi! I'm the AI assistant for Riverside Dental. How can I help you today?" },
  { type: 'msg',     delay: 2200, sender: 'user',  text: "Do you accept new patients?" },
  { type: 'typing',  delay: 2700 },
  { type: 'msg',     delay: 3400, sender: 'ai',    text: "Yes! We're accepting new patients. Would you like to schedule a free consultation?" },
  { type: 'msg',     delay: 5000, sender: 'user',  text: "Yes please" },
  { type: 'typing',  delay: 5500 },
  { type: 'msg',     delay: 6100, sender: 'ai',    text: "Great! I have openings Tuesday at 2pm or Thursday at 10am. Which works better?" },
  { type: 'typing',  delay: 7000 },
  { type: 'msg',     delay: 7600, sender: 'ai',    text: "Perfect — I've sent a confirmation to your email. See you Tuesday! 🎉" },
]

const LOOP_AT = 17500 // 7.6s sequence + ~10s pause

const bullets = [
  'Answers questions instantly — 24/7',
  'Qualifies and captures every lead',
  'Books appointments automatically',
  'Follows up with SMS and email',
  'Escalates urgent cases to your team',
]

export default function ChatDemo() {
  const [messages,     setMessages]     = useState([])
  const [showTyping,   setShowTyping]   = useState(false)
  const chatEndRef                       = useRef(null)
  const [headerRef, headerVisible]      = useScrollReveal()
  const [contentRef, contentVisible]    = useScrollReveal()

  useEffect(() => {
    let timers = []

    const runSequence = () => {
      setMessages([])
      setShowTyping(false)

      SEQUENCE.forEach(step => {
        const t = setTimeout(() => {
          if (step.type === 'typing') {
            setShowTyping(true)
          } else {
            setShowTyping(false)
            setMessages(prev => [...prev, { id: Date.now() + Math.random(), sender: step.sender, text: step.text }])
          }
        }, step.delay)
        timers.push(t)
      })

      // Loop
      const loop = setTimeout(() => {
        setMessages([])
        setShowTyping(false)
        setTimeout(runSequence, 600)
      }, LOOP_AT)
      timers.push(loop)
    }

    runSequence()
    return () => timers.forEach(clearTimeout)
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, showTyping])

  return (
    <section
      id="chat-demo"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <h2
            className="font-syne font-bold text-ao-primary mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 50px)',
              letterSpacing: '-0.04em',
              ...revealStyle(headerVisible),
            }}
          >
            Watch the AI Work
          </h2>
          <p
            className="font-dm font-light text-ao-muted"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            This is what your website does while you're busy running your business.
          </p>
        </div>

        {/* Split layout */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left — what the AI handles */}
          <div style={revealStyle(contentVisible)}>
            <h3
              className="font-syne font-bold text-ao-primary mb-3"
              style={{ fontSize: '26px', letterSpacing: '-0.03em' }}
            >
              Your AI works around the clock
            </h3>
            <p className="font-dm font-light text-ao-muted mb-8 leading-relaxed" style={{ fontSize: '15px' }}>
              Every visitor gets an instant, intelligent response. No hold music. No missed leads. No after-hours gaps.
            </p>
            <ul className="flex flex-col gap-4">
              {bullets.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: 'rgba(0,200,240,0.12)', border: '1px solid rgba(0,200,240,0.25)' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#00C8F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-dm font-light text-ao-muted" style={{ fontSize: '15px' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — mock chat UI */}
          <div style={revealStyle(contentVisible, 150)}>
            {/* Fake browser chrome */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,200,240,0.12)', boxShadow: '0 0 60px rgba(0,200,240,0.06)' }}>

              {/* Browser top bar */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ backgroundColor: '#0A1120', borderBottom: '1px solid rgba(0,200,240,0.08)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
                </div>
                <div
                  className="flex-1 rounded-md px-3 py-1 font-dm text-xs text-ao-muted text-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  yourbusiness.com
                </div>
              </div>

              {/* Browser page content area */}
              <div
                className="relative"
                style={{ backgroundColor: '#081018', minHeight: '380px' }}
              >
                {/* Fake page background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="h-12 mx-6 mt-6 rounded" style={{ backgroundColor: 'rgba(0,200,240,0.15)' }} />
                  <div className="h-3 mx-6 mt-4 rounded w-3/4" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                  <div className="h-3 mx-6 mt-2 rounded w-1/2" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />
                  <div className="h-3 mx-6 mt-2 rounded w-2/3" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />
                </div>

                {/* Chat widget — bottom right */}
                <div className="absolute bottom-4 right-4 flex flex-col items-end" style={{ width: '260px' }}>

                  {/* Chat bubble */}
                  <div
                    className="w-full rounded-2xl overflow-hidden mb-3"
                    style={{
                      backgroundColor: '#0C1829',
                      border: '1px solid rgba(0,200,240,0.18)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Chat header */}
                    <div
                      className="flex items-center justify-between px-3.5 py-2.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,200,240,0.18) 0%, rgba(0,200,240,0.08) 100%)',
                        borderBottom: '1px solid rgba(0,200,240,0.12)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(0,200,240,0.25)' }}
                        >
                          <MessageCircle size={12} color="#00C8F0" />
                        </div>
                        <span className="font-dm text-xs font-medium text-ao-primary">AI Assistant</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 4px rgba(74,222,128,0.8)' }} />
                      </div>
                      <X size={12} color="rgba(136,150,168,0.5)" />
                    </div>

                    {/* Messages area */}
                    <div
                      className="px-3 py-3 flex flex-col gap-2 overflow-y-auto"
                      style={{ maxHeight: '220px', minHeight: '220px' }}
                    >
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`message-enter flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className="font-dm text-xs leading-relaxed px-3 py-2 rounded-xl max-w-[90%]"
                            style={
                              msg.sender === 'ai'
                                ? {
                                    backgroundColor: 'rgba(0,200,240,0.10)',
                                    border: '1px solid rgba(0,200,240,0.15)',
                                    color: 'var(--text-primary)',
                                    borderBottomLeftRadius: '4px',
                                  }
                                : {
                                    backgroundColor: 'rgba(0,200,240,0.85)',
                                    color: '#060A12',
                                    borderBottomRightRadius: '4px',
                                  }
                            }
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {/* Typing indicator */}
                      {showTyping && (
                        <div className="message-enter flex justify-start">
                          <div
                            className="flex items-center gap-1 px-3 py-2.5 rounded-xl"
                            style={{
                              backgroundColor: 'rgba(0,200,240,0.08)',
                              border: '1px solid rgba(0,200,240,0.12)',
                              borderBottomLeftRadius: '4px',
                            }}
                          >
                            {[0, 1, 2].map(j => (
                              <span
                                key={j}
                                className="typing-dot w-1.5 h-1.5 rounded-full bg-ao-accent"
                                style={{ animationDelay: `${j * 200}ms` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Input bar */}
                    <div
                      className="flex items-center gap-2 px-3 py-2.5"
                      style={{ borderTop: '1px solid rgba(0,200,240,0.08)' }}
                    >
                      <div
                        className="flex-1 rounded-lg px-2.5 py-1.5 font-dm text-xs text-ao-muted"
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        Type a message...
                      </div>
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(0,200,240,0.20)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 5H9M9 5L6 2M9 5L6 8" stroke="#00C8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Chat launcher button */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #00C8F0, #0090B0)',
                      boxShadow: '0 4px 20px rgba(0,200,240,0.45)',
                    }}
                  >
                    <MessageCircle size={18} color="#060A12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
