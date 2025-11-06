import { motion } from 'framer-motion'
import { ArrowRight, X, CheckCircle, Clock, CurrencyDollar, TrendUp } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const comparisons = [
  {
    title: 'Análise de Dados do ERP',
    before: {
      time: '4 horas por relatório',
      cost: 'R$ 800/mês em horas extras',
      quality: 'Erros em 20% dos relatórios',
      automation: 'Zero automação',
    },
    after: {
      time: '5 minutos automáticos',
      cost: 'R$ 120/mês (85% economia)',
      quality: 'Precisão de 99.9%',
      automation: 'IA faz tudo sozinha',
    },
    savings: 'R$ 8.160/ano economizados',
  },
  {
    title: 'Atendimento ao Cliente',
    before: {
      time: '3h/dia respondendo perguntas repetitivas',
      cost: '1 funcionário dedicado',
      quality: 'Horário comercial apenas',
      automation: 'Tudo manual via email/telefone',
    },
    after: {
      time: '30min/dia para casos complexos',
      cost: 'Chatbot IA + 30min humano',
      quality: '24/7 disponível',
      automation: 'IA resolve 80% das dúvidas',
    },
    savings: 'R$ 24.000/ano economizados',
  },
  {
    title: 'Coleta de Documentos',
    before: {
      time: '6h/dia fazendo downloads manuais',
      cost: 'R$ 3.000/mês em mão de obra',
      quality: 'Documentos perdidos/esquecidos',
      automation: 'Processo todo manual',
    },
    after: {
      time: 'Robô coleta durante a noite',
      cost: 'R$ 200/mês de servidor',
      quality: '100% dos documentos capturados',
      automation: 'Totalmente automatizado',
    },
    savings: 'R$ 33.600/ano economizados',
  },
]

const metrics = [
  { icon: Clock, label: 'Tempo Economizado', value: '80%', color: 'text-blue-500' },
  { icon: CurrencyDollar, label: 'Redução de Custos', value: '70%', color: 'text-green-500' },
  { icon: TrendUp, label: 'Aumento de Produtividade', value: '3x', color: 'text-purple-500' },
  { icon: CheckCircle, label: 'Precisão', value: '99%', color: 'text-primary' },
]

export function BeforeAfterSection() {
  return (
    <section className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            Resultados Comprovados
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Antes vs. Depois da Integração com IA
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja a diferença real que automação e IA fazem em empresas como a sua
          </p>
        </motion.div>

        {/* Métricas Gerais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow bg-card">
                  <CardContent className="pt-6">
                    <Icon size={32} className={`${metric.color} mx-auto mb-3`} weight="duotone" />
                    <div className={`text-3xl font-bold mb-1 ${metric.color}`}>
                      {metric.value}
                    </div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Comparações Detalhadas */}
        <div className="space-y-8">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={comparison.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-card">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-2xl">{comparison.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      💰 {comparison.savings}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    {/* ANTES */}
                    <div className="p-6 bg-red-500/5">
                      <div className="flex items-center gap-2 mb-4">
                        <X size={24} weight="bold" className="text-red-500" />
                        <h3 className="text-xl font-bold text-red-600">Antes</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">⏱️ Tempo</p>
                          <p className="font-medium">{comparison.before.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">💸 Custo</p>
                          <p className="font-medium">{comparison.before.cost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">✅ Qualidade</p>
                          <p className="font-medium">{comparison.before.quality}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">🤖 Automação</p>
                          <p className="font-medium">{comparison.before.automation}</p>
                        </div>
                      </div>
                    </div>

                    {/* DEPOIS */}
                    <div className="p-6 bg-green-500/5">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle size={24} weight="fill" className="text-green-500" />
                        <h3 className="text-xl font-bold text-green-600">Depois</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">⏱️ Tempo</p>
                          <p className="font-medium text-green-600">{comparison.after.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">💸 Custo</p>
                          <p className="font-medium text-green-600">{comparison.after.cost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">✅ Qualidade</p>
                          <p className="font-medium text-green-600">{comparison.after.quality}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">🤖 Automação</p>
                          <p className="font-medium text-green-600">{comparison.after.automation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-lg font-medium mb-2">
                💡 <strong>Economia Total Anual:</strong> R$ 65.760
              </p>
              <p className="text-muted-foreground">
                Baseado na média dos 3 casos acima. Seu resultado pode variar.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
