'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { CompanyDetailView } from '@/components/shared/company-detail-view';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import { EmptyState } from '@/components/shared/empty-state';
import type { ApiListResponse, Company } from '@/lib/types';

export default function CompanyProfilePage() {
  const { ready, token, user } = useRequireAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token) return;
    api<ApiListResponse<Company>>('/companies?limit=50', { token })
      .then(async (res) => {
        const match = res.data.find(
          (c) =>
            c.tradeName?.toLowerCase().includes('acme') ||
            c.legalName.toLowerCase().includes('acme') ||
            user?.email?.includes('acmetech'),
        );
        const target = match || res.data[0];
        if (target) {
          const detail = await api<{ success: boolean; data: Company }>(`/companies/${target.id}`, { token });
          setCompany(detail.data);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token, user]);

  if (!ready) return null;

  return (
    <PortalShell portal="company">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground mt-1">Legal information and business description</p>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : company ? (
        <CompanyDetailView company={company} />
      ) : (
        <EmptyState title="No company linked" description="Contact your administrator to link your account to a company." />
      )}
    </PortalShell>
  );
}
