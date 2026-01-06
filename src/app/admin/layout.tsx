import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isAdmin />
      <div className="ml-64">
        <DashboardHeader userName="Admin" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
