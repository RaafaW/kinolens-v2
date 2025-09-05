import { API_URL } from './apiClient';
import type { AuthResponse, LoginCredentials } from '../types';

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro na autenticação');
  return data;
}

export async function registerUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro no registro');
  return data;
}