import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CompanyDashboard() {
  return (
    <PortalShell portal="company">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your capital readiness and funding journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Capital Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-muted-foreground">—</div>
            <p className="text-sm text-muted-foreground mt-2">Complete your data sheet to generate CHS</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Capital Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-muted-foreground">Pending Assessment</div>
            <p className="text-sm text-muted-foreground mt-2">Debt · Equity · Startup rails evaluated post-scoring</p>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
