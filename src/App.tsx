import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster, toast } from 'sonner'
import { HeroSection } from './components/HeroSection'
import { ProjectsSection } from './components/ProjectsSection'
import { Footer } from './components/Footer'
import { fetchUserProfile, fetchUserRepos, analyzeAllProjects } from './lib/github'
import { UserProfile, AnalyzedProject } from './types'

const DEFAULT_GITHUB_USERNAME = 'octocat'

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [projects, setProjects] = useKV<AnalyzedProject[]>('analyzed-projects', [])
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const loadGitHubData = async () => {
    setIsLoading(true)
    setIsAnalyzing(true)
    
    try {
      let username = DEFAULT_GITHUB_USERNAME
      
      try {
        const currentUser = await window.spark.user()
        if (currentUser?.login) {
          username = currentUser.login
        }
      } catch (error) {
        console.log('Using default GitHub username')
      }

      const [userProfile, repos] = await Promise.all([
        fetchUserProfile(username),
        fetchUserRepos(username),
      ])

      setProfile(userProfile)

      if (repos.length === 0) {
        toast.error('No repositories found')
        setProjects([])
        setIsAnalyzing(false)
        setIsLoading(false)
        return
      }

      toast.success('Repositories fetched! Starting AI analysis...')

      const analyzed = await analyzeAllProjects(repos)
      
      setProjects(analyzed)
      toast.success(`${analyzed.length} projects analyzed with AI!`)
    } catch (error) {
      console.error('Error loading GitHub data:', error)
      toast.error('Failed to load GitHub data. Please try again.')
    } finally {
      setIsAnalyzing(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGitHubData()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" theme="dark" />
      
      <HeroSection profile={profile} isLoading={isLoading} />
      
      <ProjectsSection
        projects={projects || []}
        isLoading={isLoading}
        isAnalyzing={isAnalyzing}
        onRefresh={loadGitHubData}
      />
      
      <Footer githubUrl={profile?.html_url} />
    </div>
  )
}

export default App
