import React from 'react';
import { History, Download } from 'lucide-react';
import { ActivityLogItem } from '../../types';

interface AdminLogsProps {
  logs: ActivityLogItem[];
}

export const AdminLogs: React.FC<AdminLogsProps> = ({ logs }) => {
  const handleExportCSV = () => {
    if (logs.length === 0) return;

    const headers = ['Timestamp', 'Admin User', 'Action', 'Details', 'IP Address'];
    const rows = logs.map(log => [
      `"${log.date}"`,
      `"${log.adminName}"`,
      `"${log.action}"`,
      `"${log.details.replace(/"/g, '""')}"`,
      `"${log.ipAddress}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `activity_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Activity Audit Logs</h2>
          <p className="text-xs text-slate-500">Track all administrative actions, changes, and logins securely.</p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={logs.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Admin User</th>
                <th className="py-4 px-6">Action</th>
                <th className="py-4 px-6">Details</th>
                <th className="py-4 px-6">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 text-slate-500 text-xs">{log.date}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{log.adminName}</td>
                  <td className="py-4 px-6 font-semibold text-blue-600">{log.action}</td>
                  <td className="py-4 px-6 text-slate-700 text-xs">{log.details}</td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
