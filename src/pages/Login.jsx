// ============================================================
// FILE: Login.jsx
// PURPOSE: Client / admin login page — Supabase email+password auth
// SECTION: Pages — rendered at route "/login"
// DATA: Auth is handled by Supabase; no credentials stored here
// MANUAL EDITS: Safe to update logo, tagline, redirect paths
// CLAUDE AUTOMATION: Can add SSO / magic-link / Google OAuth buttons
// ============================================================

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Check role to route admin vs client
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/portal')
    }
    setLoading(false)
  }

  const inputStyle = {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(0,200,240,0.14)',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid rgba(0,200,240,0.12)',
          boxShadow: '0 0 60px rgba(0,200,240,0.05)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo-transparent.png"
            alt="AO AI Solutions"
            className="h-12 w-auto mb-3"
            style={{ filter: 'brightness(1.1)' }}
          />
          <span
            className="font-syne font-bold text-ao-primary"
            style={{ fontSize: '18px', letterSpacing: '-0.03em' }}
          >
            AO AI Solutions
          </span>
          <span className="font-dm text-sm text-ao-muted mt-1">Client Portal</span>
        </div>

        {/* Error */}
        {error && (
          <div
            className="font-dm text-xs text-red-400 mb-5 px-4 py-3 rounded-lg"
            style={{ backgroundColor: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.20)' }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="font-dm text-xs text-ao-muted mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              style={inputStyle}
              className="placeholder:text-ao-muted/40"
              onFocus={e  => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
              onBlur={e   => e.target.style.borderColor = 'rgba(0,200,240,0.14)'}
            />
          </div>

          <div>
            <label className="font-dm text-xs text-ao-muted mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
              className="placeholder:text-ao-muted/40"
              onFocus={e  => e.target.style.borderColor = 'rgba(0,200,240,0.45)'}
              onBlur={e   => e.target.style.borderColor = 'rgba(0,200,240,0.14)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="font-dm font-medium text-ao-deep bg-ao-accent py-3 rounded-full text-sm mt-2 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 0 0 rgba(0,200,240,0)' }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 0 28px rgba(0,200,240,0.40)' }}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,200,240,0)'}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="font-dm text-xs text-ao-muted hover:text-ao-primary transition-colors duration-200"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
