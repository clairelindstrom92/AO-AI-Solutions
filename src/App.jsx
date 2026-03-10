// ============================================================
// FILE: App.jsx
// PURPOSE: Root component — assembles all sections in page order
// SECTION: App shell
// MANUAL EDITS: Reorder, add, or remove section components here
// CLAUDE AUTOMATION: Add new route-level pages or sections here
// ============================================================

import Nav        from './components/Nav'
import Hero       from './components/Hero'
import SocialProof from './components/SocialProof'
import Services   from './components/Services'
import HowItWorks from './components/HowItWorks'
import ChatDemo   from './components/ChatDemo'
import SmartSites from './components/SmartSites'
import Team       from './components/Team'
import Pricing    from './components/Pricing'
import FAQ        from './components/FAQ'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

export default function App() {
  return (
    // ── PAGE WRAPPER ──────────────────────────────────────────
    <div className="bg-ao-deep min-h-screen">

      {/* ── NAVIGATION ──────────────────────────────────────── */}
      <Nav />

      {/* ── HERO ────────────────────────────────────────────── */}
      <main>
        <Hero />

        {/* ── SOCIAL PROOF / INDUSTRY TAGS ──────────────────── */}
        <SocialProof />

        {/* ── SERVICES GRID ─────────────────────────────────── */}
        <Services />

        {/* ── HOW IT WORKS STEPS ────────────────────────────── */}
        <HowItWorks />

        {/* ── CHAT DEMO / AI IN ACTION ──────────────────────── */}
        <ChatDemo />

        {/* ── SMART SITES FEATURE BLOCK ─────────────────────── */}
        <SmartSites />

        {/* ── TEAM / FOUNDERS ───────────────────────────────── */}
        <Team />

        {/* ── PRICING TIERS ─────────────────────────────────── */}
        <Pricing />

        {/* ── FAQ ACCORDION ─────────────────────────────────── */}
        <FAQ />

        {/* ── CONTACT / LEAD FORM ───────────────────────────── */}
        <Contact />
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <Footer />

    </div>
  )
}
