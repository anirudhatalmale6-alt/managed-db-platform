'use client';

import { useState } from 'react';
import {
  CreditCard,
  Download,
  Plus,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

const currentPlan = {
  name: 'Professional',
  databases: 4,
  monthlySpend: 247,
  nextBillingDate: '2024-05-01',
};

const invoices = [
  { id: 'INV-2024-004', date: '2024-04-01', amount: 247, status: 'pending' },
  { id: 'INV-2024-003', date: '2024-03-01', amount: 247, status: 'paid' },
  { id: 'INV-2024-002', date: '2024-02-01', amount: 198, status: 'paid' },
  { id: 'INV-2024-001', date: '2024-01-01', amount: 124, status: 'paid' },
];

const usageBreakdown = [
  { database: 'production-mysql', type: 'MySQL', plan: 'Professional', cost: 99 },
  { database: 'analytics-postgres', type: 'PostgreSQL', plan: 'Professional', cost: 99 },
  { database: 'cache-redis', type: 'Redis', plan: 'Starter', cost: 25 },
  { database: 'search-elastic', type: 'Elasticsearch', plan: 'Starter', cost: 25 },
];

const paymentMethods = [
  { id: '1', type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: '2', type: 'mastercard', last4: '8888', expiry: '06/26', isDefault: false },
];

export default function BillingPage() {
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-500">Manage your subscription, payment methods, and invoices</p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500">Current Plan</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{currentPlan.name}</p>
          <p className="text-sm text-gray-500 mt-1">{currentPlan.databases} active databases</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500">Monthly Spend</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">${currentPlan.monthlySpend}</p>
          <p className="text-sm text-gray-500 mt-1">Billing on {currentPlan.nextBillingDate}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
          <div className="flex items-center gap-2 mt-1">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-lg font-semibold text-green-600">Active</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">All payments up to date</p>
        </div>
      </div>

      {/* Usage Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Current Usage</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Database
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Type
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Plan
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Monthly Cost
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usageBreakdown.map((item) => (
              <tr key={item.database} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{item.database}</td>
                <td className="px-6 py-4 text-gray-600">{item.type}</td>
                <td className="px-6 py-4 text-gray-600">{item.plan}</td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  ${item.cost}/mo
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={3} className="px-6 py-4 font-semibold text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 text-right font-bold text-gray-900">
                ${usageBreakdown.reduce((sum, item) => sum + item.cost, 0)}/mo
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          <button
            onClick={() => setShowAddCard(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Plus className="h-4 w-4" /> Add Card
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {paymentMethods.map((card) => (
            <div key={card.id} className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {card.type} ending in {card.last4}
                  </p>
                  <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {card.isDefault && (
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Default
                  </span>
                )}
                <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Invoice History</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Invoice
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.date}</td>
                <td className="px-6 py-4 text-gray-900">${invoice.amount}.00</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {invoice.status === 'paid' ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Payment Method</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="default" className="rounded" />
                <label htmlFor="default" className="text-sm text-gray-600">
                  Set as default payment method
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddCard(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
