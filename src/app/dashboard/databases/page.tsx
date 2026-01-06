'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Square,
  Trash2,
  Settings,
  ExternalLink,
  Cpu,
  MemoryStick,
  HardDrive,
} from 'lucide-react';

// Mock data
const databases = [
  {
    id: '1',
    name: 'production-mysql',
    type: 'mysql',
    version: '8.0',
    status: 'running',
    region: 'us-east-1',
    plan: 'Professional',
    usage: { cpu: 45, memory: 62, storage: 38 },
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'analytics-postgres',
    type: 'postgresql',
    version: '15',
    status: 'running',
    region: 'us-west-2',
    plan: 'Professional',
    usage: { cpu: 28, memory: 55, storage: 72 },
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'cache-redis',
    type: 'redis',
    version: '7.2',
    status: 'running',
    region: 'us-east-1',
    plan: 'Starter',
    usage: { cpu: 12, memory: 34, storage: 15 },
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'search-elastic',
    type: 'elasticsearch',
    version: '8.x',
    status: 'stopped',
    region: 'eu-west-1',
    plan: 'Starter',
    usage: { cpu: 0, memory: 0, storage: 45 },
    createdAt: '2024-03-25',
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

export default function DatabasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredDatabases = databases.filter((db) => {
    const matchesSearch = db.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || db.status === statusFilter;
    const matchesType = typeFilter === 'all' || db.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Databases</h1>
          <p className="text-gray-500">Manage your database instances</p>
        </div>
        <Link
          href="/dashboard/databases/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Database
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search databases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="stopped">Stopped</option>
            <option value="provisioning">Provisioning</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="redis">Redis</option>
            <option value="elasticsearch">Elasticsearch</option>
          </select>
        </div>
      </div>

      {/* Database List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Database
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
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                Plan
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
                  <Link href={`/dashboard/databases/${db.id}`} className="flex items-center gap-3">
                    <span className="text-2xl">{getDbIcon(db.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900 hover:text-blue-600">{db.name}</p>
                      <p className="text-sm text-gray-500">{db.type} {db.version}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(db.status)}`}>
                    {db.status}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-gray-600">{db.region}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1" title="CPU">
                      <Cpu className="h-4 w-4" /> {db.usage.cpu}%
                    </span>
                    <span className="flex items-center gap-1" title="Memory">
                      <MemoryStick className="h-4 w-4" /> {db.usage.memory}%
                    </span>
                    <span className="flex items-center gap-1" title="Storage">
                      <HardDrive className="h-4 w-4" /> {db.usage.storage}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-gray-600">{db.plan}</span>
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
                        <Link
                          href={`/dashboard/databases/${db.id}`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <ExternalLink className="h-4 w-4" /> View Details
                        </Link>
                        <Link
                          href={`/dashboard/databases/${db.id}/settings`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="h-4 w-4" /> Settings
                        </Link>
                        <hr className="my-1" />
                        {db.status === 'running' ? (
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 w-full">
                            <Square className="h-4 w-4" /> Stop
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

        {filteredDatabases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No databases found</p>
            <Link
              href="/dashboard/databases/new"
              className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-5 w-5" /> Create your first database
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
