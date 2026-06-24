'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function LenderDebtRailPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="lender">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Debt Rail</h1>
        <p className="text-muted-foreground mt-1">Facility application management</p>
      </div>
      <PhasePlaceholder phase={5} title="Debt Rail" description="Term loan, working capital, and structured debt facility workflows in Phase 5." />
    </PortalShell>
  );
}
