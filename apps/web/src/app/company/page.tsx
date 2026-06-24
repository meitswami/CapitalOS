'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import { StatusBadge } from '@/components/shared/status-badge';
import type { ApiListResponse, Company } from '@/lib/types';

export default function CompanyDashboard() {
  const { ready, token, user } = useRequireAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready || !token) return;
    api<ApiListResponse<Company>>('/companies?limit=50', { token })
      .then((res) => {
        const match = res.data.find(
          (c) =>
            c.tradeName?.toLowerCase().includes('acme') ||
            c.legalName.toLowerCase().includes('acme') ||
            user?.email?.includes('acmetech'),
        );
        setCompany(match || res.data[0] || null);
      })
      .finally(() => setLoading(false));
  }, [ready, token, user]);

  if (!ready) return null;

  return (
    <PortalShell portal="company">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your capital readiness and funding journey</p>
      </div>

      {loading ? (
        <LoadingState />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Capital Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-muted-foreground">—</div>
              <p className="text-sm text-muted-foreground mt-2">Complete your data sheet to generate CHS (Phase 3)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Capital Route</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-muted-foreground">Pending Assessment</div>
              <p className="text-sm text-muted-foreground mt-2">Debt · Equity · Startup rails evaluated post-scoring</p>
            </CardContent>
          </Card>

          {company && (
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Company</CardTitle>
                <StatusBadge status={company.status} />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-semibold">{company.legalName}</div>
                {company.tradeName && <div className="text-muted-foreground">{company.tradeName}</div>}
                <div className="text-sm text-muted-foreground">
                  {company.industry?.name} · {company.subSector?.name}
                </div>
                <Link href="/company/profile">
                  <Button variant="outline" size="sm" className="mt-3">View Full Profile</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </PortalShell>
  );
}
