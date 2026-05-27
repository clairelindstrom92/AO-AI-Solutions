// ============================================================
// FILE: App.jsx  (LANDING BRANCH OVERRIDE)
// PURPOSE: Simplified router — serves only the pre-launch landing page
// BRANCH: landing — DO NOT MERGE to main
// NOTE: main branch preserves full portal/admin routing
// ============================================================

import LandingPage from './pages/LandingPage'

export default function App() {
  return <LandingPage />
}
