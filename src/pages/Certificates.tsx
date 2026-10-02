import React, { useState } from 'react';
import { Award, CheckCircle, Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificatesProps {
  onNavigate: (path: string) => void;
  certificates?: CertificateItem[];
}

export const Certificates: React.FC<CertificatesProps> = ({ onNavigate, certificates }) => {
  const allCerts = certificates || [];
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = allCerts.find(r => 
      r.certificateId.toLowerCase() === query.trim().toLowerCase() ||
      r.verificationCode.toLowerCase() === query.trim().toLowerCase() ||
      r.studentId.toLowerCase() === query.trim().toLowerCase() ||
      r.studentName.toLowerCase().includes(query.trim().toLowerCase())
    );
    setSearched(true);
    setResult(found || null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-amber-600 font-extrabold uppercase text-xs tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Course Completion Credentials
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Certificate Information & Verification
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Students who successfully complete their selected course can receive a Course Completion Certificate, subject to the institute's course requirements, attendance, and assessment standards.
          </p>
        </div>

        {/* Verification Widget */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-900">Verify Institute Certificate</h3>
          </div>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Registration No. (e.g. REG884920) or Student ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md transition-all shrink-0"
            >
              Verify Certificate
            </button>
          </form>

          {searched && (
            <div className="pt-6 border-t border-slate-100 animate-fadeIn">
              {result ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Certificate Valid & Verified Successfully</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                    <div><strong className="text-slate-900">Student Name:</strong> {result.studentName}</div>
                    <div><strong className="text-slate-900">Certificate ID:</strong> {result.certificateId}</div>
                    <div><strong className="text-slate-900">Course:</strong> {result.course}</div>
                    <div><strong className="text-slate-900">Issue Date:</strong> {result.issueDate}</div>
                    <div><strong className="text-slate-900">Status:</strong> <span className="text-emerald-700 font-bold">{result.status}</span></div>
                    <div><strong className="text-slate-900">Institute:</strong> Google Typing Classes, Patna</div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center text-slate-600">
                  No certificate record found matching "{query}". Please check your registration number or contact the institute office at Tripolia Kathak, Patna.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Details Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
          <h4 className="font-bold text-slate-900 text-lg">Certificate Guidelines:</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>Issued only to enrolled students who complete the prescribed course duration and attendance criteria.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>Includes student typing speed / test assessment grade where applicable.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>Collected directly from our Patna institute office at Tripolia Kathak, Patna – 800007.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
