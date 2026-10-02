import React, { useState } from 'react';
import { Bell, Plus, Trash2, X } from 'lucide-react';
import { AnnouncementItem } from '../../types';

interface AdminAnnouncementsProps {
  announcements: AnnouncementItem[];
  onUpdateAnnouncements: (newAnns: AnnouncementItem[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminAnnouncements: React.FC<AdminAnnouncementsProps> = ({ announcements, onUpdateAnnouncements, onLogAction }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn: AnnouncementItem = {
      id: `ANN-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      date: 'Today',
      published: true
    };
    const updated = [newAnn, ...announcements];
    onUpdateAnnouncements(updated);
    onLogAction('Announcement Created', `Created announcement: ${newAnn.title}`);
    setShowAddModal(false);
    setFormData({ title: '', content: '' });
  };

  const deleteAnn = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    onUpdateAnnouncements(updated);
    onLogAction('Announcement Deleted', `Deleted announcement ID ${id}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Announcements & Notices</h2>
          <p className="text-xs text-slate-500">Active announcements appear automatically on the public homepage banner.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold">{ann.date}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Published</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">{ann.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => deleteAnn(ann.id)}
                className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
              >
                Delete Notice
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-slate-900">Create Announcement</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="New Evening Typing Batch Starting Soon"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Notice Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the announcement details here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 resize-none"
                ></textarea>
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
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
