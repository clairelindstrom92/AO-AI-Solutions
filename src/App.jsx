// ============================================================
// FILE: App.jsx
// PURPOSE: Root router — maps URL paths to page components
// SECTION: App shell
// MANUAL EDITS: Add new routes here as pages are added
// CLAUDE AUTOMATION: Add portal sub-routes, onboarding flow, etc.
// ============================================================

import { Routes, Route } from 'react-router-dom'
import MarketingSite  from './pages/MarketingSite'
import Login          from './pages/Login'
import ClientPortal   from './pages/ClientPortal'
import AdminPortal    from './pages/AdminPortal'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      {/* ── PUBLIC ROUTES ──────────────────────────────────── */}
      <Route path="/"      element={<MarketingSite />} />
      <Route path="/login" element={<Login />} />

      {/* ── PROTECTED: CLIENT PORTAL ───────────────────────── */}
      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <ClientPortal />
          </ProtectedRoute>
        }
      />

      {/* ── PROTECTED: ADMIN PORTAL ────────────────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPortal />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
