import { API_URL } from './apiClient';
import type { ChatRequest, ChatResponse } from '../types';

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