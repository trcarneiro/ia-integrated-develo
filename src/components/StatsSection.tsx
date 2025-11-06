import { motion } from 'framer-motion'
import { TrendUp, Users, Clock, CheckCircle } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    icon: CheckCircle,
    value: '30+',
    label: 'Integrações Feitas',
    description: 'Sistemas legados conectados com IA',
  },
  {
    icon: Users,
    value: '100%',
    label: 'Satisfação',
    description: 'Todos os clientes recomendam',
  },
  {
    icon: Clock,
    value: '80%',
    label: 'Menos Trabalho Manual',
    description: 'Média de redução em tarefas repetitivas',
  },
  {
    icon: TrendUp,
    value: '< 3 meses',
    label: 'Retorno do Investimento',
    description: 'ROI médio dos projetos realizados',
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Resultados Que Falam Por Si
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números reais de projetos que transformaram negócios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card border-border">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} weight="duotone" className="text-primary" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold mb-1">
                      {stat.label}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
