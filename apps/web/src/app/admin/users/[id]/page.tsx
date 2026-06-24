'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import { StatusBadge } from '@/components/shared/status-badge';
import type { ApiResponse, User } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

export default function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { ready, token } = useRequireAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token || !id) return;
    api<ApiResponse<User>>(`/users/${id}`, { token })
      .then((res) => setUser(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token, id]);

  if (!ready) return null;

  return (
    <PortalShell portal="admin">
      <div className="mb-6">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : user ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-muted-foreground mt-1">{user.email}</p>
              </div>
              <StatusBadge status={user.status} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><span className="text-muted-foreground">Phone:</span> {user.phone || '—'}</div>
                  <div><span className="text-muted-foreground">MFA:</span> {user.mfaEnabled ? 'Enabled' : 'Disabled'}</div>
                  <div><span className="text-muted-foreground">Last Login:</span> {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : '—'}</div>
                  <div><span className="text-muted-foreground">Created:</span> {new Date(user.createdAt).toLocaleDateString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Role Assignments</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {user.userRoles?.map((ur) => (
                    <div key={ur.role.code} className="border-b border-border pb-2 last:border-0">
                      <div className="font-medium">{ur.role.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Portal: {ur.role.portal.replace(/_/g, ' ')}
                        {ur.organization && ` · ${ur.organization.name}`}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </PortalShell>
  );
}
