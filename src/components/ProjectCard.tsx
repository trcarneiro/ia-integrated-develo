import { motion } from 'framer-motion'
import { GithubLogo, Star, GitFork, Sparkle, Lightning, ArrowSquareOut } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnalyzedProject } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface ProjectCardProps {
  project: AnalyzedProject
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Card className="group relative overflow-hidden glass-effect border-border/50 hover:border-primary/50 transition-all duration-500 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative p-6 flex flex-col gap-4 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="text-xs font-mono bg-primary/10 text-primary border-primary/20"
                >
                  {project.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkle size={14} weight="fill" className="text-accent" />
                  <span>AI Analyzed</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300 truncate">
                {project.name}
              </h3>
            </div>
            
            <Button
              size="icon"
              variant="ghost"
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              asChild
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut size={20} />
              </a>
            </Button>
          </div>

          <p className="text-sm text-foreground/90 leading-relaxed">
            {project.aiSummary}
          </p>

          {project.highlights.length > 0 && (
            <div className="flex flex-col gap-2">
              {project.highlights.slice(0, 2).map((highlight, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lightning size={14} weight="fill" className="text-accent shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs font-mono glass-effect hover:bg-accent/10 hover:border-accent transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge
                variant="outline"
                className="text-xs font-mono glass-effect"
              >
                +{project.technologies.length - 5}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star size={14} weight="fill" />
                <span>{project.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork size={14} weight="fill" />
                <span>{project.forks}</span>
              </div>
            </div>
            <span>
              Updated {formatDistanceToNow(new Date(project.lastUpdated), { addSuffix: true })}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
