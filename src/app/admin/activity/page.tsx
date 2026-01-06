'use client';

import { useState } from 'react';
import { Search, Filter, Download, Database, User, CreditCard, Settings, Shield } from 'lucide-react';

const activityLogs = [
  {
    id: '1',
    action: 'Customer created',
    description: 'New customer StartupX registered',
    user: 'System',
    category: 'customer',
    severity: 'info',
    timestamp: '2024-04-05 14:32:15',
    ipAddress: '203.45.67.89',
  },
  {
    id: '2',
    action: 'Database provisioned',
    description: 'MySQL database "production-db" created for Acme Corp',
    user: 'System',
    category: 'database',
    severity: 'info',
    timestamp: '2024-04-05 12:15:42',
    ipAddress: 'System',
  },
  {
    id: '3',
    action: 'Payment failed',
    description: 'Payment for CloudNine failed - Card declined',
    user: 'System',
    category: 'billing',
    severity: 'warning',
    timestamp: '2024-04-05 10:00:00',
    ipAddress: 'System',
  },
  {
    id: '4',
    action: 'Admin login',
    description: 'Admin user logged in',
    user: 'admin@clouddb.com',
    category: 'security',
    severity: 'info',
    timestamp: '2024-04-05 09:30:00',
    ipAddress: '192.168.1.50',
  },
  {
    id: '5',
    action: 'Customer suspended',
    description: 'DevOps Pro account suspended due to payment issues',
    user: 'admin@clouddb.com',
    category: 'customer',
    severity: 'warning',
    timestamp: '2024-04-04 16:45:30',
    ipAddress: '192.168.1.50',
  },
  {
    id: '6',
    action: 'Database deleted',
    description: 'Elasticsearch database "old-search" deleted by DataFlow',
    user: 'contact@dataflow.com',
    category: 'database',
    severity: 'info',
    timestamp: '2024-04-04 14:22:18',
    ipAddress: '103.45.67.123',
  },
  {
    id: '7',
    action: 'Failed login attempt',
    description: 'Multiple failed login attempts for user unknown@email.com',
    user: 'unknown@email.com',
    category: 'security',
    severity: 'error',
    timestamp: '2024-04-04 03:15:00',
    ipAddress: '45.67.89.10',
  },
  {
    id: '8',
    action: 'Plan upgraded',
    description: 'TechStart Inc upgraded from Professional to Enterprise',
    user: 'hello@techstart.io',
    category: 'billing',
    severity: 'info',
    timestamp: '2024-04-03 11:30:00',
    ipAddress: '156.78.90.12',
  },
  {
    id: '9',
    action: 'Backup completed',
    description: 'All scheduled backups completed successfully',
    user: 'System',
    category: 'database',
    severity: 'info',
    timestamp: '2024-04-03 03:00:00',
    ipAddress: 'System',
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'database':
      return <Database className="h-4 w-4" />;
    case 'customer':
      return <User className="h-4 w-4" />;
    case 'billing':
      return <CreditCard className="h-4 w-4" />;
    case 'security':
      return <Shield className="h-4 w-4" />;
    default:
      return <Settings className="h-4 w-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'error':
      return 'bg-red-100 text-red-600';
    case 'warning':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-blue-100 text-blue-600';
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'error':
      return 'bg-red-100 text-red-700';
    case 'warning':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function AdminActivityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const exportLogs = () => {
    const csv = filteredLogs
      .map((log) =>
        `${log.timestamp},${log.severity},${log.action},${log.description},${log.user},${log.ipAddress}`
      )
      .join('\n');
    const blob = new Blob([`Timestamp,Severity,Action,Description,User,IP Address\n${csv}`], {
      type: 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin-audit-logs.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-500">Platform-wide audit trail and system events</p>
        </div>
        <button
          onClick={exportLogs}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <Download className="h-5 w-5" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Events</p>
          <p className="text-2xl font-bold text-gray-900">{activityLogs.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Errors</p>
          <p className="text-2xl font-bold text-red-600">
            {activityLogs.filter((l) => l.severity === 'error').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Warnings</p>
          <p className="text-2xl font-bold text-yellow-600">
            {activityLogs.filter((l) => l.severity === 'warning').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Security Events</p>
          <p className="text-2xl font-bold text-blue-600">
            {activityLogs.filter((l) => l.category === 'security').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="database">Database</option>
            <option value="customer">Customer</option>
            <option value="billing">Billing</option>
            <option value="security">Security</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Severity</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getSeverityColor(log.severity)}`}>
                  {getCategoryIcon(log.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{log.action}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(log.severity)}`}>
                        {log.severity}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>User: {log.user}</span>
                    <span>IP: {log.ipAddress}</span>
                    <span className="capitalize">Category: {log.category}</span>
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
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
