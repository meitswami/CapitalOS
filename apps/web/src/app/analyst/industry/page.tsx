'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import type { ApiResponse, Industry } from '@/lib/types';

export default function AnalystIndustryPage() {
  const { ready, token } = useRequireAuth();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token) return;
    api<ApiResponse<Industry[]>>('/industry/taxonomy', { token })
      .then((res) => setIndustries(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token]);

  if (!ready) return null;

  return (
    <PortalShell portal="analyst">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Industry Taxonomy</h1>
        <p className="text-muted-foreground mt-1">Industry tree with CHS pillar weight configuration</p>
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}
      {loading ? (
        <LoadingState />
      ) : (
        <div className="space-y-4">
          {industries.map((ind) => (
            <Card key={ind.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <span className="font-mono text-sm text-muted-foreground mr-2">{ind.code}</span>
                  {ind.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {ind.pillarWeights?.map((w) => (
                    <span key={w.pillar} className="px-2 py-0.5 rounded bg-secondary text-xs">
                      {w.pillar.replace(/_/g, ' ')}: {w.weight}%
                    </span>
                  ))}
                </div>
                {ind.subSectors && ind.subSectors.length > 0 && (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {ind.subSectors.map((sub) => (
                      <div key={sub.id} className="text-sm px-3 py-2 rounded-md border">
                        <span className="font-mono text-xs text-muted-foreground">{sub.code}</span>
                        <span className="ml-2">{sub.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
