import React from 'react';

interface DisclaimerProps {
  onNavigate: (path: string) => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Disclaimer</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <div className="space-y-4 text-sm sm:text-base">
          <h2 className="text-xl font-bold text-slate-900 pt-2">1. Brand & Trademark Notice</h2>
          <p>
            Google Typing Classes is an independent computer education and typing training institute located at Tripolia Kathak, Patna, Bihar – 800007. This institute is not owned, operated, endorsed, or officially affiliated with Google LLC unless explicitly stated otherwise.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">2. Affiliate Marketing Earnings Disclaimer</h2>
          <p>
            Income from affiliate marketing opportunities is not guaranteed. Earnings depend entirely on individual performance, skills, traffic, conversions, and applicable program terms.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">3. Job & Exam Disclaimer</h2>
          <p>
            We provide professional typing and computer training to prepare students for competitive examinations. We do not guarantee government jobs or official placement.
          </p>
        </div>
      </div>
    </div>
  );
};
