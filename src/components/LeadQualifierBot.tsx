import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Robot, PaperPlaneRight, Sparkle } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { qualifyLead } from '@/lib/ai-automation'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

interface ConversationState {
  step: 'welcome' | 'system' | 'problem' | 'urgency' | 'budget' | 'analyzing' | 'result'
  data: {
    systemDescription?: string
    problemDescription?: string
    urgency?: string
    budget?: string
  }
}

export function LeadQualifierBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! 👋 Sou o assistente virtual. Vou fazer algumas perguntas rápidas para entender melhor seu projeto e te dar uma avaliação inicial. Pronto para começar?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [state, setState] = useState<ConversationState>({
    step: 'welcome',
    data: {}
  })
  const [isTyping, setIsTyping] = useState(false)
  const [qualification, setQualification] = useState<any>(null)

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      sender,
      timestamp: new Date()
    }])
  }

  const botReply = async (text: string, delay = 1000) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, delay))
    addMessage(text, 'bot')
    setIsTyping(false)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    addMessage(userMessage, 'user')
    setInput('')

    // Lógica do fluxo de conversa
    if (state.step === 'welcome') {
      setState(prev => ({ ...prev, step: 'system' }))
      await botReply('Perfeito! Primeiro, me conta: qual sistema você usa hoje? (Ex: Access, ERP Totvs, sistema próprio em PHP, planilhas Excel, etc.)')
    } 
    else if (state.step === 'system') {
      setState(prev => ({
        ...prev,
        step: 'problem',
        data: { ...prev.data, systemDescription: userMessage }
      }))
      await botReply('Entendi! E qual o principal problema ou desafio que você quer resolver? (Ex: processo manual demorado, falta de integração, relatórios demorados, etc.)')
    }
    else if (state.step === 'problem') {
      setState(prev => ({
        ...prev,
        step: 'urgency',
        data: { ...prev.data, problemDescription: userMessage }
      }))
      await botReply('Certo! Qual a urgência desse projeto? Digite: (1) Urgente - preciso para ontem, (2) Médio - próximos 2-3 meses, (3) Baixo - estou planejando')
    }
    else if (state.step === 'urgency') {
      const urgencyMap: Record<string, string> = {
        '1': 'high',
        '2': 'medium',
        '3': 'low'
      }
      const urgency = urgencyMap[userMessage] || 'medium'
      
      setState(prev => ({
        ...prev,
        step: 'budget',
        data: { ...prev.data, urgency }
      }))
      await botReply('Última pergunta! Qual seu orçamento aproximado? Digite: (1) Até R$3.000, (2) R$3.000-10.000, (3) Acima de R$10.000, (4) Ainda não sei')
    }
    else if (state.step === 'budget') {
      const budgetMap: Record<string, string> = {
        '1': 'small',
        '2': 'medium',
        '3': 'large',
        '4': 'medium'
      }
      const budget = budgetMap[userMessage] || 'medium'
      
      setState(prev => ({
        ...prev,
        step: 'analyzing',
        data: { ...prev.data, budget }
      }))
      
      await botReply('Perfeito! Estou analisando seu projeto com IA... Um momento! 🤖✨', 500)
      
      // Chamar IA para qualificar
      try {
        const result = await qualifyLead({
          systemDescription: state.data.systemDescription || '',
          problemDescription: state.data.problemDescription || '',
          urgency: state.data.urgency || 'medium',
          budget: budget
        })
        
        setQualification(result)
        setState(prev => ({ ...prev, step: 'result' }))
        
        // Mensagem personalizada baseada no score
        let responseText = ''
        if (result.score >= 80) {
          responseText = `Excelente! 🎉 Seu projeto é muito interessante e se encaixa perfeitamente no meu perfil de trabalho.\n\n📊 Score de adequação: ${result.score}/100\n🎯 Prioridade: Alta\n\nPróximos passos:\n${result.nextSteps.map((step: string, i: number) => `${i+1}. ${step}`).join('\n')}\n\nVamos agendar uma conversa? Posso te passar uma proposta detalhada em 24h!`
        } else if (result.score >= 50) {
          responseText = `Ótimo! 👍 Seu projeto tem potencial. Preciso de mais algumas informações para montar uma proposta adequada.\n\n📊 Score: ${result.score}/100\n\nPróximos passos:\n${result.nextSteps.map((step: string, i: number) => `${i+1}. ${step}`).join('\n')}\n\nQue tal agendarmos uma call rápida de 15min para alinharmos melhor?`
        } else {
          responseText = `Obrigado pelas informações! 🤔\n\nPelo que entendi, pode ser que seu projeto precise de um escopo mais detalhado ou talvez uma abordagem diferente.\n\n${result.nextSteps.map((step: string, i: number) => `${i+1}. ${step}`).join('\n')}\n\nVamos conversar melhor? Posso te dar uma consultoria inicial gratuita para entendermos a melhor solução!`
        }
        
        await botReply(responseText, 2000)
      } catch (error) {
        await botReply('Ops! Tive um problema na análise. Mas não se preocupe, vamos conversar diretamente! Me chama no WhatsApp ou preenche o formulário de contato. 😊')
      }
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Robot size={20} weight="duotone" className="text-primary" />
            <span className="text-sm font-medium">Assistente com IA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Converse Com Meu Assistente Virtual
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Responda 4 perguntas rápidas e receba uma avaliação personalizada do seu projeto
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Robot size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-base">Assistente de Projetos</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {qualification && (
                <div className="border-t p-4 bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Score de Adequação</span>
                    <Badge variant={qualification.score >= 80 ? 'default' : qualification.score >= 50 ? 'secondary' : 'outline'}>
                      {qualification.score}/100
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Sistema:</span>
                      <p className="font-semibold">{qualification.systemType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Urgência:</span>
                      <p className="font-semibold capitalize">{qualification.urgency}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Orçamento:</span>
                      <p className="font-semibold capitalize">{qualification.budget}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t p-4 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua resposta..."
                  disabled={isTyping || state.step === 'analyzing'}
                />
                <Button
                  onClick={handleSend}
                  disabled={isTyping || state.step === 'analyzing' || !input.trim()}
                  size="icon"
                >
                  <PaperPlaneRight size={20} weight="fill" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
