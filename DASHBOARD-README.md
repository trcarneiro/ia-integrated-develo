# Dashboard de Leads - Guia de Uso

## 🎯 Como Acessar o Dashboard

O dashboard está integrado ao site e pode ser acessado de duas formas:

### **Método 1: URL Direta**
```
https://altostratus.com.br/dashboard
```

### **Método 2: Local Development**
```bash
npm run dev
```
Depois acesse: `http://localhost:5173/dashboard`

---

## 📊 Funcionalidades do Dashboard

### **1. Visão Geral de Estatísticas**
Quatro cards principais exibem:
- **Total de Leads**: Todos os leads capturados (Exit Popup + Contact Form)
- **Leads Quentes** (🔥): Score 80+ - Priorize esses contatos!
- **Urgência Alta** (⏰): Leads com palavras-chave urgentes - Contatar hoje
- **Novos Hoje** (📈): Leads capturados nas últimas 24h

### **2. Exportar Leads para CSV**
- **Botão**: "Exportar CSV" (canto superior direito)
- **Formato**: 17 colunas incluindo análise de IA
- **Encoding**: UTF-8 com BOM (abre corretamente no Excel brasileiro)
- **Colunas exportadas**:
  ```
  Data, Hora, Nome, Email, Empresa, Telefone, Fonte, 
  Score, Status, Urgência, Budget, Sistema, Serviço, 
  Prazo, Mensagem, Próxima Ação, Observações
  ```

### **3. Enviar Relatório via WhatsApp**
- **Botão**: "Enviar Relatório"
- **Formato**: Relatório formatado pronto para WhatsApp
- **Conteúdo**:
  ```
  📊 RELATÓRIO DE LEADS
  
  Total: X leads
  🔥 Quentes (80+): X leads
  ⚠️ Urgentes: X leads
  
  🏆 TOP 5 LEADS:
  1. Nome (Score: 95) - Próxima ação
  2. Nome (Score: 87) - Próxima ação
  ...
  ```

### **4. Lista Detalhada de Leads**
Cada lead exibe:
- **Header**: Nome, Score, Badge de Urgência
- **Informações**: Email, Empresa, Telefone, Fonte
- **Análise de IA**:
  - 💰 Budget estimado
  - 🖥️ Sistema detectado (Access, ERP, CRM, etc.)
  - 📋 Próxima ação recomendada
  - 💡 Observações automáticas
- **Botão WhatsApp**: Contactar direto com mensagem personalizada

---

## 🤖 Análise Inteligente de Leads

### **Sistema de Scoring (0-100)**

| Pontos | Critério |
|--------|----------|
| +10 | Fonte = Contact Form (mais sério que Exit Popup) |
| +10 | Informou empresa |
| +10 | Informou telefone |
| +15 | Mensagem detalhada (100+ caracteres) |
| +3 cada | Palavras-chave: "urgente", "migrar", "orçamento", "projeto" |
| +10 | Informou budget ou valor |

**Classificação:**
- 🔥 **80-100**: Lead QUENTE - Ligar imediatamente
- 🟠 **60-79**: Lead Morno - Contato hoje/amanhã
- 🟡 **40-59**: Lead Frio - Email follow-up
- ⚪ **0-39**: Lead Muito Frio - Campanha de nutrição

### **Detecção de Urgência**
Palavras-chave analisadas:
- **Alta**: "urgente", "imediato", "hoje", "agora", "problema crítico"
- **Média**: "semana", "mês próximo", "brevidade"
- **Baixa**: sem palavras de urgência

### **Estimativa de Budget**
- **< R$ 3k**: Palavras como "pequeno", "básico", "simples"
- **R$ 3-10k**: Palavras como "médio", "padrão"
- **> R$ 10k**: Palavras como "completo", "robusto", "empresa"
- **Desconhecido**: Não mencionou valores

### **Detecção de Sistema**
Identifica automaticamente na mensagem:
- Access
- Excel
- ERP (Totvs, SAP, Protheus)
- CRM
- PHP/Laravel
- SQL Server
- Planilhas
- Sistemas legados

### **Próxima Ação Sugerida**
Baseado em Score + Urgência:
- **Score 80+ & Alta**: "🔥 Ligar AGORA - Lead quente e urgente"
- **Score 80+**: "📞 Ligar hoje - Alta probabilidade conversão"
- **Score 60+ & Alta**: "💬 WhatsApp hoje - Lead urgente"
- **Score 60+**: "📧 Email em 24h com proposta"
- **Score 40+**: "📧 Email em 48h informativo"
- **Score < 40**: "🌱 Campanha de nutrição"

---

## 💾 Armazenamento de Dados

### **LocalStorage (Atual)**
- Dados armazenados no navegador do usuário
- **Chaves**: `exit-leads`, `contact-leads`
- **Formato**: JSON array
- **Vantagens**:
  - ✅ Funciona sem backend
  - ✅ Privacidade total
  - ✅ Sem custos
- **Limitações**:
  - ⚠️ Dados não sincronizam entre dispositivos
  - ⚠️ Limpar cookies = perder dados
  - ⚠️ Não compartilha com equipe

