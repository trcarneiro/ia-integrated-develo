import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendUp, Clock, CurrencyDollar, ArrowRight, Sparkle } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { calculateROI } from '@/lib/ai-automation'
import { toast } from 'sonner'

export function ROICalculatorSection() {
  const [monthlyHours, setMonthlyHours] = useState('')
  const [hourlyCost, setHourlyCost] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleCalculate = async () => {
    if (!monthlyHours || !hourlyCost || !taskDescription) {
      toast.error('Preencha todos os campos')
      return
    }

    setIsCalculating(true)
    try {
      const analysis = await calculateROI({
        monthlyHours: parseFloat(monthlyHours),
        hourlyCost: parseFloat(hourlyCost),
        taskDescription
      })
      setResult(analysis)
      toast.success('Análise concluída!')
    } catch (error) {
      toast.error('Erro ao calcular ROI. Tente novamente.')
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
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
            <span className="text-sm font-medium">Calculadora Inteligente com IA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calcule Quanto Você Pode Economizar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            IA analisa sua situação e estima economia real com automação
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
                <CardTitle className="flex items-center gap-2">
                  <Calculator size={24} className="text-primary" />
                  Seus Dados Atuais
                </CardTitle>
                <CardDescription>
                  Preencha as informações sobre a tarefa manual
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Horas gastas por mês nesta tarefa</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="Ex: 40"
                    value={monthlyHours}
                    onChange={(e) => setMonthlyHours(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Considere todas as horas de trabalho manual repetitivo
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Custo por hora (R$)</Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="Ex: 50"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Salário médio do profissional que faz a tarefa
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task">Descreva a tarefa</Label>
                  <Textarea
                    id="task"
                    placeholder="Ex: Extrair dados de notas fiscais em PDF, digitar no sistema, gerar relatório Excel..."
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="w-full group"
                  size="lg"
                >
                  {isCalculating ? (
                    <>
                      <Sparkle size={20} className="mr-2 animate-spin" />
                      Analisando com IA...
                    </>
                  ) : (
                    <>
                      Calcular ROI com IA
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
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
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <TrendUp size={24} weight="duotone" />
                    Sua Economia Potencial
                  </CardTitle>
                  <CardDescription>
                    Análise feita por IA baseada nos seus dados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                      <Clock size={24} className="text-primary mb-2" />
                      <div className="text-2xl font-bold">
                        {result.monthlyTimeSaved}h/mês
                      </div>
                      <p className="text-xs text-muted-foreground">Tempo economizado</p>
                    </div>

                    <div className="bg-card p-4 rounded-lg border">
                      <CurrencyDollar size={24} className="text-primary mb-2" />
                      <div className="text-2xl font-bold">
                        R$ {result.annualSavings.toLocaleString('pt-BR')}
                      </div>
                      <p className="text-xs text-muted-foreground">Economia anual</p>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm font-semibold mb-1">Retorno do Investimento</p>
                    <p className="text-3xl font-bold text-primary mb-1">
                      {result.paybackMonths} {result.paybackMonths === 1 ? 'mês' : 'meses'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tempo para recuperar o investimento
                    </p>
                  </div>

                  <div className="bg-card p-4 rounded-lg border">
                    <p className="text-sm font-semibold mb-2">Solução Recomendada</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {result.recommendedSolution}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Complexidade:</span>
                      <span className="font-semibold capitalize">{result.complexity}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Investimento estimado:</span>
                      <span className="font-semibold">{result.estimatedPrice}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Solicitar Proposta Personalizada
                    <ArrowRight size={16} className="ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    ✓ Análise gratuita • ✓ Sem compromisso • ✓ Resposta em 24h
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center bg-muted/30">
                <CardContent className="text-center py-12">
                  <Calculator size={64} className="mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Preencha os dados ao lado para ver sua análise de ROI personalizada
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
