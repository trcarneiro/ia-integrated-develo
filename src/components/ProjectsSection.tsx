import { motion } from 'framer-motion'
import { Brain, ArrowsClockwise } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ProjectCard } from './ProjectCard'
import { AnalyzedProject } from '@/types'

interface ProjectsSectionProps {
  projects: AnalyzedProject[]
  isLoading: boolean
  isAnalyzing: boolean
  onRefresh: () => void
}

export function ProjectsSection({ projects, isLoading, isAnalyzing, onRefresh }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain size={32} weight="fill" className="text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">AI-Analyzed Projects</span>
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Automatically fetched from GitHub and analyzed with artificial intelligence to extract technologies, insights, and highlights
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading || isAnalyzing}
            className="glass-effect hover:bg-accent/10"
          >
            <ArrowsClockwise 
              size={16} 
              className={isAnalyzing ? 'animate-spin' : ''} 
            />
            {isAnalyzing ? 'Analyzing with AI...' : 'Refresh Analysis'}
          </Button>

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-accent"
            >
              <div className="flex gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
              </div>
              <span>AI is analyzing your projects...</span>
            </motion.div>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-effect rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 glass-effect rounded-lg"
          >
            <Brain size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
            <p className="text-muted-foreground mb-6">
              Unable to fetch projects. Please try again later.
            </p>
            <Button onClick={onRefresh} variant="outline" className="glass-effect">
              <ArrowsClockwise size={16} />
              Try Again
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
