import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnvelopeSimple, CheckCircle, Warning, ArrowRight, WhatsappLogo } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ContactFormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
}

interface ContactSectionProps {
  initialService?: string
}

export function ContactSection({ initialService }: ContactSectionProps) {
  const [leads, setLeads] = useKV<ContactFormData[]>('contact-leads', [])
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: initialService || '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLeads(currentLeads => [...(currentLeads || []), {
        ...formData,
        timestamp: new Date().toISOString(),
      } as any])

      setIsSubmitted(true)
      toast.success('Mensagem enviada com sucesso!')
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          budget: '',
          timeline: '',
          message: '',
        })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Vamos Conversar Sobre Seu Projeto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Conte-me sobre seu sistema legado e como posso ajudar. Resposta pessoal em até 24h
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
            onClick={() => window.open('https://wa.me/5531993074190?text=Olá! Preciso integrar meu sistema legado com IA. Podemos conversar?', '_blank')}
          >
            <WhatsappLogo size={24} weight="fill" />
            Falar Comigo no WhatsApp
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            ⚡ Resposta direta • 💬 Sem intermediários • 🤝 Atendimento pessoal
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1 space-y-6"
          >
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Por que trabalhar comigo?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Especialista em Legados</p>
                    <p className="text-muted-foreground">Anos integrando sistemas antigos com IA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Atendimento Direto</p>
                    <p className="text-muted-foreground">Você fala comigo, sem intermediários</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Custo-Benefício</p>
                    <p className="text-muted-foreground">Preço justo, sem overhead de agência</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <EnvelopeSimple size={24} className="text-accent flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Resposta Pessoal</p>
                    <p className="text-muted-foreground">
                      Eu mesmo respondo todas as mensagens em até 24h úteis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <Card>
              <CardContent className="pt-6">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-12 text-center"
                    >
                      <CheckCircle size={64} weight="duotone" className="text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                      <p className="text-muted-foreground">
                        Obrigado pelo contato. Retornaremos em breve com uma proposta.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Seu nome completo"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Serviço de Interesse *</Label>
                        <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web Scraping">Web Scraping</SelectItem>
                            <SelectItem value="Integração com IA">Integração com IA</SelectItem>
                            <SelectItem value="Integrações de Sistemas">Integrações de Sistemas</SelectItem>
                            <SelectItem value="Custom Project">Projeto Customizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Descreva Seu Projeto *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Conte-nos sobre seu projeto, objetivos e o problema que precisa resolver..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
                        <p className="font-semibold text-primary mb-1">🎁 Garantia de Satisfação</p>
                        <p className="text-muted-foreground">
                          Não gostou do resultado? Devolveremos 100% do seu investimento nos primeiros 30 dias.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group shadow-lg shadow-primary/25"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Enviando...'
                        ) : (
                          <>
                            Receber Minha Proposta Gratuita
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        ✓ Resposta em até 24h • ✓ Sem compromisso • ✓ Consultoria inicial gratuita
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
