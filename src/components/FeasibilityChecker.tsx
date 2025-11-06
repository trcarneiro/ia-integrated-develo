import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Warning, Lightbulb, ArrowRight, Sparkle } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { checkFeasibility } from '@/lib/ai-automation'
import { toast } from 'sonner'

export function FeasibilityChecker() {
  const [legacySystem, setLegacySystem] = useState('')
  const [desiredIntegration, setDesiredIntegration] = useState('')
  const [constraints, setConstraints] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleCheck = async () => {
    if (!legacySystem || !desiredIntegration) {
      toast.error('Preencha pelo menos o sistema e a integração desejada')
      return
    }

    setIsChecking(true)
    try {
      const analysis = await checkFeasibility({
        legacySystem,
        desiredIntegration,
        constraints: constraints.split(',').map(c => c.trim()).filter(Boolean)
      })
      setResult(analysis)
      toast.success('Análise concluída!')
    } catch (error) {
      toast.error('Erro na análise. Tente novamente.')
    } finally {
      setIsChecking(false)
    }
  }

  const exampleCases = [
    { system: 'Access 2003', integration: 'ChatGPT para análise de dados', feasible: true },
    { system: 'Sistema DOS', integration: 'API REST moderna', feasible: true },
    { system: 'ERP Totvs', integration: 'WhatsApp Bot com IA', feasible: true },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Sparkle size={20} weight="fill" className="text-primary" />
            <span className="text-sm font-medium">Validação Técnica com IA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            É Possível Integrar Meu Sistema?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra em segundos se sua integração é viável tecnicamente
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Descreva Sua Situação</CardTitle>
                <CardDescription>
                  IA vai analisar a viabilidade técnica instantaneamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system">Seu sistema atual *</Label>
                  <Input
                    id="system"
                    placeholder="Ex: Access 97, ERP Microsiga, Sistema PHP próprio"
                    value={legacySystem}
                    onChange={(e) => setLegacySystem(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="integration">O que quer integrar? *</Label>
                  <Input
                    id="integration"
                    placeholder="Ex: ChatGPT, API moderna, Dashboard web"
                    value={desiredIntegration}
                    onChange={(e) => setDesiredIntegration(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constraints">Restrições ou limitações (opcional)</Label>
                  <Textarea
                    id="constraints"
                    placeholder="Ex: sem internet, Windows XP, não pode mexer no código original"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separe múltiplas restrições com vírgula
                  </p>
                </div>

                <Button
                  onClick={handleCheck}
                  disabled={isChecking}
                  className="w-full"
                  size="lg"
                >
                  {isChecking ? (
                    <>
                      <Sparkle size={20} className="mr-2 animate-spin" />
                      Analisando Viabilidade...
                    </>
                  ) : (
                    <>
                      Verificar Viabilidade
                      <ArrowRight size={20} className="ml-2" />
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-xs font-semibold mb-2 text-muted-foreground">
                    EXEMPLOS DE INTEGRAÇÕES JÁ FEITAS:
                  </p>
                  <div className="space-y-2">
                    {exampleCases.map((example, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" weight="fill" />
                        <span>
                          <strong>{example.system}</strong> + {example.integration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {result ? (
              <Card className={result.feasible ? 'border-green-500/50 bg-green-500/5' : 'border-yellow-500/50 bg-yellow-500/5'}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {result.feasible ? (
                      <CheckCircle size={32} weight="duotone" className="text-green-500" />
                    ) : (
                      <Warning size={32} weight="duotone" className="text-yellow-500" />
                    )}
                    <div>
                      <CardTitle>
                        {result.feasible ? '✅ É Viável!' : '⚠️ Possível com Adaptações'}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">Confiança:</span>
                        <Badge variant={result.confidence >= 80 ? 'default' : 'secondary'}>
                          {result.confidence}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb size={16} className="text-primary" weight="duotone" />
                      Análise Técnica
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {result.reasoning}
                    </p>
                  </div>

                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm font-semibold mb-2">Complexidade Estimada</p>
                    <Badge variant="outline" className="capitalize">
                      {result.estimatedComplexity}
                    </Badge>
                  </div>

                  {result.alternatives && result.alternatives.length > 0 && (
                    <div className="bg-card p-4 rounded-lg border">
                      <p className="text-sm font-semibold mb-2">Abordagens Possíveis</p>
                      <ul className="space-y-2">
                        {result.alternatives.map((alt: string, i: number) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <ArrowRight size={16} className="text-primary flex-shrink-0 mt-0.5" />
                            <span>{alt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {result.feasible ? 'Solicitar Orçamento' : 'Discutir Alternativas'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Análise preliminar. Posso dar mais detalhes em uma conversa!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center bg-muted/30">
                <CardContent className="text-center py-12">
                  <Lightbulb size={64} className="mx-auto mb-4 text-muted-foreground/50" weight="duotone" />
                  <p className="text-muted-foreground mb-4">
                    Preencha os dados ao lado para descobrir se sua integração é viável
                  </p>
                  <p className="text-xs text-muted-foreground">
                    💡 Dica: Quanto mais detalhes você fornecer, melhor será a análise!
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
