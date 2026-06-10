import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LenderDashboard() {
  return (
    <PortalShell portal="lender">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Lender Dashboard</h1>
        <p className="text-muted-foreground mt-1">Debt pipeline and credit assessment overview</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Debt Rail Pipeline</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">No active deals. Phase 5 will enable full debt rail workflows.</p></CardContent>
      </Card>
    </PortalShell>
  );
}
