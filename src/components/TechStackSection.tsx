import { motion } from 'framer-motion'
import { Code } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'

const technologies = {
  'Scraping & Automação': [
    { name: 'Python', logo: '🐍' },
    { name: 'Selenium', logo: '🔧' },
    { name: 'Beautiful Soup', logo: '🍜' },
    { name: 'Scrapy', logo: '🕷️' },
    { name: 'Puppeteer', logo: '🎭' },
  ],
  'Inteligência Artificial': [
    { name: 'OpenAI GPT', logo: '🤖' },
    { name: 'LangChain', logo: '🔗' },
    { name: 'TensorFlow', logo: '📊' },
    { name: 'Hugging Face', logo: '🤗' },
    { name: 'Python ML', logo: '🧠' },
  ],
  'Backend & APIs': [
    { name: 'PHP', logo: '🐘' },
    { name: 'Node.js', logo: '💚' },
    { name: 'FastAPI', logo: '⚡' },
    { name: 'REST APIs', logo: '🔌' },
    { name: 'GraphQL', logo: '📈' },
  ],
  'Dados & Storage': [
    { name: 'PostgreSQL', logo: '🐘' },
    { name: 'MongoDB', logo: '🍃' },
    { name: 'Redis', logo: '🔴' },
    { name: 'MySQL', logo: '🐬' },
    { name: 'Vector DB', logo: '📐' },
  ],
}

export function TechStackSection() {
  return (
    <section id="stack" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code size={32} weight="duotone" className="text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Stack Tecnológico
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas e tecnologias que dominamos para entregar soluções robustas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(technologies).map(([category, tools], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4 text-primary">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {tools.map((tool, toolIndex) => (
                      <motion.li
                        key={tool.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
                        className="flex items-center gap-3 text-sm group cursor-default"
                      >
                        <span className="text-2xl group-hover:scale-125 transition-transform">
                          {tool.logo}
                        </span>
                        <span className="group-hover:text-primary transition-colors">
                          {tool.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Sempre atualizados.</strong> Acompanhamos as últimas tendências e adotamos
                novas tecnologias quando agregam valor real ao projeto. Não viu a ferramenta que precisa? Entre em contato!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
