import { GitHubRepo, AnalyzedProject } from '@/types'

const GITHUB_API = 'https://api.github.com'

export async function fetchUserProfile(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}`)
  if (!response.ok) throw new Error('Failed to fetch user profile')
  return response.json()
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=20`
  )
  if (!response.ok) throw new Error('Failed to fetch repositories')
  return response.json()
}

export async function analyzeProjectWithAI(repo: GitHubRepo): Promise<AnalyzedProject> {
  try {
    const promptText = `Analyze this GitHub repository and provide insights.

Repository: ${repo.name}
Description: ${repo.description || 'No description provided'}
Primary Language: ${repo.language || 'Unknown'}
Topics: ${repo.topics.join(', ') || 'None'}

Please provide:
1. A compelling 1-2 sentence summary that highlights what makes this project interesting
2. A list of 3-5 specific technologies/frameworks/tools used (be specific, infer from language and topics)
3. A category (e.g., "Web Application", "API Service", "CLI Tool", "Library", "Mobile App", "Data Analysis", "AI/ML")
4. 2-3 key highlights or notable features

Return as JSON with this exact structure:
{
  "summary": "compelling summary here",
  "technologies": ["tech1", "tech2", "tech3"],
  "category": "category name",
  "highlights": ["highlight1", "highlight2"]
}`

    const result = await window.spark.llm(promptText, 'gpt-4o-mini', true)
    const analysis = JSON.parse(result)

    return {
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      aiSummary: analysis.summary,
      technologies: analysis.technologies,
      category: analysis.category,
      highlights: analysis.highlights,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      lastUpdated: repo.pushed_at,
    }
  } catch (error) {
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      aiSummary: repo.description || 'A GitHub project',
      technologies: repo.language ? [repo.language] : [],
      category: 'Project',
      highlights: [],
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      lastUpdated: repo.pushed_at,
    }
  }
}

export async function analyzeAllProjects(repos: GitHubRepo[]): Promise<AnalyzedProject[]> {
  const analyzed = await Promise.all(
    repos.slice(0, 12).map((repo) => analyzeProjectWithAI(repo))
  )
  return analyzed
}
