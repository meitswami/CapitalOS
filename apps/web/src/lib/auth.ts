import type { StoredUser } from './types';

export const PORTAL_ROUTES: Record<string, string> = {
  COMPANY: '/company',
  ANALYST: '/analyst',
  LENDER: '/lender',
  INVESTOR: '/investor',
  COMMITTEE: '/committee',
  SUPER_ADMIN: '/admin',
};

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}

export function getPortalRoute(portal?: string): string {
  return PORTAL_ROUTES[portal || 'SUPER_ADMIN'] || '/admin';
}
