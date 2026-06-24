'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Factory, Users, Shield } from 'lucide-react';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import type { ApiListResponse } from '@/lib/types';

export default function AdminDashboard() {
  const { ready, token } = useRequireAuth();
  const [stats, setStats] = useState({ users: 0, orgs: 0, industries: 0, companies: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token) return;
    setError('');

    Promise.all([
      api<ApiListResponse<unknown>>('/users?limit=1', { token }),
      api<ApiListResponse<unknown>>('/organizations?limit=1', { token }),
      api<ApiListResponse<unknown>>('/industry?limit=1', { token }),
      api<ApiListResponse<unknown>>('/companies?limit=1', { token }),
    ])
      .then(([users, orgs, industries, companies]) => {
        setStats({
          users: users.meta.total,
          orgs: orgs.meta.total,
          industries: industries.meta.total,
          companies: companies.meta.total,
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, [ready, token]);

  if (!ready) return null;

  const statCards = [
    { label: 'Active Users', value: stats.users, icon: Users },
    { label: 'Organizations', value: stats.orgs, icon: Building2 },
    { label: 'Industries', value: stats.industries, icon: Factory },
    { label: 'Companies', value: stats.companies, icon: Shield },
  ];

  return (
    <PortalShell portal="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and system configuration</p>
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}
      {loading ? (
        <LoadingState />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phase 1 — Foundation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Authentication & MFA</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>RBAC Authorization</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>Master Data</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>Industry Taxonomy</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>Company Management</span><span className="text-green-600">Active</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Phases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>Phase 2: Client Data Sheet, Financial Engine, Document Vault</div>
            <div>Phase 3: CHS Engine, Risk Matrix, AI Recommendations</div>
            <div>Phase 4: Workflow, Committee, Reporting</div>
            <div>Phase 5: Debt, Equity, Startup Rails</div>
            <div>Phase 6: Portfolio Monitoring, Predictive Analytics</div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
