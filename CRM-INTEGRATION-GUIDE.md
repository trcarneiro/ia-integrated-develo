# 🔗 INTEGRAÇÃO CRM COM MCP + GEMINI

## 📋 Opções de CRM via MCP

### 1. **Google Sheets MCP** (Recomendado - Mais Simples)
**Por quê escolher:**
- ✅ Gratuito ilimitado
- ✅ Fácil visualização (planilha)
- ✅ Colaboração em tempo real
- ✅ API robusta do Google
- ✅ Integra com Gemini facilmente

**MCP Server**: `@modelcontextprotocol/server-google-sheets`

**Setup:**
```bash
npm install @modelcontextprotocol/server-google-sheets
```

**Funcionalidades:**
- Criar/ler/atualizar leads em planilha
- Filtrar por score, urgência, status
- Gemini analisa leads e sugere ações
- Dashboard automático com gráficos

---

### 2. **HubSpot MCP** (Profissional)
**Por quê escolher:**
- ✅ CRM profissional completo
- ✅ Plano gratuito até 1 milhão de contatos
- ✅ Automações nativas
- ✅ Pipeline visual

**MCP Server**: `@modelcontextprotocol/server-hubspot` (ou custom)

---

### 3. **Airtable MCP** (Híbrido)
**Por quê escolher:**
- ✅ Interface bonita (melhor que Sheets)
- ✅ Campos customizáveis
- ✅ Views (Kanban, Calendar, Gallery)
- ✅ 1.200 registros grátis/base

---

### 4. **Notion MCP** (Organização)
**Por quê escolher:**
- ✅ Você já deve usar Notion
- ✅ Database + documentação
- ✅ Templates ricos
- ✅ Colaboração

**MCP Server**: `@modelcontextprotocol/server-notion`

---

## 🎯 RECOMENDAÇÃO: Google Sheets + Gemini

**Por quê?**
1. **Zero custo**
2. **Setup em 10 minutos**
3. **Gemini já integrado com Google Workspace**
4. **Fácil de compartilhar com clientes**

---

## 🚀 IMPLEMENTAÇÃO: Google Sheets CRM

### Passo 1: Criar Planilha de Leads

Crie uma planilha com estas colunas:

| Timestamp | Nome | Email | Empresa | Fonte | Score | Status | Próxima Ação | Notas |
|-----------|------|-------|---------|-------|-------|--------|--------------|-------|
| 2025-11-06 10:30 | Carlos Silva | carlos@empresa.com | Distribuidora XYZ | Exit Popup | 85 | Novo | Ligar hoje | Interessado em ERP+IA |

**Colunas detalhadas:**
- **Timestamp**: Data/hora de captura
- **Nome**: Nome do lead
- **Email**: Email de contato
- **Empresa**: Nome da empresa
- **Telefone**: WhatsApp/celular
- **Fonte**: Exit Popup / Formulário / Chatbot / LinkedIn
- **Score**: 0-100 (qualificação automática)
- **Status**: Novo / Contatado / Proposta / Ganho / Perdido
- **Urgência**: Baixa / Média / Alta
- **Budget**: < R$3k / R$3-10k / > R$10k
- **Sistema Atual**: Access / ERP / CRM / Outro
- **Problema**: Descrição do desafio
- **Próxima Ação**: O que fazer next
- **Notas**: Observações gerais

---

### Passo 2: Configurar MCP Server

**A. Instalar dependências:**
```bash
npm install @google/generative-ai googleapis
```

**B. Criar arquivo `.env.local`:**
```env
GOOGLE_SHEETS_API_KEY=sua_key_aqui
GOOGLE_SHEET_ID=id_da_planilha
GEMINI_API_KEY=sua_gemini_key
```

**C. Criar `src/lib/crm-integration.ts`:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai"
import { google } from 'googleapis'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const sheets = google.sheets('v4')
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

