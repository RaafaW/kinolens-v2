# KinoLens – Backend (Node + Express)

API para o chatbot de cinema do KinoLens. Usa OpenAI (**gpt-4o**) e aplica *guardrails* para responder **somente** sobre cinema.

## Stack
- Node 18+ / Express 4
- PostgreSQL (banco de dados)
- OpenAI SDK
- pg (Node.js driver for PostgreSQL)
- bcryptjs (Password hashing)
- Zod (validação)
- Helmet, CORS, Rate Limit, Morgan
- Dotenv

## Requisitos
- **Node 18+**
- **OPENAI_API_KEY** válido no `.env` (em `backend/`)
- **DATABASE_URL** válida no `.env` para um banco PostgreSQL

## Instalação e execução
```bash
# dentro de backend/
npm i
npm run dev       # desenvolvimento (nodemon)
# ou
npm start         # produção
```

## Variáveis de ambiente (.env)
| Chave | Obrigatória | Default | Descrição |
|---|---|---:|---|
| `DATABASE_URL` | ✅ | — | URL de conexão do PostgreSQL |
| `OPENAI_API_KEY` | ✅ | — | Chave da OpenAI |
| `PORT` | ❌ | `5000` | Porta do servidor |
| `NODE_ENV` | ❌ | `development` | Ambiente |
| `RATE_LIMIT_WINDOW_MS` | ❌ | `900000` | Janela do rate limit (ms) |
| `RATE_LIMIT_MAX_REQUESTS` | ❌ | `100` | Máximo de reqs por IP na janela |
| `CORS_ORIGIN` | ❌ | `http://localhost:5173` | Origens permitidas (CSV) |
| `OPENAI_MODEL` | ❌ | `gpt-4o` | Modelo principal |
| `OPENAI_EMBED_MODEL` | ❌ | `text-embedding-3-small` | Modelo de embeddings |
| `EMBED_THRESHOLD` | ❌ | `0.78` | Threshold de similaridade (0–1) |
| `ENABLE_LLM_GUARD` | ❌ | `false` | Liga classificador LLM p/ casos ambíguos |
| `OPENAI_MODEL_GUARD` | ❌ | `gpt-4o-mini` | Modelo do classificador LLM |

Exemplo:
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgres://user:password@host:port/database"

# OpenAI
OPENAI_API_KEY=sk-...
CORS_ORIGIN=http://localhost:5173,[http://127.0.0.1:5173](http://127.0.0.1:5173)

# ... (outras chaves)
```

## Estrutura
```
backend/
  src/
    app.js
    server.js
    config/ (env, openai, db)
    routes/ (index, chat.routes, feedback.routes, user.routes)
    controllers/ (chat.controller, user.controller)
    services/ (chat.service, guardrails, prompt)
    middlewares/ (rateLimit, errorHandler, notFound)
    schemas/ (chat.schema)
    utils/ (logger)
```

## Endpoints

### `GET /health`
- **200** → `{ "ok": true, "status": "healthy" }`

### `POST /api/users/register`
**Body**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senhaComPeloMenos6Caracteres"
}
```

**Respostas**
- 201 Created → O usuário foi criado com sucesso.
```json
{
  "message": "Usuário criado com sucesso!",
  "user": {
    "id": "uuid-do-usuario",
    "email": "usuario@exemplo.com"
  }
}
```
- 400 Bad Request → Dados inválidos (e.g., e-mail faltando, senha com menos de 6 caracteres).
```json
{ "message": "E-mail e uma senha com no mínimo 6 caracteres são obrigatórios." }
```
- 409 Conflict → O e-mail informado já existe no banco de dados.
```json
{ "message": "Este e-mail já está em uso." }
```

### `POST /api/chat`
**Body**
```json
{
  "message": "filme do cara que revive o mesmo dia",
  "history": [{ "role": "user", "content": "gosto de sci-fi" }],
  "language": "pt"
}
```

**200**
```json
{
  "ok": true,
  "reply": "- **Feitiço do Tempo (1993)** — comédia — ...",
  "usage": { "prompt_tokens": 123, "completion_tokens": 45, "total_tokens": 168 }
}
```

> A resposta vem **em Markdown** (bullets, negrito etc.).

### `POST /api/feedback` *(stub)*
Body:
```json
{ "messageId": "123", "feedback": "up", "message": "texto original" }
```
**204** sem corpo (apenas loga no servidor).

## Guardrails (cinema-only)

1. **Strong Allow** – libera pedidos explícitos sobre filmes (ex.: “indique filmes sobre X”, “qual é o filme que...”).
2. **Embeddings** – checa a similaridade do texto com um *centro* de tópicos de cinema (`text-embedding-3-small` + `EMBED_THRESHOLD`).
3. **LLM Guard (opcional)** – classificador rígido para casos ambíguos/jailbreak (`ENABLE_LLM_GUARD=true`).

- Perguntas fora de escopo retornam **recusa curta** e **não gastam tokens** do modelo principal.
- Pedidos como “**filmes sobre criptomoedas**” passam pelo *Strong Allow* e são respondidos normalmente.

### Testes
```bash
# Fora de escopo → recusa (sem usage)
curl -s -X POST http://localhost:5000/api/chat   -H "Content-Type: application/json"   -d '{"message":"o que é bitcoin?"}'

# Pedido explícito sobre filmes → responde
curl -s -X POST http://localhost:5000/api/chat   -H "Content-Type: application/json"   -d '{"message":"indique 2 filmes sobre criptomoedas ou fraude financeira"}'
```

## Produção
- Remova `*` do `CORS_ORIGIN`. Use domínios explícitos ou sirva a API via `/api` no mesmo host do frontend (evita CORS).
- Habilite HSTS no Helmet e reduza rate limit se necessário.
