const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface RequestOptions extends RequestInit {
  token?: string;
}

export async function api<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

export const authApi = {
  login: (email: string, password: string) =>
    api<{ success: boolean; data: { accessToken: string; refreshToken: string; user: Record<string, unknown> } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),
  logout: (token: string, refreshToken?: string) =>
    api('/auth/logout', {
      method: 'POST',
      token,
      body: JSON.stringify({ refreshToken }),
    }),
};
