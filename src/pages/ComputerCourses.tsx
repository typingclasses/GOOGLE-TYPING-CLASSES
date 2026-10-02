import React from 'react';
import { Laptop, Cpu, Calculator, CheckCircle, ArrowRight, Award, Monitor } from 'lucide-react';

interface ComputerCoursesProps {
  onNavigate: (path: string) => void;
}

export const ComputerCourses: React.FC<ComputerCoursesProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-blue-600 font-extrabold uppercase text-xs tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Computer Education Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Computer Courses in Patna (DCA, ADCA, Tally)
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Comprehensive computer diplomas and accounting software training with practical lab sessions and course completion certificates.
          </p>
        </div>

        {/* Courses list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* DCA */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">DCA Diploma</h3>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">₹4,500</span>
              </div>
              <p className="text-slate-600 text-sm">6 Months Diploma in Computer Applications covering Windows, MS Office, and Internet.</p>
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> MS Word, Excel, PowerPoint</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Windows OS & File Management</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Internet & Cyber Security Basics</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('/student-signup')}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
            >
              Enroll in DCA
            </button>
          </div>

          {/* ADCA */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between ring-2 ring-blue-600/20 relative">
            <span className="absolute -top-3 right-6 bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">ADCA Diploma</h3>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">₹8,000</span>
              </div>
              <p className="text-slate-600 text-sm">12 Months Advanced Diploma covering programming, Tally, Photoshop, and DTP.</p>
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> C, C++ & HTML/CSS Basics</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Tally Prime with GST</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Photoshop & DTP Tools</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('/student-signup')}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
            >
              Enroll in ADCA
            </button>
          </div>

          {/* Tally */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">Tally Prime</h3>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">₹2,500</span>
              </div>
              <p className="text-slate-600 text-sm">3 Months professional accounting course with GST taxation and inventory management.</p>
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> GST Invoicing & E-Way Bills</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Payroll & Ledger Management</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Balance Sheet & Profit/Loss</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('/student-signup')}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
            >
              Enroll in Tally
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
