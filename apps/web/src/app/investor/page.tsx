import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvestorDashboard() {
  return (
    <PortalShell portal="investor">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Investor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Equity and startup deal flow overview</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Deal Flow</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">No active deals. Phase 5 will enable equity and startup rails.</p></CardContent>
      </Card>
    </PortalShell>
  );
}
