import React from 'react';

interface PolicyProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicy: React.FC<PolicyProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <div className="space-y-4 text-sm sm:text-base">
          <h2 className="text-xl font-bold text-slate-900 pt-2">1. Information We Collect</h2>
          <p>
            Google Typing Classes ("we", "our", or "us") collects student registration details, mobile numbers, email addresses, and course enrollment records when students join our typing and computer institute in Patna.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">2. Use of Information</h2>
          <p>
            We use collected information solely for student portal login authentication, tracking typing test scores, issuing course completion certificates, and communicating institute updates.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">3. Data Security</h2>
          <p>
            We implement appropriate security practices to protect your personal information against unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">4. Contact Us</h2>
          <p>
            For any privacy inquiries, visit us at Tripolia Kathak, Patna, Bihar – 800007 or call +91 9471085404.
          </p>
        </div>
      </div>
    </div>
  );
};
