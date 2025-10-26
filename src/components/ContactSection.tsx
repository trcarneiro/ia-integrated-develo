import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnvelopeSimple, CheckCircle, Warning, ArrowRight } from '@phosphor-icons/react'
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
            Vamos Conversar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preencha o formulário abaixo com detalhes do seu projeto e retornaremos em até 24 horas
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
                <CardTitle className="text-lg">Por que escolher Altus Stratus?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Experiência Comprovada</p>
                    <p className="text-muted-foreground">Anos desenvolvendo soluções complexas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Entrega Rápida</p>
                    <p className="text-muted-foreground">Projetos finalizados no prazo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Suporte Completo</p>
                    <p className="text-muted-foreground">Manutenção e acompanhamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <EnvelopeSimple size={24} className="text-accent flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Resposta Rápida</p>
                    <p className="text-muted-foreground">
                      Respondemos todas as solicitações em até 24 horas úteis
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
                        <Label htmlFor="company">Empresa (opcional)</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          placeholder="Nome da sua empresa"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
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
                          <Label htmlFor="budget">Orçamento Estimado</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleChange('budget', value)}>
                            <SelectTrigger id="budget">
                              <SelectValue placeholder="Selecione uma faixa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="< $500">Menos de $500</SelectItem>
                              <SelectItem value="$500 - $1,000">$500 - $1,000</SelectItem>
                              <SelectItem value="$1,000 - $2,500">$1,000 - $2,500</SelectItem>
                              <SelectItem value="$2,500 - $5,000">$2,500 - $5,000</SelectItem>
                              <SelectItem value="$5,000+">Mais de $5,000</SelectItem>
                              <SelectItem value="Não tenho certeza">Não tenho certeza</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Prazo Desejado</Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleChange('timeline', value)}>
                          <SelectTrigger id="timeline">
                            <SelectValue placeholder="Quando precisa?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Urgente (1-2 semanas)">Urgente (1-2 semanas)</SelectItem>
                            <SelectItem value="Rápido (3-4 semanas)">Rápido (3-4 semanas)</SelectItem>
                            <SelectItem value="Normal (1-2 meses)">Normal (1-2 meses)</SelectItem>
                            <SelectItem value="Flexível (2+ meses)">Flexível (2+ meses)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Detalhes do Projeto *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Descreva seu projeto, objetivos e requisitos específicos..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Enviando...'
                        ) : (
                          <>
                            Enviar Solicitação
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
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
