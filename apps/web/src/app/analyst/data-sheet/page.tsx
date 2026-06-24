'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function AnalystDataSheetPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="analyst">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Client Data Sheet</h1>
        <p className="text-muted-foreground mt-1">Financial and regulatory data entry</p>
      </div>
      <PhasePlaceholder
        phase={2}
        title="Data Sheet Engine"
        description="Multi-tab financial and regulatory data entry will be available in Phase 2. Analysts will capture balance sheets, cash flows, and compliance data here."
        features={[
          'Balance sheet & P&L entry',
          'Cash flow statements',
          'Regulatory compliance fields',
          'Period-over-period comparison',
          'Auto-validation against industry benchmarks',
        ]}
      />
    </PortalShell>
  );
}
