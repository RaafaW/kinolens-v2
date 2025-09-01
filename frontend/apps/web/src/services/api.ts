export type Role = 'user' | 'assistant' | 'system';

export interface HistoryItem { role: Role; content: string; }
export interface ChatRequest { message: string; history?: HistoryItem[]; language?: 'pt' | 'en'; }
export interface ChatResponse {
  ok: boolean;
  reply: string;
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; };
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function sendChat(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  let data: any = null;
  try { data = await res.json(); } catch { /* ignore */ }

  if (!res.ok) {
    const msg = (data && data.error) ? data.error : `API error ${res.status}`;
    throw new Error(msg);
  }
  return data as ChatResponse;
}

export async function sendFeedback(payload: {
  messageId: string; feedback: 'up' | 'down'; message: string;
}): Promise<boolean> {
  const res = await fetch(`${API_URL}/api/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}