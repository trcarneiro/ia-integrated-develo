import { motion } from 'framer-motion'
import { GithubLogo, EnvelopeSimple, Heart } from '@phosphor-icons/react'

interface FooterProps {
  githubUrl?: string
}

export function Footer({ githubUrl }: FooterProps) {
  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-6">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                <GithubLogo size={24} weight="fill" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart size={16} weight="fill" className="text-accent" />
            <span>using React, TypeScript & AI</span>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Altus Stratus. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
