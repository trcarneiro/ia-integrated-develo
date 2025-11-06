// Integração com Google Sheets CRM + Gemini AI
// Para usar: configure as variáveis de ambiente GEMINI_API_KEY e GOOGLE_SHEET_ID

interface LeadData {
  name: string
  email: string
  company?: string
  phone?: string
  source: 'Exit Popup' | 'Contact Form' | 'Chatbot' | 'LinkedIn'
  message?: string
  service?: string
  budget?: string
  timeline?: string
}

interface LeadAnalysis {
  score: number // 0-100
  systemType: string
  urgency: 'Baixa' | 'Média' | 'Alta'
  budget: '<3k' | '3-10k' | '>10k' | 'Desconhecido'
  nextAction: string
  notes: string
}

// Analisar lead com Gemini (mock para hospedagem estática)
export async function analyzeLeadWithGemini(leadData: LeadData): Promise<LeadAnalysis> {
  // Em produção com backend, usar Gemini API real
  // Por enquanto, retorna análise baseada em heurísticas
  
  const score = calculateLeadScore(leadData)
  const urgency = determineUrgency(leadData)
  const budget = estimateBudget(leadData)
  
  return {
    score,
    systemType: extractSystemType(leadData.message || ''),
    urgency,
    budget,
    nextAction: generateNextAction(score, urgency),
    notes: generateNotes(leadData, score)
  }
}

// Calcular score do lead (0-100)
function calculateLeadScore(lead: LeadData): number {
  let score = 50 // Base

  // Fonte (+10 para formulário detalhado)
  if (lead.source === 'Contact Form') score += 10
  if (lead.source === 'Chatbot') score += 5

  // Informações fornecidas
  if (lead.company) score += 10
  if (lead.phone) score += 10
  if (lead.message && lead.message.length > 50) score += 15

  // Palavras-chave na mensagem
  const keywords = ['urgente', 'quanto antes', 'preciso', 'erp', 'sistema', 'automação', 'integração']
  const messageText = (lead.message || '').toLowerCase()
  keywords.forEach(keyword => {
    if (messageText.includes(keyword)) score += 3
  })

  // Budget identificado
  if (lead.budget && lead.budget !== '') score += 10

  return Math.min(score, 100)
}

// Determinar urgência
function determineUrgency(lead: LeadData): 'Baixa' | 'Média' | 'Alta' {
  const messageText = (lead.message || '').toLowerCase()
  
  const urgentKeywords = ['urgente', 'imediato', 'agora', 'quanto antes', 'rápido']
  const mediumKeywords = ['semana', 'mês', 'breve', 'em breve']
  
  if (urgentKeywords.some(k => messageText.includes(k))) return 'Alta'
  if (mediumKeywords.some(k => messageText.includes(k))) return 'Média'
  
  return 'Baixa'
}

// Estimar budget
function estimateBudget(lead: LeadData): '<3k' | '3-10k' | '>10k' | 'Desconhecido' {
  if (lead.budget) {
    const budgetLower = lead.budget.toLowerCase()
    if (budgetLower.includes('até') && (budgetLower.includes('3000') || budgetLower.includes('3.000'))) {
      return '<3k'
    }
    if (budgetLower.includes('10') || budgetLower.includes('dez')) {
      return '>10k'
    }
    return '3-10k'
  }
  
  // Inferir do tipo de serviço
  const messageText = (lead.message || '').toLowerCase()
  if (messageText.includes('scraping') || messageText.includes('simples')) return '<3k'
  if (messageText.includes('erp') || messageText.includes('legado') || messageText.includes('complexo')) return '>10k'
  
  return 'Desconhecido'
}

// Extrair tipo de sistema da mensagem
function extractSystemType(message: string): string {
  const messageLower = message.toLowerCase()
  
  if (messageLower.includes('access')) return 'Microsoft Access'
  if (messageLower.includes('erp')) return 'ERP'
  if (messageLower.includes('crm')) return 'CRM'
  if (messageLower.includes('totvs')) return 'Totvs'
  if (messageLower.includes('sap')) return 'SAP'
  if (messageLower.includes('php')) return 'Sistema PHP'
  if (messageLower.includes('excel') || messageLower.includes('planilha')) return 'Excel/Planilhas'
  if (messageLower.includes('sql') || messageLower.includes('banco')) return 'Banco de Dados'
  
  return 'Não identificado'
}

// Gerar próxima ação
function generateNextAction(score: number, urgency: 'Baixa' | 'Média' | 'Alta'): string {
  if (score >= 80 && urgency === 'Alta') {
    return 'Ligar AGORA (lead quente urgente!)'
  }
  if (score >= 80) {
    return 'Ligar hoje até 18h'
  }
  if (score >= 60 && urgency === 'Alta') {
    return 'WhatsApp hoje'
  }
  if (score >= 60) {
    return 'Email personalizado em 24h'
  }
  if (score >= 40) {
    return 'Email template em 48h'
  }
  return 'Adicionar a campanha de nutrição'
}

