import { motion } from 'framer-motion'
import { MagnifyingGlass, FileText, Code, RocketLaunch, CheckCircle } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  {
    number: '01',
    icon: MagnifyingGlass,
    title: 'Análise Técnica Gratuita',
    duration: '1-2 dias',
    description: 'Conversa inicial sobre seu sistema legado, processos manuais e objetivos. Analiso a viabilidade técnica e mapeio as integrações necessárias.',
    deliverables: [
      'Diagnóstico técnico do sistema atual',
      'Viabilidade da integração com IA',
      'Estimativa de economia de tempo/custo',
      'Riscos e desafios identificados',
    ],
    color: 'blue',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Proposta & Planejamento',
    duration: '2-3 dias',
    description: 'Documento detalhado com escopo, tecnologias, prazo e investimento. Sem surpresas, sem custos ocultos. Você sabe exatamente o que vai receber.',
    deliverables: [
      'Proposta comercial transparente',
      'Cronograma detalhado por fase',
      'Stack técnica explicada',
      'Contrato com garantias claras',
    ],
    color: 'green',
  },
  {
    number: '03',
    icon: Code,
    title: 'Desenvolvimento Ágil',
    duration: '2-6 semanas',
    description: 'Desenvolvimento em sprints com entregas parciais. Você acompanha o progresso, testa incrementalmente e dá feedback. Ajustes são parte do processo.',
    deliverables: [
      'Código limpo e documentado',
      'Testes automatizados',
      'Demos semanais de progresso',
      'Ajustes baseados no seu feedback',
    ],
    color: 'purple',
  },
  {
    number: '04',
    icon: RocketLaunch,
    title: 'Entrega & Suporte',
    duration: 'Contínuo',
    description: 'Deploy em produção, treinamento da equipe e documentação completa. Suporte de 30 dias incluso para ajustes e dúvidas.',
    deliverables: [
      'Sistema rodando em produção',
      'Documentação técnica completa',
      'Treinamento da equipe',
      '30 dias de suporte incluso',
    ],
    color: 'orange',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Como Funciona o Processo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Do primeiro contato até o sistema rodando em produção. Simples, transparente e sem surpresas.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const colorClasses = {
              blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
              green: 'bg-green-500/10 text-green-500 border-green-500/20',
              purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
              orange: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            }

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-xl ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center border-2 text-2xl font-bold`}>
                          {step.number}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon size={28} weight="duotone" className={colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} />
                          <CardTitle className="text-2xl">{step.title}</CardTitle>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 bg-muted rounded-full px-3 py-1 text-sm mb-4">
                          ⏱️ <span className="font-medium">{step.duration}</span>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-4 ml-[88px]">
                      <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                        📦 O que você recebe:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {step.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle size={18} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block max-w-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">⚡ Prazo Total Típico: 3-8 Semanas</h3>
              <p className="text-muted-foreground mb-4">
                Projetos simples (scraping, chatbot básico) podem levar apenas 2-3 semanas. 
                Integrações complexas com múltiplos sistemas legados podem chegar a 8-10 semanas.
              </p>
              <p className="text-sm text-primary font-medium">
                ✓ Você acompanha tudo via WhatsApp e reuniões semanais
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
