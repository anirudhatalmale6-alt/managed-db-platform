'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Ban,
  Trash2,
  Eye,
  Download,
} from 'lucide-react';

const customers = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'admin@acme.com',
    plan: 'Enterprise',
    databases: 12,
    monthlySpend: 3588,
    status: 'active',
    joined: '2024-01-15',
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'hello@techstart.io',
    plan: 'Professional',
    databases: 5,
    monthlySpend: 495,
    status: 'active',
    joined: '2024-02-20',
  },
  {
    id: '3',
    name: 'DataFlow',
    email: 'contact@dataflow.com',
    plan: 'Professional',
    databases: 8,
    monthlySpend: 792,
    status: 'active',
    joined: '2024-03-10',
  },
  {
    id: '4',
    name: 'CloudNine',
    email: 'info@cloudnine.app',
    plan: 'Starter',
    databases: 2,
    monthlySpend: 50,
    status: 'active',
    joined: '2024-03-25',
  },
  {
    id: '5',
    name: 'DevOps Pro',
    email: 'team@devopspro.io',
    plan: 'Professional',
    databases: 3,
    monthlySpend: 297,
    status: 'suspended',
    joined: '2024-02-01',
  },
  {
    id: '6',
    name: 'StartupX',
    email: 'founders@startupx.com',
    plan: 'Starter',
    databases: 1,
    monthlySpend: 0,
    status: 'trial',
    joined: '2024-04-01',
  },
];

const getPlanBadge = (plan: string) => {
  switch (plan) {
    case 'Enterprise':
      return 'bg-purple-100 text-purple-700';
    case 'Professional':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'suspended':
      return 'bg-red-100 text-red-700';
    case 'trial':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = planFilter === 'all' || customer.plan.toLowerCase() === planFilter;
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const totalRevenue = filteredCustomers.reduce((sum, c) => sum + c.monthlySpend, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500">Manage customer accounts and subscriptions</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {customers.filter((c) => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">On Trial</p>
          <p className="text-2xl font-bold text-yellow-600">
            {customers.filter((c) => c.status === 'trial').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-2xl font-bold text-blue-600">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Plans</option>
            <option value="enterprise">Enterprise</option>
            <option value="professional">Professional</option>
            <option value="starter">Starter</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Plan
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                Databases
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">
                Monthly Spend
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">
                Joined
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCustomers.map((customer) => (
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
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getPlanBadge(customer.plan)}`}>
                    {customer.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                  {customer.databases}
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium hidden lg:table-cell">
                  ${customer.monthlySpend}
                </td>
                <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">
                  {customer.joined}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === customer.id ? null : customer.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                    {openMenu === customer.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </Link>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                          <Mail className="h-4 w-4" /> Send Email
                        </button>
                        <hr className="my-1" />
                        {customer.status === 'active' ? (
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 w-full">
                            <Ban className="h-4 w-4" /> Suspend
                          </button>
                        ) : (
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full">
                            <Eye className="h-4 w-4" /> Reactivate
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
