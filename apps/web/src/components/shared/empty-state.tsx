import { Inbox } from 'lucide-react';

export function EmptyState({
  title = 'No data',
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox className="h-10 w-10 text-muted-foreground/50 mb-3" />
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>}
    </div>
  );
}