// Gerar notas sobre o lead
function generateNotes(lead: LeadData, score: number): string {
  const notes: string[] = []
  
  if (score >= 80) {
    notes.push('🔥 Lead QUENTE - Priorizar!')
  }
  
  if (!lead.company) {
    notes.push('⚠️ Empresa não informada')
  }
  
  if (!lead.phone) {
    notes.push('📱 Telefone não informado - pedir no primeiro contato')
  }
  
  if (lead.message && lead.message.length > 100) {
    notes.push('✅ Lead detalhado, problema bem descrito')
  }
  
  const messageText = (lead.message || '').toLowerCase()
  if (messageText.includes('orçamento')) {
    notes.push('💰 Pediu orçamento - enviar proposta')
  }
  
  if (messageText.includes('reunião') || messageText.includes('conversar')) {
    notes.push('📅 Quer agendar reunião')
  }
  
  return notes.join(' | ')
}

// Salvar lead formatado para exportação
export function formatLeadForExport(lead: LeadData, analysis: LeadAnalysis) {
  return {
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('pt-BR'),
    time: new Date().toLocaleTimeString('pt-BR'),
    name: lead.name,
    email: lead.email,
    company: lead.company || 'Não informado',
    phone: lead.phone || 'Não informado',
    source: lead.source,
    score: analysis.score,
    status: 'Novo',
    urgency: analysis.urgency,
    budget: analysis.budget,
    systemType: analysis.systemType,
    service: lead.service || 'Não especificado',
    timeline: lead.timeline || 'Não informado',
    message: lead.message || '',
    nextAction: analysis.nextAction,
    notes: analysis.notes,
  }
}

// Exportar todos leads do localStorage para CSV
export function exportLeadsToCSV() {
  const exitLeads = JSON.parse(localStorage.getItem('exit-leads') || '[]')
  const contactLeads = JSON.parse(localStorage.getItem('contact-leads') || '[]')
  
  const allLeads = [
    ...exitLeads.map((l: any) => ({
      ...l,
      source: 'Exit Popup' as const,
    })),
    ...contactLeads.map((l: any) => ({
      ...l,
      source: 'Contact Form' as const,
    }))
  ]
  
  if (allLeads.length === 0) {
    alert('Nenhum lead para exportar')
    return
  }
  
  // Analisar todos leads
  const analyzed = allLeads.map(lead => {
    const analysis = analyzeLeadWithGemini(lead)
    return formatLeadForExport(lead, analysis as any)
  })
  
  // Gerar CSV
  const headers = [
    'Data',
    'Hora',
    'Nome',
    'Email',
    'Empresa',
    'Telefone',
    'Fonte',
    'Score',
    'Status',
    'Urgência',
    'Budget',
    'Sistema',
    'Serviço',
    'Prazo',
    'Mensagem',
    'Próxima Ação',
    'Notas'
  ]
  
  const rows = analyzed.map(lead => [
    lead.date,
    lead.time,
    lead.name,
    lead.email,
    lead.company,
    lead.phone,
    lead.source,
    lead.score,
    lead.status,
    lead.urgency,
    lead.budget,
    lead.systemType,
    lead.service,
    lead.timeline,
    `"${lead.message.replace(/"/g, '""')}"`, // Escape quotes
    lead.nextAction,
    lead.notes,
  ])
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  // Download
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }) // BOM para UTF-8
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `leads_altostratus_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  alert(`${allLeads.length} leads exportados com sucesso!`)
}

// Gerar relatório de leads para WhatsApp
export function generateLeadsReport(): string {
  const exitLeads = JSON.parse(localStorage.getItem('exit-leads') || '[]')
  const contactLeads = JSON.parse(localStorage.getItem('contact-leads') || '[]')
  
  const allLeads = [
    ...exitLeads.map((l: any) => ({ ...l, source: 'Exit Popup' })),
    ...contactLeads.map((l: any) => ({ ...l, source: 'Contact Form' }))
  ]
  
  if (allLeads.length === 0) {
    return '📊 Sem leads para reportar'
  }
  
  const analyzed = allLeads.map(lead => ({
    ...lead,
    analysis: analyzeLeadWithGemini(lead as any)
  }))
  
  const hotLeads = analyzed.filter((l: any) => l.analysis.score >= 80)
  const urgentLeads = analyzed.filter((l: any) => l.analysis.urgency === 'Alta')
  
  let report = `📊 *RELATÓRIO DE LEADS - ${new Date().toLocaleDateString('pt-BR')}*\n\n`
  report += `📈 Total: ${allLeads.length} leads\n`
  report += `🔥 Quentes (80+): ${hotLeads.length}\n`
  report += `⚡ Urgentes: ${urgentLeads.length}\n\n`
  
  if (hotLeads.length > 0) {
    report += `🔥 *LEADS QUENTES:*\n`
    hotLeads.slice(0, 5).forEach((lead: any, i: number) => {
      report += `\n${i + 1}. ${lead.name}\n`
      report += `   Email: ${lead.email}\n`
      report += `   Score: ${lead.analysis.score}/100\n`
      report += `   Ação: ${lead.analysis.nextAction}\n`
    })
  }
  
  return report
}
