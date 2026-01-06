'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  MoreVertical,
  Play,
  Square,
  Trash2,
  Eye,
  Download,
  AlertTriangle,
} from 'lucide-react';

const databases = [
  {
    id: '1',
    name: 'production-mysql',
    type: 'mysql',
    version: '8.0',
    customer: 'Acme Corp',
    customerId: '1',
    status: 'running',
    region: 'us-east-1',
    plan: 'Enterprise',
    cpu: 45,
    memory: 62,
    storage: 38,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'analytics-postgres',
    type: 'postgresql',
    version: '15',
    customer: 'Acme Corp',
    customerId: '1',
    status: 'running',
    region: 'us-west-2',
    plan: 'Professional',
    cpu: 28,
    memory: 55,
    storage: 72,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'app-mongodb',
    type: 'mongodb',
    version: '7.0',
    customer: 'TechStart Inc',
    customerId: '2',
    status: 'running',
    region: 'us-east-1',
    plan: 'Professional',
    cpu: 35,
    memory: 48,
    storage: 55,
    createdAt: '2024-03-01',
  },
  {
    id: '4',
    name: 'cache-redis',
    type: 'redis',
    version: '7.2',
    customer: 'DataFlow',
    customerId: '3',
    status: 'running',
    region: 'eu-west-1',
    plan: 'Starter',
    cpu: 12,
    memory: 34,
    storage: 15,
    createdAt: '2024-03-10',
  },
  {
    id: '5',
    name: 'search-elastic',
    type: 'elasticsearch',
    version: '8.x',
    customer: 'CloudNine',
    customerId: '4',
    status: 'stopped',
    region: 'ap-southeast-1',
    plan: 'Starter',
    cpu: 0,
    memory: 0,
    storage: 45,
    createdAt: '2024-03-25',
  },
  {
    id: '6',
    name: 'dev-postgres',
    type: 'postgresql',
    version: '16',
    customer: 'StartupX',
    customerId: '6',
    status: 'provisioning',
    region: 'us-east-1',
    plan: 'Starter',
    cpu: 0,
    memory: 0,
    storage: 0,
    createdAt: '2024-04-05',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
      return 'bg-green-100 text-green-700';
    case 'stopped':
      return 'bg-gray-100 text-gray-700';
    case 'provisioning':
      return 'bg-yellow-100 text-yellow-700';
    case 'failed':
      return 'bg-red-100 text-red-700';
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

export default function AdminDatabasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredDatabases = databases.filter((db) => {
    const matchesSearch =
      db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || db.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || db.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Databases</h1>
          <p className="text-gray-500">Monitor and manage all database instances</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Databases</p>
          <p className="text-2xl font-bold text-gray-900">{databases.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Running</p>
          <p className="text-2xl font-bold text-green-600">
            {databases.filter((d) => d.status === 'running').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Stopped</p>
          <p className="text-2xl font-bold text-gray-600">
            {databases.filter((d) => d.status === 'stopped').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Provisioning</p>
          <p className="text-2xl font-bold text-yellow-600">
            {databases.filter((d) => d.status === 'provisioning').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Issues</p>
            <p className="text-2xl font-bold text-red-600">0</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search databases or customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Types</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="redis">Redis</option>
            <option value="elasticsearch">Elasticsearch</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="stopped">Stopped</option>
            <option value="provisioning">Provisioning</option>
          </select>
        </div>
      </div>

      {/* Database Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Database
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                Region
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">
                Resources
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDatabases.map((db) => (
              <tr key={db.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getDbIcon(db.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{db.name}</p>
                      <p className="text-sm text-gray-500">
                        {db.type} {db.version} • {db.plan}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/customers/${db.customerId}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {db.customer}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(db.status)}`}>
                    {db.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                  {db.region}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span title="CPU">{db.cpu}% CPU</span>
                    <span title="Memory">{db.memory}% Mem</span>
                    <span title="Storage">{db.storage}% Disk</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === db.id ? null : db.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                    {openMenu === db.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                          <Eye className="h-4 w-4" /> View Details
                        </button>
                        <hr className="my-1" />
                        {db.status === 'running' ? (
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 w-full">
                            <Square className="h-4 w-4" /> Force Stop
                          </button>
                        ) : (
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full">
                            <Play className="h-4 w-4" /> Start
                          </button>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
