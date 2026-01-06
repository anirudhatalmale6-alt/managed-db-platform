'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  DollarSign,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Check,
} from 'lucide-react';

const transactions = [
  {
    id: 'TXN-001',
    customer: 'Acme Corp',
    email: 'admin@acme.com',
    amount: 3588,
    status: 'completed',
    method: 'card',
    date: '2024-04-01',
  },
  {
    id: 'TXN-002',
    customer: 'TechStart Inc',
    email: 'hello@techstart.io',
    amount: 495,
    status: 'completed',
    method: 'card',
    date: '2024-04-01',
  },
  {
    id: 'TXN-003',
    customer: 'DataFlow',
    email: 'contact@dataflow.com',
    amount: 792,
    status: 'completed',
    method: 'card',
    date: '2024-04-01',
  },
  {
    id: 'TXN-004',
    customer: 'CloudNine',
    email: 'info@cloudnine.app',
    amount: 50,
    status: 'failed',
    method: 'card',
    date: '2024-04-01',
  },
  {
    id: 'TXN-005',
    customer: 'DevOps Pro',
    email: 'team@devopspro.io',
    amount: 297,
    status: 'pending',
    method: 'invoice',
    date: '2024-04-01',
  },
  {
    id: 'TXN-006',
    customer: 'Acme Corp',
    email: 'admin@acme.com',
    amount: 3588,
    status: 'completed',
    method: 'card',
    date: '2024-03-01',
  },
  {
    id: 'TXN-007',
    customer: 'TechStart Inc',
    email: 'hello@techstart.io',
    amount: 495,
    status: 'completed',
    method: 'card',
    date: '2024-03-01',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'failed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const stats = [
  {
    label: 'Total Revenue (MTD)',
    value: '$124,500',
    change: '+15%',
    icon: DollarSign,
  },
  {
    label: 'Successful Payments',
    value: '1,156',
    change: '+8%',
    icon: Check,
  },
  {
    label: 'Failed Payments',
    value: '23',
    change: '-12%',
    icon: AlertCircle,
  },
  {
    label: 'Avg. Transaction',
    value: '$107.68',
    change: '+5%',
    icon: TrendingUp,
  },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500">Monitor payments and subscriptions</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} vs last month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer or transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Transaction
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                Method
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-mono text-sm text-gray-900">{tx.id}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{tx.customer}</p>
                  <p className="text-sm text-gray-500">{tx.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">${tx.amount.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(tx.status)}`}>
                    {tx.status === 'completed' && <Check className="h-3 w-3" />}
                    {tx.status === 'failed' && <AlertCircle className="h-3 w-3" />}
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="h-4 w-4" />
                    <span className="capitalize">{tx.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-6 py-4 font-semibold text-gray-900">
                Total ({filteredTransactions.length} transactions)
              </td>
              <td colSpan={4} className="px-6 py-4 font-bold text-gray-900">
                ${totalAmount.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
