'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function InvestorEquityRailPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="investor">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Equity Rail</h1>
        <p className="text-muted-foreground mt-1">Round management and term sheets</p>
      </div>
      <PhasePlaceholder phase={5} title="Equity Rail" description="Series A/B round management, term sheets, and cap table integration in Phase 5." />
    </PortalShell>
  );
}
