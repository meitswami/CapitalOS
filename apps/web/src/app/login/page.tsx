'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/lib/api';

const PORTAL_ROUTES: Record<string, string> = {
  COMPANY: '/company',
  ANALYST: '/analyst',
  LENDER: '/lender',
  INVESTOR: '/investor',
  COMMITTEE: '/committee',
  SUPER_ADMIN: '/admin',
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@capitalos.io');
  const [password, setPassword] = useState('CapitalOS@2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authApi.login(email, password);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const portal = (res.data.user.portal as string) || 'SUPER_ADMIN';
      router.push(PORTAL_ROUTES[portal] || '/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Sign in to CapitalOS</CardTitle>
          <CardDescription>Capital Intelligence Operating System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link href="/" className="text-accent hover:underline">
              Back to home
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
