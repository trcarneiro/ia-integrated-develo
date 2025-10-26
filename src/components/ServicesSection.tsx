import { motion } from 'framer-motion'
import { Database, Robot, GitBranch, ArrowRight } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    icon: Database,
    title: 'Web Scraping',
    description: 'Extração automatizada de dados de websites, APIs e plataformas. Coleta de informações estruturadas para análise, monitoramento de preços, agregação de conteúdo e muito mais.',
    features: [
      'Scraping em larga escala',
      'Dados estruturados e limpos',
      'Contorno de proteções anti-bot',
      'Agendamento automático',
      'Múltiplos formatos de saída'
    ],
    technologies: ['Python', 'Selenium', 'Beautiful Soup', 'Scrapy', 'Puppeteer'],
    pricing: 'A partir de $500',
  },
  {
    icon: Robot,
    title: 'Integração com IA',
    description: 'Implementação de soluções de inteligência artificial em seus sistemas. GPT, análise de sentimento, classificação, automação inteligente e processamento de linguagem natural.',
    features: [
      'APIs OpenAI/GPT',
      'Modelos customizados',
      'Processamento de texto',
      'Análise de dados com IA',
      'Automação inteligente'
    ],
    technologies: ['OpenAI', 'LangChain', 'Python', 'TensorFlow', 'Hugging Face'],
    pricing: 'A partir de $800',
  },
  {
    icon: GitBranch,
    title: 'Integrações de Sistemas',
    description: 'Conecte seus sistemas, automatize workflows e integre APIs de terceiros. CRM, ERP, pagamentos, notificações e qualquer serviço que sua empresa precise conectar.',
    features: [
      'APIs RESTful',
      'Webhooks',
      'Sincronização de dados',
      'Automação de processos',
      'Integrações customizadas'
    ],
    technologies: ['PHP', 'Node.js', 'REST APIs', 'GraphQL', 'WebSockets'],
    pricing: 'A partir de $600',
  },
]

interface ServicesSectionProps {
  onContactClick: (service: string) => void
}

export function ServicesSection({ onContactClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 relative bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Serviços Especializados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções técnicas avançadas para empresas que precisam de automação, dados e inteligência artificial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={24} weight="duotone" className="text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                        O que está incluso:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                        Tecnologias:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3 pt-6 border-t">
                    <div className="w-full text-center">
                      <span className="text-2xl font-bold text-primary">{service.pricing}</span>
                    </div>
                    <Button 
                      className="w-full group"
                      size="lg"
                      onClick={() => onContactClick(service.title)}
                    >
                      Solicitar Orçamento
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
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
          <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Precisa de algo customizado?</h3>
              <p className="text-muted-foreground mb-4">
                Cada projeto é único. Entre em contato para discutir suas necessidades específicas e receber uma proposta personalizada.
              </p>
              <Button variant="outline" size="lg" onClick={() => onContactClick('Custom Project')}>
                Falar sobre meu projeto
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
