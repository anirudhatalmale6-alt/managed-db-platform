import Link from 'next/link';
import {
  Users,
  Server,
  DollarSign,
  Activity,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Customers',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
  },
  {
    label: 'Active Databases',
    value: '3,891',
    change: '+8%',
    changeType: 'positive',
    icon: Server,
  },
  {
    label: 'Monthly Revenue',
    value: '$124,500',
    change: '+15%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    label: 'System Health',
    value: '99.99%',
    change: '+0.01%',
    changeType: 'positive',
    icon: Activity,
  },
];

const recentCustomers = [
  { id: '1', name: 'Acme Corp', email: 'admin@acme.com', plan: 'Enterprise', databases: 12, joined: '2024-04-05' },
  { id: '2', name: 'TechStart Inc', email: 'hello@techstart.io', plan: 'Professional', databases: 5, joined: '2024-04-04' },
  { id: '3', name: 'DataFlow', email: 'contact@dataflow.com', plan: 'Professional', databases: 8, joined: '2024-04-03' },
  { id: '4', name: 'CloudNine', email: 'info@cloudnine.app', plan: 'Starter', databases: 2, joined: '2024-04-02' },
];

const alerts = [
  { id: '1', type: 'warning', message: 'High CPU usage detected on db-cluster-05', time: '10 min ago' },
  { id: '2', type: 'info', message: 'Scheduled maintenance window starting in 2 hours', time: '30 min ago' },
  { id: '3', type: 'success', message: 'All backup jobs completed successfully', time: '1 hour ago' },
];

const getAlertStyles = (type: string) => {
  switch (type) {
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800';
    case 'success':
      return 'bg-green-50 border-green-200 text-green-800';
    default:
      return 'bg-blue-50 border-blue-200 text-blue-800';
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className={`h-4 w-4 ${
                    stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Customers */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Customers</h2>
            <Link
              href="/admin/customers"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Plan
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Databases
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/admin/customers/${customer.id}`}>
                        <p className="font-medium text-gray-900 hover:text-blue-600">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        customer.plan === 'Enterprise'
                          ? 'bg-purple-100 text-purple-700'
                          : customer.plan === 'Professional'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{customer.databases}</td>
                    <td className="px-6 py-4 text-gray-500">{customer.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              System Alerts
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertStyles(alert.type)}`}
              >
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs mt-1 opacity-70">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold">Admin Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/customers"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            Manage Customers
          </Link>
          <Link
            href="/admin/databases"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            All Databases
          </Link>
          <Link
            href="/admin/payments"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            Payment Reports
          </Link>
          <Link
            href="/admin/activity"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            Audit Logs
          </Link>
        </div>
      </div>
    </div>
  );
}
