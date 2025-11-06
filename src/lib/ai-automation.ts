// Biblioteca de automação com IA para análise de projetos

interface ROIAnalysis {
  monthlyTimeSaved: number
  annualSavings: number
  paybackMonths: number
  recommendedSolution: string
  complexity: 'simple' | 'medium' | 'complex'
  estimatedPrice: string
}

interface ProjectComplexity {
  complexity: 'simple' | 'medium' | 'complex'
  estimatedHours: number
  priceRange: string
  technologies: string[]
  risks: string[]
  timeline: string
}

interface FeasibilityCheck {
  feasible: boolean
  confidence: number
  reasoning: string
  alternatives: string[]
  estimatedComplexity: string
}

interface LeadQualification {
  score: number // 0-100
  systemType: string
  urgency: 'low' | 'medium' | 'high'
  budget: 'small' | 'medium' | 'large'
  nextSteps: string[]
  priority: boolean
}

export async function calculateROI(params: {
  monthlyHours: number
  hourlyCost: number
  taskDescription: string
}): Promise<ROIAnalysis> {
  const { monthlyHours, hourlyCost, taskDescription } = params

  const prompt = `
Você é um consultor especializado em automação e ROI. Analise:

TAREFA ATUAL:
- Horas mensais: ${monthlyHours}h
- Custo por hora: R$${hourlyCost}
- Descrição: "${taskDescription}"

Retorne JSON exato:
{
  "monthlyTimeSaved": <horas economizadas por mês>,
  "annualSavings": <economia anual em R$>,
  "paybackMonths": <meses para retorno do investimento>,
  "recommendedSolution": "<melhor solução de automação>",
  "complexity": "simple"|"medium"|"complex",
  "estimatedPrice": "R$ X.XXX - R$ X.XXX"
}

Considere:
- Automação pode economizar 70-90% do tempo em tarefas repetitivas
- Investimento típico: R$2.500-8.000
- Seja realista e conservador nas estimativas
`

  try {
    const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    const analysis = JSON.parse(result)
    return analysis
  } catch (error) {
    console.error('ROI calculation error:', error)
    // Fallback com cálculo simples
    const monthlySavings = monthlyHours * hourlyCost * 0.8
    const annualSavings = monthlySavings * 12
    return {
      monthlyTimeSaved: monthlyHours * 0.8,
      annualSavings,
      paybackMonths: 3,
      recommendedSolution: 'Automação com Python + IA',
      complexity: 'medium',
      estimatedPrice: 'R$ 3.500 - R$ 6.000'
    }
  }
}

export async function analyzeProjectComplexity(description: string): Promise<ProjectComplexity> {
  const prompt = `
Você é um especialista em integração de sistemas legados com IA. Analise este projeto:

"${description}"

Retorne JSON exato:
{
  "complexity": "simple"|"medium"|"complex",
  "estimatedHours": <número de horas>,
  "priceRange": "R$ X.XXX - R$ X.XXX",
  "technologies": ["tech1", "tech2"],
  "risks": ["risco1", "risco2"],
  "timeline": "X-Y semanas"
}

Critérios de complexidade:
- Simple: scraping básico, integrações API simples (40-80h)
- Medium: integrações legado+IA, APIs customizadas (80-160h)
- Complex: sistemas críticos, múltiplas integrações, alta carga (160h+)
`

  try {
    const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    return JSON.parse(result)
  } catch (error) {
    console.error('Complexity analysis error:', error)
    return {
      complexity: 'medium',
      estimatedHours: 100,
      priceRange: 'R$ 4.000 - R$ 7.000',
      technologies: ['Python', 'APIs REST', 'IA'],
      risks: ['Dependência de sistema legado', 'Dados não estruturados'],
      timeline: '3-4 semanas'
    }
  }
}

export async function checkFeasibility(params: {
  legacySystem: string
  desiredIntegration: string
  constraints: string[]
}): Promise<FeasibilityCheck> {
  const { legacySystem, desiredIntegration, constraints } = params

  const prompt = `
Você é um especialista em integração de sistemas legados. Avalie a viabilidade:

SISTEMA LEGADO: ${legacySystem}
INTEGRAÇÃO DESEJADA: ${desiredIntegration}
RESTRIÇÕES: ${constraints.join(', ')}

Retorne JSON exato:
{
  "feasible": true|false,
  "confidence": <0-100>,
  "reasoning": "<explicação técnica clara>",
  "alternatives": ["alternativa1", "alternativa2"],
  "estimatedComplexity": "baixa"|"média"|"alta"
}

Considere:
- Sistemas DOS/antigos SEM rede podem precisar camada intermediária
- Access/VB/Delphi são totalmente integráveis via ODBC/APIs
- IA pode funcionar offline com modelos locais se necessário
`

  try {
    const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    return JSON.parse(result)
  } catch (error) {
    console.error('Feasibility check error:', error)
    return {
      feasible: true,
      confidence: 70,
      reasoning: 'Maioria dos sistemas legados pode ser integrada via APIs',
      alternatives: ['API REST sobre o sistema', 'Camada de sincronização', 'Modernização parcial'],
      estimatedComplexity: 'média'
    }
  }
}

export async function qualifyLead(params: {
  systemDescription: string
  problemDescription: string
  urgency: string
  budget: string
}): Promise<LeadQualification> {
  const { systemDescription, problemDescription, urgency, budget } = params

  const prompt = `
Você é um consultor de vendas técnico. Qualifique este lead:

SISTEMA: ${systemDescription}
PROBLEMA: ${problemDescription}
URGÊNCIA: ${urgency}
ORÇAMENTO: ${budget}

Retorne JSON exato:
{
  "score": <0-100, quanto maior melhor o lead>,
  "systemType": "<Access|ERP|CRM|Custom|etc>",
  "urgency": "low"|"medium"|"high",
  "budget": "small"|"medium"|"large",
  "nextSteps": ["passo1", "passo2"],
  "priority": true|false
}

Score alto (80+) = sistema identificável + problema claro + orçamento adequado
Score médio (50-79) = falta informações mas tem potencial
Score baixo (<50) = muito vago ou orçamento inadequado

Budget:
- small: < R$3.000
- medium: R$3.000-10.000
- large: > R$10.000
`

  try {
    const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    return JSON.parse(result)
  } catch (error) {
    console.error('Lead qualification error:', error)
    return {
      score: 60,
      systemType: 'Unknown',
      urgency: 'medium',
      budget: 'medium',
      nextSteps: ['Agendar conversa', 'Analisar sistema atual'],
      priority: false
    }
  }
}
