'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  LayoutDashboard,
  Factory,
  Shield,
  FileText,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PORTAL_NAV: Record<string, { title: string; items: NavItem[] }> = {
  company: {
    title: 'Company Portal',
    items: [
      { label: 'Dashboard', href: '/company', icon: LayoutDashboard },
      { label: 'Profile', href: '/company/profile', icon: Building2 },
      { label: 'Documents', href: '/company/documents', icon: FileText },
      { label: 'CHS Score', href: '/company/chs', icon: Shield },
    ],
  },
  analyst: {
    title: 'Analyst Portal',
    items: [
      { label: 'Dashboard', href: '/analyst', icon: LayoutDashboard },
      { label: 'Companies', href: '/analyst/companies', icon: Building2 },
      { label: 'Data Sheet', href: '/analyst/data-sheet', icon: FileText },
      { label: 'CHS Engine', href: '/analyst/chs', icon: Shield },
      { label: 'Industry', href: '/analyst/industry', icon: Factory },
    ],
  },
  lender: {
    title: 'Lender Portal',
    items: [
      { label: 'Dashboard', href: '/lender', icon: LayoutDashboard },
      { label: 'Pipeline', href: '/lender/pipeline', icon: Building2 },
      { label: 'Debt Rail', href: '/lender/debt-rail', icon: FileText },
      { label: 'Reports', href: '/lender/reports', icon: Shield },
    ],
  },
  investor: {
    title: 'Investor Portal',
    items: [
      { label: 'Dashboard', href: '/investor', icon: LayoutDashboard },
      { label: 'Deal Flow', href: '/investor/deals', icon: Building2 },
      { label: 'Equity Rail', href: '/investor/equity-rail', icon: FileText },
      { label: 'Startup Rail', href: '/investor/startup-rail', icon: Shield },
    ],
  },
  committee: {
    title: 'Committee Portal',
    items: [
      { label: 'Dashboard', href: '/committee', icon: LayoutDashboard },
      { label: 'Reviews', href: '/committee/reviews', icon: Shield },
      { label: 'Sessions', href: '/committee/sessions', icon: Users },
    ],
  },
  admin: {
    title: 'Super Admin',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Users', href: '/admin/users', icon: Users },
      { label: 'Organizations', href: '/admin/organizations', icon: Building2 },
      { label: 'Industry Taxonomy', href: '/admin/industry', icon: Factory },
      { label: 'Master Data', href: '/admin/masters', icon: Settings },
      { label: 'Audit Trail', href: '/admin/audit', icon: FileText },
    ],
  },
};

interface PortalShellProps {
  portal: keyof typeof PORTAL_NAV;
  children: React.ReactNode;
  user?: { firstName?: string; lastName?: string; email?: string };
}

export function PortalShell({ portal, children, user }: PortalShellProps) {
  const pathname = usePathname();
  const config = PORTAL_NAV[portal];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-primary text-primary-foreground flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-xs uppercase tracking-widest text-white/60 mb-1">CapitalOS</div>
          <div className="font-semibold text-lg">{config.title}</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {config.items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          {user && (
            <div className="mb-3 px-3">
              <div className="text-sm font-medium">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-white/60">{user.email}</div>
            </div>
          )}
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
