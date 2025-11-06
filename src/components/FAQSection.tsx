import { motion } from 'framer-motion'
import { Question } from '@phosphor-icons/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Meu sistema é muito antigo (Access, VB, FoxPro). Dá para integrar com IA?',
    answer: 'SIM! Trabalho justamente com isso. Crio uma camada de API sobre seu sistema antigo sem mexer no código original. Seu sistema continua rodando como sempre, mas ganha recursos modernos de IA. Já integrei Access, FoxPro, Delphi, PHP legado e até sistemas DOS.',
  },
  {
    question: 'Quanto custa para começar?',
    answer: 'Projetos simples (robô de scraping, integração básica): a partir de R$ 2.500. Integrações com IA: R$ 3.500-8.000. Modernização completa: R$ 8.000+. Primeira consulta e análise são 100% GRATUITAS. Você só paga se decidir ir em frente.',
  },
  {
    question: 'Quanto tempo leva para ver resultados?',
    answer: 'Projetos simples: 1-2 semanas e já está rodando. Integrações médias: 3-4 semanas. Você vê progresso desde a primeira semana com entregas parciais. Não precisa esperar meses para começar a usar!',
  },
  {
    question: 'E se der problema depois? Vou ficar na mão?',
    answer: 'NUNCA! Incluo 30 dias de garantia e ajustes gratuitos. Depois disso, você pode contratar suporte mensal (R$ 300-800/mês) ou apenas me chamar quando precisar. Você tem meu contato direto - respondo no mesmo dia. Sem departamentos, sem tickets, sem burocracia.',
  },
  {
    question: 'Preciso reescrever meu sistema inteiro?',
    answer: 'NÃO! Essa é a grande vantagem. Seu sistema legado continua 100% intacto. Eu crio uma "ponte" entre ele e as tecnologias modernas. É tipo adicionar um GPS em um carro antigo - o motor continua o mesmo, só ganha novos recursos.',
  },
  {
    question: 'Você trabalha sozinho ou tem equipe?',
    answer: 'Trabalho solo, diretamente com você. Vantagens: custo menor (sem overhead de equipe), você fala comigo do início ao fim, decisões rápidas, foco total no seu projeto. Para projetos muito grandes, tenho parceiros de confiança que posso trazer se necessário.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Simples: 50% para começar + 50% na entrega. Aceito PIX, transferência ou cartão (parcelado). Para projetos acima de R$ 10k, podemos dividir em 3-4 parcelas conforme entregas. Sem pegadinhas, sem taxas escondidas.',
  },
  {
    question: 'E se minha necessidade for muito específica/estranha?',
    answer: 'MELHOR AINDA! Adoro desafios técnicos inusitados. Já integrei sistema de gestão hospitalar dos anos 90 com IA, criei robô que lê PDF digitalizado de notas fiscais, conectei ERP AS/400 com WhatsApp. Quanto mais específico, mais interessante!',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 relative bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Question size={32} weight="duotone" className="text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Perguntas Frequentes
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Respostas para as dúvidas mais comuns sobre nossos serviços
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-lg transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold text-base pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Não encontrou a resposta que procurava?
            </p>
            <p className="text-sm text-muted-foreground">
              Entre em contato conosco e teremos prazer em esclarecer qualquer dúvida.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
