'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalShell } from '@/components/layout/portal-shell';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import type { ApiListResponse, Company } from '@/lib/types';

export default function AnalystCompaniesPage() {
  const { ready, token } = useRequireAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token) return;
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (search) params.set('search', search);

    api<ApiListResponse<Company>>(`/companies?${params}`, { token })
      .then((res) => setCompanies(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token, search]);

  if (!ready) return null;

  return (
    <PortalShell portal="analyst">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Companies</h1>
        <p className="text-muted-foreground mt-1">Searchable company directory for assessment</p>
      </div>

      <div className="mb-6">
        <Input placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}
      {loading ? (
        <LoadingState />
      ) : companies.length === 0 ? (
        <EmptyState title="No companies found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Legal Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Sub-sector</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((co) => (
              <TableRow key={co.id}>
                <TableCell>
                  <Link href={`/analyst/companies/${co.id}`} className="font-medium hover:text-accent">
                    {co.legalName}
                  </Link>
                  {co.tradeName && <div className="text-xs text-muted-foreground">{co.tradeName}</div>}
                </TableCell>
                <TableCell>{co.industry?.name || '—'}</TableCell>
                <TableCell>{co.subSector?.name || '—'}</TableCell>
                <TableCell><StatusBadge status={co.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PortalShell>
  );
}
