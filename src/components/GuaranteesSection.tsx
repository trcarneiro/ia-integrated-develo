import { motion } from 'framer-motion'
import { Shield, ArrowCounterClockwise, Clock, Headset, CheckCircle } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const guarantees = [
  {
    icon: Shield,
    title: 'Garantia de Qualidade',
    description: 'Código limpo, documentado e com testes. Se algo não funcionar como prometido, corrijo sem custo adicional.',
    highlight: '30 dias de garantia',
  },
  {
    icon: ArrowCounterClockwise,
    title: 'Devolução do Investimento',
    description: 'Se em 90 dias você não ver economia de tempo ou redução de custos, devolvo seu dinheiro.',
    highlight: 'Reembolso de 100%',
  },
  {
    icon: Clock,
    title: 'Prazo Garantido',
    description: 'Cumpro os prazos acordados. Se atrasar por minha culpa, você ganha 20% de desconto no projeto.',
    highlight: 'Sem atrasos',
  },
  {
    icon: Headset,
    title: 'Suporte Direto',
    description: 'WhatsApp e email direto comigo. Sem call center, sem tickets, sem espera. Resposta em até 24h úteis.',
    highlight: 'Atendimento pessoal',
  },
]

export function GuaranteesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Shield size={20} weight="duotone" className="text-primary" />
            <span className="text-sm font-medium">Seu Investimento Está Protegido</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Garantias Sem Letras Miúdas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trabalho com transparência total. Você só corre o risco de economizar tempo e dinheiro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon
            return (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-card border-border group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={24} weight="duotone" className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{guarantee.title}</CardTitle>
                        <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-3 py-1">
                          <CheckCircle size={16} weight="fill" className="text-primary" />
                          <span className="text-sm font-medium text-primary">{guarantee.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {guarantee.description}
                    </p>
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
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Shield size={32} weight="duotone" className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Por Que Ofereço Tantas Garantias?</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Porque sei que meu trabalho funciona. Em 8+ anos integrando sistemas legados, nunca tive um cliente insatisfeito. 
                    Minha reputação depende de cada projeto, então só aceito trabalhos que sei que vou entregar com excelência.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    ✓ Mais de 30 integrações entregues • ✓ 100% de satisfação • ✓ Zero reclamações
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
