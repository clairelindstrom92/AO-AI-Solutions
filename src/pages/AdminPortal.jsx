// ============================================================
// FILE: AdminPortal.jsx
// PURPOSE: Admin dashboard — leads table, status management, client list
// SECTION: Pages — rendered at route "/admin" (auth-protected, admin only)
// DATA: Reads from Supabase leads table; update columns as schema evolves
// MANUAL EDITS: Safe to add columns, filters, or status options
// CLAUDE AUTOMATION: Can add CSV export, email triggers, analytics
// ============================================================

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Users, Inbox, LogOut, LayoutDashboard, RefreshCw } from 'lucide-react'

const STATUS_COLORS = {
  new:         { bg: 'rgba(0,200,240,0.12)',  border: 'rgba(0,200,240,0.30)',  text: '#00C8F0' },
  contacted:   { bg: 'rgba(250,204,21,0.10)', border: 'rgba(250,204,21,0.30)', text: '#FDE047' },
  qualified:   { bg: 'rgba(74,222,128,0.10)', border: 'rgba(74,222,128,0.30)', text: '#4ADE80' },
  closed:      { bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.30)', text: '#A78BFA' },
  lost:        { bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.30)',  text: '#F87171' },
}

export default function AdminPortal() {
  const [leads,    setLeads]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [updating, setUpdating] = useState(null)
  const navigate = useNavigate()

  const fetchLeads = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error('[Admin] Supabase error:', error.message)
    setLeads(data || [])
    setLoading(false)
  }

  useEffect(() => {
    // Verify admin role
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { navigate('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { navigate('/portal'); return }
      fetchLeads()
    })
  }, [navigate])

  const updateStatus = async (id, status) => {
    setUpdating(id)
    await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    setUpdating(null)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-deep)' }}>

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid rgba(0,200,240,0.10)',
          minHeight: '100vh',
        }}
      >
        <div
          className="flex items-center gap-2.5 px-6 py-5"
          style={{ borderBottom: '1px solid rgba(0,200,240,0.08)' }}
        >
          <img src="/logo-transparent.png" alt="AO AI Solutions" className="h-7 w-auto" style={{ filter: 'brightness(1.1)' }} />
          <span className="font-syne font-bold text-sm text-ao-primary" style={{ letterSpacing: '-0.02em' }}>Admin</span>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {[
            { label: 'Overview',  icon: LayoutDashboard, href: '#' },
            { label: 'Leads',     icon: Inbox,           href: '#' },
            { label: 'Clients',   icon: Users,            href: '#' },
          ].map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-dm text-sm text-ao-primary transition-colors duration-200"
                style={{ backgroundColor: 'rgba(0,200,240,0.06)' }}
              >
                <Icon size={16} />
                {item.label}
              </a>
            )
          })}
        </nav>

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

      {/* ── MAIN ────────────────────────────────────────────── */}
      <main className="flex-1 px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="font-syne font-bold text-ao-primary mb-1"
              style={{ fontSize: '26px', letterSpacing: '-0.03em' }}
            >
              Leads
            </h1>
            <p className="font-dm text-sm text-ao-muted">
              {leads.length} total submissions
            </p>
          </div>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 font-dm text-sm text-ao-muted hover:text-ao-primary transition-colors duration-200 px-4 py-2 rounded-lg"
            style={{ border: '1px solid rgba(0,200,240,0.14)' }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Leads table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(0,200,240,0.10)' }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="font-dm text-sm text-ao-muted">Loading leads…</span>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="font-syne font-bold text-ao-primary mb-2" style={{ fontSize: '18px' }}>No leads yet</div>
              <p className="font-dm text-sm text-ao-muted mb-4 max-w-xs">
                Leads from your contact form will appear here once the Supabase <code className="text-ao-accent text-xs">leads</code> table is set up.
              </p>
              <Link to="/" className="font-dm text-sm text-ao-accent underline underline-offset-4">
                Go to site
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid rgba(0,200,240,0.08)' }}>
                    {['Name', 'Company', 'Email', 'Service', 'Date', 'Status'].map(col => (
                      <th
                        key={col}
                        className="font-dm text-xs text-ao-muted px-4 py-3 text-left"
                        style={{ letterSpacing: '0.04em' }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => {
                    const sc = STATUS_COLORS[lead.status] || STATUS_COLORS.new
                    return (
                      <tr
                        key={lead.id}
                        style={{
                          backgroundColor: i % 2 === 0 ? 'var(--bg-deep)' : 'var(--bg-surface)',
                          borderBottom: '1px solid rgba(0,200,240,0.05)',
                        }}
                      >
                        <td className="font-dm text-sm text-ao-primary px-4 py-3">{lead.full_name}</td>
                        <td className="font-dm text-sm text-ao-muted px-4 py-3">{lead.company}</td>
                        <td className="font-dm text-sm text-ao-muted px-4 py-3">{lead.email}</td>
                        <td className="font-dm text-sm text-ao-muted px-4 py-3">{lead.service}</td>
                        <td className="font-dm text-xs text-ao-muted px-4 py-3">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status || 'new'}
                            onChange={e => updateStatus(lead.id, e.target.value)}
                            disabled={updating === lead.id}
                            className="font-dm text-xs px-2.5 py-1 rounded-full cursor-pointer outline-none"
                            style={{
                              backgroundColor: sc.bg,
                              border: `1px solid ${sc.border}`,
                              color: sc.text,
                            }}
                          >
                            {Object.keys(STATUS_COLORS).map(s => (
                              <option key={s} value={s} style={{ backgroundColor: '#101828', color: '#F0F4FF' }}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
