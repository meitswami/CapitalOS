'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function InvestorDealsPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="investor">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deal Flow</h1>
        <p className="text-muted-foreground mt-1">Equity and startup opportunities</p>
      </div>
      <PhasePlaceholder phase={5} title="Deal Flow" description="Curated equity and startup opportunities with CHS integration in Phase 5." />
    </PortalShell>
  );
}
