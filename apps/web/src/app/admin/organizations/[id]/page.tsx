'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import type { ApiResponse, Organization } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

export default function AdminOrganizationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { ready, token } = useRequireAuth();
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token || !id) return;
    api<ApiResponse<Organization>>(`/organizations/${id}`, { token })
      .then((res) => setOrg(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token, id]);

  if (!ready) return null;

  return (
    <PortalShell portal="admin">
      <Link href="/admin/organizations">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Organizations
        </Button>
      </Link>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : org ? (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{org.name}</h1>
              <Badge variant="outline" className="mt-2">{org.type.replace(/_/g, ' ')}</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><span className="text-muted-foreground">Legal Name:</span> {org.legalName || '—'}</div>
                <div><span className="text-muted-foreground">CIN:</span> <span className="font-mono">{org.cin || '—'}</span></div>
                <div><span className="text-muted-foreground">GSTIN:</span> <span className="font-mono">{org.gstin || '—'}</span></div>
                <div><span className="text-muted-foreground">PAN:</span> <span className="font-mono">{org.pan || '—'}</span></div>
                <div><span className="text-muted-foreground">Website:</span> {org.website || '—'}</div>
                <div><span className="text-muted-foreground">Companies:</span> {org._count?.companies ?? 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Members</CardTitle></CardHeader>
              <CardContent>
                {org.members && org.members.length > 0 ? (
                  <div className="space-y-3">
                    {org.members.map((m) => (
                      <div key={m.user.id} className="flex justify-between text-sm">
                        <div>
                          <div className="font-medium">{m.user.firstName} {m.user.lastName}</div>
                          <div className="text-muted-foreground">{m.user.email}</div>
                        </div>
                        <Link href={`/admin/users/${m.user.id}`} className="text-accent text-sm hover:underline">
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No members assigned to this organization.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </PortalShell>
  );
}
