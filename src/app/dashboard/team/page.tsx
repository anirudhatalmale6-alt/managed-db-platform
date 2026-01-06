'use client';

import { useState } from 'react';
import { Plus, MoreVertical, Mail, Shield, Trash2, UserPlus } from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Demo Customer',
    email: 'demo@clouddb.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'John Developer',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Sarah Engineer',
    email: 'sarah@example.com',
    role: 'member',
    status: 'active',
    joinedAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Pending User',
    email: 'pending@example.com',
    role: 'member',
    status: 'invited',
    joinedAt: '2024-04-01',
  },
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'owner':
      return 'bg-purple-100 text-purple-700';
    case 'admin':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function TeamPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleInvite = () => {
    // In production, call API to send invitation
    alert(`Invitation sent to ${inviteEmail}`);
    setShowInviteModal(false);
    setInviteEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-500">Manage your team and their access permissions</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="h-5 w-5" />
          Invite Member
        </button>
      </div>

      {/* Team List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Member
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Role
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                Status
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
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadge(member.role)}`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm text-gray-500">{member.joinedAt}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  {member.role !== 'owner' && (
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === member.id ? null : member.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                      {openMenu === member.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                            <Shield className="h-4 w-4" /> Change Role
                          </button>
                          {member.status === 'invited' && (
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                              <Mail className="h-4 w-4" /> Resend Invite
                            </button>
                          )}
                          <hr className="my-1" />
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roles Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-purple-700 flex items-center gap-2">
              <span className="h-2 w-2 bg-purple-500 rounded-full" /> Owner
            </h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Full access to all resources</li>
              <li>Manage billing & subscriptions</li>
              <li>Invite & remove team members</li>
              <li>Delete organization</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-blue-700 flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-500 rounded-full" /> Admin
            </h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Create & manage databases</li>
              <li>View billing information</li>
              <li>Invite team members</li>
              <li>Manage member permissions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 flex items-center gap-2">
              <span className="h-2 w-2 bg-gray-500 rounded-full" /> Member
            </h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>View databases</li>
              <li>Access connection strings</li>
              <li>View activity logs</li>
              <li>Update own profile</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Invite Team Member</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
