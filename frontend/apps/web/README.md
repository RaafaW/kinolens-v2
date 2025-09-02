# KinoLens — Frontend (Vite + React + TypeScript)

## Stack
- Vite 5, React 18, TypeScript 5
- TailwindCSS, Lucide
- **react-markdown + remark-gfm** (render Markdown das respostas)
- Node 20+

## Como rodar (dev)
```bash
cd frontend/apps/web
npm i
npm run dev
```

## Variáveis de ambiente
Crie `frontend/apps/web/.env.local`:
```env
VITE_API_URL=http://localhost:5000
```

## Integração com a API
- Endpoint: `POST /api/chat` → `{ ok, reply, usage }`.
- A UI envia `{ message, history?, language? }`.
- Feedback: `POST /api/feedback` (stub no backend).

## Renderização Markdown
As respostas vêm em **Markdown**. O chat usa:
```bash
npm i react-markdown remark-gfm
```
E renderiza com:
```tsx
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

<ReactMarkdown remarkPlugins={[gfm]}>
  {"- **Filme (ano)** — ..."}
</ReactMarkdown>
```

## Scripts úteis
```bash
npm run dev     # inicia Vite
npm run build   # build de produção
```