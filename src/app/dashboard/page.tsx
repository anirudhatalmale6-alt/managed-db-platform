import Link from 'next/link';
import {
  Database,
  Server,
  Plus,
  ArrowUpRight,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
} from 'lucide-react';

// Mock data - in production, fetch from API
const databases = [
  {
    id: '1',
    name: 'production-mysql',
    type: 'mysql',
    status: 'running',
    region: 'us-east-1',
    usage: { cpu: 45, memory: 62, storage: 38 },
  },
  {
    id: '2',
    name: 'analytics-postgres',
    type: 'postgresql',
    status: 'running',
    region: 'us-west-2',
    usage: { cpu: 28, memory: 55, storage: 72 },
  },
  {
    id: '3',
    name: 'cache-redis',
    type: 'redis',
    status: 'running',
    region: 'us-east-1',
    usage: { cpu: 12, memory: 34, storage: 15 },
  },
];

const recentActivity = [
  { id: 1, action: 'Database scaled up', resource: 'production-mysql', time: '2 hours ago' },
  { id: 2, action: 'Backup completed', resource: 'analytics-postgres', time: '4 hours ago' },
  { id: 3, action: 'New user added', resource: 'Team', time: '1 day ago' },
  { id: 4, action: 'Password changed', resource: 'Account', time: '2 days ago' },
];

const stats = [
  { label: 'Active Databases', value: '3', icon: Server, color: 'blue' },
  { label: 'Total Storage', value: '156 GB', icon: HardDrive, color: 'green' },
  { label: 'Monthly Cost', value: '$247', icon: Database, color: 'purple' },
  { label: 'Team Members', value: '4', icon: Activity, color: 'orange' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
      return 'bg-green-100 text-green-700';
    case 'stopped':
      return 'bg-gray-100 text-gray-700';
    case 'provisioning':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getDbIcon = (type: string) => {
  const icons: Record<string, string> = {
    mysql: '🐬',
    postgresql: '🐘',
    mongodb: '🍃',
    redis: '⚡',
    elasticsearch: '🔍',
  };
  return icons[type] || '💾';
};

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here&apos;s an overview of your databases.</p>
        </div>
        <Link
          href="/dashboard/databases/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Database
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Databases & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Databases */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Your Databases</h2>
            <Link
              href="/dashboard/databases"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {databases.map((db) => (
              <Link
                key={db.id}
                href={`/dashboard/databases/${db.id}`}
                className="flex items-center justify-between p-6 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getDbIcon(db.type)}</span>
                  <div>
                    <p className="font-medium text-gray-900">{db.name}</p>
                    <p className="text-sm text-gray-500">{db.type} • {db.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Cpu className="h-4 w-4" /> {db.usage.cpu}%
                    </span>
                    <span className="flex items-center gap-1">
                      <MemoryStick className="h-4 w-4" /> {db.usage.memory}%
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="h-4 w-4" /> {db.usage.storage}%
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(db.status)}`}>
                    {db.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Link
              href="/dashboard/activity"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {activity.resource} • {activity.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/dashboard/databases/new"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            Create Database
          </Link>
          <Link
            href="/dashboard/team"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            Invite Team Member
          </Link>
          <Link
            href="/dashboard/billing"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            View Invoices
          </Link>
          <Link
            href="/docs"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 text-sm font-medium"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
