import { motion } from 'framer-motion'
import { ArrowRight, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface CTASectionProps {
  onContactClick: () => void
}

export function CTASection({ onContactClick }: CTASectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardContent className="pt-12 pb-12 px-8 md:px-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
              >
                <Sparkle size={20} weight="fill" className="text-primary" />
                <span className="text-sm font-medium">Pronto para começar?</span>
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Vamos Transformar sua Ideia{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  em Realidade
                </span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Entre em contato hoje e receba uma proposta detalhada em até 24 horas. 
                Sem compromisso, apenas uma conversa sobre como podemos ajudar seu negócio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 group shadow-lg hover:shadow-xl"
                  onClick={onContactClick}
                >
                  Falar com Especialista
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
                  asChild
                >
                  <a href="mailto:contato@altusstratus.com.br">
                    Enviar Email Direto
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Resposta em 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Orçamento sem compromisso</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Consultoria inicial gratuita</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
