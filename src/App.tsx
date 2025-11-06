import { useState, useRef } from 'react'
import { Toaster } from 'sonner'
import { StickyHeader } from './components/StickyHeader'
import { ScrollProgressBar } from './components/ScrollProgressBar'
import { ExitIntentPopup } from './components/ExitIntentPopup'
import { HeroSales } from './components/HeroSales'
import { StatsSection } from './components/StatsSection'
import { ServicesSection } from './components/ServicesSection'
import { BeforeAfterSection } from './components/BeforeAfterSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { ROICalculatorSection } from './components/ROICalculatorSection'
import { FeasibilityChecker } from './components/FeasibilityChecker'
import { PortfolioSection } from './components/PortfolioSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { CertificationsSection } from './components/CertificationsSection'
import { GuaranteesSection } from './components/GuaranteesSection'
import { ObjectionsSection } from './components/ObjectionsSection'
import { LeadQualifierBot } from './components/LeadQualifierBot'
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
      
      {/* Exit Intent Popup - Lead Capture */}
      <ExitIntentPopup />
      
      {/* Header Fixo + Barra de Progresso */}
      <StickyHeader />
      <ScrollProgressBar />
      
      {/* Hero + Proposta de Valor */}
      <HeroSales onContactClick={() => scrollToContact()} />
      
      {/* Prova Social Imediata */}
      <StatsSection />
      
      {/* Serviços Oferecidos */}
      <ServicesSection onContactClick={scrollToContact} />
      
      {/* Antes/Depois - Prova de Resultado */}
      <BeforeAfterSection />
      
      {/* Como Funciona - Remove Fricção */}
      <HowItWorksSection />
      
      {/* Calculadora ROI - Ferramenta de Conversão */}
      <ROICalculatorSection />
      
      {/* Verificador de Viabilidade - Qualificação de Lead */}
      <FeasibilityChecker />
      
      {/* Portfolio Detalhado - Credibilidade */}
      <PortfolioSection />
      
      {/* Depoimentos - Prova Social */}
      <TestimonialsSection />
      
      {/* Certificações - Autoridade Técnica */}
      <CertificationsSection />
      
      {/* Garantias - Remove Risco */}
      <GuaranteesSection />
      
      {/* Objeções - Remove Barreiras */}
      <ObjectionsSection />
      
      {/* Chatbot de Qualificação - Interação */}
      <LeadQualifierBot />
      
      {/* Stack Técnica - Transparência */}
      <TechStackSection />
      
      {/* FAQ - Últimas Dúvidas */}
      <FAQSection />
      
      {/* Formulário de Contato */}
      <div ref={contactRef}>
        <ContactSection initialService={selectedService} />
      </div>

      {/* CTA Final - Última Chance */}
      <CTASection onContactClick={() => scrollToContact()} />
      
      {/* Footer */}
      <Footer githubUrl="https://github.com/trcarneiro" />
    </div>
  )
}

export default App
