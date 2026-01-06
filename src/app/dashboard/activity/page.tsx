'use client';

import { useState } from 'react';
import { Search, Filter, Download, Database, User, CreditCard, Settings } from 'lucide-react';

const activityLogs = [
  {
    id: '1',
    action: 'Database created',
    description: 'Created new MySQL database "production-mysql"',
    user: 'Demo Customer',
    category: 'database',
    timestamp: '2024-04-05 14:32:15',
    ipAddress: '192.168.1.100',
  },
  {
    id: '2',
    action: 'Database scaled',
    description: 'Scaled "analytics-postgres" from Starter to Professional plan',
    user: 'John Developer',
    category: 'database',
    timestamp: '2024-04-05 12:15:42',
    ipAddress: '192.168.1.105',
  },
  {
    id: '3',
    action: 'Team member invited',
    description: 'Invited sarah@example.com as Member',
    user: 'Demo Customer',
    category: 'team',
    timestamp: '2024-04-04 16:45:30',
    ipAddress: '192.168.1.100',
  },
  {
    id: '4',
    action: 'Payment method updated',
    description: 'Updated credit card ending in 4242',
    user: 'Demo Customer',
    category: 'billing',
    timestamp: '2024-04-04 10:22:18',
    ipAddress: '192.168.1.100',
  },
  {
    id: '5',
    action: 'Password changed',
    description: 'Account password was updated',
    user: 'Demo Customer',
    category: 'account',
    timestamp: '2024-04-03 09:15:00',
    ipAddress: '192.168.1.100',
  },
  {
    id: '6',
    action: 'Database backup completed',
    description: 'Automatic backup of "production-mysql" completed successfully',
    user: 'System',
    category: 'database',
    timestamp: '2024-04-03 03:00:00',
    ipAddress: 'System',
  },
  {
    id: '7',
    action: 'Login successful',
    description: 'Logged in from new device',
    user: 'Demo Customer',
    category: 'account',
    timestamp: '2024-04-02 08:30:45',
    ipAddress: '192.168.1.150',
  },
  {
    id: '8',
    action: 'Invoice paid',
    description: 'Invoice #INV-2024-003 paid - $247.00',
    user: 'System',
    category: 'billing',
    timestamp: '2024-04-01 00:00:00',
    ipAddress: 'System',
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'database':
      return <Database className="h-4 w-4" />;
    case 'team':
      return <User className="h-4 w-4" />;
    case 'billing':
      return <CreditCard className="h-4 w-4" />;
    default:
      return <Settings className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'database':
      return 'bg-blue-100 text-blue-600';
    case 'team':
      return 'bg-purple-100 text-purple-600';
    case 'billing':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const exportLogs = () => {
    const csv = filteredLogs
      .map((log) => `${log.timestamp},${log.action},${log.description},${log.user},${log.ipAddress}`)
      .join('\n');
    const blob = new Blob([`Timestamp,Action,Description,User,IP Address\n${csv}`], {
      type: 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity-logs.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-500">Track all actions and changes in your organization</p>
        </div>
        <button
          onClick={exportLogs}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="database">Database</option>
            <option value="team">Team</option>
            <option value="billing">Billing</option>
            <option value="account">Account</option>
          </select>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getCategoryColor(log.category)}`}>
                  {getCategoryIcon(log.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>By: {log.user}</span>
                    <span>IP: {log.ipAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500">No activity logs found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredLogs.length} of {activityLogs.length} entries
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
