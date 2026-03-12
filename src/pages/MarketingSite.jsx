// ============================================================
// FILE: MarketingSite.jsx
// PURPOSE: Public marketing site — assembles all sections in page order
// SECTION: Pages — rendered at route "/"
// MANUAL EDITS: Reorder, add, or remove section components here
// CLAUDE AUTOMATION: Add new sections between existing ones as needed
// ============================================================

import Nav          from '../components/Nav'
import Hero         from '../components/Hero'
import SocialProof  from '../components/SocialProof'
import Services     from '../components/Services'
import HowItWorks   from '../components/HowItWorks'
// import Results      from '../components/Results'      // Re-enable once real case studies exist
// import Testimonials from '../components/Testimonials' // Re-enable once real client reviews exist
import ChatDemo     from '../components/ChatDemo'
import SmartSites   from '../components/SmartSites'
import Team         from '../components/Team'
import Pricing      from '../components/Pricing'
import FAQ          from '../components/FAQ'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'

export default function MarketingSite() {
  return (
    <div className="bg-ao-deep min-h-screen">

      {/* ── NAVIGATION ──────────────────────────────────────── */}
      <Nav />

      {/* ── PAGE SECTIONS ───────────────────────────────────── */}
      <main>
        {/* Hero — GrandSign emblem + headline + CTAs */}
        <Hero />

        {/* Industry trust bar */}
        <SocialProof />

        {/* Core services grid */}
        <Services />

        {/* Process steps */}
        <HowItWorks />

        {/* Case study results — hidden until real client data available */}
        {/* <Results /> */}

        {/* Client testimonials — hidden until real reviews collected */}
        {/* <Testimonials /> */}

        {/* Animated AI chat demo */}
        <ChatDemo />

        {/* Smart Sites feature block */}
        <SmartSites />

        {/* Founders / Team */}
        <Team />

        {/* Pricing tiers */}
        <Pricing />

        {/* FAQ accordion */}
        <FAQ />

        {/* Lead gen contact form */}
        <Contact />
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <Footer />

    </div>
  )
}
