# KinoLens – Backend (Node + Express)

API para o chatbot de cinema do KinoLens. Fornece um endpoint para conversar com a IA (OpenAI **gpt-4o**), healthcheck, rate‑limit, CORS e logs.

## Stack
- Node 18+ / Express 4
- OpenAI SDK
- Zod (validação)
- Helmet, CORS, Rate Limit, Morgan (logs)
- Dotenv

## Requisitos
- **Node 18+**
- **OPENAI_API_KEY** válido no `.env` (em `backend/`)

## Instalação e execução
```bash
# dentro da pasta backend/
npm i
npm run dev       # desenvolvimento (nodemon)
# ou
npm start         # produção
```

## Variáveis de ambiente (.env)
| Chave | Obrigatória | Default | Descrição |
|---|---|---:|---|
| `OPENAI_API_KEY` | ✅ | — | Chave da OpenAI |
| `PORT` | ❌ | `5000` | Porta do servidor |
| `NODE_ENV` | ❌ | `development` | Ambiente |
| `RATE_LIMIT_WINDOW_MS` | ❌ | `900000` | Janela do rate limit (ms) |
| `RATE_LIMIT_MAX_REQUESTS` | ❌ | `100` | Máximo de reqs por IP na janela |
| `CORS_ORIGIN` | ❌ | `http://localhost:5173` | Origem permitida no CORS |

Exemplo:
```env
OPENAI_API_KEY=sk-...
PORT=5000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:5173
```

## Estrutura de pastas
```
backend/
  package.json
  .env
  src/
    server.js
    app.js
    config/
      env.js
      openai.js
    routes/
      index.js
      chat.routes.js
      feedback.routes.js
    controllers/
      chat.controller.js
    services/
      chat.service.js
      prompt.js
    middlewares/
      rateLimit.js
      errorHandler.js
      notFound.js
    schemas/
      chat.schema.js
    utils/
      logger.js
```

## Endpoints

### `GET /health`
- **200** → `{ "ok": true, "status": "healthy" }`

### `POST /api/chat`
- **Body**
```json
{
  "message": "filme do cara que revive o mesmo dia",
  "history": [
    { "role": "user", "content": "gosto de sci-fi" },
    { "role": "assistant", "content": "sugestões..." }
  ],
  "language": "pt"
}
```
- **200** → 
```json
{
  "ok": true,
  "reply": "• Feitiço do Tempo (1993)...",
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 45,
    "total_tokens": 168
  }
}
```
- **400** → `{ "ok": false, "error": "message: message é obrigatório" }`  
- **429** → `{ "ok": false, "error": "Too many requests. Try again later." }`  
- **500** → `{ "ok": false, "error": "Internal Server Error" }`

### `POST /api/feedback`  *(stub)*
- **Body**: `{ "messageId": "123", "feedback": "up" | "down", "message": "texto original" }`
- **204** sem corpo (apenas loga no server).

## Prompt do sistema
Arquivo: `src/services/prompt.js`.  
Ajuste o tom, idioma padrão e regras do KinoLens aqui.

## Testes via terminal

**Healthcheck**
```bash
curl -s http://localhost:5000/health
```

**Chat – exemplo 1 (descrição de cena)**
```bash
curl -s -X POST http://localhost:5000/api/chat   -H "Content-Type: application/json"   -d '{"message":"homem revive o mesmo dia num festival da marmota"}'
```

**Chat – exemplo 2 (recomendações)**
```bash
curl -s -X POST http://localhost:5000/api/chat   -H "Content-Type: application/json"   -d '{"message":"recomende 3 filmes noir modernos"}'
```

> Sem `jq`? Use `| python -m json.tool` para pretty print (se tiver Python).

## Integração com o frontend
- Configure `VITE_API_URL=http://localhost:5000` no front.
- Envie `POST /api/chat` com `{ message, history?, language? }`.
- Leia `reply` no retorno.

## Segurança e operações
- **Helmet** ativado.
- **CORS** restrito por `CORS_ORIGIN`.
- **Rate Limit** por IP (configurável via `.env`).
- **Logs HTTP** com Morgan (preset `dev` em dev, `combined` em prod).
- **Erros** centralizados (`errorHandler`) com resposta JSON consistente.

## Design Patterns
- **Camadas**: Routes → Controller → Service.  
- **Factory** para cliente OpenAI (`config/openai.js`).  
- **Prompt Builder** simples (`services/prompt.js`).  
- **Middlewares** para cross‑cutting (rate‑limit, CORS, segurança, logs, erros).  
- **Schema Validation (Guard)** com Zod.  
- **Fail‑fast** + erros padronizados.

## Roadmap
- Streaming de respostas (SSE).
- Persistência de chat/feedback (DB).
- Autenticação e quotas por usuário.
- Observabilidade (request id, tracing, métricas).
- Tests (unit e e2e) e CI.
