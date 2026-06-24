'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PortalShell } from '@/components/layout/portal-shell';
import { Button } from '@/components/ui/button';
import { CompanyDetailView } from '@/components/shared/company-detail-view';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import type { ApiResponse, Company } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

export default function AdminCompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { ready, token } = useRequireAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token || !id) return;
    api<ApiResponse<Company>>(`/companies/${id}`, { token })
      .then((res) => setCompany(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token, id]);

  if (!ready) return null;

  return (
    <PortalShell portal="admin">
      <Link href="/admin/companies">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Button>
      </Link>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : company ? (
        <CompanyDetailView company={company} />
      ) : null}
    </PortalShell>
  );
}
