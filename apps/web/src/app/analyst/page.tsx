'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import type { ApiListResponse } from '@/lib/types';

export default function AnalystDashboard() {
  const { ready, token } = useRequireAuth();
  const [stats, setStats] = useState({ companies: 0, underReview: 0, industries: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token) return;
    setError('');
    Promise.all([
      api<ApiListResponse<{ status: string }>>('/companies?limit=100', { token }),
      api<ApiListResponse<unknown>>('/industry?limit=1', { token }),
    ])
      .then(([companies, industries]) => {
        const underReview = companies.data.filter((c) => c.status === 'UNDER_REVIEW').length;
        setStats({
          companies: companies.meta.total,
          underReview,
          industries: industries.meta.total,
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, [ready, token]);

  if (!ready) return null;

  return (
    <PortalShell portal="analyst">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analyst Dashboard</h1>
        <p className="text-muted-foreground mt-1">Review companies, score CHS, and assess capital readiness</p>
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}
      {loading ? (
        <LoadingState />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.companies}</div>
              <p className="text-sm text-muted-foreground mt-1">On platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.underReview}</div>
              <p className="text-sm text-muted-foreground mt-1">Awaiting analyst review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.industries}</div>
              <p className="text-sm text-muted-foreground mt-1">In taxonomy</p>
            </CardContent>
          </Card>
        </div>
      )}
    </PortalShell>
  );
}
