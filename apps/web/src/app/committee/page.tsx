import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CommitteeDashboard() {
  return (
    <PortalShell portal="committee">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Committee Dashboard</h1>
        <p className="text-muted-foreground mt-1">Credit committee reviews and voting</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Pending Reviews</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">No assessments in committee review. Phase 4 enables full committee workflows.</p></CardContent>
      </Card>
    </PortalShell>
  );
}
