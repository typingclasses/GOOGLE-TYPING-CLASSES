import React from 'react';
import { Briefcase, ShieldAlert, CheckCircle } from 'lucide-react';
import { WFHApplication } from '../../types';

interface AdminWorkFromHomeProps {
  wfhApps: WFHApplication[];
  onUpdateWfhApps: (newApps: WFHApplication[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminWorkFromHome: React.FC<AdminWorkFromHomeProps> = ({ wfhApps, onUpdateWfhApps, onLogAction }) => {
  const updateStatus = (id: string, status: 'New' | 'Contacted' | 'Approved' | 'Rejected') => {
    const updated = wfhApps.map(a => a.id === id ? { ...a, status } : a);
    onUpdateWfhApps(updated);
    onLogAction('WFH Application Updated', `Updated WFH application status to ${status}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900">Work From Home / Affiliate Management</h2>
        <p className="text-xs text-slate-500">Manage affiliate marketing interest submissions and participant applications.</p>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-center gap-3 text-amber-900 text-xs font-semibold">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Mandatory Disclaimer: Affiliate marketing income is performance-based and is not guaranteed.</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Applicant Name</th>
                <th className="py-4 px-6">Contact & City</th>
                <th className="py-4 px-6">Interest Area</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {wfhApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{app.name}</td>
                  <td className="py-4 px-6 text-xs text-slate-700">
                    <div>{app.mobile}</div>
                    <div className="text-slate-400">{app.city}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-700">{app.interest}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{app.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => updateStatus(app.id, 'Contacted')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Contacted
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'Approved')}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