### **Migração para CRM (Recomendado)**
Para centralizar leads e compartilhar com equipe, veja:
- **Arquivo**: `CRM-INTEGRATION-GUIDE.md`
- **Opção recomendada**: Google Sheets + Gemini API
- **Custo**: < R$ 10/mês para 1000+ leads
- **Tempo de implementação**: 1 dia

---

## 🔍 Como Visualizar Leads no DevTools

Se quiser ver os dados brutos:

1. Abra DevTools (F12)
2. Vá em **Application** > **Local Storage**
3. Veja as chaves:
   - `exit-leads`: Leads do popup de saída
   - `contact-leads`: Leads do formulário de contato

```javascript
// Ver todos os leads no console
const exitLeads = JSON.parse(localStorage.getItem('exit-leads') || '[]')
const contactLeads = JSON.parse(localStorage.getItem('contact-leads') || '[]')
console.log('Exit Leads:', exitLeads)
console.log('Contact Leads:', contactLeads)
```

---

## 📱 Integração WhatsApp

### **Botão "Contactar" no Dashboard**
Ao clicar:
```
https://wa.me/5531993074190?text=Olá NOME_DO_LEAD!
```
Abre WhatsApp Web com mensagem personalizada.

### **Relatório para Equipe**
Botão "Enviar Relatório" gera texto formatado:
```
📊 RELATÓRIO DE LEADS - [Data/Hora]

📈 RESUMO:
• Total: X leads
• 🔥 Quentes (80+): X leads
• ⚠️ Urgentes: X leads

🏆 TOP 5 LEADS POR SCORE:

1️⃣ Nome (95 pontos) - Alta urgência
   📧 email@example.com
   🏢 Empresa X
   📋 Próxima ação: Ligar AGORA
   
2️⃣ Nome (87 pontos) - Média urgência
   ...
```

---

## 🎨 Cores e Badges

### **Score Badges**
- **80-100**: 🔴 Vermelho (text-red-600 bg-red-50)
- **60-79**: 🟠 Laranja (text-orange-600 bg-orange-50)
- **40-59**: 🟡 Amarelo (text-yellow-600 bg-yellow-50)
- **0-39**: ⚪ Cinza (text-gray-600 bg-gray-50)

### **Urgência Badges**
- **Alta**: `destructive` (vermelho)
- **Média**: `default` (azul)
- **Baixa**: `secondary` (cinza)

---

## 🚀 Próximos Passos

### **Curto Prazo (Implementado)**
- ✅ Dashboard funcional com estatísticas
- ✅ Análise de leads com IA heurística
- ✅ Exportação CSV
- ✅ Relatório WhatsApp
- ✅ Lista ordenada por score

### **Médio Prazo (Planejado)**
- [ ] Filtros por data/score/urgência
- [ ] Gráficos de conversão
- [ ] Busca por nome/email
- [ ] Edição de status (Novo/Contactado/Convertido)
- [ ] Notas personalizadas

### **Longo Prazo (CRM Completo)**
- [ ] Integração Google Sheets (CRM-INTEGRATION-GUIDE.md)
- [ ] Gemini API para análise real (não heurística)
- [ ] Follow-ups automáticos por email
- [ ] Notificações push para leads quentes
- [ ] Pipeline de vendas visual
- [ ] Relatórios automáticos semanais

---

## 🛠️ Troubleshooting

### **Dashboard não carrega**
```bash
# Verificar se está na URL correta
https://altostratus.com.br/dashboard

# Ou localmente
http://localhost:5173/dashboard
```

### **Leads não aparecem**
```javascript
// Verificar se há dados no localStorage
localStorage.getItem('exit-leads')
localStorage.getItem('contact-leads')

// Se retornar null, nenhum lead foi capturado ainda
```

### **Exportar CSV não funciona**
- Verifique se o navegador permite downloads
- Alguns ad-blockers podem bloquear downloads automáticos

### **WhatsApp não abre**
- Verifique se o número está correto no código
- Arquivo: `src/components/LeadsDashboard.tsx`
- Linha: `window.open('https://wa.me/5531993074190?text=...')`

---

## 📖 Documentação Relacionada

- **CRM Integration Guide**: `CRM-INTEGRATION-GUIDE.md`
- **GitHub Pages Fixes**: `FIXES-GITHUB-PAGES.md`
- **Analytics Library**: `src/lib/crm-analytics.ts`

---

## 💡 Dicas de Uso

### **Para Freelancers**
1. Acesse o dashboard diariamente
2. Priorize leads com score 80+
3. Exporte CSV semanalmente para backup
4. Use relatório WhatsApp para compartilhar com parceiros

### **Para Pequenas Empresas**
1. Configure Google Sheets CRM (veja CRM-INTEGRATION-GUIDE.md)
2. Distribua acesso ao dashboard para equipe de vendas
3. Use filtros de urgência para definir prioridades
4. Automatize follow-ups com Gemini API

### **Para Agências**
1. Implemente integração completa com HubSpot ou Salesforce
2. Configure webhooks para notificações em tempo real
3. Use API para sincronizar com ferramentas internas
4. Customize scoring baseado em suas métricas

---

## 📞 Suporte

Dúvidas ou problemas? 
- **GitHub Issues**: [Abrir issue](https://github.com/trcarneiro/ia-integrated-develo/issues)
- **WhatsApp**: +55 31 99307-4190

---

**Última atualização**: 2024
