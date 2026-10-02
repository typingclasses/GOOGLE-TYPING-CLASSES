import React, { useState } from 'react';
import { FileText, Plus, ShieldCheck, Trash2, X } from 'lucide-react';
import { CertificateItem } from '../../types';
import { COURSES_DATA } from '../../data/mockData';

interface AdminCertificatesProps {
  certificates: CertificateItem[];
  onUpdateCertificates: (newCerts: CertificateItem[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminCertificates: React.FC<AdminCertificatesProps> = ({ certificates, onUpdateCertificates, onLogAction }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: 'GTC-2026-101',
    course: COURSES_DATA[0].title
  });

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const code = Math.floor(100000 + Math.random() * 900000);
    const newCert: CertificateItem = {
      id: `CERT-${Date.now()}`,
      certificateId: `GTC-CERT-${code}`,
      studentId: formData.studentId,
      studentName: formData.studentName,
      course: formData.course,
      issueDate: 'Today',
      status: 'Valid',
      verificationCode: `VERIFY-${code}`
    };

    const updated = [newCert, ...certificates];
    onUpdateCertificates(updated);
    onLogAction('Certificate Issued', `Issued certificate for ${newCert.studentName} (${newCert.certificateId})`);
    setShowAddModal(false);
    setFormData({ studentName: '', studentId: 'GTC-2026-101', course: COURSES_DATA[0].title });
  };

  const revokeCert = (id: string, name: string) => {
    if (confirm(`Revoke certificate for ${name}?`)) {
      const updated = certificates.map(c => c.id === id ? { ...c, status: 'Revoked' as const } : c);
      onUpdateCertificates(updated);
      onLogAction('Certificate Revoked', `Revoked certificate ID ${id}`);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Certificate Management</h2>
          <p className="text-xs text-slate-500">Issue and verify official course completion credentials.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Issue Certificate
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Certificate ID</th>
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">Course</th>
                <th className="py-4 px-6">Issue Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-600">{cert.certificateId}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{cert.studentName}</td>
                  <td className="py-4 px-6 text-slate-700">{cert.course}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{cert.issueDate}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${cert.status === 'Valid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {cert.status === 'Valid' && (
                      <button
                        onClick={() => revokeCert(cert.id, cert.studentName)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-slate-900">Issue Course Certificate</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleIssue} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Select Course *</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                >
                  {COURSES_DATA.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md"
                >
                  Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
