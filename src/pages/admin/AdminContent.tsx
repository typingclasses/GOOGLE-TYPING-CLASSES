import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';

interface AdminContentProps {
  onLogAction: (action: string, details: string) => void;
}

export const AdminContent: React.FC<AdminContentProps> = ({ onLogAction }) => {
  const [heroHeading, setHeroHeading] = useState('Best Computer & Typing Classes in Patna');
  const [heroSubheading, setHeroSubheading] = useState('Learn Computer, English & Hindi Typing, Shorthand, DCA, ADCA, Tally and Competitive Exam Typing with professional guidance.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    onLogAction('Content Updated', 'Updated Homepage Hero CMS content');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900">Website Content CMS</h2>
        <p className="text-xs text-slate-500">Edit homepage hero text, about us, and announcements without modifying source code.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-2 text-sm font-bold">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Content updated successfully! Changes are live on the website.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Homepage Hero Section</h3>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Hero Main Heading</label>
          <input
            type="text"
            value={heroHeading}
            onChange={(e) => setHeroHeading(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Hero Subheading Text</label>
          <textarea
            rows={4}
            value={heroSubheading}
            onChange={(e) => setHeroSubheading(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 resize-none"
          ></textarea>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all"
          >
            Save CMS Changes
          </button>
        </div>
      </form>
    </div>
  );
};
