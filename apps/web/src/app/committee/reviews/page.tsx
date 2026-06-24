'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function CommitteeReviewsPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="committee">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="text-muted-foreground mt-1">Assessment review queue</p>
      </div>
      <PhasePlaceholder phase={4} title="Committee Reviews" description="Full assessment review with voting interface coming in Phase 4." features={['Assessment summary', 'Member voting', 'Dissent notes', 'Approval workflow']} />
    </PortalShell>
  );
}
