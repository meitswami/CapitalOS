'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from '@/lib/api';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { LoadingState } from '@/components/shared/loading-state';
import { EmptyState } from '@/components/shared/empty-state';
import { Badge } from '@/components/ui/badge';
import type { ApiListResponse, Organization } from '@/lib/types';

const ORG_TYPES = ['PLATFORM', 'COMPANY', 'ADVISORY', 'BANK', 'NBFC', 'VC_FUND', 'PE_FUND', 'FAMILY_OFFICE'];

export default function AdminOrganizationsPage() {
  const { ready, token } = useRequireAuth();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'COMPANY', cin: '', pan: '' });
  const [submitting, setSubmitting] = useState(false);

  function loadOrgs() {
    if (!token) return;
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (search) params.set('search', search);
    api<ApiListResponse<Organization>>(`/organizations?${params}`, { token })
      .then((res) => setOrgs(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!ready || !token) return;
    loadOrgs();
  }, [ready, token, search]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setError('');
    try {
      await api('/organizations', {
        method: 'POST',
        token,
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          cin: form.cin || undefined,
          pan: form.pan || undefined,
        }),
      });
      setForm({ name: '', type: 'COMPANY', cin: '', pan: '' });
      setShowForm(false);
      loadOrgs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) return null;

  return (
    <PortalShell portal="admin">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Organizations</h1>
          <p className="text-muted-foreground mt-1">Banks, funds, companies, and advisory firms</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Organization'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader><CardTitle>New Organization</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {ORG_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
                </Select>
              </div>
              <div className="space-y-2">
                <Label>CIN</Label>
                <Input value={form.cin} onChange={(e) => setForm({ ...form, cin: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>PAN</Label>
                <Input value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create Organization'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="mb-6">
        <Input placeholder="Search organizations..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}
      {loading ? (
        <LoadingState />
      ) : orgs.length === 0 ? (
        <EmptyState title="No organizations found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Companies</TableHead>
              <TableHead>PAN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orgs.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <Link href={`/admin/organizations/${org.id}`} className="font-medium hover:text-accent">
                    {org.name}
                  </Link>
                </TableCell>
                <TableCell><Badge variant="outline">{org.type.replace(/_/g, ' ')}</Badge></TableCell>
                <TableCell>{org._count?.members ?? 0}</TableCell>
                <TableCell>{org._count?.companies ?? 0}</TableCell>
                <TableCell className="font-mono text-xs">{org.pan || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PortalShell>
  );
}
