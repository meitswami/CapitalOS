'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function InvestorDashboard() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="investor">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Investor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Equity and startup deal flow overview</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Deal Flow', value: '0', desc: 'Active opportunities' },
          { title: 'Equity Rounds', value: '0', desc: 'In diligence' },
          { title: 'Startup Applications', value: '0', desc: 'Pending review' },
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
