import Nav from './components/Nav'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import AIAudit from './components/AIAudit'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import ChatDemo from './components/ChatDemo'
import ByTheNumbers from './components/ByTheNumbers'
import ROICalculator from './components/ROICalculator'
import Team from './components/Team'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIChatWidget from './components/AIChatWidget'

export default function App() {
  return (
    <div className="bg-ao-deep min-h-screen">
      <Nav />
      <Hero />
      <SocialProof />
      <AIAudit />
      <Services />
      <HowItWorks />
      <ChatDemo />
      <ByTheNumbers />
      <ROICalculator />
      <Team />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <AIChatWidget />
    </div>
  )
}
