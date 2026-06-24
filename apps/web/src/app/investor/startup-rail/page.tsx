'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function InvestorStartupRailPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="investor">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Startup Rail</h1>
        <p className="text-muted-foreground mt-1">Early-stage startup application review</p>
      </div>
      <PhasePlaceholder phase={5} title="Startup Rail" description="Startup application scoring and accelerator-style review workflows in Phase 5." />
    </PortalShell>
  );
}
