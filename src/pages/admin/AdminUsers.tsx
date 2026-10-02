import React from 'react';
import { Shield, Users } from 'lucide-react';
import { INITIAL_ADMIN_USERS } from '../../data/mockData';

interface AdminUsersProps {
  onLogAction: (action: string, details: string) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900">Admin Users & RBAC Permissions</h2>
        <p className="text-xs text-slate-500">Manage administrator roles (Super Admin, Admin, Content Manager, Result Manager).</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Admin Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Assigned Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {INITIAL_ADMIN_USERS.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{adm.name}</td>
                  <td className="py-4 px-6 text-slate-600">{adm.email}</td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                      {adm.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-600 font-bold text-xs">{adm.status}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{adm.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
