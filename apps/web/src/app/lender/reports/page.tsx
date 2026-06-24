'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function LenderReportsPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="lender">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">Lender report generation</p>
      </div>
      <PhasePlaceholder phase={4} title="Lender Reports" description="Credit memo and portfolio reports coming in Phase 4." features={['Credit memos', 'Portfolio summaries', 'Export to PDF']} />
    </PortalShell>
  );
}
