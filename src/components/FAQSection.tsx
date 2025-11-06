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
    question: 'Quanto tempo leva para desenvolver um projeto?',
    answer: 'Projetos simples podem começar em 48h! Web scraping básico: 1-2 semanas. Integrações: 2-4 semanas. IA complexa: 1-2 meses. Trabalhamos com sprints ágeis, você vê resultados desde a primeira semana. Oferecemos cronograma detalhado na proposta inicial.'
  },
  {
    question: 'E se eu não gostar do resultado final?',
    answer: '🎁 Garantia de 30 dias ou seu dinheiro de volta! Se não ficar 100% satisfeito, devolvemos seu investimento integral. Sem perguntas, sem burocracia. Nosso compromisso é sua satisfação total.'
  },
  {
    question: 'Os custos vão além do orçamento inicial?',
    answer: 'NUNCA! O valor do orçamento é final e fixo. Sem taxas ocultas, sem surpresas. Você paga exatamente o que foi acordado. Se surgir algo fora do escopo, sempre consultamos antes e você decide se quer adicionar ou não.'
  },
  {
    question: 'Como funciona o processo de orçamento e pagamento?',
    answer: 'Simples e seguro: 1) Análise gratuita do projeto, 2) Orçamento detalhado em 24h, 3) Pagamento: 50% início + 50% entrega (ou parcelado para projetos maiores), 4) Aceite e começamos! Aceitamos PIX, cartão, transferência.'
  },
  {
    question: 'E se o site/API mudar e parar de funcionar?',
    answer: 'Incluímos 30 dias de garantia e ajustes gratuitos! Depois disso, oferecemos planos de manutenção desde R$199/mês que incluem monitoramento 24/7, correções emergenciais e atualizações. Você nunca fica na mão!'
  },
  {
    question: 'Preciso ter conhecimento técnico para usar?',
    answer: 'ZERO conhecimento necessário! Entregamos tudo pronto: dashboards visuais, planilhas automáticas, relatórios por email, integração direta nos seus sistemas. Você usa, nós cuidamos da tecnologia. Inclui treinamento completo e suporte vitalício.'
  },
  {
    question: 'É legal fazer web scraping? Posso ter problemas?',
    answer: 'Totalmente legal quando feito corretamente! Trabalhamos apenas com dados públicos, respeitamos robots.txt e taxas de requisição. Você recebe consultoria jurídica básica incluída e certificado de conformidade. 100% ético e dentro da lei.'
  },
  {
    question: 'Por que não contratar um desenvolvedor freelancer mais barato?',
    answer: 'Qualidade, garantia e suporte fazem a diferença! Freelancers baratos: código de baixa qualidade, sem garantia, somem depois da entrega. Conosco: código profissional, documentado, com garantia, suporte contínuo e manutenção. Você economiza a longo prazo!'
  },
  {
    question: 'Consigo testar antes de comprar?',
    answer: 'SIM! Oferecemos POC (Prova de Conceito) gratuita para projetos acima de $2.000. Para projetos menores, entregamos a primeira versão funcional em 7 dias. Se não atender expectativas, paramos e devolvemos 100% do valor pago.'
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