// Salvar lead no Google Sheets
export async function saveLeadToCRM(leadData: any) {
  const authClient = await auth.getClient()
  
  // Usar Gemini para qualificar e enriquecer lead
  const analysis = await analyzeLeadWithGemini(leadData)
  
  const row = [
    new Date().toISOString(),
    leadData.name,
    leadData.email,
    leadData.company || '',
    leadData.source, // 'Exit Popup', 'Contact Form', 'Chatbot'
    analysis.score,
    'Novo',
    analysis.nextAction,
    analysis.notes,
    leadData.message || '',
    analysis.systemType,
    analysis.urgency,
    analysis.budget,
  ]
  
  await sheets.spreadsheets.values.append({
    auth: authClient as any,
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Leads!A:M',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  })
  
  return analysis
}

// Analisar lead com Gemini
async function analyzeLeadWithGemini(leadData: any) {
  const prompt = `
Analise este lead e retorne JSON:

Lead:
- Nome: ${leadData.name}
- Email: ${leadData.email}
- Empresa: ${leadData.company || 'Não informado'}
- Mensagem: ${leadData.message || 'Sem mensagem'}
- Fonte: ${leadData.source}

Retorne JSON exato:
{
  "score": <0-100, qualidade do lead>,
  "systemType": "<Access|ERP|CRM|Custom|Desconhecido>",
  "urgency": "Baixa"|"Média"|"Alta",
  "budget": "<3k"|"3-10k"|">10k"|"Desconhecido",
  "nextAction": "<ação específica ex: Ligar hoje às 14h>",
  "notes": "<insights sobre o lead, pontos de atenção>"
}

Critérios de score:
- 80-100: Lead quente (empresa identificada, problema claro, urgente)
- 50-79: Lead morno (falta informações mas tem potencial)
- 0-49: Lead frio (muito vago, sem urgência)
`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  
  // Remover markdown code block se presente
  const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '')
  return JSON.parse(jsonText)
}

// Buscar leads com filtros
export async function getLeadsFromCRM(filters?: {
  status?: string
  minScore?: number
  urgency?: string
}) {
  const authClient = await auth.getClient()
  
  const response = await sheets.spreadsheets.values.get({
    auth: authClient as any,
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Leads!A:M',
  })
  
  const rows = response.data.values || []
  const [headers, ...data] = rows
  
  let leads = data.map(row => ({
    timestamp: row[0],
    name: row[1],
    email: row[2],
    company: row[3],
    source: row[4],
    score: parseInt(row[5]),
    status: row[6],
    nextAction: row[7],
    notes: row[8],
    message: row[9],
    systemType: row[10],
    urgency: row[11],
    budget: row[12],
  }))
  
  // Aplicar filtros
  if (filters?.status) {
    leads = leads.filter(l => l.status === filters.status)
  }
  if (filters?.minScore) {
    leads = leads.filter(l => l.score >= filters.minScore)
  }
  if (filters?.urgency) {
    leads = leads.filter(l => l.urgency === filters.urgency)
  }
  
  return leads
}

// Atualizar status de lead
export async function updateLeadStatus(
  email: string, 
  newStatus: string,
  notes?: string
) {
  const authClient = await auth.getClient()
  
  // Buscar lead
  const response = await sheets.spreadsheets.values.get({
    auth: authClient as any,
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Leads!A:M',
  })
  
  const rows = response.data.values || []
  const leadIndex = rows.findIndex(row => row[2] === email)
  
  if (leadIndex === -1) return null
  
  // Atualizar status
  await sheets.spreadsheets.values.update({
    auth: authClient as any,
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `Leads!G${leadIndex + 1}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[newStatus]],
    },
  })
  
  // Adicionar nota se fornecida
  if (notes) {
    const currentNotes = rows[leadIndex][8] || ''
    const updatedNotes = `${currentNotes}\n[${new Date().toLocaleString()}] ${notes}`
    
    await sheets.spreadsheets.values.update({
      auth: authClient as any,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `Leads!I${leadIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[updatedNotes]],
      },
    })
  }
  
  return true
}

