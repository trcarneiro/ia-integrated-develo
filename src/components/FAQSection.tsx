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
    answer: 'O prazo varia conforme a complexidade. Projetos simples de web scraping podem ser entregues em 1-2 semanas. Integrações médias levam 2-4 semanas, e projetos complexos de IA podem demorar 1-2 meses. Sempre fornecemos um cronograma detalhado na proposta.'
  },
  {
    question: 'Como funciona o processo de orçamento e pagamento?',
    answer: 'Após entender seu projeto, enviamos uma proposta detalhada com escopo, prazo e valor. Normalmente trabalhamos com 50% de entrada e 50% na entrega. Para projetos maiores, dividimos em milestones com pagamentos progressivos.'
  },
  {
    question: 'Vocês fornecem manutenção após a entrega?',
    answer: 'Sim! Todo projeto inclui 30 dias de garantia e suporte técnico. Após esse período, oferecemos planos mensais de manutenção que incluem correções, atualizações e melhorias. A manutenção é especialmente importante para scraping (sites mudam) e integrações com APIs.'
  },
  {
    question: 'Quais tipos de dados vocês conseguem extrair?',
    answer: 'Podemos extrair praticamente qualquer informação pública: preços, produtos, avaliações, notícias, dados de redes sociais, informações de empresas, vagas de emprego, imóveis, etc. Se está visível em um site, conseguimos automatizar a extração.'
  },
  {
    question: 'É legal fazer web scraping?',
    answer: 'Sim, scraping de dados públicos é legal no Brasil e na maioria dos países. Respeitamos sempre os termos de uso, robots.txt e não sobrecarregamos servidores. Trabalhamos apenas com dados públicos e ajudamos você a usar os dados de forma ética e legal.'
  },
  {
    question: 'Que tipos de integrações com IA vocês fazem?',
    answer: 'Integramos GPT/OpenAI, análise de texto, classificação automática, chatbots, recomendações personalizadas, análise de sentimento, extração de informações, resumos automáticos e muito mais. Criamos soluções customizadas usando as melhores ferramentas de IA disponíveis.'
  },
  {
    question: 'Preciso ter conhecimento técnico para usar as soluções?',
    answer: 'Não! Desenvolvemos interfaces simples e intuitivas. Você receberá os dados em formatos fáceis (Excel, JSON, dashboard) ou integrados diretamente em seus sistemas. Também fornecemos documentação completa e treinamento quando necessário.'
  },
  {
    question: 'Trabalham com clientes internacionais?',
    answer: 'Sim! Atendemos clientes no Brasil e exterior. Trabalhamos em português, inglês e espanhol. Os pagamentos podem ser feitos via transferência internacional, PayPal ou outras plataformas de pagamento.'
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
