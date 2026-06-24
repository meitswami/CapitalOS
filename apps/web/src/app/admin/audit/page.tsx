'use client';

import { useEffect, useState } from 'react';
import { PortalShell } from '@/components/layout/portal-shell';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import { EmptyState } from '@/components/shared/empty-state';
import type { ApiListResponse, AuditLog } from '@/lib/types';

const ACTIONS = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'APPROVE', 'REJECT', 'SUBMIT', 'OVERRIDE'];

export default function AdminAuditPage() {
  const { ready, token } = useRequireAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [action, setAction] = useState('');
  const [entityType, setEntityType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ready || !token) return;
    setLoading(true);
    const params = new URLSearchParams({ limit: '100' });
    if (action) params.set('action', action);
    if (entityType) params.set('entityType', entityType);

    api<ApiListResponse<AuditLog>>(`/audit?${params}`, { token })
      .then((res) => setLogs(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ready, token, action, entityType]);

  if (!ready) return null;

  return (
    <PortalShell portal="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Audit Trail</h1>
        <p className="text-muted-foreground mt-1">Platform activity and change history</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={action} onChange={(e) => setAction(e.target.value)} className="max-w-[180px]">
          <option value="">All actions</option>
          {ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
        </Select>
        <Input
          placeholder="Filter by entity type..."
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}
      {loading ? (
        <LoadingState />
      ) : logs.length === 0 ? (
        <EmptyState title="No audit events" description="Activity will appear here as users interact with the platform." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Entity ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-sm">
                  {new Date(log.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {log.user ? (
                    <div>
                      <div className="text-sm">{log.user.firstName} {log.user.lastName}</div>
                      <div className="text-xs text-muted-foreground">{log.user.email}</div>
                    </div>
                  ) : '—'}
                </TableCell>
                <TableCell><Badge>{log.action}</Badge></TableCell>
                <TableCell>{log.entityType}</TableCell>
                <TableCell className="font-mono text-xs">{log.entityId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PortalShell>
  );
}