// Gemini: Sugerir ação para leads antigos
export async function suggestActionsForOldLeads() {
  const leads = await getLeadsFromCRM({ status: 'Novo' })
  
  const oldLeads = leads.filter(lead => {
    const daysSince = (Date.now() - new Date(lead.timestamp).getTime()) / (1000 * 60 * 60 * 24)
    return daysSince > 3 // Leads de 3+ dias sem ação
  })
  
  if (oldLeads.length === 0) return []
  
  const prompt = `
Analise estes leads antigos e sugira ações:

${oldLeads.map((l, i) => `
Lead ${i + 1}:
- Nome: ${l.name}
- Empresa: ${l.company}
- Score: ${l.score}
- Dias sem contato: ${Math.floor((Date.now() - new Date(l.timestamp).getTime()) / (1000 * 60 * 60 * 24))}
- Última nota: ${l.notes}
`).join('\n')}

Para cada lead, sugira:
1. Se vale a pena retomar contato (sim/não)
2. Melhor abordagem (email, WhatsApp, LinkedIn)
3. Mensagem personalizada sugerida

Retorne JSON array.
`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '')
  
  return JSON.parse(jsonText)
}
```

---

### Passo 3: Atualizar Componentes para Usar CRM

**A. ExitIntentPopup.tsx:**
```typescript
import { saveLeadToCRM } from '@/lib/crm-integration'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!email || !name) return

  try {
    // Salvar localmente (fallback)
    saveLeadToStorage({ name, email, date: new Date().toISOString() })
    
    // Salvar no CRM (se disponível)
    if (typeof window !== 'undefined') {
      await fetch('/api/crm/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          source: 'Exit Popup',
          message: 'Interessado em eBook sobre integração IA + Sistemas Legados'
        })
      })
    }
    
    toast.success('✅ eBook enviado para seu email!')
    setTimeout(() => setIsOpen(false), 2000)
  } catch (error) {
    console.error('Error saving lead:', error)
    toast.success('✅ eBook enviado! (salvo localmente)')
  }
}
```

**B. ContactSection.tsx:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  // ... validação
  
  setIsSubmitting(true)

  try {
    // Salvar localmente
    saveLeadToStorage({ ...formData, timestamp: new Date().toISOString() })
    
    // Salvar no CRM com análise Gemini
    const analysis = await fetch('/api/crm/save-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        source: 'Contact Form'
      })
    }).then(r => r.json())
    
    setIsSubmitted(true)
    toast.success(`✅ Mensagem enviada! Score: ${analysis.score}/100`)
    
    // ... reset form
  } catch (error) {
    toast.error('Erro ao enviar. Tente novamente.')
  } finally {
    setIsSubmitting(false)
  }
}
```

---

### Passo 4: Criar API Route (Next.js / Vercel)

**Arquivo: `pages/api/crm/save-lead.ts`** (ou `app/api/crm/save-lead/route.ts` no App Router):

```typescript
import { NextApiRequest, NextApiResponse } from 'next'
import { saveLeadToCRM } from '@/lib/crm-integration'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const leadData = req.body
    const analysis = await saveLeadToCRM(leadData)
    
    return res.status(200).json({
      success: true,
      analysis
    })
  } catch (error) {
    console.error('Error saving lead:', error)
    return res.status(500).json({ 
      success: false,
      error: 'Failed to save lead' 
    })
  }
}
```

---

## 🤖 AUTOMAÇÕES COM GEMINI

### 1. **Email Automático de Follow-up**

```typescript
// src/lib/crm-automation.ts
export async function sendFollowUpEmail(leadEmail: string) {
  const leads = await getLeadsFromCRM()
  const lead = leads.find(l => l.email === leadEmail)
  
  if (!lead) return
  
  const prompt = `
Escreva um email de follow-up para este lead:

- Nome: ${lead.name}
- Empresa: ${lead.company}
- Problema: ${lead.message}
- Score: ${lead.score}
- Dias desde contato: ${Math.floor((Date.now() - new Date(lead.timestamp).getTime()) / (1000 * 60 * 60 * 24))}

