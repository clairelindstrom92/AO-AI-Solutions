import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are the AI assistant for AO AI Solutions, an AI agency based in the Washington DC/Northern Virginia area. You help local service businesses (dental practices, law firms, med spas, HVAC, contractors, real estate) understand how AI can transform their operations.

Your job: answer questions about our services, pricing, and how AI can help the visitor's specific business. Be conversational, confident, and helpful. Keep responses concise (2-4 sentences max unless they need detail).

Key facts:
- We build AI-powered websites and automation systems
- We offer a $149 AI Revenue Audit (we analyze their site and find revenue they're missing)
- Pricing: AI Starter from $4,500 setup + from $797/mo, AI Growth Engine from $8,000 + from $1,497/mo, Full Agentic AI from $15,000 + from $2,500/mo
- We are based in DC/NoVA and serve businesses nationwide
- All AI is trained on the client's specific business — not generic
- No long-term contracts
- 30-day results guarantee
- We use OpenAI, Anthropic, Twilio, HubSpot, and Make

If asked about getting started, suggest the $149 AI Revenue Audit as a low-risk first step, or a free 15-min strategy call. Always end with a soft CTA to take action.`

export default function AIChatWidget() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m the AO AI assistant. Ask me anything about how AI can grow your business — or how we can help you specifically. 👋',
    },
  ])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-6),
            userMsg,
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      })

      if (!response.ok) throw new Error('API error')
      const data = await response.json()
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I ran into an issue. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I\'m having trouble connecting right now. Reach out directly at contact us and we\'ll get back to you within 24 hours!',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: '340px',
            height: '480px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid rgba(0,200,240,0.25)',
            boxShadow: '0 0 60px rgba(0,200,240,0.12)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderBottom: '1px solid rgba(0,200,240,0.12)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(0,200,240,0.25) 0%, rgba(0,200,240,0.08) 100%)',
                  border: '1px solid rgba(0,200,240,0.30)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#00C8F0" />
                </svg>
              </div>
              <div>
                <div className="font-syne font-bold text-ao-primary" style={{ fontSize: '13px' }}>
                  AO AI Assistant
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    style={{ boxShadow: '0 0 4px rgba(74,222,128,0.8)' }}
                  />
                  <span className="font-dm text-ao-muted" style={{ fontSize: '11px' }}>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-ao-muted hover:text-ao-primary transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="font-dm font-light leading-relaxed max-w-[85%] px-3.5 py-2.5 rounded-2xl"
                  style={{
                    fontSize: '13px',
                    ...(msg.role === 'user'
                      ? {
                          backgroundColor: 'rgba(0,200,240,0.15)',
                          border: '1px solid rgba(0,200,240,0.25)',
                          color: 'var(--text-primary)',
                          borderBottomRightRadius: '4px',
                        }
                      : {
                          backgroundColor: 'var(--bg-elevated)',
                          border: '1px solid rgba(0,200,240,0.08)',
                          color: 'var(--text-muted)',
                          borderBottomLeftRadius: '4px',
                        }),
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid rgba(0,200,240,0.08)',
                    borderBottomLeftRadius: '4px',
                  }}
                >
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-ao-accent"
                        style={{
                          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(0,200,240,0.10)' }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about your business…"
              className="flex-1 bg-transparent font-dm text-ao-primary placeholder-ao-muted outline-none"
              style={{ fontSize: '13px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                backgroundColor: input.trim() && !loading ? '#00C8F0' : 'rgba(0,200,240,0.15)',
                border: '1px solid rgba(0,200,240,0.30)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6H11M11 6L6.5 2M11 6L6.5 10" stroke={input.trim() && !loading ? '#060A12' : '#00C8F0'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
        style={{
          backgroundColor: '#00C8F0',
          boxShadow: open
            ? '0 0 0 0 rgba(0,200,240,0)'
            : '0 0 30px rgba(0,200,240,0.45)',
        }}
        aria-label="Chat with AI assistant"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3L15 15M15 3L3 15" stroke="#060A12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#060A12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="#060A12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  )
}
