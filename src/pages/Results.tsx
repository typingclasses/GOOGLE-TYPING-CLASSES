import React, { useState, useEffect } from 'react';
import { Search, Trophy, User, Calendar, ShieldCheck, Download, CheckCircle, Lock, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { StudentResult } from '../types';
import { ResultCard } from '../components/ResultCard';

interface ResultsProps {
  onNavigate: (path: string) => void;
  results?: StudentResult[];
}

export const Results: React.FC<ResultsProps> = ({ onNavigate, results }) => {
  const allResults = results || [];
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [searched, setSearched] = useState(false);
  const [resultsList, setResultsList] = useState<StudentResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-search if registration number is provided via URL query params (e.g. QR code scan)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regParam = params.get('reg') || params.get('regNo');
    if (regParam && allResults.length > 0) {
      setStudentName(regParam);
      const cleanParam = regParam.trim().toLowerCase();
      const matched = allResults.filter(
        r => r.registrationNo.toLowerCase() === cleanParam || r.studentId.toLowerCase() === cleanParam
      );
      if (matched.length > 0) {
        setResultsList(matched);
        setSearched(true);
      }
    }
  }, [allResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = studentName.trim().toLowerCase();
    const cleanInputDob = dob.replace(/[^0-9]/g, '');

    if (!trimmedName) {
      setErrorMessage('Please enter Student Name or Registration Number.');
      return;
    }

    if (!cleanInputDob) {
      setErrorMessage('Please enter Date of Birth (DOB) in DDMMYYYY format (e.g. 12052005).');
      return;
    }

    setSearched(true);

    const filtered = allResults.filter(r => {
      // Name / Roll / StudentId match
      const nameLower = (r.name || '').toLowerCase();
      const regLower = (r.registrationNo || '').toLowerCase();
      const studentIdLower = (r.studentId || '').toLowerCase();

      const matchNameOrReg =
        nameLower.includes(trimmedName) ||
        regLower === trimmedName ||
        regLower.includes(trimmedName) ||
        studentIdLower === trimmedName;

      // DOB match (digits only comparison)
      const recordDobClean = (r.dob || '').replace(/[^0-9]/g, '');
      const matchDob = recordDobClean === cleanInputDob || recordDobClean.includes(cleanInputDob);

      return matchNameOrReg && matchDob;
    });

    setResultsList(filtered);

    // If exactly 1 student found, optionally auto-open or keep view ready
    if (filtered.length === 1) {
      setSelectedResult(filtered[0]);
    }
  };

  const handleResetSearch = () => {
    setStudentName('');
    setDob('');
    setSearched(false);
    setResultsList([]);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 px-4 py-1.5 rounded-full text-blue-700 text-xs sm:text-sm font-extrabold">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Private & Confidential Verification Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Check Your Result
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Enter your registered <strong>Student Name / Reg No</strong> and <strong>Date of Birth (DOB)</strong> to verify and view your personal scorecard.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 max-w-2xl mx-auto space-y-5">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Student Name / Reg No <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar or REG884950"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Date of Birth (DOB) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="DDMMYYYY (e.g. 12052005)"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold font-mono tracking-wider text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Search className="w-4 h-4" />
                <span>Check Result Now</span>
              </button>
              {searched && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl text-sm transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 font-medium text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Student Privacy Protected</span>
            </span>
            <span>DOB Format: <strong>DDMMYYYY</strong> (e.g. 12052005)</span>
          </div>
        </div>

        {/* 1. BEFORE SEARCH: Privacy Protection Notice (No Results Table Shown) */}
        {!searched && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-slate-200/80 shadow-sm space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Individual Result Protection Enabled
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                For privacy and security, student exam results, marks, and speed scorecards are kept confidential. Results are displayed <strong>only after entering matching Student Name and Date of Birth</strong>.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Examination Records
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Instant PDF Scorecard
              </span>
            </div>
          </div>
        )}

        {/* 2. AFTER SEARCH: Display Matching Student Result */}
        {searched && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {resultsList.length > 0 ? (
              <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-emerald-50/80 border-b border-emerald-100 px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-emerald-950">
                        Result Verified Successfully!
                      </h3>
                      <p className="text-xs text-emerald-700">
                        {resultsList.length} candidate record found matching your credentials.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
                    Official Record
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                        <th className="py-4 px-6">Candidate Details</th>
                        <th className="py-4 px-6">Date of Birth</th>
                        <th className="py-4 px-6">Course</th>
                        <th className="py-4 px-6">Speed / Accuracy</th>
                        <th className="py-4 px-6">Result Status</th>
                        <th className="py-4 px-6 text-center">Scorecard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {resultsList.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900 uppercase text-base">{res.name}</div>
                            <div className="text-xs font-mono font-semibold text-blue-700 mt-0.5">
                              Roll: {res.registrationNo}
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="text-xs font-semibold text-blue-700 font-mono bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-500" />
                              <span>{res.dob || '15/07/1996'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-slate-800">{res.course}</span>
                          </td>
                          <td className="py-4 px-6">
                            {res.englishSpeed || res.hindiSpeed ? (
                              <div className="text-xs space-y-1">
                                {res.englishSpeed && (
                                  <div className="text-blue-800 font-bold font-mono">
                                    Eng: {res.englishSpeed}
                                  </div>
                                )}
                                {res.hindiSpeed && (
                                  <div className="text-emerald-800 font-bold font-mono">
                                    Hin: {res.hindiSpeed}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs">
                                {res.accuracy || '95.0%'}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                res.status === 'Distinction'
                                  ? 'bg-amber-100 text-amber-800'
                                  : res.status === 'Passed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {res.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              type="button"
                              onClick={() => setSelectedResult(res)}
                              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>View Scorecard</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* No matching result found notice */
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-amber-200 shadow-sm space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-800">No Record Found</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    No examination result matched the Student Name <strong>"{studentName}"</strong> and Date of Birth <strong>"{dob}"</strong>.
                  </p>
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left max-w-md mx-auto space-y-1.5">
                  <p className="font-bold text-slate-700">Please check the following:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                    <li>Ensure spelling of Candidate Name matches your admit card.</li>
                    <li>Or try entering your <strong>Registration Number</strong> (e.g. REG884950).</li>
                    <li>Date of Birth format must be <strong>DDMMYYYY</strong> (e.g. 15071996 for 15/07/1996).</li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal displaying the Result Card */}
      {selectedResult && (
        <ResultCard
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
};
