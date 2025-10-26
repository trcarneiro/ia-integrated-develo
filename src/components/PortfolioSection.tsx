import { motion } from 'framer-motion'
import { Database, Robot, GitBranch, ChartLineUp, Globe, ShoppingCart } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const showcaseProjects = [
  {
    icon: Database,
    title: 'Sistema de Monitoramento de Preços',
    category: 'Web Scraping',
    description: 'Extração automatizada de preços de e-commerce concorrentes em tempo real, com alertas e relatórios.',
    results: ['90% redução no tempo de coleta', '1000+ produtos monitorados', 'Dados atualizados a cada hora'],
    technologies: ['Python', 'Selenium', 'PostgreSQL', 'Cron Jobs'],
    color: 'primary'
  },
  {
    icon: Robot,
    title: 'Chatbot com GPT Personalizado',
    category: 'IA',
    description: 'Assistente virtual integrado com documentação interna da empresa, respondendo perguntas de clientes 24/7.',
    results: ['70% redução em tickets', '95% satisfação dos usuários', '2 segundos tempo de resposta'],
    technologies: ['OpenAI API', 'LangChain', 'Vector DB', 'React'],
    color: 'accent'
  },
  {
    icon: GitBranch,
    title: 'Integração Multi-Plataforma',
    category: 'Integração',
    description: 'Sincronização automática entre CRM, sistema de pagamentos e plataforma de email marketing.',
    results: ['100% automação do fluxo', 'Zero erros de sincronização', 'Tempo real de atualização'],
    technologies: ['Node.js', 'REST APIs', 'Webhooks', 'Redis'],
    color: 'secondary'
  },
  {
    icon: ChartLineUp,
    title: 'Dashboard de Análise com IA',
    category: 'IA',
    description: 'Agregação de dados de múltiplas fontes com insights gerados por IA e previsões de tendências.',
    results: ['5 fontes integradas', 'Previsões 85% precisas', 'Economia de 20h/semana'],
    technologies: ['Python', 'Pandas', 'GPT-4', 'D3.js'],
    color: 'primary'
  },
  {
    icon: Globe,
    title: 'Agregador de Notícias',
    category: 'Web Scraping',
    description: 'Coleta e categorização automática de notícias de múltiplos sites com análise de sentimento.',
    results: ['50+ fontes agregadas', '1000 artigos/dia', 'Categorização automática'],
    technologies: ['Beautiful Soup', 'NLP', 'MongoDB', 'FastAPI'],
    color: 'accent'
  },
  {
    icon: ShoppingCart,
    title: 'Sistema de Pedidos Automatizado',
    category: 'Integração',
    description: 'Integração completa entre loja online, estoque, fornecedores e sistema de entrega.',
    results: ['98% uptime', '500 pedidos/dia', 'Processamento automático'],
    technologies: ['PHP', 'MySQL', 'API Gateway', 'WebSockets'],
    color: 'secondary'
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Projetos de Sucesso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exemplos de soluções desenvolvidas para empresas de diversos setores
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseProjects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-${project.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon size={24} weight="duotone" className={`text-${project.color}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Resultados:
                      </h4>
                      <ul className="space-y-1.5">
                        {project.results.map((result) => (
                          <li key={result} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-0.5">▸</span>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Stack:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Quer ver seu projeto aqui? Vamos conversar sobre suas necessidades.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
