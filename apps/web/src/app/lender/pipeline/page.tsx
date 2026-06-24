'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function LenderPipelinePage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="lender">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deal Pipeline</h1>
        <p className="text-muted-foreground mt-1">Kanban view of debt opportunities</p>
      </div>
      <PhasePlaceholder phase={5} title="Debt Pipeline" description="Deal pipeline kanban with CHS scores and facility sizing coming in Phase 5." features={['Kanban pipeline', 'CHS integration', 'Facility sizing', 'Collateral tracking']} />
    </PortalShell>
  );
}
