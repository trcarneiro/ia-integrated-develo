import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  
  // Use localStorage instead of Spark's useKV (GitHub Pages doesn't support Spark runtime)
  const getShown = () => localStorage.getItem('exit-popup-shown') === 'yes'
  const setShownFlag = () => localStorage.setItem('exit-popup-shown', 'yes')
  
  const saveLeadToStorage = (leadData: { name: string; email: string; date: string }) => {
    const existing = localStorage.getItem('exit-leads')
    const leads = existing ? JSON.parse(existing) : []
    leads.push(leadData)
    localStorage.setItem('exit-leads', JSON.stringify(leads))
  }

  useEffect(() => {
    if (getShown()) return

    const handleMouse = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true)
        setShownFlag()
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouse)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouse)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    saveLeadToStorage({ name, email, date: new Date().toISOString() })
    toast.success('✅ eBook enviado para seu email!')
    setTimeout(() => setIsOpen(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="max-w-lg w-full relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full"
              >
                <X size={20} />
              </button>

              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Download size={32} weight="duotone" className="text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  ⚡ Antes de Sair...
                </CardTitle>
                <p className="text-muted-foreground">
                  Baixe GRÁTIS o eBook sobre integração de sistemas legados com IA
                </p>
              </CardHeader>

              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 mb-4 text-sm space-y-2">
                  <p>✓ Como avaliar viabilidade técnica</p>
                  <p>✓ 5 casos reais de sucesso</p>
                  <p>✓ Estimativa de custos e ROI</p>
                  <p>✓ Checklist completo</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Download size={20} />
                    Baixar eBook Grátis
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Sem spam, apenas conteúdo de valor
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
