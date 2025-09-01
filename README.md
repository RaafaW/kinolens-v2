# 🎬 KinoLens v2

**Chatbot inteligente para cinema** - Seu assistente especializado para descobrir, discutir e explorar o fascinante mundo do cinema.

![KinoLens Preview](https://via.placeholder.com/800x400/dc2626/white?text=KinoLens+Preview)

## 🎯 Sobre o Projeto

KinoLens é um chatbot powered by IA que oferece uma experiência única para cinéfilos. Com tecnologia de ponta e conhecimento abrangente sobre cinema, ele pode recomendar filmes, analisar obras cinematográficas, discutir diretores e muito mais.

### 🌟 Features Planejadas

#### MVP (Em Desenvolvimento)
- ✅ **Interface do Frontend** - Design inspirado em cinema com tema vermelho/preto
- 🔄 **Chatbot IA** - Integração com OpenAI GPT-4o
- 🔄 **MCP + Fine-tuning** - Contexto específico de cinema com guardrails
- 🔄 **Google Analytics** - Tracking básico de uso
- 🔄 **Sistema de Feedback** - Thumbs up/down para respostas

#### Roadmap Completo
- 🎯 **Autenticação de Usuários** - Registro, login e assinaturas
- 🎯 **Histórico de Conversas** - Persistência e recuperação de chats
- 🎯 **Recomendações Personalizadas** - Base de dados de filmes
- 🎯 **Análises Avançadas** - Insights detalhados sobre cinema
- 🎯 **Multi-idiomas** - Suporte internacional

## 🛠️ Stack Técnica

### Frontend
- **React 18** + **TypeScript** - Interface moderna e type-safe
- **Vite** - Build tool rápido e otimizado
- **TailwindCSS** - Styling utilitário com tema customizado
- **Framer Motion** - Animações fluidas
- **React Query** - Gerenciamento de estado servidor
- **Lucide React** - Ícones consistentes

### Backend (Em Desenvolvimento)
- **Node.js** + **Express** + **TypeScript**
- **OpenAI GPT-4o** - Modelo de IA principal
- **MongoDB Atlas** - Banco de dados NoSQL
- **Winston** - Sistema de logs
- **Rate Limiting** - Proteção contra abuso

### Infraestrutura
- **Vercel** - Deploy do frontend
- **Render** - Deploy do backend
- **MongoDB Atlas** - Database como serviço
- **Google Analytics 4** - Analytics e métricas

## 🎨 Design System

### Paleta de Cores Cinema
```css
--primary-red: #dc2626      /* Vermelho cinema */
--deep-black: #0f0f0f       /* Preto profundo */
--gold-accent: #fbbf24      /* Dourado Oscar */
--pastel-gray: #f3f4f6      /* Cinza suave */
--dark-gray: #1f2937        /* Cinza escuro */
--burgundy: #7f1d1d         /* Borgonha */
```

### Filosofia de Design
- **Cinema-first** - Cores e elementos que remetem ao cinema
- **Clean & Modern** - Interface limpa com toques pasteis
- **Micro-interações** - Animações sutis que melhoram a UX
- **Responsive** - Mobile-first approach

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** >= 18.0.0
- **NPM** >= 9.0.0
- Conta no **OpenAI** (para chaves de API)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/RaafaW/kinolens-v2.git
cd kinolens-v2

# Instale as dependências
npm run install:all

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev              # Frontend + Backend
npm run dev:frontend     # Apenas frontend
npm run dev:backend      # Apenas backend

# Build
npm run build            # Build completo
npm run build:frontend   # Build do frontend
npm run build:backend    # Build do backend

# Utilidades
npm run lint             # ESLint em ambos projetos
npm run clean            # Remove node_modules
```

## 📁 Estrutura do Projeto

```
kinolens-v2/
├── frontend/              # React + TypeScript
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # APIs e integrações
│   │   ├── styles/        # CSS e temas
│   │   ├── types/         # Definições TypeScript
│   │   └── utils/         # Utilitários
│   └── package.json
├── backend/               # Node.js + Express
│   ├── src/
│   │   ├── controllers/   # Lógica dos endpoints
│   │   ├── services/      # Integração OpenAI
│   │   ├── middleware/    # CORS, rate limiting
│   │   └── routes/        # Definição das rotas
│   └── package.json
├── shared/                # Código compartilhado
│   ├── types/            # Types compartilhados
│   └── utils/            # Utilitários comuns
└── README.md
```

## 🏗️ Arquitetura

### Frontend - Clean Architecture
- **Presentation Layer** - Componentes React puros
- **Business Layer** - Custom hooks com lógica de negócio
- **Data Layer** - Services para APIs externas

### Backend - Hexagonal Architecture
- **Controllers** - Camada de apresentação (HTTP)
- **Services** - Lógica de negócio
- **Repositories** - Acesso a dados
- **External APIs** - OpenAI, Analytics

### Design Patterns Utilizados
- **Repository Pattern** - Abstração do banco
- **Strategy Pattern** - Diferentes providers de IA
- **Observer Pattern** - Analytics e eventos
- **Factory Pattern** - Criação de mensagens

## 🚀 Deploy

### Frontend (Vercel)
```bash
# Conecte seu repositório ao Vercel
# Configure as variáveis de ambiente
# Deploy automático no push para main
```

### Backend (Render)
```bash
# Configure o serviço no Render
# Aponte para a pasta /backend
# Configure as variáveis de ambiente
```

## 🔒 Variáveis de Ambiente

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_GA_ID=your_ga_id
VITE_NODE_ENV=development
```

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_uri
PORT=5000
NODE_ENV=development
```

## 📊 Analytics e Métricas

### Eventos Trackados
- **message_sent** - Usuário envia mensagem
- **message_received** - IA responde
- **feedback_given** - Usuário dá feedback
- **session_started** - Nova sessão iniciada
- **error_occurred** - Erros da aplicação

## 🤝 Contribuição

Este é um projeto em desenvolvimento ativo. Contribuições são bem-vindas!

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

### 🎯 Fase 1 - MVP (Janeiro 2025)
- [x] Setup do projeto e estrutura
- [x] Interface inicial com tema cinema
- [ ] Integração OpenAI GPT-4o
- [ ] Sistema de feedback básico
- [ ] Google Analytics
- [ ] Deploy Vercel + Render

### 🎯 Fase 2 - Validação (Fevereiro 2025)
- [ ] Autenticação de usuários
- [ ] Histórico de conversas
- [ ] Fine-tuning específico para cinema
- [ ] Melhorias de UX baseadas no feedback

### 🎯 Fase 3 - Escala (Março 2025)
- [ ] Base de dados de filmes
- [ ] Recomendações avançadas
- [ ] Sistema de assinaturas
- [ ] Mobile app (React Native)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 👨‍💻 Autor

**Rafaela W.** - [GitHub](https://github.com/RaafaW)

---

<div align="center">
  <p>Feito com ❤️ para cinéfilos por cinéfilos</p>
  <p>🎬 <strong>KinoLens</strong> - <em>Descubra o cinema como nunca antes</em> 🎬</p>
</div>