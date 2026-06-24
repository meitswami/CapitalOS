'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, getStoredUser } from '@/lib/auth';
import type { StoredUser } from '@/lib/types';

export function useRequireAuth() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    const stored = getStoredUser();
    if (!token || !stored) {
      router.replace('/login');
      return;
    }
    setUser(stored);
    setReady(true);
  }, [router]);

  return { user, ready, token: getAccessToken() };
}
