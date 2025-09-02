# KinoLens

MVP de um assistente de cinema (chat) com frontend em React/Vite e backend em Node/Express.

## 🌟 Features
- Chat com OpenAI **gpt-4o**
- **Guardrails cinema-only** (strong-allow + embeddings; LLM opcional)
- **Respostas em Markdown** + renderização no chat
- Feedback (👍/👎)

## Como rodar (dev)
```bash
# backend
cd backend && npm i && npm run dev

# frontend
cd frontend/apps/web && npm i && npm run dev
```

Back-end em `http://localhost:5000`. Front em `http://localhost:5173`.
Defina `VITE_API_URL=http://localhost:5000` no front.

## Produção
- Preferir servir o backend sob o mesmo host do frontend (ex.: `/api`) para evitar CORS.
- Remover wildcard do `CORS_ORIGIN` e usar domínios explícitos.