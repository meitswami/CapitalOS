'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function LenderDashboard() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="lender">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Lender Dashboard</h1>
        <p className="text-muted-foreground mt-1">Debt pipeline and credit assessment overview</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Active Pipeline', value: '0', desc: 'Deals in progress' },
          { title: 'Approved', value: '0', desc: 'This quarter' },
          { title: 'Total Exposure', value: '₹0', desc: 'Outstanding facilities' },
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
