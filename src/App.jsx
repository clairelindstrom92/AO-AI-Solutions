import Nav from './components/Nav'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import ChatDemo from './components/ChatDemo'
import SmartSites from './components/SmartSites'
import Team from './components/Team'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-ao-deep min-h-screen">
      <Nav />
      <Hero />
      <SocialProof />
      <Services />
      <HowItWorks />
      <ChatDemo />
      <SmartSites />
      <Team />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}
