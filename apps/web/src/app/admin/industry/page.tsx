'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { getAccessToken } from '@/lib/auth';

interface Industry {
  id: string;
  code: string;
  name: string;
  _count: { subSectors: number };
  pillarWeights: { pillar: string; weight: string }[];
}

export default function AdminIndustryPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setError('Please sign in first');
      setLoading(false);
      return;
    }

    api<{ success: boolean; data: Industry[] }>('/industry?limit=50', { token })
      .then((res) => setIndustries(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalShell portal="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Industry Taxonomy</h1>
        <p className="text-muted-foreground mt-1">Industries with CHS pillar weights</p>
      </div>

      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        {industries.map((ind) => (
          <Card key={ind.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                <span className="text-muted-foreground font-mono text-sm mr-2">{ind.code}</span>
                {ind.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="text-muted-foreground mb-2">
                {ind._count.subSectors} sub-sectors
              </div>
              <div className="flex flex-wrap gap-1">
                {ind.pillarWeights?.map((w) => (
                  <span
                    key={w.pillar}
                    className="px-2 py-0.5 rounded bg-secondary text-xs"
                  >
                    {w.pillar.replace(/_/g, ' ')}: {w.weight}%
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
