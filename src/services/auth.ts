import { apiClient } from '@/services/client';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

// ─── API calls ────────────────────────────────────────────────────────────────

/**
 * POST /auth/login
 * DummyJSON test credentials: username "emilys", password "emilyspass"
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', {
    username: credentials.username.trim(),
    password: credentials.password,
    expiresInMins: 60,
  });
  return data;
}

export async function refreshSession(token: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/refresh', {
    refreshToken: token,
    expiresInMins: 60,
  });
  return data;
}
