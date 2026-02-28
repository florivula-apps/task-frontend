const BASE = '/api';
export const TOKEN_KEY = 'task-token';

export interface AuthResponse {
  token: string;
  user: { id: number; username: string; email: string; role: string };
}

export interface LoginPayload {
  username: string;
  password: string;
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    headers,
    ...options,
  });
  if (res.status === 204) return undefined as T;
  if (res.status === 401) {
    window.dispatchEvent(new Event('auth:unauthorized'));
    throw new ApiError(res.status, 'Unauthorized');
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new ApiError(res.status, body || `API error: ${res.status}`);
  }
  return res.json();
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Auth
export const authApi = {
  login: (data: LoginPayload) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};
