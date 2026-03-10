// ============================================================
// FILE: ClientPortal.jsx
// PURPOSE: Client dashboard — project status, activity, key links
// SECTION: Pages — rendered at route "/portal" (auth-protected)
// DATA: Update sidebar nav items and dashboard cards as features grow
// MANUAL EDITS: Safe to add/remove sidebar items or stat cards
// CLAUDE AUTOMATION: Wire real Supabase queries to replace mock data
// ============================================================

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { LayoutDashboard, MessageSquare, FileText, LogOut, Zap } from 'lucide-react'

// ── SIDEBAR NAV ───────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Dashboard',     icon: LayoutDashboard, href: '#' },
  { label: 'AI Chat Logs',  icon: MessageSquare,   href: '#' },
  { label: 'Reports',       icon: FileText,         href: '#' },
  { label: 'Automations',   icon: Zap,              href: '#' },
]

export default function ClientPortal() {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate('/login'); return }
      setUser(user)
      supabase.from('profiles').select('*').eq('id', user.id).single()
        .then(({ data }) => setProfile(data))
    })
  }, [navigate])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid rgba(0,200,240,0.10)',
          minHeight: '100vh',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-6 py-5"
          style={{ borderBottom: '1px solid rgba(0,200,240,0.08)' }}
        >
          <img src="/logo-transparent.png" alt="AO AI Solutions" className="h-7 w-auto" style={{ filter: 'brightness(1.1)' }} />
          <span className="font-syne font-bold text-sm text-ao-primary" style={{ letterSpacing: '-0.02em' }}>AO AI</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-dm text-sm text-ao-muted hover:text-ao-primary transition-colors duration-200"
                style={{ cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,200,240,0.05)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Icon size={16} />
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-5" style={{ borderTop: '1px solid rgba(0,200,240,0.08)', paddingTop: '16px' }}>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-dm text-sm text-ao-muted hover:text-red-400 transition-colors duration-200 w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <main className="flex-1 px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="font-syne font-bold text-ao-primary mb-1"
            style={{ fontSize: '26px', letterSpacing: '-0.03em' }}
          >
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="font-dm text-sm text-ao-muted">
            Here's an overview of your AI system activity.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Leads This Month',   value: '—', sub: 'Connect Supabase to activate' },
            { label: 'AI Conversations',   value: '—', sub: 'Connect Supabase to activate' },
            { label: 'Appointments Booked',value: '—', sub: 'Connect Supabase to activate' },
            { label: 'Avg Response Time',  value: '< 3s', sub: '24/7 active' },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid rgba(0,200,240,0.10)',
              }}
            >
              <div className="font-dm text-xs text-ao-muted mb-2">{card.label}</div>
              <div
                className="font-syne font-bold text-ao-primary mb-1"
                style={{ fontSize: '28px', letterSpacing: '-0.03em' }}
              >
                {card.value}
              </div>
              <div className="font-dm text-xs text-ao-muted" style={{ opacity: 0.6 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Activity placeholder */}
        <div
          className="rounded-xl p-7 text-center"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid rgba(0,200,240,0.10)',
          }}
        >
          <div className="font-syne font-bold text-ao-primary mb-2" style={{ fontSize: '18px', letterSpacing: '-0.02em' }}>
            Recent Activity
          </div>
          <p className="font-dm text-sm text-ao-muted mb-4">
            Activity feed will populate once your Supabase project is connected and the <code className="text-ao-accent text-xs px-1 py-0.5 rounded" style={{ backgroundColor: 'rgba(0,200,240,0.08)' }}>leads</code> table is created.
          </p>
          <Link
            to="/"
            className="font-dm text-sm text-ao-accent underline underline-offset-4"
          >
            Back to main site
          </Link>
        </div>
      </main>
    </div>
  )
}
