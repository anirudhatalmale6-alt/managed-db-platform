'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Database,
  LayoutDashboard,
  Server,
  CreditCard,
  Users,
  Activity,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardSidebarProps {
  isAdmin?: boolean;
}

const customerNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Databases', href: '/dashboard/databases', icon: Server },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Activity', href: '/dashboard/activity', icon: Activity },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const adminNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Databases', href: '/admin/databases', icon: Server },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Activity Logs', href: '/admin/activity', icon: Activity },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function DashboardSidebar({ isAdmin = false }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = isAdmin ? adminNavItems : customerNavItems;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-800">
          <Database className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">CloudDB</span>
          {isAdmin && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-600 rounded">Admin</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-800 p-4 space-y-1">
          <Link
            href="/docs"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            Help & Docs
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
