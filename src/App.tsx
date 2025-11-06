import { useState, useRef } from 'react'
import { Toaster } from 'sonner'
import { HeroSales } from './components/HeroSales'
import { StatsSection } from './components/StatsSection'
import { ServicesSection } from './components/ServicesSection'
import { PortfolioSection } from './components/PortfolioSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { TechStackSection } from './components/TechStackSection'
import { FAQSection } from './components/FAQSection'
import { ContactSection } from './components/ContactSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'

function App() {
  const [selectedService, setSelectedService] = useState<string>('')
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToContact = (service?: string) => {
    if (service) {
      setSelectedService(service)
    }
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" theme="dark" />
      
      <HeroSales onContactClick={() => scrollToContact()} />
      
      <StatsSection />
      
      <ServicesSection onContactClick={scrollToContact} />
      
      <PortfolioSection />
      
      <TestimonialsSection />
      
      <TechStackSection />
      
      <FAQSection />
      
      <div ref={contactRef}>
        <ContactSection initialService={selectedService} />
      </div>

      <CTASection onContactClick={() => scrollToContact()} />
      
      <Footer githubUrl="https://github.com" />
    </div>
  )
}

export default App
