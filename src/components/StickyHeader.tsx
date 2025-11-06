import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WhatsappLogo, List, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const menuItems = [
    { id: 'services', label: 'Serviços' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contato' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
            >
              <span className="text-2xl">🤖</span>
              <span className="hidden sm:inline">Altostratus</span>
            </button>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA WhatsApp */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white gap-2 hidden sm:flex"
                onClick={() => window.open('https://wa.me/5531993074190?text=Olá! Quero integrar meu sistema legado com IA.', '_blank')}
              >
                <WhatsappLogo size={18} weight="fill" />
                <span className="hidden lg:inline">WhatsApp</span>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-background"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-2xl font-bold hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
              >
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                  onClick={() => {
                    window.open('https://wa.me/5531993074190?text=Olá! Quero integrar meu sistema legado com IA.', '_blank')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <WhatsappLogo size={24} weight="fill" />
                  Falar no WhatsApp
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer para não sobrepor o conteúdo */}
      <div className="h-16" />
    </>
  )
}
