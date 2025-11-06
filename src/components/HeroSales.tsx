import { motion } from 'framer-motion'
import { ChartLineUp, Users, CheckCircle, ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface HeroSalesProps {
  onContactClick: () => void
}

export function HeroSales({ onContactClick }: HeroSalesProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <ChartLineUp size={20} weight="duotone" className="text-primary" />
              <span className="text-sm font-medium">🔥 Apenas 3 vagas disponíveis este mês</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
            >
              Automação, Dados e IA para{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Seu Negócio
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Especialista em <strong className="text-foreground">Web Scraping</strong>, <strong className="text-foreground">Integrações com IA</strong> e <strong className="text-foreground">Automação de Sistemas</strong>. 
              Transformo desafios técnicos em soluções práticas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 group shadow-lg shadow-primary/25"
                onClick={onContactClick}
              >
                Quero Meu Orçamento Gratuito
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Ver Como Funciona
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-sm text-muted-foreground"
            >
              ✓ Sem compromisso • ✓ Resposta em 24h • ✓ Consultoria inicial gratuita
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="bg-card/50 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} weight="duotone" className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Entrega Garantida</h3>
                <p className="text-sm text-muted-foreground">
                  Projetos finalizados dentro do prazo e orçamento acordados
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ChartLineUp size={24} weight="duotone" className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Resultados Mensuráveis</h3>
                <p className="text-sm text-muted-foreground">
                  Métricas claras e ROI comprovado em cada implementação
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users size={24} weight="duotone" className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Suporte Contínuo</h3>
                <p className="text-sm text-muted-foreground">
                  Manutenção, atualizações e suporte técnico sempre disponível
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-muted-foreground cursor-pointer"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-2 bg-current rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
