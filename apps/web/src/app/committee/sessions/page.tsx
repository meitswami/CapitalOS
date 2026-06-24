'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function CommitteeSessionsPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="committee">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <p className="text-muted-foreground mt-1">Committee meeting schedule</p>
      </div>
      <PhasePlaceholder phase={4} title="Committee Sessions" description="Schedule and manage credit committee meetings in Phase 4." features={['Meeting calendar', 'Agenda builder', 'Attendance tracking']} />
    </PortalShell>
  );
}
