'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function CommitteeDashboard() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="committee">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Committee Dashboard</h1>
        <p className="text-muted-foreground mt-1">Credit committee reviews and voting</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground mt-1">Assessments awaiting committee vote</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground mt-1">Scheduled committee meetings</p>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
