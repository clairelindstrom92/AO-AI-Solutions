// ============================================================
// FILE: ProtectedRoute.jsx
// PURPOSE: Auth guard — redirects unauthenticated users to /login
// SECTION: Shared component — wraps /portal and /admin routes
// MANUAL EDITS: Safe to update the loading spinner or redirect path
// CLAUDE AUTOMATION: Can add role-based guards (adminOnly prop)
// ============================================================

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [user,    setUser]    = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Keep in sync if auth state changes (e.g. token expires)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-deep)' }}
      >
        <div
          className="font-dm text-sm text-ao-muted"
          style={{ animation: 'fadeIn 0.4s ease forwards' }}
        >
          Loading…
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
