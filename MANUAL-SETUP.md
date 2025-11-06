# 🔧 SETUP MANUAL - TAREFAS QUE VOCÊ PRECISA FAZER

Este arquivo lista todas as configurações que exigem acesso a contas externas ou criação de conteúdo manual.

---

## 📊 1. GOOGLE ANALYTICS (Prioridade: ALTA)

**Tempo estimado**: 15 minutos

### Passos:

1. **Criar conta Google Analytics**
   - Acesse: https://analytics.google.com
   - Clique em "Começar a medir"
   - Nome da conta: "Altostratus"
   - Nome da propriedade: "Altostratus Website"
   - Fuso horário: Brasil/Brasília
   - Moeda: Real Brasileiro (BRL)

2. **Configurar fluxo de dados**
   - Plataforma: Web
   - URL do site: https://altostratus.com.br
   - Nome do fluxo: "Site Principal"

3. **Copiar ID de medição**
   - Aparece no formato: `G-XXXXXXXXXX`
   - Exemplo: `G-1A2B3C4D5E`

4. **Instalar no site**
   - Abra o arquivo: `src/main.tsx`
   - Encontre o comentário `<!-- Google Analytics -->`
   - Substitua `G-XXXXXXXXXX` pelo seu ID real

### Código para adicionar:

