'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import { EmptyState } from '@/components/shared/empty-state';
import type { ApiResponse, MasterCategory } from '@/lib/types';

export default function AdminMastersPage() {
  const { ready, token } = useRequireAuth();
  const [categories, setCategories] = useState<MasterCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token) return;
    api<ApiResponse<MasterCategory[]>>('/masters', { token })
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token]);

  if (!ready) return null;

  return (
    <PortalShell portal="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Master Data</h1>
        <p className="text-muted-foreground mt-1">Lookup tables and reference data categories</p>
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}
      {loading ? (
        <LoadingState />
      ) : categories.length === 0 ? (
        <EmptyState title="No master data categories" />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <span className="text-muted-foreground font-mono text-sm mr-2">{cat.code}</span>
                  {cat.name}
                </CardTitle>
                {cat.description && (
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item.id} className="px-2 py-1 rounded-md bg-secondary text-sm">
                      {item.label}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">{cat.items.length} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
