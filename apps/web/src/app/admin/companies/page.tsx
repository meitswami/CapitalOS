'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { getAccessToken } from '@/lib/auth';

interface Company {
  id: string;
  legalName: string;
  tradeName?: string;
  cin?: string;
  status: string;
  industry: { name: string };
  subSector: { name: string };
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setError('Please sign in first');
      setLoading(false);
      return;
    }

    api<{ success: boolean; data: Company[] }>('/companies?limit=50', { token })
      .then((res) => setCompanies(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalShell portal="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Companies</h1>
        <p className="text-muted-foreground mt-1">Live data from Hostinger MySQL</p>
      </div>

      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">{error}</p>}

      <div className="grid gap-4">
        {companies.map((co) => (
          <Card key={co.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{co.legalName}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              {co.tradeName && <div>Trade: {co.tradeName}</div>}
              {co.cin && <div>CIN: {co.cin}</div>}
              <div>Industry: {co.industry?.name} / {co.subSector?.name}</div>
              <div>
                Status:{' '}
                <span className="font-medium text-foreground">{co.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
