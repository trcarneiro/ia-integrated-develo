import { motion } from 'framer-motion'
import { Quote, Star } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'CEO, TechCommerce',
    company: 'E-commerce',
    avatar: '/avatars/carlos.jpg',
    rating: 5,
    text: 'A automação de scraping reduziu 80% do tempo de coleta de preços da concorrência. ROI positivo em menos de 2 meses. Profissional excepcional!',
  },
  {
    name: 'Marina Costa',
    role: 'Diretora de TI',
    company: 'FinanceGroup',
    avatar: '/avatars/marina.jpg',
    rating: 5,
    text: 'Integração com GPT no nosso CRM revolucionou o atendimento ao cliente. Sistema inteligente, rápido e preciso. Altamente recomendado!',
  },
  {
    name: 'Roberto Mendes',
    role: 'Head de Produto',
    company: 'DataInsights',
    avatar: '/avatars/roberto.jpg',
    rating: 5,
    text: 'Implementação perfeita das APIs e integrações. Entrega no prazo, código limpo e documentação completa. Voltaremos a contratar com certeza.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O Que Dizem Nossos Clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empresas que já transformaram seus processos com nossas soluções
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow bg-card relative">
                <CardContent className="pt-6">
                  <Quote size={32} weight="fill" className="text-primary/20 mb-4" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} weight="fill" className="text-yellow-500" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-8 opacity-60"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Tecnologias Certificadas
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-card border border-border rounded-lg">
                <span className="font-mono text-sm">Python</span>
              </div>
              <div className="px-4 py-2 bg-card border border-border rounded-lg">
                <span className="font-mono text-sm">OpenAI</span>
              </div>
              <div className="px-4 py-2 bg-card border border-border rounded-lg">
                <span className="font-mono text-sm">AWS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
