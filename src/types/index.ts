export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface AnalyzedProject {
  id: number
  name: string
  description: string
  aiSummary: string
  technologies: string[]
  category: string
  highlights: string[]
  url: string
  stars: number
  forks: number
  lastUpdated: string
}

export interface UserProfile {
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  html_url: string
}