```tsx
// Em src/main.tsx, adicione logo após o <head>:
useEffect(() => {
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `
  document.head.appendChild(script2)
}, [])
```

### Checklist:
- [ ] Conta criada
- [ ] ID copiado
- [ ] Código instalado no site
- [ ] Testado (visite o site e veja em Tempo Real no Analytics)

---

## 📱 2. META PIXEL / FACEBOOK PIXEL (Prioridade: MÉDIA)

**Tempo estimado**: 10 minutos

### Passos:

1. **Acessar Meta Business Suite**
   - URL: https://business.facebook.com
   - Criar conta comercial se não tiver

2. **Criar Pixel**
   - Menu: Eventos > Pixels
   - Clique em "Criar um Pixel"
   - Nome: "Altostratus Lead Tracking"
   - URL: https://altostratus.com.br

3. **Copiar ID do Pixel**
   - Aparece no formato numérico: `123456789012345`

4. **Instalar no site**
   - Mesma lógica do Google Analytics
   - Adicionar script base do Pixel
   - Configurar eventos: `PageView`, `Lead`, `ViewContent`

### Código para adicionar:

```tsx
// Em src/main.tsx:
useEffect(() => {
  const script = document.createElement('script')
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '123456789012345');
    fbq('track', 'PageView');
  `
  document.head.appendChild(script)
}, [])
```

### Checklist:
- [ ] Conta Meta Business criada
- [ ] Pixel criado e ID copiado
- [ ] Código instalado
- [ ] Teste: visite o site e veja evento no Meta Events Manager

---

## 💼 3. LINKEDIN - MODO CRIADOR (Prioridade: ALTA)

**Tempo estimado**: 5 minutos

### Passos:

1. **Ativar modo criador**
   - Vá ao seu perfil do LinkedIn
   - Seção "Recursos": clique em "Modo criador"
   - Ativar

2. **Definir tópicos principais**
   - Sistemas Legados
   - Inteligência Artificial
   - Automação
   - Integração de Sistemas
   - Python

3. **Adicionar CTA no perfil**
   - Editar perfil
   - Adicionar link: https://altostratus.com.br
   - Texto do botão: "Contato"

4. **Usar templates**
   - Arquivo: `LINKEDIN-TEMPLATES.md`
   - Postar 1x por dia (segunda a sábado)
   - Melhor horário: 8-9h ou 18-19h

### Checklist:
- [ ] Modo criador ativado
- [ ] 5 tópicos definidos
- [ ] Link do site no perfil
- [ ] Primeiro post agendado

---

## 📞 4. WHATSAPP BUSINESS (Prioridade: MÉDIA)

**Tempo estimado**: 20 minutos

### Passos:

1. **Baixar WhatsApp Business**
   - Android: https://play.google.com/store/apps/details?id=com.whatsapp.w4b
   - iOS: https://apps.apple.com/app/whatsapp-business/id1386412985

2. **Configurar perfil comercial**
   - Nome: "Altostratus - Sistemas Legados + IA"
   - Categoria: "Serviços de Tecnologia da Informação"
   - Descrição: "Integramos sistemas legados com IA. ROI em menos de 3 meses."
   - Site: https://altostratus.com.br
   - Email: [seu email]

3. **Configurar mensagens automáticas**

**Mensagem de ausência** (fora do horário):
```
Olá! 👋

Obrigado pelo contato. Estou fora do horário comercial no momento.

📅 Horário de atendimento:
Segunda a Sexta: 9h às 18h

Vou responder assim que possível!

Enquanto isso:
🌐 Site: https://altostratus.com.br
📊 Calcule seu ROI: [link do site]

Até breve!
```

**Mensagem de saudação** (primeira mensagem):
```
Olá! 👋 Obrigado pelo interesse.

Eu sou [Seu Nome], especialista em integrar sistemas legados com IA.

Como posso ajudar?
1️⃣ Automatizar processos manuais
2️⃣ Integrar sistema antigo com IA
3️⃣ Modernizar sem reescrever código
4️⃣ Orçamento personalizado

Me conte sobre seu desafio 👇
```

**Respostas rápidas** (atalhos):
- `/orcamento` → "Para orçamento preciso entender: 1) Qual sistema você usa? 2) Qual processo quer automatizar? 3) Quantas pessoas usam hoje?"
- `/roi` → "Calcule seu ROI aqui: https://altostratus.com.br/#roi-calculator"
- `/portfolio` → "Veja projetos que já fiz: https://altostratus.com.br/#portfolio"
- `/prazo` → "Prazo médio: 3-8 semanas dependendo da complexidade. Posso avaliar seu caso em 48h."

4. **Configurar catálogo** (opcional)
   - Produto 1: "Integração IA + Legados" - R$ 2.400
   - Produto 2: "Automação RPA" - R$ 1.800
   - Produto 3: "Modernização" - R$ 3.200

### Checklist:
- [ ] WhatsApp Business instalado
- [ ] Perfil configurado com link do site
- [ ] Mensagens automáticas ativas
- [ ] Respostas rápidas criadas
- [ ] Catálogo (opcional) configurado

---

## 💰 5. GOOGLE ADS - PRIMEIRA CAMPANHA (Prioridade: BAIXA)

**Tempo estimado**: 30 minutos  
**Orçamento mínimo**: R$ 20/dia (R$ 600/mês)

### Passos:

1. **Criar conta Google Ads**
   - URL: https://ads.google.com
   - Usar mesma conta do Analytics

2. **Configurar primeira campanha**

**Nome**: Sistemas Legados + IA

**Tipo**: Rede de Pesquisa

**Segmentação**:
- Localização: Brasil (ou sua região)
- Idioma: Português

**Orçamento**:
- R$ 20 a R$ 50 por dia

**Estratégia de lances**:
- Maximizar conversões (com CPA alvo de R$ 150)

**Grupos de anúncios e palavras-chave**:

```
Grupo 1: Sistemas Legados
- "integração sistema legado"
- "modernizar sistema antigo"
- "migração sistema legado"
- "legacy system integration"

Grupo 2: Automação
- "automação processos python"
- "web scraping brasil"
- "automação tarefas repetitivas"
- "rpa python"

Grupo 3: IA
- "integrar chatgpt sistema"
- "ia para empresas"
- "automação com ia"
- "gpt api integration"
```

**Exemplo de anúncio**:

```
Título 1: Integração Sistemas Legados + IA
Título 2: ROI em Menos de 3 Meses
Título 3: Profissional com 8+ Anos

Descrição 1: Não precisa reescrever seu sistema antigo. Integramos com IA moderna e automatizamos processos.

Descrição 2: 30+ projetos entregues. Garantia de satisfação. Orçamento em 48h sem compromisso.

URL final: https://altostratus.com.br
```

3. **Instalar rastreamento de conversões**
   - Criar conversão: "Lead Formulário"
   - Instalar tag no ContactSection.tsx
   - Testar conversão

### Checklist:
- [ ] Conta Google Ads criada
- [ ] Primeira campanha configurada
- [ ] Orçamento definido (R$ 20+/dia)
- [ ] Rastreamento de conversões instalado
- [ ] Campanha ativa

### ⚠️ Observação:
Google Ads pode esperar. Foque em LinkedIn orgânico primeiro (0 custo, alto retorno). Ads só depois de validar mensagens.

---

## 🎥 6. VÍDEO CURTO - DEPOIMENTO (Prioridade: BAIXA)

**Tempo estimado**: 1-2 horas

### Roteiro sugerido (1-2 minutos):

```
[0-10s] - Gancho
"Se você tem um sistema de 2005 rodando e tem medo de mexer, 
esse vídeo é pra você."

[10-30s] - Problema
"Eu trabalho há 8 anos só com sistemas legados.
A maioria dos empresários pensa:
❌ 'Preciso reescrever tudo do zero'
❌ 'Vai custar uma fortuna'
❌ 'Vou perder todos os dados'"

[30-60s] - Solução
"A realidade? Você não precisa jogar fora 20 anos de código.
Eu crio uma API REST como ponte.
Sistema antigo ← API → IA moderna.
Sem risco. Sem reescrever."

[60-90s] - Prova
"Já integrei:
• Access 2003 com ChatGPT
• PHP sem API com WhatsApp Bot
• ERP DOS com automação de relatórios

ROI médio: 2-3 meses."

[90-120s] - CTA
"Se você quer modernizar sem jogar fora,
link na bio: altostratus.com.br"
```

### Onde gravar:
- ✅ Celular (vertical 9:16 para Reels/Shorts/TikTok)
- ✅ Luz natural (perto de janela)
- ✅ Áudio limpo (gravar em ambiente silencioso)

### Onde postar:
- LinkedIn (texto + vídeo nativo)
- Instagram Reels
- YouTube Shorts
- TikTok (se quiser expandir)

### Ferramentas de edição (gratuitas):
- CapCut (mobile)
- DaVinci Resolve (desktop)
- Clipchamp (online)

### Checklist:
- [ ] Roteiro escrito
- [ ] Vídeo gravado (1-2min)
- [ ] Legendas adicionadas (obrigatório)
- [ ] Postado no LinkedIn
- [ ] Link do site na bio

---

## 📝 7. ESCREVER PRIMEIRO POST NO LINKEDIN

**Tempo estimado**: 15 minutos

Use o **TEMPLATE 1** do arquivo `LINKEDIN-TEMPLATES.md`:

```
🚨 Seu ERP de 2005 está travando seu crescimento?

Ontem conversei com um empresário que:
❌ Gastava 4h/dia fazendo relatórios manualmente
❌ Perdia vendas porque consulta de estoque era lenta
❌ Tinha medo de mexer no sistema que "sempre funcionou"

A boa notícia? 
Não precisamos reconstruir tudo do zero.

Em 4 semanas integramos:
✅ ChatGPT direto no ERP dele
✅ Consultas em linguagem natural
✅ Sistema antigo intacto + IA moderna

Resultado: 80% menos tempo em tarefas manuais.

Seu sistema legado pode virar vantagem competitiva.
Não precisa jogar fora 20 anos de dados.

#SistemasLegados #InteligênciaArtificial #Automação
```

**Depois de postar**:
- Nos **comentários**, adicione:
  ```
  💬 Seu sistema legado pode gerar receita ao invés de custo.
  
  Vamos conversar sem compromisso:
  👉 https://altostratus.com.br
  
  WhatsApp direto: [seu número]
  
  Resposta em até 2h úteis.
  ```

### Checklist:
- [ ] Template copiado
- [ ] Personalizado com sua experiência (se tiver)
- [ ] Postado no LinkedIn
- [ ] Link adicionado NOS COMENTÁRIOS (não no post)
- [ ] Responder todos comentários em até 1h

---

## ✅ RESUMO DAS PRIORIDADES

### 🔴 FAÇA HOJE (Máximo impacto, zero custo):
1. ✅ Ativar modo criador LinkedIn (5min)
2. ✅ Primeiro post no LinkedIn usando template (15min)
3. ✅ Configurar WhatsApp Business (20min)

### 🟡 FAÇA ESTA SEMANA:
4. ✅ Google Analytics (15min)
5. ✅ Meta Pixel (10min)

### 🟢 FAÇA DEPOIS:
6. ✅ Google Ads (somente após validar mensagens no LinkedIn)
7. ✅ Gravar vídeo (quando tiver mais leads orgânicos)

---

## 📊 MÉTRICAS PARA ACOMPANHAR

Depois de configurar tudo, acompanhe semanalmente:

**LinkedIn**:
- Visualizações de perfil
- Impressões de posts
- Engajamento (likes, comentários)
- Mensagens diretas

**Site**:
- Visitantes únicos (Google Analytics)
- Taxa de conversão (formulário + chatbot + exit popup)
- Origem do tráfego (orgânico, direto, social)

**WhatsApp**:
- Número de conversas iniciadas
- Taxa de resposta
- Conversões (orçamentos enviados)

**Meta**:
- Leads qualificados por semana
- Taxa de fechamento (propostas → contratos)
- Ticket médio

---

## ❓ DÚVIDAS?

Se travar em alguma etapa:
1. Releia o passo específico
2. Google: "[nome da ferramenta] tutorial português"
3. YouTube: procure tutorial recente (2023-2024)

**Importante**: Não precisa fazer tudo perfeito. Melhor feito do que perfeito.

Comece com LinkedIn (hoje) → WhatsApp (hoje) → Analytics (amanhã).

Resto é otimização. 🚀
