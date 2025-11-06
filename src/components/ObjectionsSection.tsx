import { motion } from 'framer-motion'
import { Users, ClockCounterClockwise, CurrencyDollar, Handshake, CheckCircle, X } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const objections = [
  {
    icon: Users,
    question: 'Por que não contratar uma empresa grande?',
    problem: {
      title: 'Empresa Grande',
      points: [
        'Júnior inexperiente faz o trabalho',
        'Você vira número no pipeline',
        'Múltiplas camadas de comunicação',
        'Preços inflacionados (overhead)',
        'Metodologia engessada',
      ],
      icon: X,
      color: 'red',
    },
    solution: {
      title: 'Profissional Solo',
      points: [
        'Eu mesmo faço todo o código',
        'Atendimento direto e personalizado',
        'Conversa direta comigo no WhatsApp',
        'Preço justo sem overhead',
        'Flexibilidade total',
      ],
      icon: CheckCircle,
      color: 'green',
    },
  },
  {
    icon: ClockCounterClockwise,
    question: 'E se você ficar doente ou indisponível?',
    problem: {
      title: 'Preocupação Válida',
      points: [
        'Dependência de uma pessoa',
        'Risco de atraso no projeto',
        'Sem backup imediato',
      ],
      icon: X,
      color: 'red',
    },
    solution: {
      title: 'Como Eu Garanto',
      points: [
        'Código documentado e versionado (GitHub)',
        'Arquitetura simples = qualquer dev entende',
        'Seguro profissional para imprevistos',
        'Rede de parceiros para emergências',
        '8 anos sem falta em entregas',
      ],
      icon: CheckCircle,
      color: 'green',
    },
  },
  {
    icon: CurrencyDollar,
    question: 'Seu preço não é "barato demais"?',
    problem: {
      title: 'Suspeita Natural',
      points: [
        'Preço baixo = qualidade ruim?',
        'Será que ele é júnior?',
        'Tem alguma pegadinha?',
      ],
      icon: X,
      color: 'red',
    },
    solution: {
      title: 'A Verdade',
      points: [
        '8+ anos de experiência real',
        'Sem custos de escritório/equipe',
        'Automação reduz meu tempo',
        'Volume de clientes = preço justo',
        'Transparência total no orçamento',
      ],
      icon: CheckCircle,
      color: 'green',
    },
  },
  {
    icon: Handshake,
    question: 'E o suporte de longo prazo?',
    problem: {
      title: 'Risco Percebido',
      points: [
        'E se o dev sumir depois?',
        'Quem vai manter o código?',
        'Custos de manutenção surpresa?',
      ],
      icon: X,
      color: 'red',
    },
    solution: {
      title: 'Meu Compromisso',
      points: [
        '30 dias de suporte incluso',
        'Código bem estruturado = fácil manter',
        'Documentação completa entregue',
        'Contratos de manutenção disponíveis',
        'Resposta rápida via WhatsApp',
      ],
      icon: CheckCircle,
      color: 'green',
    },
  },
]

export function ObjectionsSection() {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            Perguntas Honestas, Respostas Diretas
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            "Mas E Se...?"
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sei que trabalhar com profissional solo gera dúvidas. Vou responder as principais com total transparência.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {objections.map((objection, index) => {
            const Icon = objection.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-card hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={24} weight="duotone" className="text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{objection.question}</CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                      {/* PROBLEMA */}
                      <div className="p-6 bg-red-500/5">
                        <div className="flex items-center gap-2 mb-4">
                          <objection.problem.icon size={24} weight="bold" className="text-red-500" />
                          <h3 className="text-lg font-bold text-red-600">{objection.problem.title}</h3>
                        </div>
                        <ul className="space-y-2">
                          {objection.problem.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <X size={18} weight="bold" className="text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* SOLUÇÃO */}
                      <div className="p-6 bg-green-500/5">
                        <div className="flex items-center gap-2 mb-4">
                          <objection.solution.icon size={24} weight="fill" className="text-green-500" />
                          <h3 className="text-lg font-bold text-green-600">{objection.solution.title}</h3>
                        </div>
                        <ul className="space-y-2">
                          {objection.solution.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle size={18} weight="fill" className="text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="font-medium">{point}</span>
                            </li>
                          ))}
                        </ul>
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
              <h3 className="text-xl font-bold mb-3">💬 Ainda Tem Dúvidas?</h3>
              <p className="text-muted-foreground mb-4">
                Prefiro responder suas objeções ANTES de você me contratar. 
                Chama no WhatsApp e vamos conversar sobre suas preocupações específicas.
              </p>
              <p className="text-sm text-primary font-medium">
                ✓ Sem compromisso • ✓ Conversa honesta • ✓ Resposta em minutos
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
