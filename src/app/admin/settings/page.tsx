'use client';

import { useState } from 'react';
import { Globe, Mail, Shield, Database, Bell, Palette } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email Settings', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database Defaults', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'branding', label: 'Branding', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-500">Configure global platform settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    defaultValue="CloudDB"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue="support@clouddb.com"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Timezone
                  </label>
                  <select className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                  </select>
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <p className="font-medium text-gray-900">Maintenance Mode</p>
                    <p className="text-sm text-gray-500">Disable customer access during maintenance</p>
                  </div>
                  <button className="relative w-12 h-6 rounded-full bg-gray-300 transition">
                    <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Email Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    placeholder="smtp.example.com"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Port
                    </label>
                    <input
                      type="text"
                      placeholder="587"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Encryption
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>TLS</option>
                      <option>SSL</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Address
                  </label>
                  <input
                    type="email"
                    placeholder="noreply@clouddb.com"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save & Test Email
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between max-w-md">
                    <div>
                      <p className="font-medium text-gray-900">Require 2FA for Admins</p>
                      <p className="text-sm text-gray-500">All admin users must enable 2FA</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-blue-600 transition">
                      <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between max-w-md">
                    <div>
                      <p className="font-medium text-gray-900">IP Whitelisting</p>
                      <p className="text-sm text-gray-500">Restrict admin access to specific IPs</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-gray-300 transition">
                      <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue="60"
                      className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database Defaults */}
          {activeTab === 'database' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Database Defaults</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Region
                  </label>
                  <select className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>us-east-1 (N. Virginia)</option>
                    <option>us-west-2 (Oregon)</option>
                    <option>eu-west-1 (Ireland)</option>
                    <option>ap-southeast-1 (Singapore)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Backup Retention (days)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <p className="font-medium text-gray-900">Auto-scaling</p>
                    <p className="text-sm text-gray-500">Enable automatic resource scaling</p>
                  </div>
                  <button className="relative w-12 h-6 rounded-full bg-blue-600 transition">
                    <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <p className="font-medium text-gray-900">SSL by Default</p>
                    <p className="text-sm text-gray-500">Require SSL for all connections</p>
                  </div>
                  <button className="relative w-12 h-6 rounded-full bg-blue-600 transition">
                    <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Notifications</h2>
              <div className="space-y-4">
                {[
                  { label: 'New customer signups', enabled: true },
                  { label: 'Failed payments', enabled: true },
                  { label: 'Database provisioning failures', enabled: true },
                  { label: 'Security alerts', enabled: true },
                  { label: 'System health warnings', enabled: true },
                  { label: 'Daily summary reports', enabled: false },
                  { label: 'Weekly analytics', enabled: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between max-w-md">
                    <p className="text-gray-700">{item.label}</p>
                    <button className={`relative w-12 h-6 rounded-full transition ${
                      item.enabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                        item.enabled ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branding */}
          {activeTab === 'branding' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Branding</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="h-8 w-8 text-blue-600" />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Upload Logo
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      defaultValue="#2563eb"
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#2563eb"
                      className="w-32 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon
                  </label>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Upload Favicon
                  </button>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
