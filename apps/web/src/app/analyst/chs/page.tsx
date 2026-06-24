'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

const PILLARS = [
  'Strategic & Business',
  'Financial',
  'Liquidity',
  'Management',
  'Operational',
  'Industry',
  'ESG',
];

export default function AnalystChsPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="analyst">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">CHS Engine</h1>
        <p className="text-muted-foreground mt-1">Capital Health Score assessment and pillar scoring</p>
      </div>
      <PhasePlaceholder
        phase={3}
        title="CHS Scoring Engine"
        description="The 7-pillar Capital Health Score engine will enable parameter-level scoring with AI-assisted recommendations in Phase 3."
        features={PILLARS.map((p) => `${p} pillar scoring`)}
      />
    </PortalShell>
  );
}