Email deve:
1. Ser curto (máx 150 palavras)
2. Referenciar o problema dele
3. Oferecer valor (dica rápida ou case relevante)
4. Call to action claro (agendar 15min de conversa)
5. Tom casual e profissional

Assunto: [sugerir assunto]
Corpo: [email completo]
`

  const result = await model.generateContent(prompt)
  const emailText = result.response.text()
  
  // Aqui você pode integrar com SendGrid, Resend, etc
  console.log('Email gerado:', emailText)
  
  return emailText
}
```

### 2. **Dashboard de Leads com Insights Gemini**

```typescript
// pages/api/crm/dashboard.ts
export async function generateDashboard() {
  const leads = await getLeadsFromCRM()
  
  const stats = {
    total: leads.length,
    novos: leads.filter(l => l.status === 'Novo').length,
    quentes: leads.filter(l => l.score >= 80).length,
    urgentes: leads.filter(l => l.urgency === 'Alta').length,
  }
  
  const prompt = `
Analise estes dados de leads e gere insights:

Estatísticas:
- Total de leads: ${stats.total}
- Novos (não contatados): ${stats.novos}
- Leads quentes (score 80+): ${stats.quentes}
- Urgência alta: ${stats.urgentes}

Top 5 leads por score:
${leads.sort((a, b) => b.score - a.score).slice(0, 5).map(l => 
  `- ${l.name} (${l.company}) - Score: ${l.score}`
).join('\n')}

Gere:
1. 3 insights principais sobre qualidade dos leads
2. Sugestão de priorização (quem contactar primeiro)
3. Padrões identificados (fontes mais qualificadas, etc)
4. Alertas (leads importantes que estão parados há dias)
`

  const result = await model.generateContent(prompt)
  return {
    stats,
    insights: result.response.text()
  }
}
```

---

## 📊 DASHBOARD VISUAL

Crie uma página `/dashboard` para visualizar leads:

```typescript
// pages/dashboard.tsx
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)
  const [insights, setInsights] = useState<string>('')
  
  useEffect(() => {
    fetch('/api/crm/dashboard')
      .then(r => r.json())
      .then(data => {
        setStats(data.stats)
        setInsights(data.insights)
      })
  }, [])
  
  if (!stats) return <div>Carregando...</div>
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Leads</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Novos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{stats.novos}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leads Quentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-600">{stats.quentes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Urgência Alta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600">{stats.urgentes}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Insights do Gemini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {insights.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 🔔 NOTIFICAÇÕES AUTOMÁTICAS

### WhatsApp quando lead quente chega:

```typescript
// Webhook ou cron job
export async function notifyHotLeads() {
  const hotLeads = await getLeadsFromCRM({ minScore: 85, status: 'Novo' })
  
  for (const lead of hotLeads) {
    // Enviar notificação WhatsApp
    await fetch(`https://api.whatsapp.com/send`, {
      method: 'POST',
      body: JSON.stringify({
        phone: 'SEU_NUMERO',
        message: `🔥 Lead QUENTE!\n\nNome: ${lead.name}\nEmpresa: ${lead.company}\nScore: ${lead.score}\nUrgência: ${lead.urgency}\n\nAçao: ${lead.nextAction}`
      })
    })
  }
}
```

---

## 🎯 PRÓXIMOS PASSOS

1. **HOJE**: Criar planilha Google Sheets
2. **AMANHÃ**: Configurar credenciais Google API
3. **DIA 3**: Implementar integração básica
4. **DIA 4**: Testar com leads reais
5. **DIA 5**: Adicionar automações Gemini

---

## 💰 CUSTOS

- **Google Sheets**: Grátis
- **Gemini API**: 
  - Gemini 1.5 Flash: $0.00035/1K caracteres (~R$ 0,0017)
  - 1.000 análises de leads = ~R$ 1,70
- **Total mensal**: < R$ 10 para 1.000+ leads

---

## 📚 RECURSOS

- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Gemini API Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- [MCP Protocol](https://modelcontextprotocol.io/)

---

Quer que eu implemente isso agora? 🚀
