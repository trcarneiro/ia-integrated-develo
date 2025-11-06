import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  WhatsappLogo, 
  TrendUp, 
  Users, 
  Fire, 
  Clock 
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { exportLeadsToCSV, generateLeadsReport, analyzeLeadWithGemini, formatLeadForExport } from '@/lib/crm-analytics'
import { toast } from 'sonner'

interface Lead {
  name: string
  email: string
  company?: string
  source: string
  date?: string
  timestamp?: string
  message?: string
  score?: number
  urgency?: string
}

export function LeadsDashboard() {
  const [leads, setLeads] = useState<any[]>([])
  const [stats, setStats] = useState({
    total: 0,
    hot: 0,
    urgent: 0,
    today: 0
  })

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    const exitLeads = JSON.parse(localStorage.getItem('exit-leads') || '[]')
    const contactLeads = JSON.parse(localStorage.getItem('contact-leads') || '[]')
    
    const allLeads = [
      ...exitLeads.map((l: any) => ({ ...l, source: 'Exit Popup' })),
      ...contactLeads.map((l: any) => ({ ...l, source: 'Contact Form' }))
    ]
    
    // Analisar todos leads
    const analyzed = await Promise.all(
      allLeads.map(async (lead) => {
        const analysis = await analyzeLeadWithGemini(lead as any)
        return formatLeadForExport(lead as any, analysis)
      })
    )
    
    // Ordenar por score (maior primeiro)
    analyzed.sort((a, b) => b.score - a.score)
    
    setLeads(analyzed)
    
    // Calcular estatísticas
    const today = new Date().toDateString()
    setStats({
      total: analyzed.length,
      hot: analyzed.filter(l => l.score >= 80).length,
      urgent: analyzed.filter(l => l.urgency === 'Alta').length,
      today: analyzed.filter(l => new Date(l.timestamp).toDateString() === today).length
    })
  }

  const handleExportCSV = () => {
    exportLeadsToCSV()
  }

  const handleSendReport = () => {
    const report = generateLeadsReport()
    const encoded = encodeURIComponent(report)
    window.open(`https://wa.me/?text=${encoded}`, '_blank')
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50'
    if (score >= 60) return 'text-orange-600 bg-orange-50'
    if (score >= 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  const getUrgencyColor = (urgency: string) => {
    if (urgency === 'Alta') return 'destructive'
    if (urgency === 'Média') return 'default'
    return 'secondary'
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard de Leads</h1>
            <p className="text-muted-foreground">
              Análise inteligente com IA
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleExportCSV} className="gap-2">
              <Download size={20} />
              Exportar CSV
            </Button>
            <Button onClick={handleSendReport} variant="outline" className="gap-2">
              <WhatsappLogo size={20} weight="fill" />
              Enviar Relatório
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Leads
                </CardTitle>
                <Users size={20} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Todos os leads capturados
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leads Quentes
                </CardTitle>
                <Fire size={20} className="text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{stats.hot}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Score 80+ - Priorizar!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Urgência Alta
                </CardTitle>
                <Clock size={20} className="text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{stats.urgent}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Contatar hoje
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hoje
                </CardTitle>
                <TrendUp size={20} className="text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.today}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Novos leads hoje
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Leads List */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Leads</CardTitle>
            <CardDescription>
              Ordenados por score (maior para menor)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Nenhum lead ainda</p>
                <p className="text-sm">Leads aparecerão aqui quando visitantes preencherem os formulários</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <Badge className={getScoreColor(lead.score)}>
                            Score: {lead.score}
                          </Badge>
                          <Badge variant={getUrgencyColor(lead.urgency)}>
                            {lead.urgency}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>📧 {lead.email}</p>
                          {lead.company && <p>🏢 {lead.company}</p>}
                          {lead.phone && <p>📱 {lead.phone}</p>}
                          <p>📍 Fonte: {lead.source}</p>
                          <p>💰 Budget: {lead.budget}</p>
                          <p>🖥️ Sistema: {lead.systemType}</p>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{lead.date}</p>
                        <p className="text-xs">{lead.time}</p>
                      </div>
                    </div>
                    
                    {lead.message && (
                      <div className="mt-3 p-3 bg-muted rounded text-sm">
                        <p className="font-medium mb-1">Mensagem:</p>
                        <p className="text-muted-foreground">{lead.message}</p>
                      </div>
                    )}
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">📋 Próxima Ação:</p>
                          <p className="text-sm text-primary">{lead.nextAction}</p>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => {
                            window.open(`https://wa.me/5531993074190?text=Olá ${lead.name}!`, '_blank')
                          }}
                          className="gap-2"
                        >
                          <WhatsappLogo size={16} weight="fill" />
                          Contactar
                        </Button>
                      </div>
                      
                      {lead.notes && (
                        <p className="text-xs text-muted-foreground mt-2">
                          💡 {lead.notes}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
