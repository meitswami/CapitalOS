import { Badge } from '@/components/ui/badge';

const STATUS_VARIANTS: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
  ACTIVE: 'success',
  DRAFT: 'default',
  UNDER_REVIEW: 'warning',
  SUSPENDED: 'destructive',
  ARCHIVED: 'default',
  INACTIVE: 'default',
  PENDING_VERIFICATION: 'warning',
};

export function StatusBadge({ status }: { status: string }) {
  const variant = STATUS_VARIANTS[status] || 'default';
  return <Badge variant={variant}>{status.replace(/_/g, ' ')}</Badge>;
}
