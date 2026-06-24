'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function CompanyChsPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="company">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">CHS Score</h1>
        <p className="text-muted-foreground mt-1">View your Capital Health Score breakdown</p>
      </div>
      <PhasePlaceholder
        phase={3}
        title="CHS Score Dashboard"
        description="View your 7-pillar Capital Health Score, historical trends, and improvement recommendations in Phase 3."
        features={['Pillar breakdown chart', 'Score history', 'Peer benchmarking', 'Improvement recommendations']}
      />
    </PortalShell>
  );
}
