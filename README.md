# Casa Pedra — Next.js App Router (React & TypeScript)

Versão migrada e modernizada para **Next.js com App Router**, **React 18** e **TypeScript estrito**, mantendo 100% da identidade visual original, acessibilidade, responsividade, animações nativas com Web Animations API e regras de negócio.

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos
- **Node.js**: v18+ (testado e validado no Node.js v24.18)
- **npm**: v9+ (ou pnpm/yarn)

### 1. Instalar as dependências
```bash
npm install
```

### 2. Executar em modo de desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 3. Executar em modo de produção (Recomendado)
```bash
npm run build
npm start
```
Acesse [http://localhost:3000](http://localhost:3000).

### 4. Executar os testes automatizados
```bash
npm test
```
Executa a suíte de testes de negócio com `node:test` validando:
- As 12 combinações determinísticas do Guia de Uso.
- Integridade das 6 composições do Ateliê.
- Geração de mensagens do WhatsApp com e sem referências.
- Codificação de URLs e caracteres especiais.

### 5. Checagem de tipos TypeScript
```bash
npx tsc --noEmit
```

---

## 📁 Estrutura do Projeto

```
casa-pedra/
├── public/
│   ├── assets/              # 11 imagens conceituais WebP
│   └── relatorio.html       # Cópia estática do relatório técnico
├── src/
│   ├── app/
│   │   ├── layout.tsx       # RootLayout com Poppins (next/font), metadados pt-BR
│   │   ├── page.tsx         # Landing Page principal (Server/Client Híbrido)
│   │   └── relatorio/       # Rota do Relatório Técnico para tela e impressão A4
│   │       ├── page.tsx
│   │       ├── PrintButton.tsx
│   │       └── relatorio.css
│   ├── components/
│   │   ├── Header.tsx       # Navegação e brand
│   │   ├── Hero.tsx         # Seção principal com h1 animado e prioridade de imagem
│   │   ├── Credentials.tsx  # Histórico da marca (27 anos)
│   │   ├── Collection.tsx   # Móveis com identidade e Paredes que transformam
│   │   ├── Atelier.tsx      # Ateliê interativo (6 composições, troca suave de fotos)
│   │   ├── Transformation.tsx # Comparador antes/depois (slider, touch, keyboard)
│   │   ├── Essence.tsx      # 3 princípios da marca
│   │   ├── ReuseNarrative.tsx # Narrativa de reaproveitamento em 3 etapas com abas
│   │   ├── Process.tsx      # 3 passos do atendimento consultivo
│   │   ├── UsageGuide.tsx   # Guia de uso com fotos das pedras e 12 combinações
│   │   ├── FAQ.tsx          # Dúvidas frequentes com <details>/<summary> nativos
│   │   ├── Contact.tsx      # Formulário de contato com resumo de contexto
│   │   ├── Footer.tsx       # Rodapé com notas conceituais
│   │   ├── MobileContactBar.tsx # Barra flutuante mobile com IntersectionObserver
│   │   └── ScrollRevealObserver.tsx # Observador de animações de rolagem
│   ├── config/
│   │   └── site.ts          # Configurações centralizadas e contato de WhatsApp
│   ├── context/
│   │   └── ProjectContext.tsx # Context Provider para sincronização de preferências
│   ├── data/
│   │   ├── compositions.ts  # 6 composições tipadas do Ateliê
│   │   ├── reuseStory.ts    # 3 etapas da narrativa de reaproveitamento
│   │   └── guideData.ts     # 12 regras de orientação e rótulos
│   ├── hooks/
│   │   └── useMotion.ts     # Hook e utilitários da Web Animations API
│   ├── lib/
│   │   └── whatsapp.ts      # Montagem pura e tipada da mensagem do WhatsApp
│   ├── styles/
│   │   └── globals.css      # Estilos consolidados, paleta, tipografia e media queries
│   └── types/
│       └── index.ts         # Tipagens estritas do domínio
├── tests/
│   └── business-logic.test.mjs # Testes unitários com node:test
├── dist/                    # Cópia intacta da versão original para comparação
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## 🛠️ Versões e Tecnologias Utilizadas

- **Next.js**: `14.2.24` (App Router, Server Components + Client Components)
- **React / React DOM**: `18.3.1`
- **TypeScript**: `5.7.3` (Modo estrito ativo)
- **Animações**: Web Animations API nativa e `IntersectionObserver` (sem Framer Motion ou GSAP)
- **Tipografia**: Poppins via `next/font/google` com fallback `Arial, sans-serif`
- **Imagens**: 11 fotos WebP com `unoptimized: true` para compatibilidade total

---

## 📞 Informações de Contato Fictício

O número de WhatsApp utilizado no projeto é fictício: `5511900000000`, centralizado em `src/config/site.ts`.

---

## 📄 Rotas Disponíveis

- Landing page: [http://localhost:3000/](http://localhost:3000/)
- Relatório técnico (Next.js): [http://localhost:3000/relatorio](http://localhost:3000/relatorio)
- Relatório técnico (Estático): [http://localhost:3000/relatorio.html](http://localhost:3000/relatorio.html)
