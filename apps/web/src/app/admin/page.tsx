import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Factory, Users, Shield } from 'lucide-react';

const stats = [
  { label: 'Active Users', value: '—', icon: Users },
  { label: 'Organizations', value: '—', icon: Building2 },
  { label: 'Industries', value: '10+', icon: Factory },
  { label: 'CHS Assessments', value: '—', icon: Shield },
];

export default function AdminDashboard() {
  return (
    <PortalShell portal="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and system configuration</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phase 1 — Foundation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Authentication & MFA</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>RBAC Authorization</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>Master Data</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>Industry Taxonomy</span><span className="text-green-600">Active</span></div>
            <div className="flex justify-between"><span>Company Management</span><span className="text-green-600">Active</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Phases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>Phase 2: Client Data Sheet, Financial Engine, Document Vault</div>
            <div>Phase 3: CHS Engine, Risk Matrix, AI Recommendations</div>
            <div>Phase 4: Workflow, Committee, Reporting</div>
            <div>Phase 5: Debt, Equity, Startup Rails</div>
            <div>Phase 6: Portfolio Monitoring, Predictive Analytics</div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
