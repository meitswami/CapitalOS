import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalystDashboard() {
  return (
    <PortalShell portal="analyst">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analyst Dashboard</h1>
        <p className="text-muted-foreground mt-1">Review companies, score CHS, and assess capital readiness</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Pending Reviews', value: '0', desc: 'Assessments awaiting analyst review' },
          { title: 'In Progress', value: '0', desc: 'Active data sheet entries' },
          { title: 'Completed This Month', value: '0', desc: 'Approved assessments' },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
