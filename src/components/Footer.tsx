import { motion } from 'framer-motion'
import { GithubLogo, EnvelopeSimple, LinkedinLogo, ArrowUp } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

interface FooterProps {
  githubUrl?: string
}

export function Footer({ githubUrl }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Altus Stratus
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Especialista em Web Scraping, IA e Integrações. Transformando complexidade em soluções.
            </p>
            <div className="flex items-center gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <GithubLogo size={20} weight="fill" />
                </a>
              )}
              <a
                href="mailto:contato@altusstratus.com.br"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="Email"
              >
                <EnvelopeSimple size={20} weight="fill" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} weight="fill" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">
                  Web Scraping
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">
                  Integração com IA
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">
                  Integrações de Sistemas
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">
                  Projetos Customizados
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">
                  Portfólio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('stack')} className="hover:text-primary transition-colors">
                  Tecnologias
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-primary transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">
                  Contato
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato Direto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contato@altusstratus.com.br" className="hover:text-primary transition-colors">
                  contato@altusstratus.com.br
                </a>
              </li>
              <li>
                <span>Resposta em até 24h</span>
              </li>
            </ul>
            <Button 
              className="mt-4 w-full" 
              size="sm"
              onClick={() => scrollToSection('contact')}
            >
              Solicitar Orçamento
            </Button>
          </div>
        </motion.div>

        <Separator className="mb-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
        >
          <p>
            © {new Date().getFullYear()} Altus Stratus. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-4">
            <button className="hover:text-primary transition-colors">
              Termos de Uso
            </button>
            <button className="hover:text-primary transition-colors">
              Privacidade
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group"
          >
            <ArrowUp size={16} className="mr-2 group-hover:-translate-y-1 transition-transform" />
            Voltar ao topo
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}
