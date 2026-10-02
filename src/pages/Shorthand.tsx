import React from 'react';
import { FileText, CheckCircle, ArrowRight, Award } from 'lucide-react';

interface ShorthandProps {
  onNavigate: (path: string) => void;
}

export const Shorthand: React.FC<ShorthandProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-indigo-600 font-extrabold uppercase text-xs tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
            Stenography Training
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Shorthand / Stenography Classes in Patna
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Pitman Shorthand training in English and Hindi for stenographer jobs in Civil Courts, High Court, Secretariat, and SSC Steno exams.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Pitman Shorthand Masterclass</h3>
                <p className="text-slate-500 text-sm">Duration: 6 Months • Fees: ₹4,000</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('/student-signup')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-lg">Course Highlights & Curriculum:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Pitman Shorthand Theory & Consonants",
                "Vowels, Diphthongs & Grammalogues",
                "Phraseography & Advanced Outlines",
                "Dictation & Transcription Practice",
                "Speed building from 60 to 100 WPM",
                "Legal, Parliamentary & General Dictations",
                "Typing transcription on computer lab",
                "Mock tests for court & steno exams"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-slate-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
