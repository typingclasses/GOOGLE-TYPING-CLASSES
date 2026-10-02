import React from 'react';
import { Mail, Trash2 } from 'lucide-react';
import { EnquiryItem } from '../../types';

interface AdminEnquiriesProps {
  enquiries: EnquiryItem[];
  onUpdateEnquiries: (newEnqs: EnquiryItem[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminEnquiries: React.FC<AdminEnquiriesProps> = ({ enquiries, onUpdateEnquiries, onLogAction }) => {
  const updateStatus = (id: string, status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed') => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status } : e);
    onUpdateEnquiries(updated);
    onLogAction('Enquiry Updated', `Updated enquiry status to ${status}`);
  };

  const deleteEnquiry = (id: string) => {
    const updated = enquiries.filter(e => e.id !== id);
    onUpdateEnquiries(updated);
    onLogAction('Enquiry Deleted', `Deleted enquiry ID ${id}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900">Website Enquiries & Contact Submissions</h2>
        <p className="text-xs text-slate-500">Manage prospective student inquiries from the public contact form.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Name & Mobile</th>
                <th className="py-4 px-6">Course Interested</th>
                <th className="py-4 px-6">Message</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{enq.name}</div>
                    <div className="text-xs text-blue-600">{enq.mobile}</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{enq.courseInterested}</td>
                  <td className="py-4 px-6 text-xs text-slate-600 max-w-xs truncate">{enq.message}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{enq.date}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => updateStatus(enq.id, 'Contacted')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Contacted
                    </button>
                    <button
                      onClick={() => deleteEnquiry(enq.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
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
