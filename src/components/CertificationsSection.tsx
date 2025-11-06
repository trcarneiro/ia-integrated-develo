import { motion } from 'framer-motion'
import { Certificate, CheckCircle } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'

const certifications = [
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    description: '8+ anos de experiência',
  },
  {
    name: 'OpenAI',
    logo: 'https://cdn.simpleicons.org/openai/412991',
    description: 'GPT-4, Embeddings, Fine-tuning',
  },
  {
    name: 'AWS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    description: 'Lambda, EC2, S3, RDS',
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: 'Dashboards modernos',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    description: 'APIs e microserviços',
  },
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    description: 'Deploy e containerização',
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    description: 'Bancos de dados modernos',
  },
  {
    name: 'Git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    description: 'Versionamento e CI/CD',
  },
]

const achievements = [
  { icon: CheckCircle, text: '30+ projetos de integração entregues', color: 'text-green-500' },
  { icon: CheckCircle, text: '8+ anos desenvolvendo em Python', color: 'text-blue-500' },
  { icon: CheckCircle, text: '100% de satisfação dos clientes', color: 'text-purple-500' },
  { icon: CheckCircle, text: 'Especialista em sistemas legados (Access, VB, Cobol)', color: 'text-orange-500' },
]

export function CertificationsSection() {
  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
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
            <Certificate size={20} weight="duotone" className="text-primary" />
            <span className="text-sm font-medium">Tecnologias de Ponta</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stack Técnica Comprovada
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas modernas e confiáveis para integrar seus sistemas legados com o futuro
          </p>
        </motion.div>

        {/* Logos de Tecnologias */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card group">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img 
                      src={cert.logo} 
                      alt={cert.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Conquistas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Icon size={24} weight="fill" className={`${achievement.color} flex-shrink-0 mt-0.5`} />
                      <p className="font-medium">{achievement.text}</p>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <strong className="text-foreground">Não uso tecnologia pela tecnologia.</strong> 
            {' '}Escolho as ferramentas certas para cada projeto: simplicidade quando possível, 
            complexidade quando necessário. Seu sistema legado merece uma solução que funcione, 
            não uma demonstração de ego técnico.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
