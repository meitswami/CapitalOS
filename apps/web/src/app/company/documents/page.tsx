'use client';

import { PortalShell } from '@/components/layout/portal-shell';
import { PhasePlaceholder } from '@/components/shared/phase-placeholder';
import { useRequireAuth } from '@/hooks/use-require-auth';

export default function CompanyDocumentsPage() {
  const { ready } = useRequireAuth();
  if (!ready) return null;

  return (
    <PortalShell portal="company">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Document Vault</h1>
        <p className="text-muted-foreground mt-1">Upload and manage compliance documents</p>
      </div>
      <PhasePlaceholder
        phase={2}
        title="Document Vault"
        description="Secure document upload and management with S3-backed storage will be available in Phase 2."
        features={['Category-based uploads', 'Version history', 'Verification workflow', 'MinIO / S3 integration']}
      />
    </PortalShell>
  );
}
