import React from 'react';

interface TermsProps {
  onNavigate: (path: string) => void;
}

export const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <div className="space-y-4 text-sm sm:text-base">
          <h2 className="text-xl font-bold text-slate-900 pt-2">1. Admission & Attendance</h2>
          <p>
            Students enrolled in Google Typing Classes must adhere to institute discipline, attendance policies, and computer lab guidelines at our Patna center (Tripolia Kathak, Patna – 800007).
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">2. Course Completion Certificates</h2>
          <p>
            Certificates are issued only upon successful completion of the prescribed course duration, attendance criteria, and assessment evaluations.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">3. Fees & Payments</h2>
          <p>
            Course fees once paid are subject to institute refund and transfer guidelines. Contact the office for detailed fee schedules.
          </p>
        </div>
      </div>
    </div>
  );
};
